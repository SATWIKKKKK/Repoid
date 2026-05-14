import fs from 'node:fs';
import path from 'node:path';
import type { BankQuestion, QuestionType } from './questionBank.js';

type BackendRoundKey = 'fundamentals' | 'concept' | 'fill' | 'scenario' | 'architecture' | 'coding' | 'mock' | 'faang';

type BackendRoundConfig = {
  key: BackendRoundKey;
  heading: string;
  type: QuestionType;
  roundTag: string;
  difficulty: 1 | 2 | 3;
  timeLimitMinutes: number;
};

type ParsedOption = {
  letter: string;
  text: string;
};

const BANK_PATH = path.resolve(process.cwd(), 'data', 'backend-question-bank.md');

const BACKEND_ROUND_CONFIGS: BackendRoundConfig[] = [
  { key: 'concept', heading: 'CONCEPT MCQ', type: 'mcq', roundTag: 'concept-mcq', difficulty: 1, timeLimitMinutes: 8 },
  { key: 'fill', heading: 'FILL IN THE BLANK', type: 'fill_blank', roundTag: 'fill-in-the-blank', difficulty: 1, timeLimitMinutes: 8 },
  { key: 'scenario', heading: 'SCENARIO BASED', type: 'scenario', roundTag: 'scenario', difficulty: 2, timeLimitMinutes: 14 },
  { key: 'architecture', heading: 'ARCHITECTURE ROUND', type: 'system_design', roundTag: 'architecture', difficulty: 3, timeLimitMinutes: 24 },
  { key: 'coding', heading: 'CODING ROUND', type: 'coding', roundTag: 'coding-round', difficulty: 3, timeLimitMinutes: 40 },
  { key: 'mock', heading: 'MOCK INTERVIEW', type: 'mock', roundTag: 'mock-interview', difficulty: 2, timeLimitMinutes: 20 },
  { key: 'faang', heading: 'FAANG TAGGED', type: 'system_design', roundTag: 'faang-tagged', difficulty: 3, timeLimitMinutes: 24 },
];

const FUNDAMENTALS_ROUND_CONFIG: BackendRoundConfig = {
  key: 'fundamentals',
  heading: 'FOUNDATIONAL BACKEND BANK',
  type: 'fundamentals',
  roundTag: 'fundamentals',
  difficulty: 1,
  timeLimitMinutes: 8,
};

const BACKEND_TOPICS = [
  'Node.js',
  'Databases',
  'Security',
  'Authentication',
  'Caching',
  'Microservices',
  'Docker & Kubernetes',
  'System Design',
  'APIs',
  'Testing',
] as const;

function readBundle() {
  return fs.existsSync(BANK_PATH) ? fs.readFileSync(BANK_PATH, 'utf8') : '';
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function extractSection(markdown: string, heading: string) {
  const headingPattern = new RegExp(`(?:^|\\n)${escapeRegex(heading)}\\s*(?:\\r?\\n)`, 'm');
  const match = headingPattern.exec(markdown);
  if (!match || match.index === undefined) return '';

  const start = match.index + match[0].length;
  const remainder = markdown.slice(start);
  const nextHeading = BACKEND_ROUND_CONFIGS
    .map((config) => config.heading)
    .filter((candidate) => candidate !== heading)
    .map((candidate) => remainder.search(new RegExp(`(?:^|\\n)${escapeRegex(candidate)}\\s*(?:\\r?\\n)`, 'm')))
    .filter((index) => index >= 0)
    .sort((left, right) => left - right)[0];

  return nextHeading === undefined ? remainder : remainder.slice(0, nextHeading);
}

function extractFundamentalsBundle(markdown: string) {
  const startOfRoundBank = markdown.search(/(?:^|\n)CONCEPT MCQ\s*(?:\r?\n)/m);
  return startOfRoundBank >= 0 ? markdown.slice(0, startOfRoundBank) : markdown;
}

function normalizeInlineWhitespace(value: string) {
  return value.replace(/\r/g, '').replace(/[ \t]+/g, ' ').trim();
}

function splitAnswerBlock(block: string) {
  const marker = /(?:^|\n)(Answer|How to answer):\s*/i.exec(block);
  if (!marker || marker.index === undefined) {
    return { lead: block.trim(), answer: '' };
  }

  return {
    lead: block.slice(0, marker.index).trim(),
    answer: block.slice(marker.index + marker[0].length).trim(),
  };
}

function parseOptions(value: string): ParsedOption[] {
  return [...normalizeInlineWhitespace(value).matchAll(/([A-D])\)\s*(.*?)(?=\s+[A-D]\)\s|$)/g)].map((match) => ({
    letter: String(match[1] ?? '').trim(),
    text: String(match[2] ?? '').trim(),
  })).filter((option) => option.letter && option.text);
}

