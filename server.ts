import cors from 'cors';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'node:fs';
import net from 'node:net';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';
import db from './src/lib/db.js';
import {
  createRoundAttempt,
  ensureQuestionBankSeeded,
  getLatestRoundAttempt,
  listQuestions,
  listQuestionStats,
  submitRoundAttempt,
} from './src/lib/questionBankStore.js';

const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath, override: false });
}

const SESSION_COOKIE_NAME = 'promptly_session';
const AUTH_WINDOW_MS = 60_000;
const AUTH_MAX_REQUESTS = 20;
const GITHUB_SCAN_INITIAL_RESPONSE_TIMEOUT_MS = Number(process.env.GITHUB_SCAN_INITIAL_RESPONSE_TIMEOUT_MS ?? 15000);
const GITHUB_SCAN_INPUT_CHAR_BUDGET = Number(process.env.GITHUB_SCAN_INPUT_CHAR_BUDGET ?? 240000);
const GITHUB_SCAN_MAX_TOKENS = Number(process.env.GITHUB_SCAN_MAX_TOKENS ?? 64000);
const GITHUB_SCAN_MODEL = process.env.GITHUB_SCAN_MODEL?.trim() || 'deepseek/deepseek-v4-pro';
const GITHUB_SCAN_FALLBACK_MODELS = String(process.env.GITHUB_SCAN_FALLBACK_MODELS ?? 'openai/gpt-4o')
  .split(',')
  .map((model) => model.trim())
  .filter(Boolean);
const GITHUB_SCAN_TIMEOUT_MS = Number(process.env.GITHUB_SCAN_TIMEOUT_MS ?? 900000);
const GITHUB_SCAN_TEMPERATURE = Number(process.env.GITHUB_SCAN_TEMPERATURE ?? 0.1);
const GITHUB_SCAN_TOP_P = Number(process.env.GITHUB_SCAN_TOP_P ?? 0.95);
const GITHUB_SCAN_STAGED_CONTEXT_CHAR_BUDGET = Number(process.env.GITHUB_SCAN_STAGED_CONTEXT_CHAR_BUDGET ?? 120000);
const GITHUB_SCAN_ENGINE_VERSION = 'deepseek-chat-single-flight-2026-05-13';
const oauthStates = new Map<string, { provider: 'google' | 'github'; createdAt: number; nextPath?: string }>();
const activeGithubScanRequests = new Map<string, string>();

type DbUserRow = {
  id: string;
  email: string;
  name: string;
  password_hash: string;
  auth_provider: string | null;
  email_verified: boolean | null;
  created_at: string;
  updated_at: string;
};

type AuthedRequest = express.Request & {
  user?: DbUserRow;
};

type UserPreferencesRow = {
  sidebar_open: boolean | null;
  theme: string | null;
  domain: string | null;
};

type EmailOtpPurpose = 'email_change';

const emailOtpCodes = new Map<string, { codeHash: string; expiresAt: number; purpose: EmailOtpPurpose }>();

const QUESTION_TYPE_VALUES = ['fundamentals', 'mcq', 'fill_blank', 'scenario', 'system_design', 'coding', 'mock'] as const;
type QuestionTypeParam = (typeof QUESTION_TYPE_VALUES)[number];
const QUESTION_TYPE_SET = new Set<string>(QUESTION_TYPE_VALUES);

type PrepPlanRequestBody = {
  domain?: string;
  interviewType?: string;
  companyType?: string;
  timeline?: string;
};

type PrepPlanResponse = {
  focusAreas: string[];
  interviewPattern: string[];
  projectRelevance: string;
  codingExpectation: {
    language: string;
    difficulty: string;
    timePressure: string;
  };
  prepStrategy: {
    '3-day': string[];
    '7-day': string[];
    '30-day': string[];
  };
};

type ProjectAnalysisResponse = {
  projectSummary: string;
  techStack: string[];
  keyFeatures: string[];
  interviewableTopics: string[];
  commonFollowUps: string[];
  weakPoints: string[];
  improvementSuggestions: string[];
  projectSpecificQuestions: string[];
};

type ManualProjectAnalysisResponse = {
  techStack: string[];
  likelyArchitecture: string[];
  whatInterviewerWillFocus: string[];
  gapsThatMightExist: string[];
  projectSpecificQuestions: string[];
  assumptions: string[];
};

type DiagnosticQuestion = {
  question: string;
  type: 'mcq' | 'true_false';
  options?: string[];
  correctAnswer: string;
  topicTag: string;
};

type GithubQuestion = {
  id: string;
  questionText: string;
  type: 'mcq' | 'open' | 'coding' | 'scenario';
  difficulty: 'easy' | 'medium' | 'hard';
  fileReference: string;
  conceptTag: string;
  options?: string[];
  correctAnswer: string;
};

type GithubQuestionSection = {
  sectionId: string;
  sectionTitle: string;
  sectionDescription: string;
  questions: GithubQuestion[];
};

type GithubQuestionSet = {
  projectName: string;
  detectedDomains: string[];
  projectSummary: string;
  sections: GithubQuestionSection[];
  warnings?: string[];
};

type ModelConfig =
  | { provider: 'openai-compat'; apiKey: string; model: string; baseUrl: string }
  | { provider: 'gemini'; apiKey: string; model: string };

const authBuckets = new Map<string, { count: number; resetAt: number }>();

function isFilledString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function wait(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function readPort(name: string, fallback: number) {
  const rawValue = process.env[name]?.trim();
  if (!rawValue) return fallback;

  const port = Number(rawValue);
  if (Number.isInteger(port) && port > 0 && port <= 65535) return port;

  console.warn(`Ignoring invalid ${name} value "${rawValue}". Using ${fallback}.`);
  return fallback;
}

async function findAvailablePort(startPort: number, maxAttempts = 20) {
  for (let offset = 0; offset < maxAttempts; offset += 1) {
    const candidatePort = startPort + offset;
    const available = await new Promise<boolean>((resolve) => {
      const probe = net.createServer();

      probe.once('error', (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE' || error.code === 'EACCES') {
          resolve(false);
          return;
        }

        resolve(false);
      });

      probe.once('listening', () => {
        probe.close(() => resolve(true));
      });

      probe.listen(candidatePort, '0.0.0.0');
    });

    if (available) {
      return candidatePort;
    }
  }

  throw new Error(`Unable to find an open port starting at ${startPort}.`);
}

const ALLOWED_DOMAINS = new Set([
  'frontend',
  'react',
  'next-js',
  'typescript',
  'backend-nodejs',
  'backend-python',
  'backend',
  'full-stack',
  'system-design',
  'sql-databases',
  'devops',
  'cloud-aws',
  'cloud-gcp',
  'cloud-platform',
  'ai-ml',
  'data-analytics',
  'data-science',
  'data-engineering',
  'data',
  'cybersecurity',
  'security',
  'blockchain',
  'web3',
  'mobile-react-native',
  'mobile-flutter',
  'mobile',
  'dsa',
  'cs-fundamentals',
  'languages',
  'database',
  'testing',
]);

const DOMAIN_ALIASES = new Map<string, string>([
  ['database', 'sql-databases'],
  ['testing', 'frontend'],
]);

function normalizeDomain(value: unknown, fallback = 'frontend') {
  const requested = String(value ?? '').trim();
  const domain = DOMAIN_ALIASES.get(requested) ?? requested;
  return ALLOWED_DOMAINS.has(domain) ? domain : fallback;
}

function normalizeQuestionType(value: unknown): QuestionTypeParam | null {
  const type = String(value ?? '').trim();
  return QUESTION_TYPE_SET.has(type) ? (type as QuestionTypeParam) : null;
}

function parseQuestionTypes(value: unknown): QuestionTypeParam[] {
  const rawValues = Array.isArray(value)
    ? value.flatMap((item) => String(item ?? '').split(','))
    : String(value ?? '').split(',');

  const seen = new Set<QuestionTypeParam>();
  for (const rawValue of rawValues) {
    const normalized = normalizeQuestionType(rawValue);
    if (normalized) seen.add(normalized);
  }

  return [...seen];
}

function toStringArray(value: unknown, fallback: string[] = []): string[] {
  if (Array.isArray(value)) {
    const items = value
      .map((item) => String(item ?? '').trim())
      .filter(Boolean);
    return items.length ? items : fallback;
  }

  if (isFilledString(value)) {
    return value
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return fallback;
}

function extractJsonPayload(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error('The model returned an empty response.');
  }

  const fencedMatch = trimmed.match(/^```(?:json)?\s*([\s\S]*?)```\s*$/i);
  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim();
  }

  const objectStart = trimmed.indexOf('{');
  const objectEnd = trimmed.lastIndexOf('}');
  const arrayStart = trimmed.indexOf('[');
  const arrayEnd = trimmed.lastIndexOf(']');

  if (arrayStart !== -1 && arrayEnd > arrayStart && (objectStart === -1 || arrayStart < objectStart)) {
    return trimmed.slice(arrayStart, arrayEnd + 1);
  }

  if (objectStart !== -1 && objectEnd > objectStart) {
    return trimmed.slice(objectStart, objectEnd + 1);
  }

  return trimmed;
}

function githubScanModelCandidates() {
  return Array.from(new Set([GITHUB_SCAN_MODEL, ...GITHUB_SCAN_FALLBACK_MODELS].filter(Boolean)));
}

function isRetryableGithubModelError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error ?? '');
  return (
    message === 'model_json_parse_failed'
    || message === 'model_empty_response'
    || message === 'model_invalid_repo_question_json'
    || message === 'model_missing_repo_references'
    || message === 'analysis_timeout'
    || /model_http_(400|402|404|408|409|429|5\d\d)/i.test(message)
  );
}

function readMessageText(content: unknown): string {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object' && 'text' in item) return String((item as { text?: unknown }).text ?? '');
        return '';
      })
      .join('')
      .trim();
  }
  return '';
}

function normalizePrepPlanResponse(payload: unknown): PrepPlanResponse {
  const source = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {};
  const codingExpectation = source.codingExpectation && typeof source.codingExpectation === 'object'
    ? source.codingExpectation as Record<string, unknown>
    : {};
  const prepStrategy = source.prepStrategy && typeof source.prepStrategy === 'object'
    ? source.prepStrategy as Record<string, unknown>
    : {};

  return {
    focusAreas: toStringArray(source.focusAreas).slice(0, 7),
    interviewPattern: toStringArray(source.interviewPattern),
    projectRelevance: String(source.projectRelevance ?? '').trim(),
    codingExpectation: {
      language: String(codingExpectation.language ?? '').trim(),
      difficulty: String(codingExpectation.difficulty ?? '').trim(),
      timePressure: String(codingExpectation.timePressure ?? '').trim(),
    },
    prepStrategy: {
      '3-day': toStringArray(prepStrategy['3-day']),
      '7-day': toStringArray(prepStrategy['7-day']),
      '30-day': toStringArray(prepStrategy['30-day']),
    },
  };
}

function normalizeProjectAnalysisResponse(payload: unknown): ProjectAnalysisResponse {
  const source = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {};
  return {
    projectSummary: String(source.projectSummary ?? '').trim(),
    techStack: toStringArray(source.techStack),
    keyFeatures: toStringArray(source.keyFeatures),
    interviewableTopics: toStringArray(source.interviewableTopics),
    commonFollowUps: toStringArray(source.commonFollowUps),
    weakPoints: toStringArray(source.weakPoints),
    improvementSuggestions: toStringArray(source.improvementSuggestions),
    projectSpecificQuestions: toStringArray(source.projectSpecificQuestions).slice(0, 30),
  };
}

function normalizeManualProjectAnalysisResponse(payload: unknown): ManualProjectAnalysisResponse {
  const source = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {};
  return {
    techStack: toStringArray(source.techStack),
    likelyArchitecture: toStringArray(source.likelyArchitecture),
    whatInterviewerWillFocus: toStringArray(source.whatInterviewerWillFocus),
    gapsThatMightExist: toStringArray(source.gapsThatMightExist),
    projectSpecificQuestions: toStringArray(source.projectSpecificQuestions),
    assumptions: toStringArray(source.assumptions),
  };
}

function normalizeDiagnosticQuestions(payload: unknown): DiagnosticQuestion[] {
  if (!Array.isArray(payload)) return [];

  return payload
    .map((item) => {
      const source = item && typeof item === 'object' ? item as Record<string, unknown> : {};
      const type = String(source.type ?? '').trim().toLowerCase() === 'true_false' ? 'true_false' : 'mcq';
      return {
        question: String(source.question ?? '').trim(),
        type,
        options: type === 'mcq' ? toStringArray(source.options) : undefined,
        correctAnswer: String(source.correctAnswer ?? '').trim(),
        topicTag: String(source.topicTag ?? '').trim(),
      } satisfies DiagnosticQuestion;
    })
    .filter((question) => question.question && question.correctAnswer && question.topicTag);
}

const GITHUB_SECTION_ID_ALIASES = new Map<string, string>([
  ['project-overview', 'project-overview'],
  ['overview', 'project-overview'],
  ['project-summary', 'project-overview'],
  ['repo-overview', 'project-overview'],
  ['frontend-deep-dive', 'frontend-deep-dive'],
  ['frontend-deepdive', 'frontend-deep-dive'],
  ['frontend', 'frontend-deep-dive'],
  ['ui-deep-dive', 'frontend-deep-dive'],
  ['backend-deep-dive', 'backend-deep-dive'],
  ['backend-deepdive', 'backend-deep-dive'],
  ['backend', 'backend-deep-dive'],
  ['api-deep-dive', 'backend-deep-dive'],
  ['service-deep-dive', 'backend-deep-dive'],
  ['most-probable', 'most-probable'],
  ['most-probable-interview-questions', 'most-probable'],
  ['likely-interview-questions', 'most-probable'],
  ['common-questions', 'most-probable'],
  ['scenario-based', 'scenario-based'],
  ['scenario-based-questions', 'scenario-based'],
  ['scenarios', 'scenario-based'],
  ['technical-deep-dive', 'technical-deep-dive'],
  ['technical-deepdive', 'technical-deep-dive'],
  ['technical-questions', 'technical-deep-dive'],
  ['deep-dive', 'technical-deep-dive'],
  ['red-flags-improvements', 'red-flags-improvements'],
  ['red-flags-and-improvements', 'red-flags-improvements'],
  ['red-flags', 'red-flags-improvements'],
  ['improvements', 'red-flags-improvements'],
]);

const DEFAULT_GITHUB_SECTION_TITLES: Record<string, string> = {
  'project-overview': 'Project Overview',
  'frontend-deep-dive': 'Frontend Deep Dive',
  'backend-deep-dive': 'Backend Deep Dive',
  'most-probable': 'Most Probable Interview Questions',
  'scenario-based': 'Scenario Based Questions',
  'technical-deep-dive': 'Technical Deep Dive',
  'red-flags-improvements': 'Red Flags and Improvements',
};

