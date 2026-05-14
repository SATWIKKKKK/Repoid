import fs from 'node:fs';
import path from 'node:path';
import type { BankQuestion, QuestionType } from './questionBank.js';

type CyberRoundKey = 'fundamentals' | 'concept' | 'fill' | 'scenario' | 'architecture' | 'coding' | 'mock';

type CyberRoundConfig = {
  key: CyberRoundKey;
  type: QuestionType;
  roundTag: string;
  label: string;
  difficulty: 1 | 2 | 3;
  timeLimitMinutes: number;
};

type ParsedOption = {
  letter: string;
  text: string;
};

type HeadingState = {
  topicHeading: string;
  subsectionHeading: string;
  roundHeading: string;
};

const BANK_PATH = path.resolve(process.cwd(), 'data', 'cyber-question-bank.md');

const CYBER_ROUND_CONFIGS: Record<CyberRoundKey, CyberRoundConfig> = {
  fundamentals: { key: 'fundamentals', type: 'fundamentals', roundTag: 'fundamentals', label: 'Fundamentals', difficulty: 1, timeLimitMinutes: 8 },
  concept: { key: 'concept', type: 'mcq', roundTag: 'concept-mcq', label: 'Concept MCQ', difficulty: 1, timeLimitMinutes: 8 },
  fill: { key: 'fill', type: 'fill_blank', roundTag: 'fill-in-the-blank', label: 'Fill in the Blank', difficulty: 1, timeLimitMinutes: 8 },
  scenario: { key: 'scenario', type: 'scenario', roundTag: 'scenario', label: 'Scenario', difficulty: 2, timeLimitMinutes: 16 },
  architecture: { key: 'architecture', type: 'system_design', roundTag: 'architecture', label: 'Architecture', difficulty: 3, timeLimitMinutes: 24 },
  coding: { key: 'coding', type: 'coding', roundTag: 'coding-round', label: 'Coding Round', difficulty: 3, timeLimitMinutes: 40 },
  mock: { key: 'mock', type: 'mock', roundTag: 'mock-interview', label: 'Mock Interview', difficulty: 2, timeLimitMinutes: 20 },
};

export const CYBER_TOPICS = [
  'Networking Fundamentals',
  'Cryptography',
  'Web Application Security',
  'Network Security',
  'Operating System and Host Security',
  'Malware and Threats',
  'Identity and Access Management',
  'Social Engineering and Phishing',
  'Penetration Testing and Red Teaming',
  'Incident Response and Digital Forensics',
  'Cloud Security',
  'Application Security and Secure Development',
  'Security Operations and Monitoring',
  'Compliance, Governance, and Risk',
  'Advanced Topics',
  'Wireless Security',
  'Mobile Security',
  'Physical Security',
  'Encryption and PKI - Advanced',
  'Threat Actors and Threat Landscape',
  'Cybersecurity Scenarios',
  'Cybersecurity Architecture',
  'Cybersecurity Coding',
  'Cybersecurity Mixed Concepts',
  'Cybersecurity Mock Interview',
] as const;

function readBundle() {
  return fs.existsSync(BANK_PATH) ? fs.readFileSync(BANK_PATH, 'utf8') : '';
}

function normalizeInlineWhitespace(value: string) {
  return value.replace(/\r/g, '').replace(/[ \t]+/g, ' ').trim();
}

function normalizeTopic(value: string) {
  const cleaned = value
    .replace(/^TOPIC\s+\d+:\s*/i, '')
    .replace(/\s+—\s+/g, ' - ')
    .trim();

  return cleaned
    .toLowerCase()
    .split(/\s+/)
    .map((word) => (word.length <= 3 && !['and', 'for', 'the'].includes(word) ? word.toUpperCase() : word[0]?.toUpperCase() + word.slice(1)))
    .join(' ')
    .replace(/\bIam\b/g, 'IAM')
    .replace(/\bPki\b/g, 'PKI')
    .replace(/\bOs\b/g, 'OS');
}

function normalizeRoundTopic(roundHeading: string) {
  const value = roundHeading.toLowerCase();
  if (value.includes('architecture') || value.includes('system design')) return 'Cybersecurity Architecture';
  if (value.includes('coding') || value.includes('technical')) return 'Cybersecurity Coding';
  if (value.includes('mock interview')) return 'Cybersecurity Mock Interview';
  if (value.includes('concept') || value.includes('fill in the blank')) return 'Cybersecurity Mixed Concepts';
  return 'Cybersecurity Scenarios';
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function parseOptions(value: string): ParsedOption[] {
  return [...normalizeInlineWhitespace(value).matchAll(/([A-D])\)\s*(.*?)(?=\s+[A-D]\)\s|$)/g)]
    .map((match) => ({
      letter: String(match[1] ?? '').trim(),
      text: String(match[2] ?? '').trim(),
    }))
    .filter((option) => option.letter && option.text);
}

function splitAnswerBlock(block: string) {
  const marker = /(?:^|\n)(Answer|How to answer):\s*/i.exec(block);
  if (!marker || marker.index === undefined) return { lead: block.trim(), answer: '' };
  return {
    lead: block.slice(0, marker.index).trim(),
    answer: block.slice(marker.index + marker[0].length).trim(),
  };
}