function codeFence(answer: string, questionText: string) {
  const lower = questionText.toLowerCase();
  const language = lower.includes('sql query')
    ? 'sql'
    : lower.includes('python') || lower.includes('fastapi')
      ? 'python'
      : 'js';
  return `\`\`\`${language}\n${answer.trim()}\n\`\`\``;
}

function stripDividerLines(value: string) {
  return value
    .split(/\r?\n/)
    .filter((line) => !/^\s*---+\s*$/.test(line))
    .join('\n')
    .trim();
}

function inferFundamentalTopic(sectionHeading: string, questionText: string, answer: string) {
  const heading = sectionHeading.toLowerCase();

  if (/(node\.js|javascript backend)/.test(heading)) return 'Node.js';
  if (/(sql|postgresql|mysql|mongodb|database|orms|query builders)/.test(heading)) return 'Databases';
  if (/(authentication|authorization)/.test(heading)) return 'Authentication';
  if (/security/.test(heading)) return 'Security';
  if (/caching|redis/.test(heading)) return 'Caching';
  if (/(message queues|microservices|event-driven)/.test(heading)) return 'Microservices';
  if (/(docker|kubernetes|containerization)/.test(heading)) return 'Docker & Kubernetes';
  if (/(system design|design patterns|advanced topics|final advanced|cloud computing|real-time systems|performance optimization)/.test(heading)) return 'System Design';
  if (/testing/.test(heading)) return 'Testing';
  if (/(api design|graphql|express|django|flask|fastapi|spring boot|ruby on rails|laravel|go backend|python backend|java backend|miscellaneous backend concepts|core concepts)/.test(heading)) return 'APIs';

  return inferTopic(questionText, answer, 'fundamentals');
}

function fundamentalsDifficulty(sectionNumber: number): 1 | 2 | 3 {
  if (sectionNumber >= 30) return 3;
  if (sectionNumber >= 15) return 2;
  return 1;
}