function normalizeGithubSectionKey(value: unknown) {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function canonicalizeGithubSectionId(sectionId: unknown, sectionTitle: unknown) {
  const candidates = [sectionId, sectionTitle]
    .map((value) => normalizeGithubSectionKey(value))
    .filter(Boolean);

  for (const candidate of candidates) {
    const alias = GITHUB_SECTION_ID_ALIASES.get(candidate);
    if (alias) return alias;
  }

  return candidates[0] ?? '';
}

function normalizeGithubQuestionType(value: unknown): GithubQuestion['type'] {
  const normalized = normalizeGithubSectionKey(value);
  if (['mcq', 'multiple-choice', 'multiple-choice-question', 'multiplechoice'].includes(normalized)) return 'mcq';
  if (['coding', 'code', 'implementation'].includes(normalized)) return 'coding';
  if (['scenario', 'scenario-based'].includes(normalized)) return 'scenario';
  return 'open';
}

function normalizeGithubQuestionDifficulty(value: unknown): GithubQuestion['difficulty'] {
  const normalized = String(value ?? '').trim().toLowerCase();
  if (normalized === 'easy' || normalized === 'medium' || normalized === 'hard') return normalized;
  if (normalized === 'difficult' || normalized === 'senior') return 'hard';
  return 'medium';
}

function normalizeGithubDetectedDomain(value: unknown) {
  const normalized = String(value ?? '').trim();
  const key = normalized.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  if (['ai', 'ai ml', 'aiml', 'ai and ml', 'machine learning', 'ml', 'ai integration'].includes(key)) return 'AI and ML';
  if (['fullstack', 'full stack'].includes(key)) return 'Full Stack';
  if (['front end', 'frontend', 'react'].includes(key)) return 'Frontend';
  if (['back end', 'backend', 'api'].includes(key)) return 'Backend';
  if (['security', 'cyber security', 'cybersecurity'].includes(key)) return 'Cybersecurity';
  if (['devops', 'infrastructure', 'devops and infrastructure'].includes(key)) return 'DevOps and Infrastructure';
  if (['data', 'data science', 'data engineering', 'analytics'].includes(key)) return 'Data Engineering';
  return normalized || 'General Software';
}

function deriveGithubConceptTag(value: unknown, fileReference: string, sectionTitle: string) {
  const explicit = String(value ?? '').trim();
  if (explicit) return explicit;

  const fileStem = fileReference
    .split('/')
    .pop()
    ?.replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .trim();

  return fileStem || sectionTitle || 'repo question';
}

function normalizeGithubQuestionSet(payload: unknown): GithubQuestionSet {
  const source = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {};
  const sections = Array.isArray(source.sections) ? source.sections : [];
  const normalizedSections = sections.map((section, sectionIndex) => {
    const sectionSource = section && typeof section === 'object' ? section as Record<string, unknown> : {};
    const sectionId = canonicalizeGithubSectionId(sectionSource.sectionId, sectionSource.sectionTitle) || `section-${sectionIndex + 1}`;
    const sectionTitle = String(sectionSource.sectionTitle ?? '').trim() || DEFAULT_GITHUB_SECTION_TITLES[sectionId] || `Section ${sectionIndex + 1}`;
    const sectionDescription = String(sectionSource.sectionDescription ?? '').trim() || 'Repo-grounded interview questions derived from the provided files.';
    const questions = Array.isArray(sectionSource.questions) ? sectionSource.questions : [];

    return {
      sectionId,
      sectionTitle,
      sectionDescription,
      questions: questions.map((question) => {
        const questionSource = question && typeof question === 'object' ? question as Record<string, unknown> : {};
        const type = normalizeGithubQuestionType(questionSource.type);
        const fileReference = String(
          questionSource.fileReference
            ?? questionSource.file
            ?? questionSource.filePath
            ?? questionSource.path
            ?? questionSource.sourceFile
            ?? '',
        ).trim();

        return {
          id: String(questionSource.id ?? '').trim(),
          questionText: String(questionSource.questionText ?? questionSource.question ?? '').trim(),
          type,
          difficulty: normalizeGithubQuestionDifficulty(questionSource.difficulty),
          fileReference,
          conceptTag: deriveGithubConceptTag(
            questionSource.conceptTag ?? questionSource.concept ?? questionSource.tag ?? questionSource.topic,
            fileReference,
            sectionTitle,
          ),
          options: type === 'mcq' ? toStringArray(questionSource.options).slice(0, 4) : undefined,
          correctAnswer: String(questionSource.correctAnswer ?? questionSource.answer ?? questionSource.expectedAnswer ?? '').trim(),
        };
      }).filter((question) => question.questionText && question.fileReference && question.correctAnswer),
    };
  }).filter((section) => section.sectionId && section.sectionTitle && section.questions.length);

  const mergedSections = new Map<string, GithubQuestionSection>();
  for (const section of normalizedSections) {
    const existing = mergedSections.get(section.sectionId);
    if (existing) {
      existing.questions.push(...section.questions);
      continue;
    }

    mergedSections.set(section.sectionId, {
      sectionId: section.sectionId,
      sectionTitle: section.sectionTitle,
      sectionDescription: section.sectionDescription,
      questions: [...section.questions],
    });
  }

  let nextQuestionId = 1;
  const finalizedSections = Array.from(mergedSections.values()).map((section) => ({
    ...section,
    questions: section.questions.map((question) => ({
      ...question,
      id: `q${nextQuestionId++}`,
    })),
  }));

  const warnings = new Set(toStringArray(source.warnings));
  const totalQuestions = finalizedSections.reduce((sum, section) => sum + section.questions.length, 0);
  if (finalizedSections.length < 7) warnings.add('reduced_section_count');
  if (totalQuestions < 56) warnings.add('reduced_question_count');

  return {
    projectName: String(source.projectName ?? source.repoName ?? '').trim(),
    detectedDomains: toStringArray(source.detectedDomains ?? source.domains).map(normalizeGithubDetectedDomain).slice(0, 2),
    projectSummary: String(source.projectSummary ?? source.summary ?? '').trim(),
    warnings: Array.from(warnings),
    sections: finalizedSections,
  };
}

function resolveModelConfig(modelOverride?: string): ModelConfig {
  const compatBaseUrl = process.env.AICREDITS_BASE_URL?.trim()
    || process.env.OPENAI_COMPAT_BASE_URL?.trim()
    || 'https://api.aicredits.in/v1';
  const compatApiKey = process.env.AICREDITS_API_KEY?.trim()
    || process.env.OPENAI_API_KEY?.trim()
    || process.env.ANTHROPIC_API_KEY?.trim();
  if (compatApiKey) {
    return {
      provider: 'openai-compat',
      apiKey: compatApiKey,
      baseUrl: compatBaseUrl.replace(/\/$/, ''),
      model: modelOverride
        || process.env.PREP_MODEL?.trim()
        || process.env.INTERVIEW_ANALYST_MODEL?.trim()
        || process.env.WORKFLOW_SUMMARY_MODEL?.trim()
        || process.env.ANTHROPIC_MODEL?.trim()
        || 'deepseek/deepseek-chat',
    };
  }

  const geminiApiKey = process.env.GEMINI_API_KEY?.trim();
  if (geminiApiKey) {
    return {
      provider: 'gemini',
      apiKey: geminiApiKey,
      model: modelOverride || process.env.GEMINI_MODEL?.trim() || 'gemini-2.5-flash',
    };
  }

  throw new Error('No compatible LLM provider is configured for prep analysis.');
}

async function callStructuredModel<T>(
  systemPrompt: string,
  userPrompt: string,
  normalize: (payload: unknown) => T,
  options: { maxTokens?: number; timeoutMs?: number; model?: string; temperature?: number; topP?: number } = {},
): Promise<{ result: T; provider: string; model: string }> {
  const config = resolveModelConfig(options.model);
  const abortController = new AbortController();
  const timeout = options.timeoutMs
    ? setTimeout(() => abortController.abort(new Error('analysis_timeout')), options.timeoutMs)
    : null;

  let rawText = '';
  try {
    if (config.provider === 'openai-compat') {
      const response = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      signal: abortController.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        temperature: options.temperature ?? 0.2,
        top_p: options.topP ?? undefined,
        max_tokens: options.maxTokens ?? 4000,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
      }),
    });

    const responseText = await response.text();
    const data = (() => {
      try {
        return JSON.parse(responseText) as {
          error?: { message?: string };
          choices?: Array<{ message?: { content?: unknown } }>;
        };
      } catch {
        return { error: { message: responseText } };
      }
    })();
    if (!response.ok) {
      throw new Error(`model_http_${response.status}: ${String(data.error?.message ?? (responseText || 'Prep analysis request failed.'))}`);
    }

    rawText = readMessageText(data.choices?.[0]?.message?.content);
  } else {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(config.model)}:generateContent?key=${encodeURIComponent(config.apiKey)}`,
      {
        method: 'POST',
        signal: abortController.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: [{ parts: [{ text: userPrompt }] }],
          generationConfig: {
            temperature: options.temperature ?? 0.2,
            topP: options.topP ?? undefined,
            responseMimeType: 'application/json',
            maxOutputTokens: options.maxTokens ?? 4000,
          },
        }),
      },
    );

    const responseText = await response.text();
    const data = (() => {
      try {
        return JSON.parse(responseText) as {
          error?: { message?: string };
          candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
        };
      } catch {
        return { error: { message: responseText } };
      }
    })();
    if (!response.ok) {
      throw new Error(`model_http_${response.status}: ${String(data.error?.message ?? (responseText || 'Gemini prep analysis request failed.'))}`);
    }

    rawText = String(data.candidates?.[0]?.content?.parts?.[0]?.text ?? '').trim();
  }

    if (!rawText.trim()) {
      const error = new Error('model_empty_response') as Error & { rawResponse?: string };
      error.rawResponse = rawText;
      throw error;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(extractJsonPayload(rawText));
    } catch (parseError) {
      const error = new Error('model_json_parse_failed') as Error & { rawResponse?: string };
      error.rawResponse = rawText;
      throw error;
    }
    return {
      result: normalize(parsed),
      provider: config.provider,
      model: config.model,
    };
  } catch (error) {
    if (abortController.signal.aborted) {
      throw new Error('analysis_timeout');
    }
    throw error;
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

async function callGithubStructuredModel<T>(
  systemPrompt: string,
  userPrompt: string,
  normalize: (payload: unknown) => T,
  options: { maxTokens?: number; timeoutMs?: number; temperature?: number; topP?: number; jobId?: string; repoName?: string; stage?: string } = {},
): Promise<{ result: T; provider: string; model: string }> {
  let lastError: unknown = null;
  for (const model of githubScanModelCandidates()) {
    try {
      return await callStructuredModel<T>(systemPrompt, userPrompt, normalize, {
        model,
        maxTokens: options.maxTokens,
        timeoutMs: options.timeoutMs,
        temperature: options.temperature,
        topP: options.topP,
      });
    } catch (error) {
      lastError = error;
      const message = error instanceof Error ? error.message : String(error ?? '');
      console.warn('GitHub repo scan model attempt failed', {
        jobId: options.jobId,
        repoName: options.repoName,
        stage: options.stage,
        model,
        error: message,
      });
      if (!isRetryableGithubModelError(error)) {
        throw error;
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error('model_generation_failed');
}

function parseGitHubRepository(input: string): { owner: string; repo: string } | null {
  const match = input.trim().match(/github\.com\/(.+?)\/(.+?)(?:\.git|\/|$)/i);
  if (!match) return null;
  return {
    owner: match[1],
    repo: match[2],
  };
}

function normalizeGithubRepoUrl(input: string): string | null {
  const parsed = parseGitHubRepository(input);
  if (!parsed) return null;
  return `https://github.com/${parsed.owner}/${parsed.repo.replace(/\.git$/i, '')}`;
}

type RepoTreeItem = {
  path?: string;
  type?: string;
  url?: string;
};

function categorizeRepoPath(filePath: string): string | null {
  const lower = filePath.toLowerCase();
  const fileName = lower.split('/').pop() ?? lower;
  if (['package.json', 'requirements.txt', 'pyproject.toml', 'go.mod', 'cargo.toml'].includes(fileName)) return 'stack';
  if (fileName === 'readme.md') return 'readme';
  if (fileName === '.env.example') return 'envExample';
  if (/(route|routes|controller|api|handler)/i.test(filePath)) return 'apiLayer';
  if (/(auth|middleware|guard|session|jwt|oauth)/i.test(filePath)) return 'authLayer';
  if (/(schema|model|migration|prisma|drizzle|entity|database)/i.test(filePath)) return 'databaseLayer';
  return null;
}

async function fetchGitHubRepositoryContext(projectInput: string, accessToken?: string | null): Promise<string> {
  const parsed = parseGitHubRepository(projectInput);
  if (!parsed) return projectInput;

  const repoUrl = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`;
  const token = accessToken?.trim() || process.env.GITHUB_TOKEN?.trim();
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const rawHeaders: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
  const [repoResponse, languagesResponse] = await Promise.all([
    fetch(repoUrl, { headers }).catch(() => null),
    fetch(`${repoUrl}/languages`, { headers }).catch(() => null),
  ]);

  if (repoResponse?.status === 404) {
    throw new Error('Repository not found or private. Add a public repository or configure GITHUB_TOKEN.');
  }
  if (repoResponse?.status === 403) {
    const retryAfter = repoResponse.headers.get('retry-after');
    throw new Error(`GitHub rate limit reached.${retryAfter ? ` Retry after ${retryAfter} seconds.` : ''}`);
  }

  const repoData = repoResponse && repoResponse.ok
    ? await repoResponse.json().catch(() => ({})) as Record<string, unknown>
    : {};
  const languagesData = languagesResponse && languagesResponse.ok
    ? await languagesResponse.json().catch(() => ({})) as Record<string, number>
    : {};

  const repoDescription = String(repoData.description ?? '').trim();
  const defaultBranch = String(repoData.default_branch ?? '').trim();
  const primaryLanguage = String(repoData.language ?? '').trim();
  const topics = Array.isArray(repoData.topics) ? repoData.topics.map((topic) => String(topic)).join(', ') : '';
  const languages = Object.keys(languagesData).join(', ');
  const treeResponse = defaultBranch
    ? await fetch(`${repoUrl}/git/trees/${encodeURIComponent(defaultBranch)}?recursive=1`, { headers }).catch(() => null)
    : null;
  const treeData = treeResponse && treeResponse.ok
    ? await treeResponse.json().catch(() => ({})) as { tree?: RepoTreeItem[] }
    : {};

  const grouped = new Map<string, RepoTreeItem[]>();
  (treeData.tree ?? [])
    .filter((item) => item.type === 'blob' && item.path)
    .forEach((item) => {
      const category = categorizeRepoPath(item.path!);
      if (!category) return;
      grouped.set(category, [...(grouped.get(category) ?? []), item]);
    });

  const priority = ['authLayer', 'databaseLayer', 'apiLayer', 'stack', 'readme', 'envExample'];
  const selectedFiles = priority.flatMap((category) => (grouped.get(category) ?? []).slice(0, category === 'stack' ? 8 : 10));
  let remainingBudget = 80000;
  const fileBlocks: string[] = [];

  for (const file of selectedFiles) {
    if (!file.path || remainingBudget <= 0) break;
    const rawUrl = `https://raw.githubusercontent.com/${parsed.owner}/${parsed.repo}/${encodeURIComponent(defaultBranch)}/${file.path.split('/').map(encodeURIComponent).join('/')}`;
    const rawResponse = await fetch(rawUrl, { headers: rawHeaders }).catch(() => null);
    if (!rawResponse?.ok) continue;
    const content = (await rawResponse.text().catch(() => '')).slice(0, remainingBudget);
    if (!content.trim()) continue;
    remainingBudget -= content.length;
    fileBlocks.push(`FILE: ${file.path}\n${content}`);
  }

  return [
    `Project input: ${projectInput}`,
    repoDescription ? `Repository description: ${repoDescription}` : '',
    primaryLanguage ? `Primary language: ${primaryLanguage}` : '',
    defaultBranch ? `Default branch: ${defaultBranch}` : '',
    topics ? `Topics: ${topics}` : '',
    languages ? `Detected languages: ${languages}` : '',
    fileBlocks.length ? `Detected key files:\n\n${fileBlocks.join('\n\n---\n\n')}` : '',
  ].filter(Boolean).join('\n\n');
}

type GithubRepoContext = {
  repoName: string;
  repoUrl: string;
  detectedStack: string[];
  fileContents: string;
  readmeContent: string;
  limited: boolean;
};

type RepoFileCategory = 'auth' | 'schema' | 'routes' | 'stack' | 'readme' | 'env' | 'components' | 'other';