function inferRoundKey(state: HeadingState): CyberRoundKey {
  const searchable = `${state.roundHeading} ${state.subsectionHeading}`.toLowerCase();
  if (searchable.includes('mock interview')) return 'mock';
  if (searchable.includes('coding') || searchable.includes('technical')) return 'coding';
  if (searchable.includes('architecture') || searchable.includes('system design')) return 'architecture';
  if (searchable.includes('fill in the blank')) return 'fill';
  if (searchable.includes('scenario')) return 'scenario';
  if (searchable.includes('concept mcq')) return 'concept';
  return 'fundamentals';
}

function codeFence(answer: string) {
  const trimmed = answer.trim();
  if (!trimmed || trimmed.includes('```')) return trimmed;
  return `\`\`\`text\n${trimmed}\n\`\`\``;
}

function collectHeadingStates(markdown: string) {
  const headings = [...markdown.matchAll(/^(#{2,3})\s+(.+)$/gm)].map((match) => ({
    index: match.index ?? 0,
    level: String(match[1] ?? ''),
    text: String(match[2] ?? '').trim(),
  }));

  return headings;
}

function stateAt(index: number, headings: ReturnType<typeof collectHeadingStates>): HeadingState {
  let topicHeading = '';
  let subsectionHeading = '';
  let roundHeading = '';

  for (const heading of headings) {
    if (heading.index > index) break;
    if (heading.level === '##' && /^TOPIC\s+\d+:/i.test(heading.text)) {
      topicHeading = heading.text;
      subsectionHeading = '';
      roundHeading = '';
      continue;
    }
    if (heading.level === '##' && /^ROUND TYPE:/i.test(heading.text)) {
      roundHeading = heading.text.replace(/^ROUND TYPE:\s*/i, '').trim();
      topicHeading = '';
      subsectionHeading = '';
      continue;
    }
    if (heading.level === '###') {
      subsectionHeading = heading.text;
    }
  }

  return { topicHeading, subsectionHeading, roundHeading };
}

function parseQuestions(markdown: string) {
  const headings = collectHeadingStates(markdown);
  const matches = [...markdown.matchAll(/^Q(\d+)\.\s+(.+)$/gm)];

  return matches.map((match, index) => {
    const questionNumber = Number(match[1] ?? 0);
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < matches.length ? (matches[index + 1].index ?? markdown.length) : markdown.length;
    const state = stateAt(match.index ?? 0, headings);
    const roundKey = inferRoundKey(state);
    const config = CYBER_ROUND_CONFIGS[roundKey];
    const topic = state.topicHeading ? normalizeTopic(state.topicHeading) : normalizeRoundTopic(state.roundHeading);
    const { lead, answer } = splitAnswerBlock(markdown.slice(start, end));
    const questionText = String(match[2] ?? '').trim();
    const tags = ['curated', 'cybersecurity', `round:${config.roundTag}`, `topic:${slugify(topic)}`];

    if (config.type === 'mcq') {
      const options = parseOptions(lead);
      const answerLetter = answer.match(/^([A-D])\b/i)?.[1]?.toUpperCase() ?? '';
      const selectedOption = options.find((option) => option.letter === answerLetter)?.text;
      const explanation = answer.replace(/^([A-D])\s*(?:—|-)?\s*/i, '').trim();
      return {
        id: `cyber-curated-${String(questionNumber).padStart(3, '0')}`,
        domain: 'cybersecurity',
        domainLabel: 'Cybersecurity',
        topic,
        type: config.type,
        difficulty: config.difficulty,
        questionText,
        options: options.map((option) => option.text),
        correctAnswer: selectedOption ?? answer,
        explanation: explanation && explanation !== selectedOption ? explanation : '',
        tags,
        timeLimitMinutes: config.timeLimitMinutes,
      } satisfies BankQuestion;
    }

    return {
      id: `cyber-curated-${String(questionNumber).padStart(3, '0')}`,
      domain: 'cybersecurity',
      domainLabel: 'Cybersecurity',
      topic,
      type: config.type,
      difficulty: config.difficulty,
      questionText,
      correctAnswer: config.type === 'coding' ? codeFence(answer) : answer,
      explanation: '',
      tags,
      timeLimitMinutes: config.timeLimitMinutes,
    } satisfies BankQuestion;
  }).filter((question) => question.questionText && question.correctAnswer);
}

export type CyberCuratedBankReport = {
  totalQuestions: number;
  rounds: Array<{ key: CyberRoundKey; label: string; imported: number }>;
  topics: Array<{ topic: string; total: number }>;
};

export function loadCyberCuratedQuestions(): { questions: BankQuestion[]; report: CyberCuratedBankReport } {
  const questions = parseQuestions(readBundle());
  const rounds = Object.values(CYBER_ROUND_CONFIGS).map((config) => ({
    key: config.key,
    label: config.label,
    imported: questions.filter((question) => question.tags.includes(`round:${config.roundTag}`)).length,
  }));
  const topics = CYBER_TOPICS.map((topic) => ({
    topic,
    total: questions.filter((question) => question.topic === topic).length,
  }));

  return {
    questions,
    report: {
      totalQuestions: questions.length,
      rounds,
      topics,
    },
  };
}