function parseFundamentalQuestions(markdown: string) {
  const bundle = extractFundamentalsBundle(markdown);
  const sections = [...bundle.matchAll(/^SECTION\s+(\d+):\s+(.+)$/gm)];

  return sections.flatMap((sectionMatch, sectionIndex) => {
    const sectionNumber = Number(sectionMatch[1] ?? 0);
    const sectionHeading = String(sectionMatch[2] ?? '').trim();
    const start = (sectionMatch.index ?? 0) + sectionMatch[0].length;
    const end = sectionIndex + 1 < sections.length ? (sections[sectionIndex + 1].index ?? bundle.length) : bundle.length;
    const sectionBlock = bundle.slice(start, end);
    const questionMatches = [...sectionBlock.matchAll(/^Q(\d+)\.\s+(.+)$/gm)];

    return questionMatches.map((questionMatch, questionIndex) => {
      const questionStart = (questionMatch.index ?? 0) + questionMatch[0].length;
      const questionEnd = questionIndex + 1 < questionMatches.length ? (questionMatches[questionIndex + 1].index ?? sectionBlock.length) : sectionBlock.length;
      const answer = stripDividerLines(sectionBlock.slice(questionStart, questionEnd));
      const questionNumber = Number(questionMatch[1] ?? 0);
      const questionText = String(questionMatch[2] ?? '').trim();
      const topic = inferFundamentalTopic(sectionHeading, questionText, answer);

      return {
        id: `backend-curated-fundamentals-${String(questionNumber).padStart(3, '0')}`,
        domain: 'backend',
        domainLabel: 'Backend',
        topic,
        type: FUNDAMENTALS_ROUND_CONFIG.type,
        difficulty: fundamentalsDifficulty(sectionNumber),
        questionText,
        correctAnswer: answer,
        explanation: '',
        tags: [
          'curated',
          'backend',
          `round:${FUNDAMENTALS_ROUND_CONFIG.roundTag}`,
          `topic:${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          `section:${sectionNumber}`,
        ],
        timeLimitMinutes: FUNDAMENTALS_ROUND_CONFIG.timeLimitMinutes,
      } satisfies BankQuestion;
    }).filter((question) => question.correctAnswer.trim());
  });
}

function inferTopic(questionText: string, answer: string, roundKey: BackendRoundKey) {
  const searchable = `${questionText} ${answer}`.toLowerCase();

  if (/(jwt|oauth|bcrypt|authentication|authorization|auth service|token|session|login|pkce|openid|rbac|abac)/i.test(searchable)) return 'Authentication';
  if (/(sql injection|xss|csrf|helmet|content security|least privilege|https|tls|owasp|security checklist)/i.test(searchable)) return 'Security';
  if (/(cache|redis cache|cache-aside|ttl|memoization|cdn cache|stale-while-revalidate|thundering herd)/i.test(searchable)) return 'Caching';
  if (/(docker|container|kubernetes|pod|deployment|helm|volume|dockerfile|docker compose)/i.test(searchable)) return 'Docker & Kubernetes';
  if (/(microservice|message queue|rabbitmq|kafka|service mesh|circuit breaker|bulkhead|outbox|saga|grpc|distributed rate limiter|websocket servers)/i.test(searchable)) return 'Microservices';
  if (/(test|jest|pytest|fixture|coverage|contract test|tdd)/i.test(searchable)) return 'Testing';
  if (roundKey === 'architecture' || roundKey === 'faang' || /(design the backend|system design|distributed system|consistency|leaderboard|url shortener|maps real-time traffic|youtube|autocomplete at scale)/i.test(searchable)) return 'System Design';
  if (/(postgres|mysql|mongodb|database|sql|query|index|join|cte|jsonb|materialized view|transaction|sharding|replica|schema|prisma|mongoose|orm|dynamodb|bigtable)/i.test(searchable)) return 'Databases';
  if (/(node\.js|express|event loop|process\.nexttick|worker_threads|libuv|npm|package\.json|stream|eventemitter|commonjs|es modules)/i.test(searchable)) return 'Node.js';
  return 'APIs';
}

function parseSectionQuestions(section: string, config: BackendRoundConfig) {
  const matches = [...section.matchAll(/^Q(\d+)\.\s+(.+)$/gm)];
  return matches.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < matches.length ? (matches[index + 1].index ?? section.length) : section.length;
    const block = section.slice(start, end).trim();
    const { lead, answer } = splitAnswerBlock(block);
    const questionText = String(match[2] ?? '').trim();
    const topic = inferTopic(questionText, answer, config.key);
    const tags = ['curated', 'backend', `round:${config.roundTag}`, `topic:${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`];

    if (config.key === 'faang') tags.push('faang');

    if (config.type === 'mcq') {
      const options = parseOptions(lead);
      const answerLetter = answer.match(/^([A-D])\b/i)?.[1]?.toUpperCase() ?? '';
      const selectedOption = options.find((option) => option.letter === answerLetter)?.text;
      const explanation = answer.replace(/^([A-D])\s*(?:—|-)?\s*/i, '').trim();
      return {
        id: `backend-curated-${config.key}-${String(index + 1).padStart(3, '0')}`,
        domain: 'backend',
        domainLabel: 'Backend',
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
      id: `backend-curated-${config.key}-${String(index + 1).padStart(3, '0')}`,
      domain: 'backend',
      domainLabel: 'Backend',
      topic,
      type: config.type,
      difficulty: config.difficulty,
      questionText,
      correctAnswer: config.type === 'coding' ? codeFence(answer, questionText) : answer,
      explanation: '',
      tags,
      timeLimitMinutes: config.timeLimitMinutes,
    } satisfies BankQuestion;
  }).filter((question) => question.correctAnswer.trim());
}

export type BackendCuratedBankReport = {
  totalQuestions: number;
  sections: Array<{
    key: BackendRoundKey;
    heading: string;
    imported: number;
  }>;
  topics: Array<{
    topic: string;
    total: number;
  }>;
};

export function loadBackendCuratedQuestions(): { questions: BankQuestion[]; report: BackendCuratedBankReport } {
  const markdown = readBundle();
  const fundamentalQuestions = parseFundamentalQuestions(markdown);
  const roundQuestions = BACKEND_ROUND_CONFIGS.flatMap((config) => parseSectionQuestions(extractSection(markdown, config.heading), config));
  const questions = [...fundamentalQuestions, ...roundQuestions];
  const sections = [FUNDAMENTALS_ROUND_CONFIG, ...BACKEND_ROUND_CONFIGS].map((config) => ({
    key: config.key,
    heading: config.heading,
    imported: questions.filter((question) => question.tags.includes(`round:${config.roundTag}`)).length,
  }));
  const topics = BACKEND_TOPICS.map((topic) => ({
    topic,
    total: questions.filter((question) => question.topic === topic).length,
  }));

  return {
    questions,
    report: {
      totalQuestions: questions.length,
      sections,
      topics,
    },
  };
}