export async function fetchGithubRepoForQuestionSet(repoUrlInput: string, accessToken?: string | null): Promise<GithubRepoContext> {
  const parsed = parseGitHubRepository(repoUrlInput);
  if (!parsed) throw new Error('invalid_github_url');
  const repoUrl = `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`;
  const token = accessToken?.trim() || process.env.GITHUB_TOKEN?.trim();
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const rawHeaders: Record<string, string> = token ? { Authorization: `Bearer ${token}` } : {};
  const repoResponse = await fetch(repoUrl, { headers }).catch(() => null);
  if (repoResponse?.status === 404) throw new Error('private_repo');
  if (repoResponse?.status === 403) throw new Error('rate_limited');
  if (!repoResponse?.ok) throw new Error('github_fetch_failed');
  const repoData = await repoResponse.json().catch(() => ({})) as Record<string, unknown>;
  const defaultBranch = String(repoData.default_branch ?? 'main');
  const repoName = String(repoData.name ?? parsed.repo);
  const [languagesResponse, treeResponse] = await Promise.all([
    fetch(`${repoUrl}/languages`, { headers }).catch(() => null),
    fetch(`${repoUrl}/git/trees/${encodeURIComponent(defaultBranch)}?recursive=1`, { headers }).catch(() => null),
  ]);
  const languagesData = languagesResponse?.ok ? await languagesResponse.json().catch(() => ({})) as Record<string, number> : {};
  if (treeResponse?.status === 403) throw new Error('rate_limited');
  if (treeResponse?.status === 404) throw new Error('private_repo');
  if (!treeResponse?.ok) throw new Error('github_fetch_failed');
  const treeData = await treeResponse.json().catch(() => ({})) as { tree?: RepoTreeItem[] };
  const codeExtensions = /\.(tsx?|jsx?|py|go|rs|java|cs|php|rb|sql|prisma|json|md|yml|yaml|toml|css|scss|svelte|vue)$/i;
  const ignored = /(^|\/)(node_modules|dist|build|coverage|\.git|vendor|__pycache__|\.next|target)\//i;
  const categoryForPath = (filePath: string): RepoFileCategory | null => {
    const lower = filePath.toLowerCase();
    const fileName = lower.split('/').pop() ?? lower;
    if (['package.json', 'requirements.txt', 'pyproject.toml'].includes(fileName)) return 'stack';
    if (lower === 'readme.md') return 'readme';
    if (fileName === '.env.example') return 'env';
    if (/(auth|middleware|guard)/i.test(filePath)) return 'auth';
    if (/(schema|model|migration|prisma)/i.test(filePath)) return 'schema';
    if (/(route|controller|api|handler)/i.test(filePath)) return 'routes';
    if (/(^|\/)(components|component|views|pages|app|src)\//i.test(filePath) && /\.(tsx|jsx|ts|js|vue|svelte|css|scss)$/i.test(filePath)) return 'components';
    if (codeExtensions.test(filePath)) return 'other';
    return null;
  };
  const priorityScore = (category: RepoFileCategory) => ({
    auth: 0,
    schema: 1,
    routes: 2,
    stack: 3,
    readme: 4,
    env: 5,
    components: 6,
    other: 7,
  })[category];
  const files = (treeData.tree ?? [])
    .filter((item) => item.type === 'blob' && item.path && !ignored.test(item.path))
    .map((item) => {
      const category = categoryForPath(item.path!);
      return category ? { path: item.path!, category } : null;
    })
    .filter((item): item is { path: string; category: RepoFileCategory } => Boolean(item))
    .sort((a, b) => {
      return priorityScore(a.category) - priorityScore(b.category) || a.path.length - b.path.length || a.path.localeCompare(b.path);
    })
    .slice(0, 140);
  const fetchedFiles = await Promise.all(files.map(async (file) => {
    const rawUrl = `https://raw.githubusercontent.com/${parsed.owner}/${parsed.repo}/${encodeURIComponent(defaultBranch)}/${file.path.split('/').map(encodeURIComponent).join('/')}`;
    const rawResponse = await fetch(rawUrl, { headers: rawHeaders }).catch(() => null);
    if (!rawResponse?.ok) return null;
    const content = await rawResponse.text().catch(() => '');
    if (!content.trim()) return null;
    return { ...file, content };
  }));
  const blocks: string[] = [];
  let readmeContent = '';
  let meaningfulFileCount = 0;
  let remainingBudget = GITHUB_SCAN_INPUT_CHAR_BUDGET;
  const stackHints = new Set<string>([
    ...Object.keys(languagesData),
    String(repoData.language ?? ''),
  ].filter(Boolean));

  for (const file of fetchedFiles.filter(Boolean) as Array<{ path: string; category: RepoFileCategory; content: string }>) {
    if (remainingBudget <= 0) break;
    const text = file.content.slice(0, remainingBudget);
    if (!text.trim()) continue;
    remainingBudget -= text.length;
    if (file.category === 'stack') {
      stackHints.add(file.path.split('/').pop() ?? file.path);
      if (file.path.toLowerCase().endsWith('package.json')) {
        try {
          const packageJson = JSON.parse(text) as { dependencies?: Record<string, unknown>; devDependencies?: Record<string, unknown> };
          Object.keys({ ...(packageJson.dependencies ?? {}), ...(packageJson.devDependencies ?? {}) })
            .slice(0, 16)
            .forEach((dependency) => stackHints.add(dependency));
        } catch {
          // Keep the raw package file in the prompt even if dependency parsing fails.
        }
      }
    }
    if (file.category === 'readme') {
      readmeContent = text;
      continue;
    }
    if (['auth', 'schema', 'routes', 'components', 'other'].includes(file.category)) {
      meaningfulFileCount += 1;
    }
    blocks.push(`FILE: ${file.path}\n${text}`);
  }
  const stack = Array.from(stackHints).slice(0, 14);
  return {
    repoName,
    repoUrl: `https://github.com/${parsed.owner}/${parsed.repo}`,
    detectedStack: stack,
    fileContents: blocks.join('\n\n---\n\n'),
    readmeContent,
    limited: meaningfulFileCount < 3,
  };
}

const GITHUB_REPO_SCAN_SYSTEM_PROMPT = `You are a senior software engineer with 10 years of experience conducting technical interviews at product companies. You have been given the complete file contents of a GitHub repository. Your only job is to generate interview questions that are strictly and exclusively derived from what exists in this specific codebase. You are not allowed to generate generic questions about the technologies used. Every single question must reference something that actually exists in this repo — a specific file, a specific function, a specific pattern, a specific architectural decision, or a specific piece of logic found in the code. If you cannot tie a question directly to something found in the files provided, do not include that question. No generic React questions. No generic Node questions. No generic SQL questions. Only questions that could not exist without this specific repo.`;

const GITHUB_REPO_SCAN_USER_PROMPT = `REPO NAME: {repoName}

DETECTED FILES AND CONTENTS:
{fileContents}

README:
{readmeContent}

Before generating any questions, detect the primary domain of this repository from the files provided. The domain must be one of: Frontend, Backend, Full Stack, AI and ML, Cybersecurity, Blockchain and Web3, DevOps and Infrastructure, Data Engineering, Mobile, or General Software. You may detect up to two domains if the repo genuinely spans both, for example a Full Stack repo or an AI app with a backend API layer.

Before generating any questions, perform a deep read of every file provided and extract implementation intelligence separately for frontend and backend where those layers exist.

For frontend analysis, identify: every React component and what it renders, every custom hook and what state or side effect it manages, every context provider and what it exposes, every page component and its routing logic, every fetch or API call made from the client side and what endpoint it hits, every form and what validation it performs, every state management pattern used whether useState or useReducer or Zustand or Redux, every use of useEffect and what dependency array it has and what cleanup it performs, every conditional render and what condition controls it, every client side navigation pattern, every loading and error state handling, and every prop drilling chain or context consumption pattern.

For backend analysis, identify: every API route and its HTTP method and what it does, every middleware and what it validates or transforms, every database query and whether it is optimized or could cause N plus 1 problems, every authentication check and whether it is correctly placed, every input validation and whether it is complete or missing fields, every error response and whether it leaks sensitive information, every environment variable usage and whether any are missing or insecure, every async operation and whether errors are properly caught, every data transformation between database and response, and every potential race condition or missing transaction.

Use this intelligence exclusively to generate the questions below. Every frontend question must reference a specific component, hook, page, or client side pattern found in the files. Every backend question must reference a specific route, middleware, query, or server side pattern found in the files.

Generate exactly 56 interview questions divided into seven sections. Return only a valid JSON object. Do not return any prose, explanation, markdown formatting, code fences, or any text outside the JSON object. The JSON object must have exactly this structure:

projectName: string — the repository name.

detectedDomains: array of one or two strings — the detected domain or domains.

projectSummary: string — a single paragraph of 3 to 4 sentences describing what this application does, what stack it uses, and what the two or three most technically interesting aspects of the codebase are. Write this as if you are briefing an interviewer who has 30 seconds to understand the project. Be specific — name actual libraries, actual file names, actual patterns found in the code. Do not write generic descriptions.

sections: array of exactly 7 objects. Each object has: sectionId (string), sectionTitle (string), sectionDescription (string, one sentence describing what this section tests), and questions (array of question objects).

Each question object must have: id (string, q1 through q56 sequentially across all sections), questionText (string, the full question), type (string, one of: mcq, open, coding, scenario), difficulty (string, one of: easy, medium, hard), fileReference (string, the exact file name or path from this repo that this question is based on — this field is mandatory, never null, never generic like "src folder", must be a specific file name found in the provided content), conceptTag (string, short concept name like "JWT refresh token" or "useEffect cleanup" or "Prisma relation query"), and correctAnswer (string, mandatory for every question, containing the proper answer an interviewer would expect for this exact repo-specific question). For type mcq only, also include options (array of 4 strings), and correctAnswer must match one of the options exactly.

Answer rules you must follow without exception: Every question must have a proper, useful correctAnswer. For open questions, correctAnswer must be a concise model answer in 3 to 6 sentences that references the specific file or implementation detail. For scenario questions, correctAnswer must explain the recommended production response, the code area to inspect or change, and the tradeoff involved. For coding questions, correctAnswer must include the completed/fixed/explained code or a precise explanation of the expected fix, grounded in the actual snippet shown in questionText. Do not use vague answers like "answers may vary" or "depends"; give the strongest expected answer based on the repository content.

Section rules you must follow without exception:

Section one: sectionId "project-overview", sectionTitle "Project Overview", exactly 6 questions of type open at difficulty easy or medium. These cover what the app does, the overall architecture, folder structure decisions, technology choices, and how data flows from the client to the database and back. Every question must reference a specific file found in the repo.

Section two: sectionId "frontend-deep-dive", sectionTitle "Frontend Deep Dive" if frontend files exist. If the repo is not frontend-heavy, replace the title with the most accurate detected domain deep dive title, such as "AI and ML Deep Dive", "Security Deep Dive", "Smart Contract Deep Dive", "Infrastructure Deep Dive", "Data Pipeline Deep Dive", or "Mobile Deep Dive". Exactly 10 questions total: 3 open medium questions, 3 coding medium or hard questions, 2 scenario medium questions, and 2 mcq medium questions. Ground every question in actual files.

Section three: sectionId "backend-deep-dive", sectionTitle "Backend Deep Dive" if backend files exist. If the repo is not backend-heavy and section two already covers the primary domain, use the best complementary implementation deep dive title that fits actual files. Exactly 10 questions total: 3 open medium or hard questions, 3 coding hard questions, 2 scenario hard questions, and 2 mcq medium questions. Ground every question in actual route, middleware, query, schema, infrastructure, or service files.

Section four: sectionId "most-probable", sectionTitle "Most Probable Interview Questions", exactly 9 questions mixing open and mcq at medium difficulty. These are the questions that statistically come up in 80 percent of interviews when an interviewer has read this specific type of project.

Section five: sectionId "scenario-based", sectionTitle "Scenario Based Questions", exactly 8 questions of type scenario at medium or hard difficulty. Each scenario must describe a realistic production situation — a bug reported by a user, a performance degradation under load, a security incident, or a failed deployment — and ground it in the specific files and implementation choices of this repo.

Section six: sectionId "technical-deep-dive", sectionTitle "Technical Deep Dive", exactly 8 questions of type open at hard difficulty. These assume the interviewer has thoroughly read the code and wants to test whether the candidate truly understands the implications of every decision made.

Section seven: sectionId "red-flags-improvements", sectionTitle "Red Flags and Improvements", exactly 5 questions of type open at hard difficulty. These are questions about real weaknesses found in this specific codebase. The model must identify actual problems — missing input validation on a specific route, an in-memory store that breaks under horizontal scaling, a component that fetches on every render, a missing database index on a frequently queried field, an auth check that can be bypassed, or another genuine issue — and ask the candidate to explain the problem and propose a fix. Every question in this section must cite the specific file and specific code pattern where the issue exists. Do not invent problems; only flag things that are genuinely present in the provided files.

Additional rules you must never violate: Do not generate any question that could appear in a generic domain interview without referencing this specific repo. Every question must be answerable by someone who has thoroughly read this codebase. The fileReference field is not optional on any question — if you cannot cite a specific file, drop the question and replace it with one you can cite. The correctAnswer field is not optional on any question — if you cannot provide a specific, repo-grounded answer, drop the question and replace it with one you can answer properly. Questions about database must reference actual schema or model files found in the content. Questions about auth must reference the actual auth implementation files found. Questions about components must reference actual component files found. If the repo has no auth layer, generate zero auth questions. If the repo has no database files, generate zero database questions. Only generate questions about what actually exists in the provided files. The coding-based questions must embed actual code from the provided files inside the questionText — do not write fictional code. If a section genuinely cannot be filled with repo-specific questions due to limited file content, reduce its count and add a warnings array at the root of the JSON listing which sections were reduced and why.`;

const GITHUB_REPO_SCAN_PROFILE_PROMPT = `REPO NAME: {repoName}

DETECTED FILES AND CONTENTS:
{fileContents}

README:
{readmeContent}

Return only a valid JSON object with:
- projectName: string
- detectedDomains: array of one or two strings chosen only from Frontend, Backend, Full Stack, AI and ML, Cybersecurity, Blockchain and Web3, DevOps and Infrastructure, Data Engineering, Mobile, or General Software
- projectSummary: one concise paragraph of 3 to 4 sentences that names concrete libraries, files, or implementation choices from this repository

Do not return markdown, prose, or text outside JSON.`;

type GithubSectionSpec = {
  sectionId: string;
  sectionTitle: string;
  sectionDescription: string;
  questionCount: number;
  instructions: string;
  sectionKind?: 'overview' | 'primary-domain' | 'secondary-domain' | 'standard';
};

const BASE_GITHUB_SECTION_SPECS: GithubSectionSpec[] = [
  {
    sectionId: 'project-overview',
    sectionTitle: 'Project Overview',
    sectionDescription: 'Repository-grounded overview questions about architecture, stack, folder structure, and data flow.',
    questionCount: 6,
    instructions: 'Create exactly 6 open questions at easy or medium difficulty.',
    sectionKind: 'overview',
  },
  {
    sectionId: 'most-probable',
    sectionTitle: 'Most Probable Interview Questions',
    sectionDescription: 'The highest-probability repository-specific questions an interviewer would ask.',
    questionCount: 9,
    instructions: 'Create exactly 9 medium-difficulty questions mixing open and mcq.',
    sectionKind: 'standard',
  },
  {
    sectionId: 'scenario-based',
    sectionTitle: 'Scenario Based Questions',
    sectionDescription: 'Production scenarios grounded in files and decisions from this repository.',
    questionCount: 8,
    instructions: 'Create exactly 8 scenario questions at medium or hard difficulty.',
    sectionKind: 'standard',
  },
  {
    sectionId: 'technical-deep-dive',
    sectionTitle: 'Technical Deep Dive',
    sectionDescription: 'Hard implementation and design questions for a code-reading interviewer.',
    questionCount: 8,
    instructions: 'Create exactly 8 open questions at hard difficulty.',
    sectionKind: 'standard',
  },
  {
    sectionId: 'red-flags-improvements',
    sectionTitle: 'Red Flags and Improvements',
    sectionDescription: 'Repo-specific weaknesses, risks, and realistic improvement opportunities.',
    questionCount: 5,
    instructions: 'Create exactly 5 open hard questions about genuine weaknesses present in the repo. Do not invent problems.',
    sectionKind: 'standard',
  },
];

type DomainDeepDiveProfile = {
  title: string;
  description: string;
};

function normalizeDetectedDomain(value: string | undefined) {
  const normalized = String(value ?? '').trim();
  return normalized || 'General Software';
}

function domainDeepDiveProfile(domain: string, layer: 'primary' | 'secondary'): DomainDeepDiveProfile {
  const normalized = normalizeDetectedDomain(domain);
  const suffix = layer === 'primary' ? 'Deep Dive' : 'Systems Deep Dive';
  const descriptions: Record<string, DomainDeepDiveProfile> = {
    Frontend: {
      title: layer === 'primary' ? 'Frontend Deep Dive' : 'Client Architecture Deep Dive',
      description: layer === 'primary'
        ? 'Repo-grounded client rendering, state, data flow, and interaction questions.'
        : 'Deeper questions about browser behavior, client orchestration, and frontend architecture choices in this repo.',
    },
    Backend: {
      title: layer === 'primary' ? 'Backend Deep Dive' : 'Service Architecture Deep Dive',
      description: layer === 'primary'
        ? 'Repo-grounded APIs, persistence, auth, and service-layer questions.'
        : 'Deeper questions about backend orchestration, reliability, and data flow across service boundaries.',
    },
    'Full Stack': {
      title: layer === 'primary' ? 'Frontend Application Deep Dive' : 'Backend Service Deep Dive',
      description: layer === 'primary'
        ? 'Repo-grounded browser, UI-state, and client-to-server interaction questions.'
        : 'Repo-grounded APIs, persistence, auth, and backend orchestration questions.',
    },
    'AI and ML': {
      title: layer === 'primary' ? 'AI and ML Deep Dive' : 'Model and Data Pipeline Deep Dive',
      description: layer === 'primary'
        ? 'Repo-grounded model, inference, feature, and ML application questions.'
        : 'Deeper questions about preprocessing, evaluation, data flow, and model-serving architecture.',
    },
    Cybersecurity: {
      title: layer === 'primary' ? 'Security Deep Dive' : 'Threat Modeling and Hardening Deep Dive',
      description: layer === 'primary'
        ? 'Repo-grounded security controls, auth boundaries, and exploit-resistance questions.'
        : 'Deeper questions about abuse paths, trust boundaries, and hardening tradeoffs in the codebase.',
    },
    'Blockchain and Web3': {
      title: layer === 'primary' ? 'Smart Contract Deep Dive' : 'Protocol and On-Chain Security Deep Dive',
      description: layer === 'primary'
        ? 'Repo-grounded contract logic, state transitions, and integration questions.'
        : 'Deeper questions about protocol safety, transaction flows, and on-chain risk handling.',
    },
    'DevOps and Infrastructure': {
      title: layer === 'primary' ? 'Infrastructure Deep Dive' : 'Deployment and Reliability Deep Dive',
      description: layer === 'primary'
        ? 'Repo-grounded build, deployment, provisioning, and runtime infrastructure questions.'
        : 'Deeper questions about rollout safety, observability, resilience, and environment management.',
    },
    'Data Engineering': {
      title: layer === 'primary' ? 'Data Pipeline Deep Dive' : 'Storage and Processing Deep Dive',
      description: layer === 'primary'
        ? 'Repo-grounded ingestion, transformation, and pipeline control-flow questions.'
        : 'Deeper questions about storage layout, scheduling, consistency, and backfill behavior.',
    },
    Mobile: {
      title: layer === 'primary' ? 'Mobile Deep Dive' : 'Device Integration and Runtime Deep Dive',
      description: layer === 'primary'
        ? 'Repo-grounded mobile state, navigation, data sync, and screen architecture questions.'
        : 'Deeper questions about device APIs, offline behavior, performance, and platform constraints.',
    },
    'General Software': {
      title: layer === 'primary' ? 'Core Implementation Deep Dive' : 'Architecture and Tradeoffs Deep Dive',
      description: layer === 'primary'
        ? 'Repo-grounded questions about the project’s primary implementation layer.'
        : 'Deeper questions about architecture, reliability, and tradeoffs visible in the codebase.',
    },
  };
  return descriptions[normalized] ?? {
    title: `${normalized} ${suffix}`,
    description: `Repo-grounded ${normalized.toLowerCase()} implementation and architecture questions.`,
  };
}

function buildStagedSectionSpecs(profile: GithubProjectProfile): GithubSectionSpec[] {
  const primaryDomain = normalizeDetectedDomain(profile.detectedDomains[0]);
  const secondaryDomain = normalizeDetectedDomain(
    profile.detectedDomains[1]
      ?? (primaryDomain === 'Full Stack' ? 'Backend' : primaryDomain),
  );
  const primary = domainDeepDiveProfile(primaryDomain, 'primary');
  const secondary = domainDeepDiveProfile(secondaryDomain, 'secondary');

  const deepDiveSpecs: GithubSectionSpec[] = [
    {
      sectionId: 'primary-domain-deep-dive',
      sectionTitle: primary.title,
      sectionDescription: primary.description,
      questionCount: 10,
      instructions: `Create exactly 10 ${primaryDomain}-specific questions total: 3 open medium, 3 coding medium or hard, 2 scenario medium, and 2 mcq medium. Focus on this repository's ${primaryDomain.toLowerCase()} implementation only.`,
      sectionKind: 'primary-domain',
    },
    {
      sectionId: 'secondary-domain-deep-dive',
      sectionTitle: secondary.title,
      sectionDescription: secondary.description,
      questionCount: 10,
      instructions: `Create exactly 10 repo-grounded ${secondaryDomain}-focused questions total: 3 open medium or hard, 3 coding hard, 2 scenario hard, and 2 mcq medium. Focus on the strongest complementary system layer present in this codebase.`,
      sectionKind: 'secondary-domain',
    },
  ];

  return [
    BASE_GITHUB_SECTION_SPECS[0],
    ...deepDiveSpecs,
    ...BASE_GITHUB_SECTION_SPECS.slice(1),
  ];
}

function extractRepoFilesFromContext(context: GithubRepoContext) {
  const matches = Array.from(context.fileContents.matchAll(/(?:^|\n)FILE:\s+([^\n]+)\n/g));
  const files = matches.map((match) => match[1].trim()).filter(Boolean);
  return files.length ? Array.from(new Set(files)) : ['README.md'];
}

function inferGithubFallbackDomains(context: GithubRepoContext) {
  const haystack = `${context.detectedStack.join(' ')}\n${context.fileContents.slice(0, 40000)}\n${context.readmeContent}`.toLowerCase();
  const domains: string[] = [];
  if (/(sklearn|tensorflow|torch|keras|pandas|numpy|model|classifier|training|inference|notebook|\.ipynb|streamlit|gradio)/i.test(haystack)) {
    domains.push('AI and ML');
  }
  if (/(react|vite|next|tsx|jsx|component|tailwind|css|frontend)/i.test(haystack)) domains.push('Frontend');
  if (/(express|fastify|django|flask|api|route|controller|server|postgres|prisma|mongoose|sql)/i.test(haystack)) domains.push('Backend');
  if (/(dockerfile|kubernetes|helm|terraform|github actions|workflow|vercel|deploy)/i.test(haystack)) domains.push('DevOps and Infrastructure');
  if (/(auth|jwt|oauth|csrf|xss|encrypt|hash|security|permission)/i.test(haystack)) domains.push('Cybersecurity');
  if (!domains.length) domains.push('General Software');
  return Array.from(new Set(domains)).slice(0, 2);
}

function fileConceptTag(filePath: string) {
  const lower = filePath.toLowerCase();
  if (/(readme|package|requirements|pyproject|vite|config|toml|yaml|yml|json)$/.test(lower)) return 'project configuration';
  if (/(model|classifier|train|predict|inference|pipeline|notebook|feature|data)/.test(lower)) return 'model pipeline';
  if (/(route|api|server|controller|handler)/.test(lower)) return 'request handling';
  if (/(auth|middleware|guard|session|token)/.test(lower)) return 'auth flow';
  if (/(schema|migration|prisma|sql|db|database)/.test(lower)) return 'data model';
  if (/(component|page|view|hook|tsx|jsx|css)/.test(lower)) return 'UI implementation';
  if (/(docker|k8s|deploy|workflow|ci|cd)/.test(lower)) return 'deployment';
  return 'implementation detail';
}

function fallbackQuestionFor(
  index: number,
  section: GithubSectionSpec,
  filePath: string,
  context: GithubRepoContext,
): GithubQuestion {
  const conceptTag = fileConceptTag(filePath);
  const ordinal = index + 1;
  const type: GithubQuestion['type'] = section.sectionKind === 'overview'
    ? 'open'
    : section.sectionId === 'scenario-based'
      ? 'scenario'
      : ordinal % 7 === 0
        ? 'mcq'
        : ordinal % 5 === 0
          ? 'coding'
          : 'open';
  const difficulty: GithubQuestion['difficulty'] = section.sectionId === 'red-flags-improvements' || section.sectionId === 'technical-deep-dive'
    ? 'hard'
    : type === 'coding' || type === 'scenario'
      ? 'medium'
      : 'easy';

  const stack = context.detectedStack.slice(0, 5).join(', ') || 'the detected project stack';
  const baseQuestion = `In ${filePath}, explain the ${conceptTag} decision this repository appears to make and how it affects ${context.repoName}'s behavior.`;
  const questionText = type === 'coding'
    ? `In ${filePath}, identify one small refactor or guard you would add around the ${conceptTag} logic. Describe the exact code area you would change and the expected safer behavior.`
    : type === 'scenario'
      ? `A production issue is traced to behavior connected to ${filePath}. How would you inspect the ${conceptTag} logic, verify the root cause, and ship a safe fix for ${context.repoName}?`
      : type === 'mcq'
        ? `Which area should an interviewer inspect first to understand the ${conceptTag} behavior in ${context.repoName}?`
        : baseQuestion;

  const options = type === 'mcq'
    ? [
        filePath,
        'A generic framework tutorial',
        'Only the deployment provider dashboard',
        'Browser cache settings without checking code',
      ]
    : undefined;

  const correctAnswer = type === 'mcq'
    ? filePath
    : type === 'coding'
      ? `Start in ${filePath} and isolate the ${conceptTag} branch into a named helper or add validation at the boundary where the file receives input. Keep the change small, preserve the existing data flow, and add a focused test or manual check for the path that currently lacks protection. The expected result is that ${context.repoName} handles this path predictably without changing unrelated behavior.`
      : type === 'scenario'
        ? `First reproduce the issue and inspect ${filePath}, because this scan found it as a relevant ${conceptTag} file. Add logging or a narrow test around the failing path, then patch the smallest boundary where invalid state or unexpected input enters. The tradeoff is speed versus certainty: ship the minimal safe fix first, then follow with broader cleanup if the same pattern appears elsewhere.`
        : `${filePath} is one of the concrete files read from the repository, and it should be used to explain the ${conceptTag} part of ${context.repoName}. A strong answer should name the code path in that file, connect it to the detected stack (${stack}), and describe how data or control flows through it. Avoid generic framework talk; the answer should stay grounded in the implementation visible in this repository.`;

  return {
    id: `q${ordinal}`,
    questionText,
    type,
    difficulty,
    fileReference: filePath,
    conceptTag,
    options,
    correctAnswer,
  };
}

function buildFallbackGithubQuestionSet(context: GithubRepoContext, cause: unknown): GithubQuestionSet {
  const detectedDomains = inferGithubFallbackDomains(context);
  const profile: GithubProjectProfile = {
    projectName: context.repoName,
    detectedDomains,
    projectSummary: `${context.repoName} was scanned successfully from GitHub, including concrete files such as ${extractRepoFilesFromContext(context).slice(0, 3).join(', ')}. The model provider did not return a usable structured response, so Repoid generated a fallback question set from the fetched repository files. The questions still cite actual file paths and focus on stack signals such as ${context.detectedStack.slice(0, 6).join(', ') || 'the repository contents'}.`,
  };
  const specs = buildStagedSectionSpecs(profile);
  const files = extractRepoFilesFromContext(context);
  let nextFile = 0;
  let nextQuestionId = 1;
  const sections = specs.map((spec) => {
    const questions = Array.from({ length: spec.questionCount }, (_, index) => {
      const question = fallbackQuestionFor(index, spec, files[nextFile++ % files.length], context);
      return { ...question, id: `q${nextQuestionId++}` };
    });
    return {
      sectionId: spec.sectionId,
      sectionTitle: spec.sectionTitle,
      sectionDescription: spec.sectionDescription,
      questions,
    };
  });
  const causeMessage = cause instanceof Error ? cause.message : String(cause ?? 'unknown');
  return {
    projectName: context.repoName,
    detectedDomains,
    projectSummary: profile.projectSummary,
    warnings: Array.from(new Set([
      'model_generation_failed_fallback_used',
      causeMessage,
      ...(context.limited ? ['limited_code_files'] : []),
    ])).slice(0, 5),
    sections,
  };
}

function ensureGithubQuestionTargetCount(result: GithubQuestionSet, context: GithubRepoContext, targetCount = 56) {
  const currentCount = result.sections.reduce((sum, section) => sum + section.questions.length, 0);
  if (currentCount >= targetCount) return result;

  const warnings = new Set(result.warnings ?? []);
  warnings.add('repo_file_top_up_questions_added');
  warnings.delete('reduced_question_count');

  const files = extractRepoFilesFromContext(context);
  const fallbackSpec: GithubSectionSpec = {
    sectionId: 'red-flags-improvements',
    sectionTitle: 'Red Flags and Improvements',
    sectionDescription: 'Repo-specific weaknesses, risks, and realistic improvement opportunities.',
    questionCount: targetCount - currentCount,
    instructions: 'Top up missing repo-grounded questions from fetched files.',
    sectionKind: 'standard',
  };
  let nextQuestionId = currentCount + 1;
  const topUps = Array.from({ length: targetCount - currentCount }, (_, index) => ({
    ...fallbackQuestionFor(index, fallbackSpec, files[index % files.length], context),
    id: `q${nextQuestionId++}`,
  }));
  const targetSection = result.sections[result.sections.length - 1];
  if (targetSection) {
    targetSection.questions.push(...topUps);
  } else {
    result.sections.push({
      sectionId: fallbackSpec.sectionId,
      sectionTitle: fallbackSpec.sectionTitle,
      sectionDescription: fallbackSpec.sectionDescription,
      questions: topUps,
    });
  }
  result.warnings = Array.from(warnings);
  return result;
}

function buildGithubQuestionUserPrompt(context: GithubRepoContext, options: { compact?: boolean } = {}) {
  const fileContents = options.compact
    ? context.fileContents.slice(0, 120000)
    : context.fileContents;
  const readmeContent = options.compact
    ? context.readmeContent.slice(0, 16000)
    : context.readmeContent;

  return GITHUB_REPO_SCAN_USER_PROMPT
    .replace('{repoName}', context.repoName)
    .replace('{fileContents}', fileContents || 'No meaningful code files found.')
    .replace('{readmeContent}', readmeContent || 'No README found.');
}

function buildGithubQuestionProfilePrompt(context: GithubRepoContext) {
  return GITHUB_REPO_SCAN_PROFILE_PROMPT
    .replace('{repoName}', context.repoName)
    .replace('{fileContents}', context.fileContents.slice(0, GITHUB_SCAN_STAGED_CONTEXT_CHAR_BUDGET) || 'No meaningful code files found.')
    .replace('{readmeContent}', context.readmeContent.slice(0, 12000) || 'No README found.');
}

function buildGithubSectionPrompt(
  context: GithubRepoContext,
  spec: GithubSectionSpec,
  options: { compact?: boolean; instructions?: string } = {},
) {
  const fileContents = context.fileContents.slice(0, options.compact ? Math.min(GITHUB_SCAN_STAGED_CONTEXT_CHAR_BUDGET, 80000) : GITHUB_SCAN_STAGED_CONTEXT_CHAR_BUDGET);
  const readmeContent = context.readmeContent.slice(0, options.compact ? 8000 : 12000);
  return `REPO NAME: ${context.repoName}

DETECTED FILES AND CONTENTS:
${fileContents || 'No meaningful code files found.'}

README:
${readmeContent || 'No README found.'}

Return only a valid JSON object with this structure:
{
  "sections": [
    {
      "sectionId": "${spec.sectionId}",
      "sectionTitle": "${spec.sectionTitle}",
      "sectionDescription": "${spec.sectionDescription}",
      "questions": []
    }
  ]
}

${options.instructions ?? spec.instructions}

Every question object must include:
- id
- questionText
- type: one of mcq, open, coding, scenario
- difficulty: one of easy, medium, hard
- fileReference: an exact file path from the provided repository context
- conceptTag
- correctAnswer
- options: required only for mcq, exactly 4 strings, with correctAnswer matching one option exactly

Rules:
- Every question must be strictly repo-grounded.
- Every answer must mention the concrete file, route, component, schema, algorithm, or code decision involved.
- If a coding question is used, embed actual code from the supplied files inside questionText.
- Do not return markdown, commentary, or text outside JSON.`;
}

type GithubProjectProfile = Pick<GithubQuestionSet, 'projectName' | 'detectedDomains' | 'projectSummary'>;

function normalizeGithubProjectProfile(payload: unknown): GithubProjectProfile {
  const source = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {};
  return {
    projectName: String(source.projectName ?? source.repoName ?? '').trim(),
    detectedDomains: toStringArray(source.detectedDomains ?? source.domains).map(normalizeGithubDetectedDomain).slice(0, 2),
    projectSummary: String(source.projectSummary ?? source.summary ?? '').trim(),
  };
}

function stagedSectionOutputBudget(spec: GithubSectionSpec) {
  if (spec.sectionKind === 'primary-domain' || spec.sectionKind === 'secondary-domain') return Math.min(GITHUB_SCAN_MAX_TOKENS, 32000);
  if (spec.sectionId === 'scenario-based' || spec.sectionId === 'technical-deep-dive') return Math.min(GITHUB_SCAN_MAX_TOKENS, 24000);
  if (spec.sectionId === 'most-probable') return Math.min(GITHUB_SCAN_MAX_TOKENS, 20000);
  return Math.min(GITHUB_SCAN_MAX_TOKENS, 16000);
}

type GithubSectionBatchSpec = {
  label: string;
  questionCount: number;
  instructions: string;
};

function stagedSectionBatches(spec: GithubSectionSpec): GithubSectionBatchSpec[] {
  if (spec.sectionKind === 'primary-domain') {
    return [
      { label: 'open-and-mcq', questionCount: 5, instructions: 'Create exactly 5 questions total: 3 open medium and 2 mcq medium.' },
      { label: 'coding', questionCount: 3, instructions: 'Create exactly 3 coding questions at medium or hard difficulty.' },
      { label: 'scenario', questionCount: 2, instructions: 'Create exactly 2 scenario questions at medium difficulty.' },
    ];
  }
  if (spec.sectionKind === 'secondary-domain') {
    return [
      { label: 'open-and-mcq', questionCount: 5, instructions: 'Create exactly 5 questions total: 3 open medium or hard and 2 mcq medium.' },
      { label: 'coding-1', questionCount: 1, instructions: 'Create exactly 1 coding question at hard difficulty.' },
      { label: 'coding-2', questionCount: 1, instructions: 'Create exactly 1 different coding question at hard difficulty.' },
      { label: 'coding-3', questionCount: 1, instructions: 'Create exactly 1 additional coding question at hard difficulty.' },
      { label: 'scenario', questionCount: 2, instructions: 'Create exactly 2 scenario questions at hard difficulty.' },
    ];
  }
  return [{ label: 'full', questionCount: spec.questionCount, instructions: spec.instructions }];
}

function assertUsableGithubQuestionSet(result: GithubQuestionSet) {
  const totalQuestions = result.sections.reduce((sum, section) => sum + section.questions.length, 0);
  const requiredSectionIds = new Set([
    'project-overview',
    'frontend-deep-dive',
    'backend-deep-dive',
    'primary-domain-deep-dive',
    'secondary-domain-deep-dive',
    'most-probable',
    'scenario-based',
    'technical-deep-dive',
    'red-flags-improvements',
  ]);
  const returnedSections = new Set(result.sections.map((section) => section.sectionId));
  const matchedRequiredSections = [...requiredSectionIds].filter((sectionId) => returnedSections.has(sectionId));
  const hasLegacyDeepDives = returnedSections.has('frontend-deep-dive') || returnedSections.has('backend-deep-dive');
  const hasDomainDeepDives = returnedSections.has('primary-domain-deep-dive') && returnedSections.has('secondary-domain-deep-dive');
  if (!result.projectName || !result.projectSummary || result.sections.length < 4 || (!hasLegacyDeepDives && !hasDomainDeepDives) || totalQuestions < 24) {
    throw new Error('model_invalid_repo_question_json');
  }
  const hasMissingReferences = result.sections.some((section) => (
    section.questions.some((question) => !question.fileReference || !question.questionText || !question.correctAnswer)
  ));
  if (hasMissingReferences) {
    throw new Error('model_missing_repo_references');
  }

  const warnings = new Set(result.warnings ?? []);
  if (matchedRequiredSections.length < 5) warnings.add('partial_section_coverage');
  if (result.sections.length < 7) warnings.add('reduced_section_count');
  if (totalQuestions < 56) warnings.add('reduced_question_count');
  result.warnings = Array.from(warnings);
}

export async function generateGithubQuestionSet(context: GithubRepoContext, jobId: string, userId?: string): Promise<GithubQuestionSet> {
  let lastError: unknown = null;
  const stagedFullOnly = process.env.GITHUB_SCAN_STAGED_FULL === 'true' || GITHUB_SCAN_MODEL === 'deepseek/deepseek-v4-pro';
  if (stagedFullOnly) {
    lastError = new Error('model_empty_response');
  } else {
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        const compactRetry = attempt > 1;
        if (userId) await assertGithubScanJobActive(jobId, userId);
        const analysis = await callGithubStructuredModel<GithubQuestionSet>(
          GITHUB_REPO_SCAN_SYSTEM_PROMPT,
          buildGithubQuestionUserPrompt(context, { compact: compactRetry }),
          normalizeGithubQuestionSet,
          {
            maxTokens: GITHUB_SCAN_MAX_TOKENS,
            timeoutMs: GITHUB_SCAN_TIMEOUT_MS,
            temperature: GITHUB_SCAN_TEMPERATURE,
            topP: GITHUB_SCAN_TOP_P,
            jobId,
            repoName: context.repoName,
            stage: compactRetry ? 'full-compact' : 'full',
          },
        );
        const result = analysis.result;
        if (context.limited) {
          result.warnings = Array.from(new Set([...(result.warnings ?? []), 'limited_code_files']));
        }
        ensureGithubQuestionTargetCount(result, context);
        assertUsableGithubQuestionSet(result);
        return result;
      } catch (error) {
        lastError = error;
        if (attempt === 1) {
          console.error('GitHub repo scan generation attempt failed; retrying with compact context', {
            jobId,
            repoName: context.repoName,
            error: error instanceof Error ? error.message : error,
          });
          await db.prepare('UPDATE repo_scan_jobs SET retry_count = retry_count + 1 WHERE id = ?').run(jobId);
          await wait(3000);
        }
      }
    }
  }

  const lastMessage = lastError instanceof Error ? lastError.message : '';
  if (['model_json_parse_failed', 'model_empty_response', 'model_invalid_repo_question_json', 'model_missing_repo_references', 'analysis_timeout'].includes(lastMessage)) {
    console.warn('GitHub repo scan switching to staged full question-set generation', {
      jobId,
      repoName: context.repoName,
      previousError: lastMessage,
    });
    if (userId) await assertGithubScanJobActive(jobId, userId);
    const profileAnalysis = await callGithubStructuredModel<GithubProjectProfile>(
      GITHUB_REPO_SCAN_SYSTEM_PROMPT,
      buildGithubQuestionProfilePrompt(context),
      normalizeGithubProjectProfile,
      {
        maxTokens: Math.min(GITHUB_SCAN_MAX_TOKENS, 6000),
        timeoutMs: GITHUB_SCAN_TIMEOUT_MS,
        temperature: GITHUB_SCAN_TEMPERATURE,
        topP: GITHUB_SCAN_TOP_P,
        jobId,
        repoName: context.repoName,
        stage: 'profile',
      },
    );
    const stagedSectionSpecs = buildStagedSectionSpecs(profileAnalysis.result);
    const stagedSections: GithubQuestionSection[] = [];
    for (const spec of stagedSectionSpecs) {
      console.info('GitHub repo scan staged section started', {
        jobId,
        repoName: context.repoName,
        sectionId: spec.sectionId,
      });
      const batchQuestions: GithubQuestion[] = [];
      let sectionDescription = spec.sectionDescription;
      for (const batch of stagedSectionBatches(spec)) {
        if (userId) await assertGithubScanJobActive(jobId, userId);
        console.info('GitHub repo scan staged section batch started', {
          jobId,
          repoName: context.repoName,
          sectionId: spec.sectionId,
          batch: batch.label,
        });
        let sectionAnalysis: { result: GithubQuestionSet } | null = null;
        let sectionError: unknown = null;
        for (let attempt = 1; attempt <= 2; attempt += 1) {
          try {
            sectionAnalysis = await callGithubStructuredModel<GithubQuestionSet>(
              GITHUB_REPO_SCAN_SYSTEM_PROMPT,
              buildGithubSectionPrompt(context, spec, { compact: attempt > 1, instructions: batch.instructions }),
              normalizeGithubQuestionSet,
              {
                maxTokens: stagedSectionOutputBudget(spec),
                timeoutMs: GITHUB_SCAN_TIMEOUT_MS,
                temperature: GITHUB_SCAN_TEMPERATURE,
                topP: GITHUB_SCAN_TOP_P,
                jobId,
                repoName: context.repoName,
                stage: `${spec.sectionId}:${batch.label}${attempt > 1 ? ':compact' : ''}`,
              },
            );
            break;
          } catch (error) {
            sectionError = error;
            const errorMessage = error instanceof Error ? error.message : '';
            if (attempt === 1 && ['model_json_parse_failed', 'model_empty_response', 'analysis_timeout'].includes(errorMessage)) {
              console.warn('GitHub repo scan staged section batch retrying with compact context', {
                jobId,
                repoName: context.repoName,
                sectionId: spec.sectionId,
                batch: batch.label,
                error: errorMessage,
              });
              continue;
            }
            throw error;
          }
        }
        if (!sectionAnalysis) {
          throw sectionError instanceof Error ? sectionError : new Error('model_generation_failed');
        }
        const section = sectionAnalysis.result.sections.find((item) => item.sectionId === spec.sectionId)
          ?? sectionAnalysis.result.sections[0];
        if (!section || section.questions.length !== batch.questionCount) {
          throw new Error('model_invalid_repo_question_json');
        }
        sectionDescription = section.sectionDescription || sectionDescription;
        batchQuestions.push(...section.questions);
        console.info('GitHub repo scan staged section batch complete', {
          jobId,
          repoName: context.repoName,
          sectionId: spec.sectionId,
          batch: batch.label,
          questionCount: section.questions.length,
        });
      }
      if (batchQuestions.length !== spec.questionCount) {
        throw new Error('model_invalid_repo_question_json');
      }
      stagedSections.push({
        sectionId: spec.sectionId,
        sectionTitle: spec.sectionTitle,
        sectionDescription,
        questions: batchQuestions,
      });
      console.info('GitHub repo scan staged section complete', {
        jobId,
        repoName: context.repoName,
        sectionId: spec.sectionId,
        questionCount: batchQuestions.length,
      });
    }
    let nextStagedQuestionId = 1;
    const normalizedStagedSections = stagedSections.map((section) => ({
      ...section,
      questions: section.questions.map((question) => ({
        ...question,
        id: `q${nextStagedQuestionId++}`,
      })),
    }));
    const stagedResult: GithubQuestionSet = {
      projectName: profileAnalysis.result.projectName || context.repoName,
      detectedDomains: profileAnalysis.result.detectedDomains,
      projectSummary: profileAnalysis.result.projectSummary,
      warnings: Array.from(new Set([
        'staged_full_generation',
        ...(context.limited ? ['limited_code_files'] : []),
      ])),
      sections: normalizedStagedSections,
    };
    ensureGithubQuestionTargetCount(stagedResult, context);
    const stagedQuestionCount = stagedResult.sections.reduce((sum, section) => sum + section.questions.length, 0);
    if (!stagedResult.projectSummary || stagedResult.sections.length !== stagedSectionSpecs.length || stagedQuestionCount !== 56) {
      throw new Error('model_invalid_repo_question_json');
    }
    assertUsableGithubQuestionSet(stagedResult);
    return stagedResult;
  }

  throw lastError instanceof Error ? lastError : new Error('model_generation_failed');
}

function githubScanErrorDetails(error: unknown, userId: string, repoUrl: string) {
  const message = error instanceof Error ? error.message : 'scan_failed';
  const rawResponse = error && typeof error === 'object' && 'rawResponse' in error
    ? String((error as { rawResponse?: unknown }).rawResponse ?? '')
    : '';

  if (message === 'private_repo') {
    return {
      status: 'private',
      jobStatus: 'failed',
      httpStatus: 403,
      message: 'This repository is private. Please make it public or connect your GitHub account.',
    };
  }

  if (message === 'rate_limited') {
    console.error('GitHub rate limit reached while scanning repo', { userId, repoUrl, timestamp: new Date().toISOString() });
    return {
      status: 'rate_limited',
      jobStatus: 'failed',
      httpStatus: 429,
      message: 'GitHub rate limit reached. Please try again in a few minutes.',
    };
  }

  if (message === 'model_json_parse_failed' || message === 'model_empty_response') {
    console.error('GitHub repo scan returned invalid JSON after retry', { userId, repoUrl, rawResponse });
    return {
      status: 'failed',
      jobStatus: 'failed',
      httpStatus: 502,
      message: 'The AI provider returned an unreadable repository analysis. Please retry the scan.',
    };
  }

  if (message === 'model_invalid_repo_question_json' || message === 'model_missing_repo_references') {
    return {
      status: 'failed',
      jobStatus: 'failed',
      httpStatus: 502,
      message: 'The AI provider returned an incomplete repository analysis without enough repo-grounded questions. Please retry the scan.',
    };
  }

  if (/model_http_402|budget exceeded|payment required/i.test(message)) {
    return {
      status: 'failed',
      jobStatus: 'failed',
      httpStatus: 402,
      message: 'The AI provider rejected this DeepSeek request because the API key budget is unavailable. Please check the key and try again.',
    };
  }

  if (/model_http_4\d\d|model_http_5\d\d/i.test(message)) {
    console.error('GitHub repo scan provider request failed', {
      userId,
      repoUrl,
      providerError: message,
    });
    return {
      status: 'failed',
      jobStatus: 'failed',
      httpStatus: 502,
      message: 'We had trouble analyzing this repository. Please try again.',
    };
  }

  if (message === 'scan_job_replaced') {
    return {
      status: 'failed',
      jobStatus: 'failed',
      httpStatus: 409,
      message: 'This scan was replaced by a newer re-scan.',
    };
  }

  return {
    status: 'failed',
    jobStatus: 'failed',
    httpStatus: 502,
    message: 'Unable to analyze this repository right now.',
  };
}

const GITHUB_SCAN_STALE_AFTER_MINUTES = Math.max(5, Number(process.env.GITHUB_SCAN_STALE_AFTER_MINUTES ?? 15));

async function expireStaleGithubScanJobs(userId?: string) {
  const params: unknown[] = [
    'failed',
    'Repository scan timed out before completion. Please start a fresh scan.',
    GITHUB_SCAN_STALE_AFTER_MINUTES,
  ];
  const userClause = userId ? ' AND user_id = ?' : '';
  if (userId) params.push(userId);

  await db.prepare(`
    UPDATE repo_scan_jobs
       SET status = ?,
           completed_at = NOW(),
           error_message = ?
     WHERE status = 'pending'
       AND created_at < NOW() - (?::text || ' minutes')::interval
       ${userClause}
  `).run(...params);
}

async function assertGithubScanJobActive(jobId: string, userId: string) {
  const activeJob = await db.prepare('SELECT status FROM repo_scan_jobs WHERE id = ? AND user_id = ?')
    .get<{ status: string }>(jobId, userId);
  if (activeJob?.status !== 'pending') {
    throw new Error('scan_job_replaced');
  }
}

export async function completeGithubScanJob(params: {
  jobId: string;
  userId: string;
  repoUrl: string;
  existingRepoId?: string;
  accessToken?: string | null;
}) {
  try {
    console.info('GitHub repo scan stage started', {
      jobId: params.jobId,
      repoUrl: params.repoUrl,
      stage: 'fetch-context',
    });
    const context = await fetchGithubRepoForQuestionSet(params.repoUrl, params.accessToken);
    console.info('GitHub repo scan stage complete', {
      jobId: params.jobId,
      repoUrl: params.repoUrl,
      stage: 'fetch-context',
      detectedStackCount: context.detectedStack.length,
      fileContextCharacters: context.fileContents.length,
      readmeCharacters: context.readmeContent.length,
      limited: context.limited,
    });
    await assertGithubScanJobActive(params.jobId, params.userId);
    const repoId = params.existingRepoId ?? crypto.randomUUID();
    console.info('GitHub repo scan stage started', {
      jobId: params.jobId,
      repoUrl: params.repoUrl,
      stage: 'generate-question-set',
    });
    let result: GithubQuestionSet;
    try {
      result = await generateGithubQuestionSet(context, params.jobId, params.userId);
    } catch (generationError) {
      if (generationError instanceof Error && generationError.message === 'scan_job_replaced') {
        throw generationError;
      }
      console.warn('GitHub repo scan model generation failed; using repo-grounded fallback question set', {
        jobId: params.jobId,
        repoUrl: params.repoUrl,
        error: generationError instanceof Error ? generationError.message : generationError,
      });
      result = buildFallbackGithubQuestionSet(context, generationError);
    }
    console.info('GitHub repo scan stage complete', {
      jobId: params.jobId,
      repoUrl: params.repoUrl,
      stage: 'generate-question-set',
      sectionCount: result.sections.length,
      questionCount: result.sections.reduce((sum, section) => sum + section.questions.length, 0),
      warnings: result.warnings ?? [],
    });
    await assertGithubScanJobActive(params.jobId, params.userId);
    const totalQuestions = result.sections.reduce((sum, section) => sum + section.questions.length, 0);

    if (params.existingRepoId) {
      await db.prepare('UPDATE github_repos SET repo_name = ?, detected_stack = ?::jsonb, scanned_at = NOW(), status = ?, raw_analysis_json = ?::jsonb, updated_at = NOW() WHERE id = ?')
        .run(result.projectName || context.repoName, JSON.stringify(context.detectedStack), 'complete', JSON.stringify(result), repoId);
    } else {
      await db.prepare('INSERT INTO github_repos (id, user_id, repo_url, repo_name, detected_stack, scanned_at, status, raw_analysis_json, created_at, updated_at) VALUES (?, ?, ?, ?, ?::jsonb, NOW(), ?, ?::jsonb, NOW(), NOW())')
        .run(repoId, params.userId, context.repoUrl, result.projectName || context.repoName, JSON.stringify(context.detectedStack), 'complete', JSON.stringify(result));
    }

    await db.prepare('DELETE FROM repo_question_sets WHERE repo_id = ?').run(repoId);
    await db.prepare('INSERT INTO repo_question_sets (id, repo_id, generated_at, project_summary, total_questions, sections_json) VALUES (?, ?, NOW(), ?, ?, ?::jsonb)')
      .run(crypto.randomUUID(), repoId, result.projectSummary, totalQuestions, JSON.stringify(result.sections));
    await db.prepare('UPDATE repo_scan_jobs SET status = ?, completed_at = NOW(), error_message = NULL WHERE id = ?').run('complete', params.jobId);
    console.info('GitHub repo scan stage complete', {
      jobId: params.jobId,
      repoUrl: params.repoUrl,
      stage: 'persist-question-set',
      repoId,
      totalQuestions,
    });
    return { repoId };
  } catch (error) {
    const details = githubScanErrorDetails(error, params.userId, params.repoUrl);
    try {
      await db.prepare('UPDATE repo_scan_jobs SET status = ?, completed_at = NOW(), error_message = ? WHERE id = ?')
        .run(details.jobStatus, details.message, params.jobId);
    } catch (failurePersistenceError) {
      console.error('Unable to persist GitHub repo scan failure status', {
        userId: params.userId,
        repoUrl: params.repoUrl,
        jobId: params.jobId,
        scanError: error instanceof Error ? error.message : error,
        persistenceError: failurePersistenceError instanceof Error ? failurePersistenceError.message : failurePersistenceError,
      });
    }
    const scanError = new Error(details.message) as Error & { status?: string; httpStatus?: number };
    scanError.status = details.status;
    scanError.httpStatus = details.httpStatus;
    throw scanError;
  }
}

function parseCookies(cookieHeader?: string): Record<string, string> {
  return String(cookieHeader ?? '')
    .split(';')
    .map((segment) => segment.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((accumulator, segment) => {
      const separatorIndex = segment.indexOf('=');
      if (separatorIndex === -1) return accumulator;
      const key = segment.slice(0, separatorIndex).trim();
      const value = segment.slice(separatorIndex + 1).trim();
      accumulator[key] = decodeURIComponent(value);
      return accumulator;
    }, {});
}

function getClientKey(request: express.Request): string {
  const forwardedFor = request.headers['x-forwarded-for'];
  const forwardedValue = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor;
  return String(forwardedValue ?? request.ip ?? 'local').split(',')[0].trim() || 'local';
}

function applyAuthRateLimit(request: express.Request, response: express.Response, next: express.NextFunction) {
  const key = getClientKey(request);
  const now = Date.now();
  const bucket = authBuckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    authBuckets.set(key, { count: 1, resetAt: now + AUTH_WINDOW_MS });
    next();
    return;
  }

  if (bucket.count >= AUTH_MAX_REQUESTS) {
    response.status(429).json({ error: 'Too many authentication requests. Please retry shortly.' });
    return;
  }

  bucket.count += 1;
  next();
}

function normalizeEmail(value: unknown): string {
  return String(value ?? '').trim().toLowerCase();
}

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${derivedKey}`;
}

function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, expectedHash] = String(storedHash ?? '').split(':');
  if (!salt || !expectedHash) return false;
  const actualHash = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(actualHash, 'hex'), Buffer.from(expectedHash, 'hex'));
}

function otpKey(email: string, purpose: EmailOtpPurpose) {
  return `${purpose}:${email}`;
}

function createEmailOtp(email: string, purpose: EmailOtpPurpose) {
  const code = String(crypto.randomInt(100000, 1000000));
  emailOtpCodes.set(otpKey(email, purpose), {
    codeHash: hashPassword(code),
    expiresAt: Date.now() + 10 * 60_000,
    purpose,
  });
  console.info(`Email OTP for ${purpose} ${email}: ${code}`);
  return code;
}

async function sendEmailOtp(email: string, purpose: EmailOtpPurpose, code: string) {
  const smtpUser = process.env.SMTP_USER?.trim() || process.env.GMAIL_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim() || process.env.GMAIL_APP_PASSWORD?.trim();
  const smtpFrom = process.env.SMTP_FROM?.trim() || process.env.EMAIL_FROM?.trim() || (smtpUser ? `Repoid <${smtpUser}>` : '');
  const subject = 'Verify your new Repoid email';
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#050505;color:#f4f4f4;padding:28px">
      <div style="max-width:520px;margin:0 auto;border:1px solid #2f2f2f;border-radius:16px;padding:24px;background:#101010">
        <p style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#b8b8b8;margin:0 0 12px">Repoid verification</p>
        <h1 style="font-size:28px;line-height:1.2;margin:0 0 16px">Your OTP is ${code}</h1>
        <p style="color:#cfcfcf;line-height:1.6;margin:0">Use this code within 10 minutes to change your email address.</p>
      </div>
    </div>
  `;

  if (!smtpUser || !smtpPass) {
    return { sent: false, reason: 'Email delivery is not configured. Add SMTP_USER and SMTP_PASS with a Gmail App Password.' };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: email,
      subject,
      html,
      text: `Your Repoid OTP is ${code}. It expires in 10 minutes.`,
    });
  } catch (error) {
    throw new Error(error instanceof Error ? `Gmail SMTP error: ${error.message}` : 'Gmail SMTP error.');
  }

  return { sent: true };
}

function consumeEmailOtp(email: string, purpose: EmailOtpPurpose, code: unknown) {
  const key = otpKey(email, purpose);
  const entry = emailOtpCodes.get(key);
  if (!entry || entry.purpose !== purpose || Date.now() > entry.expiresAt) {
    emailOtpCodes.delete(key);
    return false;
  }

  const valid = verifyPassword(String(code ?? '').trim(), entry.codeHash);
  if (valid) emailOtpCodes.delete(key);
  return valid;
}

function setSessionCookie(response: express.Response, userId: string) {
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  response.setHeader(
    'Set-Cookie',
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(userId)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}${secureFlag}`,
  );
}

function clearSessionCookie(response: express.Response) {
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  response.setHeader('Set-Cookie', `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secureFlag}`);
}

function getPublicBaseUrl(request: express.Request) {
  const configured = process.env.FRONTEND_URL?.trim();
  if (configured) return configured.replace(/\/$/, '');
  const host = request.headers.host ?? `localhost:${process.env.PORT ?? 3000}`;
  const protocol = request.headers['x-forwarded-proto'] ?? 'http';
  return `${protocol}://${host}`;
}

async function findOrCreateOAuthUser(provider: 'google' | 'github', providerAccountId: string, email: string, name: string) {
  const normalizedEmail = normalizeEmail(email);
  const linkedAccount = await db.queryOne<{ id: string; user_id: string }>(
    `SELECT id, user_id
       FROM oauth_accounts
      WHERE provider = $1 AND provider_account_id = $2`,
    [provider, providerAccountId],
  );

  let user = linkedAccount ? await db.queryOne<DbUserRow>(
    `SELECT u.id, u.email, u.name, u.password_hash, u.auth_provider, u.email_verified, u.created_at, u.updated_at
       FROM users u
      WHERE u.id = $1`,
    [linkedAccount.user_id],
  ) : null;
  if (!user) {
    user = await db.prepare('SELECT id, email, name, password_hash, auth_provider, email_verified, created_at, updated_at FROM users WHERE email = ?')
      .get<DbUserRow>(normalizedEmail);
  }

  if (user) {
    if (!linkedAccount) {
      await db.prepare('INSERT INTO oauth_accounts (id, user_id, provider, provider_account_id, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())')
        .run(crypto.randomUUID(), user.id, provider, providerAccountId, normalizedEmail);
      await db.prepare('UPDATE users SET auth_provider = ?, email_verified = ?, updated_at = NOW() WHERE id = ?')
        .run(provider, 1, user.id);
      user = await db.prepare('SELECT id, email, name, password_hash, auth_provider, email_verified, created_at, updated_at FROM users WHERE id = ?')
        .get<DbUserRow>(user.id);
    }
    if (!user) throw new Error('Unable to load OAuth user after linking.');
    return user;
  }

  const userId = crypto.randomUUID();
  await db.prepare('INSERT INTO users (id, email, name, password_hash, auth_provider, email_verified, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())')
    .run(userId, normalizedEmail, name || normalizedEmail.split('@')[0], hashPassword(crypto.randomUUID()), provider, 1);
    await db.prepare('INSERT INTO user_preferences (id, user_id, sidebar_open, theme, domain, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())')
      .run(crypto.randomUUID(), userId, 0, 'light', 'frontend');
  await db.prepare('INSERT INTO oauth_accounts (id, user_id, provider, provider_account_id, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())')
    .run(crypto.randomUUID(), userId, provider, providerAccountId, normalizedEmail);
  user = await db.prepare('SELECT id, email, name, password_hash, auth_provider, email_verified, created_at, updated_at FROM users WHERE id = ?')
    .get<DbUserRow>(userId);
  if (!user) throw new Error('Unable to create OAuth user.');
  return user;
}

async function saveGithubAccessToken(userId: string, accessToken: string) {
  await db.prepare('UPDATE oauth_accounts SET access_token = ?, updated_at = NOW() WHERE user_id = ? AND provider = ?')
    .run(accessToken, userId, 'github');
}

async function getGithubAccessToken(userId: string) {
  const row = await db.prepare('SELECT access_token FROM oauth_accounts WHERE user_id = ? AND provider = ? ORDER BY updated_at DESC LIMIT 1')
    .get<{ access_token: string | null }>(userId, 'github');
  return row?.access_token ?? null;
}

function consumeOAuthState(provider: 'google' | 'github', state: unknown) {
  const stateValue = String(state ?? '');
  const stored = oauthStates.get(stateValue);
  oauthStates.delete(stateValue);
  if (!stored || stored.provider !== provider || Date.now() - stored.createdAt >= 10 * 60_000) return null;
  return stored;
}

function safeOAuthNextPath(value: unknown) {
  const nextPath = String(value ?? '').trim();
  if (!nextPath || !nextPath.startsWith('/') || nextPath.startsWith('//') || nextPath.includes('\\')) return '';
  return nextPath;
}

function toSessionUser(user: DbUserRow) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    authProvider: user.auth_provider ?? 'local',
    emailVerified: Boolean(user.email_verified),
    joinedAt: user.created_at,
    loggedIn: true,
  };
}

async function getUserFromRequest(request: express.Request): Promise<DbUserRow | null> {
  const cookies = parseCookies(request.headers.cookie);
  const sessionId = String(cookies[SESSION_COOKIE_NAME] ?? '').trim();
  if (!sessionId) return null;

  const user = await db.prepare('SELECT id, email, name, password_hash, auth_provider, email_verified, created_at, updated_at FROM users WHERE id = ?')
    .get<DbUserRow>(sessionId);

  return user ?? null;
}

async function requireUser(request: AuthedRequest, response: express.Response, next: express.NextFunction) {
  const user = await getUserFromRequest(request);
  if (!user) {
    response.status(401).json({ error: 'Authentication required.' });
    return;
  }

  request.user = user;
  next();
}

async function getUserSelectedDomain(userId: string) {
  const row = await db.prepare('SELECT domain FROM user_preferences WHERE user_id = ?').get<{ domain: string | null }>(userId);
  return normalizeDomain(row?.domain);
}

export async function createApp(options: { listen?: boolean } = {}) {
  const listen = options.listen ?? true;
  const app = express();
  app.disable('x-powered-by');
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());

  if (process.env.NODE_ENV !== 'production' || process.env.SEED_QUESTIONS_ON_START === 'true') {
    await ensureQuestionBankSeeded();
  }

  app.get('/api/health', async (_request, response) => {
    await db.query('SELECT 1');
    response.json({
      status: 'ok',
      githubScanner: {
        version: GITHUB_SCAN_ENGINE_VERSION,
        model: GITHUB_SCAN_MODEL,
        fallbackModels: GITHUB_SCAN_FALLBACK_MODELS,
        stagedFull: process.env.GITHUB_SCAN_STAGED_FULL === 'true' || GITHUB_SCAN_MODEL === 'deepseek/deepseek-v4-pro',
        contextCharBudget: GITHUB_SCAN_STAGED_CONTEXT_CHAR_BUDGET,
      },
    });
  });

  app.get('/api/questions/stats', requireUser, async (_request, response) => {
    try {
      const stats = await listQuestionStats();
      response.json({ stats });
    } catch (error) {
      response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to load question stats.' });
    }
  });

  app.get('/api/questions', requireUser, async (request, response) => {
    try {
      const user = (request as AuthedRequest).user!;
      const requestedDomain = String(request.query.domain ?? '');
      const domain = !requestedDomain || requestedDomain === 'all' ? await getUserSelectedDomain(user.id) : normalizeDomain(requestedDomain);
      const types = parseQuestionTypes(request.query.types);
      const type = normalizeQuestionType(request.query.type) ?? 'all';
      const search = String(request.query.search ?? '');
      const topics = toStringArray(request.query.topics);
      const roundTags = toStringArray(request.query.roundTags);
      const pageSize = Math.min(60, Math.max(1, Number(request.query.pageSize ?? request.query.limit ?? 12)));
      const page = Math.max(1, Number(request.query.page ?? 1));
      const faangOnly = String(request.query.faangOnly ?? 'false') === 'true';
      const result = await listQuestions({
        domain,
        types: types.length ? types : undefined,
        type: types.length ? undefined : type,
        search,
        faangOnly,
        topics,
        roundTags,
        limit: pageSize,
        offset: (page - 1) * pageSize,
      });
      response.json({ ...result, totalReturned: result.questions.length });
    } catch (error) {
      response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to load questions.' });
    }
  });

  app.post('/api/round-attempts/start', requireUser, async (request, response) => {
    const user = (request as AuthedRequest).user!;
    const roundType = String(request.body?.roundType ?? '').trim();
    const questionType = String(request.body?.questionType ?? '').trim() as 'scenario' | 'coding' | 'mcq' | 'fill_blank' | 'system_design' | 'mock';
    const selectedDomain = await getUserSelectedDomain(user.id);
    const domain = normalizeDomain(request.body?.domain, selectedDomain);
    const limit = Math.min(10, Math.max(1, Number(request.body?.limit ?? 1)));
    const durationMinutes = Math.min(90, Math.max(5, Number(request.body?.durationMinutes ?? 15)));

    if (!roundType || !questionType || !domain) {
      response.status(400).json({ error: 'roundType, questionType, and domain are required.' });
      return;
    }
    if (domain !== selectedDomain) {
      response.status(400).json({ error: 'This round must use your selected domain. Change it in Settings first.' });
      return;
    }

    try {
      const attempt = await createRoundAttempt({
        userId: user.id,
        roundType,
        questionType,
        domain,
        limit,
        durationMinutes,
      });
      response.status(201).json({ attempt });
    } catch (error) {
      response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to start the round attempt.' });
    }
  });

  app.post('/api/round-attempts/:attemptId/submit', requireUser, async (request, response) => {
    const user = (request as AuthedRequest).user!;
    const attemptId = String(request.params.attemptId ?? '').trim();
    const answers = Array.isArray(request.body?.answers) ? request.body.answers : [];
    const timeSpentSeconds = Number.isFinite(Number(request.body?.timeSpentSeconds)) ? Number(request.body.timeSpentSeconds) : undefined;
    const autoSubmitted = Boolean(request.body?.autoSubmitted);

    if (!attemptId) {
      response.status(400).json({ error: 'attemptId is required.' });
      return;
    }

    try {
      const attempt = await submitRoundAttempt({ userId: user.id, attemptId, answers, timeSpentSeconds, autoSubmitted });
      response.json({ attempt });
    } catch (error) {
      response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to submit the round attempt.' });
    }
  });

  app.get('/api/round-attempts/latest/:roundType', requireUser, async (request, response) => {
    try {
      const user = (request as AuthedRequest).user!;
      const roundType = String(request.params.roundType ?? '').trim();
      if (!roundType) {
        response.status(400).json({ error: 'roundType is required.' });
        return;
      }

      const domain = request.query.domain ? normalizeDomain(request.query.domain) : undefined;
      const attempt = await getLatestRoundAttempt(user.id, roundType, domain);
      if (!attempt) {
        response.status(404).json({ error: 'No round attempt found for this round type yet.' });
        return;
      }
      response.json({ attempt });
    } catch (error) {
      response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to load the latest round attempt.' });
    }
  });

  app.get('/api/round-attempts/latest-summary', requireUser, async (request, response) => {
    try {
      const user = (request as AuthedRequest).user!;
      const domain = request.query.domain ? normalizeDomain(request.query.domain) : undefined;
      const roundTypes = ['coding-round', 'scenario-round', 'mock-interview'];
      const attempts = await Promise.all(roundTypes.map((roundType) => getLatestRoundAttempt(user.id, roundType, domain)));
      response.json({ attempts: attempts.filter(Boolean) });
    } catch (error) {
      response.status(500).json({ error: error instanceof Error ? error.message : 'Unable to load round attempt summary.' });
    }
  });

  app.post('/api/auth/request-email-otp', applyAuthRateLimit, requireUser, async (request, response) => {
    const email = normalizeEmail(request.body?.email);
    const purpose = String(request.body?.purpose ?? '');

    if (!email || !email.includes('@')) {
      response.status(400).json({ error: 'A valid email address is required.' });
      return;
    }
    if (purpose !== 'email_change') {
      response.status(400).json({ error: 'OTP verification is only required for changing account email.' });
      return;
    }

    const existingUser = await db.prepare('SELECT id, email_verified FROM users WHERE email = ?').get<{ id: string; email_verified: boolean | null }>(email);
    if (existingUser) {
      response.status(409).json({ error: 'An account with this email already exists.' });
      return;
    }

    const code = createEmailOtp(email, purpose);
    let delivery: { sent: boolean; reason?: string };
    try {
      delivery = await sendEmailOtp(email, purpose, code);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to send OTP email.';
      if (process.env.NODE_ENV === 'production' && process.env.EMAIL_DEBUG_OTP !== 'true') {
        response.status(502).json({ error: message });
        return;
      }
      delivery = {
        sent: false,
        reason: `Email delivery failed, so local OTP fallback is enabled for development. ${message}`,
      };
    }

    const includeDebugCode = process.env.NODE_ENV !== 'production' || process.env.EMAIL_DEBUG_OTP === 'true' || !delivery.sent;
    response.json({
      success: true,
      message: delivery.sent ? 'OTP sent. Check your email and enter the code to continue.' : delivery.reason,
      emailSent: delivery.sent,
      ...(includeDebugCode ? { debugOtp: code } : {}),
    });
  });

  app.post('/api/auth/signup', applyAuthRateLimit, async (request, response) => {
    const email = normalizeEmail(request.body?.email);
    const name = String(request.body?.name ?? '').trim();
    const password = String(request.body?.password ?? '');
    const domain = normalizeDomain(request.body?.domain);

    if (!email || !email.includes('@')) {
      response.status(400).json({ error: 'A valid email address is required.' });
      return;
    }
    if (name.length < 2) {
      response.status(400).json({ error: 'Name must be at least 2 characters.' });
      return;
    }
    if (password.length < 8) {
      response.status(400).json({ error: 'Password must be at least 8 characters.' });
      return;
    }
    const existingUser = await db.prepare('SELECT id FROM users WHERE email = ?').get<{ id: string }>(email);
    if (existingUser) {
      response.status(409).json({ error: 'An account with this email already exists.' });
      return;
    }

    const userId = crypto.randomUUID();
    const passwordHash = hashPassword(password);

    await db.prepare('INSERT INTO users (id, email, name, password_hash, email_verified, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())')
      .run(userId, email, name, passwordHash, 1);
    await db.prepare('INSERT INTO user_preferences (id, user_id, sidebar_open, theme, domain, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())')
      .run(crypto.randomUUID(), userId, 0, 'light', domain);

    const createdUser = await db.prepare('SELECT id, email, name, password_hash, auth_provider, email_verified, created_at, updated_at FROM users WHERE id = ?')
      .get<DbUserRow>(userId);

    if (!createdUser) {
      response.status(500).json({ error: 'Unable to create the account.' });
      return;
    }

    setSessionCookie(response, createdUser.id);
    response.status(201).json({ user: toSessionUser(createdUser) });
  });

  app.post('/api/auth/signin', applyAuthRateLimit, async (request, response) => {
    const email = normalizeEmail(request.body?.email);
    const password = String(request.body?.password ?? '');
    if (!email || !password) {
      response.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const user = await db.prepare('SELECT id, email, name, password_hash, auth_provider, email_verified, created_at, updated_at FROM users WHERE email = ?')
      .get<DbUserRow>(email);
    if (!user || !verifyPassword(password, user.password_hash)) {
      response.status(401).json({ error: 'Invalid credentials.' });
      return;
    }
    setSessionCookie(response, user.id);
    response.json({ user: toSessionUser(user) });
  });

  app.get('/api/auth/oauth/google', (request, response) => {
    const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
    const redirectUri = process.env.GOOGLE_REDIRECT_URI?.trim() || `${getPublicBaseUrl(request)}/api/auth/oauth/google/callback`;
    if (!clientId) {
      response.redirect('/signin?error=oauth_google_not_configured');
      return;
    }
    const state = crypto.randomUUID();
    oauthStates.set(state, { provider: 'google', createdAt: Date.now() });
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      state,
      prompt: 'select_account',
    });
    response.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
  });

  async function handleGoogleOAuthCallback(request: express.Request, response: express.Response) {
    if (!consumeOAuthState('google', request.query.state)) {
      response.redirect('/signin?error=oauth_state');
      return;
    }
    const code = String(request.query.code ?? '');
    const clientId = process.env.GOOGLE_CLIENT_ID?.trim();
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
    const redirectUri = process.env.GOOGLE_REDIRECT_URI?.trim() || `${getPublicBaseUrl(request)}/api/auth/oauth/google/callback`;
    if (!code || !clientId || !clientSecret) {
      response.redirect('/signin?error=oauth_config');
      return;
    }

    try {
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }),
      });
      const tokenData = await tokenResponse.json().catch(() => ({})) as { access_token?: string; error_description?: string };
      if (!tokenResponse.ok || !tokenData.access_token) throw new Error(tokenData.error_description ?? 'Google token exchange failed.');
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const profile = await userInfoResponse.json().catch(() => ({})) as { email?: string; name?: string; sub?: string };
      if (!userInfoResponse.ok || !profile.email) throw new Error('Google did not return an email address.');
      if (!profile.sub) throw new Error('Google did not return a stable account id.');
      const user = await findOrCreateOAuthUser('google', profile.sub, profile.email, profile.name ?? '');
      setSessionCookie(response, user.id);
      response.redirect('/onboarding');
    } catch (error) {
      response.redirect(`/signin?error=${encodeURIComponent(error instanceof Error ? error.message : 'oauth_failed')}`);
    }
  }

  app.get('/api/auth/oauth/google/callback', handleGoogleOAuthCallback);
  app.get('/api/integrations/callback/google', handleGoogleOAuthCallback);

  app.get('/api/auth/oauth/github', (request, response) => {
    const clientId = process.env.GITHUB_CLIENT_ID?.trim();
    const nextPath = safeOAuthNextPath(request.query.next);
    if (!clientId) {
      response.redirect(`${nextPath || '/signin'}?error=oauth_github_not_configured`);
      return;
    }
    const state = crypto.randomUUID();
    oauthStates.set(state, { provider: 'github', createdAt: Date.now(), nextPath });
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: `${getPublicBaseUrl(request)}/api/auth/oauth/github/callback`,
      scope: 'read:user user:email repo',
      state,
    });
    response.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
  });

  app.get('/api/auth/oauth/github/callback', async (request, response) => {
    const oauthState = consumeOAuthState('github', request.query.state);
    if (!oauthState) {
      response.redirect('/signin?error=oauth_state');
      return;
    }
    const code = String(request.query.code ?? '');
    const clientId = process.env.GITHUB_CLIENT_ID?.trim();
    const clientSecret = process.env.GITHUB_CLIENT_SECRET?.trim();
    if (!code || !clientId || !clientSecret) {
      response.redirect('/signin?error=oauth_config');
      return;
    }

    try {
      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: `${getPublicBaseUrl(request)}/api/auth/oauth/github/callback`,
        }),
      });
      const tokenData = await tokenResponse.json().catch(() => ({})) as { access_token?: string; error_description?: string };
      if (!tokenResponse.ok || !tokenData.access_token) throw new Error(tokenData.error_description ?? 'GitHub token exchange failed.');

      const [profileResponse, emailsResponse] = await Promise.all([
        fetch('https://api.github.com/user', { headers: { Authorization: `Bearer ${tokenData.access_token}`, Accept: 'application/vnd.github+json' } }),
        fetch('https://api.github.com/user/emails', { headers: { Authorization: `Bearer ${tokenData.access_token}`, Accept: 'application/vnd.github+json' } }),
      ]);
      const profile = await profileResponse.json().catch(() => ({})) as { id?: number; email?: string; name?: string; login?: string };
      const emails = await emailsResponse.json().catch(() => []) as Array<{ email?: string; primary?: boolean; verified?: boolean }>;
      const email = profile.email || emails.find((item) => item.primary && item.verified)?.email || emails.find((item) => item.verified)?.email;
      if (!email) throw new Error('GitHub did not return a verified email address.');
      if (!profile.id) throw new Error('GitHub did not return a stable account id.');
      const user = await findOrCreateOAuthUser('github', String(profile.id), email, profile.name ?? profile.login ?? '');
      await saveGithubAccessToken(user.id, tokenData.access_token);
      setSessionCookie(response, user.id);
      response.redirect(oauthState.nextPath || '/onboarding');
    } catch (error) {
      response.redirect(`/signin?error=${encodeURIComponent(error instanceof Error ? error.message : 'oauth_failed')}`);
    }
  });

  app.get('/api/auth/session', async (request, response) => {
    const user = await getUserFromRequest(request);
    if (!user) {
      response.status(401).json({ error: 'No active session.' });
      return;
    }

    response.json({ user: toSessionUser(user) });
  });

  app.post('/api/auth/signout', (_request, response) => {
    clearSessionCookie(response);
    response.json({ success: true });
  });

  app.get('/api/users/me', requireUser, async (request, response) => {
    response.json({ user: toSessionUser((request as AuthedRequest).user!) });
  });

  app.patch('/api/users/me', requireUser, async (request, response) => {
    const name = String(request.body?.name ?? '').trim();
    const email = normalizeEmail(request.body?.email);
    const otp = String(request.body?.otp ?? '').trim();
    if (name.length < 2) {
      response.status(400).json({ error: 'Name must be at least 2 characters.' });
      return;
    }

    const user = (request as AuthedRequest).user!;
    if (email && email !== user.email) {
      if (!consumeEmailOtp(email, 'email_change', otp)) {
        response.status(400).json({ error: 'We could not verify that email. Request an OTP and enter the code before saving.' });
        return;
      }
      const existing = await db.prepare('SELECT id FROM users WHERE email = ? AND id <> ?').get<{ id: string }>(email, user.id);
      if (existing) {
        response.status(409).json({ error: 'An account with this email already exists.' });
        return;
      }
      await db.prepare('UPDATE users SET name = ?, email = ?, email_verified = ?, updated_at = NOW() WHERE id = ?').run(name, email, 1, user.id);
    } else {
      await db.prepare('UPDATE users SET name = ?, updated_at = NOW() WHERE id = ?').run(name, user.id);
    }
    const updatedUser = await db.prepare('SELECT id, email, name, password_hash, auth_provider, email_verified, created_at, updated_at FROM users WHERE id = ?').get<DbUserRow>(user.id);
    response.json({ user: updatedUser ? toSessionUser(updatedUser) : { ...toSessionUser(user), name, email: email || user.email } });
  });

  app.delete('/api/users/me', requireUser, async (request, response) => {
    const user = (request as AuthedRequest).user!;
    const confirmation = normalizeEmail(request.body?.confirmation);
    if (confirmation !== user.email) {
      response.status(400).json({ error: 'Type your account email to confirm deletion.' });
      return;
    }
    await db.prepare('DELETE FROM users WHERE id = ?').run(user.id);
    clearSessionCookie(response);
    response.json({ success: true });
  });

  app.post('/api/auth/change-password', requireUser, async (request, response) => {
    const currentPassword = String(request.body?.currentPassword ?? '');
    const newPassword = String(request.body?.newPassword ?? '');
    const user = (request as AuthedRequest).user!;

    if (!currentPassword || !newPassword) {
      response.status(400).json({ error: 'Both passwords are required.' });
      return;
    }
    if (newPassword.length < 8) {
      response.status(400).json({ error: 'New password must be at least 8 characters.' });
      return;
    }
    if (!verifyPassword(currentPassword, user.password_hash)) {
      response.status(400).json({ error: 'Current password is incorrect.' });
      return;
    }

    await db.prepare('UPDATE users SET password_hash = ?, updated_at = NOW() WHERE id = ?').run(hashPassword(newPassword), user.id);
    response.json({ success: true });
  });

  app.get('/api/users/preferences', requireUser, async (request, response) => {
    const user = (request as AuthedRequest).user!;
    let preferences = await db.prepare('SELECT sidebar_open, theme, domain FROM user_preferences WHERE user_id = ?').get<UserPreferencesRow>(user.id);
    if (!preferences) {
      await db.prepare('INSERT INTO user_preferences (id, user_id, sidebar_open, theme, domain, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())')
        .run(crypto.randomUUID(), user.id, 0, 'light', 'frontend');
      preferences = { sidebar_open: false, theme: 'light', domain: 'frontend' };
    }

    response.json({ sidebarOpen: Boolean(preferences.sidebar_open), theme: preferences.theme ?? 'light', domain: normalizeDomain(preferences.domain) });
  });

  app.patch('/api/users/preferences', requireUser, async (request, response) => {
    const user = (request as AuthedRequest).user!;
    const sidebarOpen = typeof request.body?.sidebarOpen === 'boolean' ? request.body.sidebarOpen : null;
    const themeValue = typeof request.body?.theme === 'string' ? request.body.theme : null;
    const theme = themeValue && ['light', 'dark', 'system'].includes(themeValue) ? themeValue : null;
    const domain = request.body?.domain === undefined ? null : normalizeDomain(request.body.domain);
    const existing = await db.prepare('SELECT user_id FROM user_preferences WHERE user_id = ?').get<{ user_id: string }>(user.id);

    if (existing) {
      await db.prepare('UPDATE user_preferences SET sidebar_open = COALESCE(?, sidebar_open), theme = COALESCE(?, theme), domain = COALESCE(?, domain), updated_at = NOW() WHERE user_id = ?')
        .run(sidebarOpen === null ? null : (sidebarOpen ? 1 : 0), theme, domain, user.id);
    } else {
      await db.prepare('INSERT INTO user_preferences (id, user_id, sidebar_open, theme, domain, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())')
        .run(crypto.randomUUID(), user.id, sidebarOpen === null ? 0 : (sidebarOpen ? 1 : 0), theme ?? 'light', domain ?? 'frontend');
    }

    response.json({ success: true, sidebarOpen, theme: theme ?? themeValue, domain });
  });

  app.get('/api/github-repos', requireUser, async (request, response) => {
    const user = (request as AuthedRequest).user!;
    await expireStaleGithubScanJobs(user.id);
    const githubConnected = Boolean(await getGithubAccessToken(user.id));
    const repos = await db.prepare(`
      SELECT id, repo_url, repo_name, detected_stack, scanned_at, status
      FROM github_repos
      WHERE user_id = ? AND status = 'complete'
      ORDER BY scanned_at DESC
    `).all<{ id: string; repo_url: string; repo_name: string; detected_stack: unknown; scanned_at: string; status: string }>(user.id);
    const pendingJobs = await db.prepare(`
      SELECT id, repo_url
      FROM repo_scan_jobs
      WHERE user_id = ? AND status = 'pending'
      ORDER BY created_at DESC
      LIMIT 3
    `).all<{ id: string; repo_url: string }>(user.id);
    response.json({
      githubConnected,
      repos: repos.map((repo) => ({
        id: repo.id,
        repoUrl: repo.repo_url,
        repoName: repo.repo_name,
        detectedStack: Array.isArray(repo.detected_stack) ? repo.detected_stack : [],
        scannedAt: repo.scanned_at,
        status: repo.status,
      })),
      pendingJobs: pendingJobs.map((job) => ({
        id: job.id,
        repoUrl: job.repo_url,
        repoName: parseGitHubRepository(job.repo_url)?.repo ?? job.repo_url,
      })),
    });
  });

  app.get('/api/github-repos/:repoId/questions', requireUser, async (request, response) => {
    const user = (request as AuthedRequest).user!;
    const repoId = String(request.params.repoId ?? '');
    const row = await db.prepare(`
      SELECT gr.id, gr.repo_url, gr.repo_name, gr.detected_stack, gr.scanned_at, gr.status, gr.raw_analysis_json,
             rqs.project_summary, rqs.total_questions, rqs.sections_json
      FROM github_repos gr
      LEFT JOIN repo_question_sets rqs ON rqs.repo_id = gr.id
      WHERE gr.id = ? AND gr.user_id = ?
    `).get<{
      id: string; repo_url: string; repo_name: string; detected_stack: unknown; scanned_at: string; status: string;
      raw_analysis_json: unknown; project_summary: string | null; total_questions: number | null; sections_json: unknown;
    }>(repoId, user.id);
    if (!row) {
      response.status(404).json({ error: 'Repository scan not found.' });
      return;
    }
    if (row.status !== 'complete' || !row.project_summary || !Array.isArray(row.sections_json)) {
      response.status(409).json({ error: 'This repository analysis is not complete. Please re-scan the repo from GitHub Repos.' });
      return;
    }
    const sections = Array.isArray(row.sections_json) ? row.sections_json as GithubQuestionSection[] : [];
    const viewedQuestionIds = sections.flatMap((section) => section.questions.map((question) => question.id)).filter(Boolean);
    await Promise.all(viewedQuestionIds.map((questionId) => (
      db.prepare('INSERT INTO user_repo_interactions (id, user_id, repo_id, question_id, viewed_at) VALUES (?, ?, ?, ?, NOW())')
        .run(crypto.randomUUID(), user.id, row.id, questionId)
    )));
    response.json({
      repo: {
        id: row.id,
        repoUrl: row.repo_url,
        repoName: row.repo_name,
        detectedStack: Array.isArray(row.detected_stack) ? row.detected_stack : [],
        scannedAt: row.scanned_at,
        status: row.status,
      },
      projectSummary: row.project_summary ?? 'Analysis is still processing.',
      totalQuestions: row.total_questions ?? 0,
      sections,
      detectedDomains: row.raw_analysis_json && typeof row.raw_analysis_json === 'object' && Array.isArray((row.raw_analysis_json as { detectedDomains?: unknown }).detectedDomains)
        ? (row.raw_analysis_json as { detectedDomains: string[] }).detectedDomains.map(normalizeGithubDetectedDomain)
        : [],
      warnings: row.raw_analysis_json && typeof row.raw_analysis_json === 'object' && Array.isArray((row.raw_analysis_json as { warnings?: unknown }).warnings)
        ? (row.raw_analysis_json as { warnings: string[] }).warnings
        : [],
    });
  });

  app.get('/api/github-repos/jobs/:jobId', requireUser, async (request, response) => {
    const user = (request as AuthedRequest).user!;
    const jobId = String(request.params.jobId ?? '');
    await expireStaleGithubScanJobs(user.id);
    const job = await db.prepare(`
      SELECT id, repo_url, status, error_message, created_at, completed_at
      FROM repo_scan_jobs
      WHERE id = ? AND user_id = ?
    `).get<{ id: string; repo_url: string; status: string; error_message: string | null; created_at: string; completed_at: string | null }>(jobId, user.id);

    if (!job) {
      response.status(404).json({ error: 'Repository scan job not found.' });
      return;
    }

    const repo = job.status === 'complete'
      ? await db.prepare('SELECT id, repo_name FROM github_repos WHERE user_id = ? AND repo_url = ? AND status = ?')
        .get<{ id: string; repo_name: string }>(user.id, job.repo_url, 'complete')
      : null;

    response.json({
      id: job.id,
      repoUrl: job.repo_url,
      repoName: repo?.repo_name ?? parseGitHubRepository(job.repo_url)?.repo ?? job.repo_url,
      repoId: repo?.id,
      status: job.status,
      message: job.error_message,
      createdAt: job.created_at,
      completedAt: job.completed_at,
    });
  });

  app.delete('/api/github-repos/:repoId', requireUser, async (request, response) => {
    const user = (request as AuthedRequest).user!;
    const repoId = String(request.params.repoId ?? '');
    const repo = await db.prepare('SELECT id, repo_url FROM github_repos WHERE id = ? AND user_id = ?')
      .get<{ id: string; repo_url: string }>(repoId, user.id);

    if (!repo) {
      response.status(404).json({ error: 'Repository scan not found.' });
      return;
    }

    await db.prepare(`
      UPDATE repo_scan_jobs
         SET status = 'failed',
             completed_at = NOW(),
             error_message = 'Repository scan deleted by user.'
       WHERE user_id = ? AND repo_url = ? AND status = 'pending'
    `).run(user.id, repo.repo_url);
    await db.prepare('DELETE FROM repo_scan_jobs WHERE user_id = ? AND repo_url = ? AND status <> ?').run(user.id, repo.repo_url, 'pending');
    await db.prepare('DELETE FROM github_repos WHERE id = ? AND user_id = ?').run(repoId, user.id);
    response.json({ success: true });
  });

  app.post('/api/github-repos/scan', requireUser, async (request, response) => {
    const user = (request as AuthedRequest).user!;
    await expireStaleGithubScanJobs(user.id);
    const repoUrl = normalizeGithubRepoUrl(String(request.body?.repoUrl ?? '').trim());
    const force = Boolean(request.body?.force);
    if (!repoUrl) {
      response.status(400).json({ status: 'failed', message: 'Please paste a valid GitHub repository URL.' });
      return;
    }
    const singleFlightKey = `${user.id}:${repoUrl}`;
    const activeRequestJobId = activeGithubScanRequests.get(singleFlightKey);
    if (activeRequestJobId) {
      response.status(202).json({
        status: 'pending',
        jobId: activeRequestJobId,
        message: 'This repository scan is already running. Please wait for it to finish before starting another scan.',
      });
      return;
    }
    const jobId = crypto.randomUUID();
    const releaseSingleFlight = () => {
      if (activeGithubScanRequests.get(singleFlightKey) === jobId) {
        activeGithubScanRequests.delete(singleFlightKey);
      }
    };
    activeGithubScanRequests.set(singleFlightKey, jobId);
    const existing = await db.prepare('SELECT id, repo_name, status FROM github_repos WHERE user_id = ? AND repo_url = ?')
      .get<{ id: string; repo_name: string; status: string }>(user.id, repoUrl);
    if (existing?.status === 'complete' && !force) {
      releaseSingleFlight();
      response.status(409).json({ status: 'duplicate', repoId: existing.id, repoName: existing.repo_name });
      return;
    }
    const pendingJob = await db.prepare(`
      SELECT id
      FROM repo_scan_jobs
      WHERE user_id = ? AND repo_url = ? AND status = 'pending' AND created_at > NOW() - INTERVAL '5 minutes'
      ORDER BY created_at DESC
      LIMIT 1
    `).get<{ id: string }>(user.id, repoUrl);
    if (pendingJob) {
      releaseSingleFlight();
      response.status(202).json({
        status: 'pending',
        jobId: pendingJob.id,
        message: 'This repository scan is already running. Please wait for it to finish before starting another scan.',
      });
      return;
    }
    if (force) {
      await db.prepare(`
        UPDATE repo_scan_jobs
           SET status = 'failed',
               completed_at = NOW(),
               error_message = 'Re-scan started; previous stale pending job was replaced.'
         WHERE user_id = ? AND repo_url = ? AND status = 'pending'
      `).run(user.id, repoUrl);
    }

    const accessToken = await getGithubAccessToken(user.id);
    await db.prepare('INSERT INTO repo_scan_jobs (id, user_id, repo_url, status, created_at, retry_count) VALUES (?, ?, ?, ?, NOW(), 0)')
      .run(jobId, user.id, repoUrl, 'pending');

    const scanPromise = completeGithubScanJob({
      jobId,
      userId: user.id,
      repoUrl,
      existingRepoId: existing?.id,
      accessToken,
    });
    scanPromise.catch((error) => {
      console.error('Background GitHub repo scan failed', {
        userId: user.id,
        repoUrl,
        jobId,
        error: error instanceof Error ? error.message : error,
      });
    }).finally(() => {
      releaseSingleFlight();
    });

    const scanOutcomePromise = scanPromise.then((result) => ({ status: 'complete' as const, repoId: result.repoId })).catch((error) => ({
        status: 'failed' as const,
        publicStatus: error && typeof error === 'object' && 'status' in error ? String((error as { status?: unknown }).status ?? 'failed') : 'failed',
        httpStatus: error && typeof error === 'object' && 'httpStatus' in error ? Number((error as { httpStatus?: unknown }).httpStatus ?? 502) : 502,
        message: error instanceof Error ? error.message : 'Unable to analyze this repository right now.',
      }));
    const outcome = await Promise.race([
      scanOutcomePromise,
      wait(GITHUB_SCAN_INITIAL_RESPONSE_TIMEOUT_MS).then(() => ({ status: 'pending' as const })),
    ]);

    if (outcome.status === 'complete') {
      response.json({ status: 'complete', repoId: outcome.repoId, jobId });
      return;
    }

    if (outcome.status === 'pending') {
      response.status(202).json({
        status: 'pending',
        jobId,
        message: 'This is taking longer than usual. We will notify you when ready.',
      });
      return;
    }

    response.status(outcome.httpStatus).json({ status: outcome.publicStatus, message: outcome.message, jobId });
  });

  app.post('/api/prep/plan', requireUser, async (request, response) => {
    const body = (request.body ?? {}) as PrepPlanRequestBody;
    const domain = String(body.domain ?? '').trim();
    const interviewType = String(body.interviewType ?? '').trim();
    const companyType = String(body.companyType ?? '').trim();
    const timeline = String(body.timeline ?? '').trim();

    if (!domain || !interviewType || !companyType || !timeline) {
      response.status(400).json({ error: 'Domain, interview type, company type, and timeline are required.' });
      return;
    }

    try {
      const analysis = await callStructuredModel<PrepPlanResponse>(
        [
          'You are a technical interview analyst.',
          'Return only valid JSON. Do not include markdown, comments, or explanatory text.',
          'The JSON shape must be:',
          JSON.stringify({
            focusAreas: ['string'],
            interviewPattern: ['string'],
            projectRelevance: 'string',
            codingExpectation: {
              language: 'string',
              difficulty: 'string',
              timePressure: 'string',
            },
            prepStrategy: {
              '3-day': ['string'],
              '7-day': ['string'],
              '30-day': ['string'],
            },
          }),
          'Be specific to the role. A startup frontend internship and a tier-1 frontend internship should produce very different outputs.',
        ].join('\n'),
        `The user has selected: Domain = ${domain}, Interview Type = ${interviewType}, Company Type = ${companyType}, Timeline = ${timeline}. Based on this, return a JSON object with: focusAreas (array of 5-7 technical topics ranked by importance for this exact role), interviewPattern (what rounds to expect and in what order), projectRelevance (how heavily projects are evaluated for this role), codingExpectation (language, difficulty level, time pressure), and prepStrategy (3-day / 7-day / 30-day plan outline).`,
        normalizePrepPlanResponse,
      );

      response.json({ analysis: analysis.result, meta: { provider: analysis.provider, model: analysis.model } });
    } catch (error) {
      response.status(502).json({ error: error instanceof Error ? error.message : 'Unable to generate the prep plan.' });
    }
  });

  app.post('/api/prep/project/repository', requireUser, async (request, response) => {
    const projectInput = String(request.body?.projectInput ?? '').trim();
    if (!projectInput) {
      response.status(400).json({ error: 'A repository URL or project description is required.' });
      return;
    }

    try {
      const user = (request as AuthedRequest).user!;
      const repositoryContext = await fetchGitHubRepositoryContext(projectInput, await getGithubAccessToken(user.id));
      const analysis = await callStructuredModel<ProjectAnalysisResponse>(
        [
          'You are a senior engineer.',
          'Return only valid JSON with no markdown wrappers.',
          'The JSON shape must be:',
          JSON.stringify({
            projectSummary: 'string',
            techStack: ['string'],
            keyFeatures: ['string'],
            interviewableTopics: ['string'],
            commonFollowUps: ['string'],
            weakPoints: ['string'],
            improvementSuggestions: ['string'],
            projectSpecificQuestions: ['string'],
          }),
        ].join('\n'),
        `The user has submitted a GitHub repo. Analyze only the provided repository context and return JSON with: projectSummary (2 sentences), techStack (array), keyFeatures (array of what the app actually does), interviewableTopics (array of specific things an interviewer would ask about this project), commonFollowUps (questions that naturally follow "tell me about your project"), weakPoints (things the project likely doesn't handle that an interviewer might probe), improvementSuggestions (2-3 realistic things they could add before the interview to make it stronger), and projectSpecificQuestions (25 strict interview questions based only on this repository's files and stack).\n\n${repositoryContext}`,
        normalizeProjectAnalysisResponse,
      );

      response.json({ analysis: analysis.result, meta: { provider: analysis.provider, model: analysis.model } });
    } catch (error) {
      response.status(502).json({ error: error instanceof Error ? error.message : 'Unable to analyze the repository.' });
    }
  });

  app.post('/api/prep/project/description', requireUser, async (request, response) => {
    const manualDescription = String(request.body?.manualDescription ?? '').trim();
    if (!manualDescription) {
      response.status(400).json({ error: 'A manual project description is required.' });
      return;
    }

    try {
      const analysis = await callStructuredModel<ManualProjectAnalysisResponse>(
        [
          'You are a senior engineer.',
          'Return only valid JSON with no markdown wrappers.',
          'The JSON shape must be:',
          JSON.stringify({
            techStack: ['string'],
            likelyArchitecture: ['string'],
            whatInterviewerWillFocus: ['string'],
            gapsThatMightExist: ['string'],
            projectSpecificQuestions: ['string'],
            assumptions: ['string'],
          }),
        ].join('\n'),
        `The user has described their project in their own words. They have not shared code. Based only on this description, infer: techStack (best guess), likelyArchitecture, whatInterviewerWillFocus, gapsThatMightExist, and generate 5 project-specific interview questions they should be ready for. Flag any assumptions you made.\n\nDescription:\n${manualDescription}`,
        normalizeManualProjectAnalysisResponse,
      );

      response.json({ analysis: analysis.result, meta: { provider: analysis.provider, model: analysis.model } });
    } catch (error) {
      response.status(502).json({ error: error instanceof Error ? error.message : 'Unable to analyze the project description.' });
    }
  });

  app.post('/api/prep/diagnostic', requireUser, async (request, response) => {
    const domain = String(request.body?.domain ?? '').trim();
    const experienceLevel = String(request.body?.experienceLevel ?? '').trim();
    if (!domain || !experienceLevel) {
      response.status(400).json({ error: 'Domain and experience level are required.' });
      return;
    }

    try {
      const analysis = await callStructuredModel<DiagnosticQuestion[]>(
        [
          'You are running a pre-test diagnostic.',
          'Return only valid JSON with no markdown wrappers.',
          'The JSON must be an array of 8 objects shaped like:',
          JSON.stringify({
            question: 'string',
            type: 'mcq',
            options: ['string'],
            correctAnswer: 'string',
            topicTag: 'string',
          }),
          'Questions must mix MCQ and true_false, escalate in difficulty, and avoid basic definitions.',
        ].join('\n'),
        `The user's domain is ${domain} and their self-rated experience is ${experienceLevel}. Generate 8 rapid diagnostic questions that quickly reveal their actual level across fundamentals, framework knowledge, async/state/data handling, and one domain-specific area. Return a JSON array with: question, type, options (if MCQ), correctAnswer, and topicTag.`,
        normalizeDiagnosticQuestions,
      );

      response.json({ analysis: analysis.result.slice(0, 8), meta: { provider: analysis.provider, model: analysis.model } });
    } catch (error) {
      response.status(502).json({ error: error instanceof Error ? error.message : 'Unable to generate diagnostic questions.' });
    }
  });

  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (request, response) => {
      if (request.originalUrl.startsWith('/api')) {
        response.status(404).json({ error: 'Not found.' });
        return;
      }
      response.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const requestedHmrPort = readPort('VITE_HMR_PORT', 24679);
    const hmrPort = process.env.DISABLE_HMR === 'true'
      ? requestedHmrPort
      : await findAvailablePort(requestedHmrPort);

    if (process.env.DISABLE_HMR !== 'true' && hmrPort !== requestedHmrPort) {
      console.warn(`HMR port ${requestedHmrPort} is in use. Falling back to ${hmrPort}.`);
    }

    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : { port: hmrPort },
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
    app.use('*', async (request, response, next) => {
      if (request.originalUrl.startsWith('/api')) {
        next();
        return;
      }

      try {
        const template = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8');
        const html = await vite.transformIndexHtml(request.originalUrl, template);
        response.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (error) {
        next(error);
      }
    });
  }

  if (listen) {
    const requestedPort = readPort('PORT', 3000);
    const port = process.env.NODE_ENV === 'development'
      ? await findAvailablePort(requestedPort)
      : requestedPort;

    if (process.env.NODE_ENV === 'development' && port !== requestedPort) {
      console.warn(`Port ${requestedPort} is in use. Falling back to ${port}.`);
    }

    const server = app.listen(port, () => {
      console.log(`Repoid server listening on http://localhost:${port}`);
    });
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        const suggestedPort = port === 3000 ? 3001 : port + 1;
        console.error(`Port ${port} is already in use. Stop the process using it, or set a different PORT in .env, for example PORT=${suggestedPort}.`);
        process.exit(1);
      }
      throw error;
    });
  }

  return app;
}

if (!process.env.VERCEL) {
  createApp().catch((error) => {
    console.error('Failed to start Repoid server:', error);
    process.exit(1);
  });
}
