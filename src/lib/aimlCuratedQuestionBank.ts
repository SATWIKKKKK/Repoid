import fs from 'node:fs';
import path from 'node:path';
import type { BankQuestion, QuestionType } from './questionBank.js';

type AimlRoundKey = 'concept' | 'fill' | 'scenario' | 'architecture' | 'coding' | 'mock' | 'faang';

type AimlRoundConfig = {
  key: AimlRoundKey;
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

const BANK_PATH = path.resolve(process.cwd(), 'data', 'aiml-question-bank.md');

const AIML_ROUND_CONFIGS: Record<AimlRoundKey, AimlRoundConfig> = {
  concept: { key: 'concept', type: 'mcq', roundTag: 'concept-mcq', label: 'Concept MCQ', difficulty: 1, timeLimitMinutes: 8 },
  fill: { key: 'fill', type: 'fill_blank', roundTag: 'fill-in-the-blank', label: 'Fill in the Blank', difficulty: 1, timeLimitMinutes: 8 },
  scenario: { key: 'scenario', type: 'scenario', roundTag: 'scenario', label: 'Scenario', difficulty: 2, timeLimitMinutes: 14 },
  architecture: { key: 'architecture', type: 'system_design', roundTag: 'architecture', label: 'Architecture', difficulty: 3, timeLimitMinutes: 24 },
  coding: { key: 'coding', type: 'coding', roundTag: 'coding-round', label: 'Coding Round', difficulty: 3, timeLimitMinutes: 40 },
  mock: { key: 'mock', type: 'mock', roundTag: 'mock-interview', label: 'Mock Interview', difficulty: 2, timeLimitMinutes: 20 },
  faang: { key: 'faang', type: 'system_design', roundTag: 'faang-tagged', label: 'FAANG Tagged', difficulty: 3, timeLimitMinutes: 24 },
};

export const AIML_TOPICS = [
  'Mathematics and Statistics Fundamentals',
  'Linear Algebra for ML',
  'Machine Learning Fundamentals',
  'Supervised Learning Algorithms',
  'Unsupervised Learning',
  'Neural Networks and Deep Learning',
  'Natural Language Processing',
  'Computer Vision',
  'Large Language Models and Generative AI',
  'MLOps and Deployment',
  'Evaluation Metrics',
  'Reinforcement Learning',
  'AI/ML System Design',
  'AI/ML Coding',
  'AI/ML FAANG',
  'AI/ML Mock Interview',
  'AI Ethics',
] as const;

function readBundle() {
  return fs.existsSync(BANK_PATH) ? fs.readFileSync(BANK_PATH, 'utf8') : '';
}

function normalizeInlineWhitespace(value: string) {
  return value.replace(/\r/g, '').replace(/[ \t]+/g, ' ').trim();
}

function normalizeTopic(value: string) {
  const direct = new Map<string, string>([
    ['MATHEMATICS AND STATISTICS FUNDAMENTALS', 'Mathematics and Statistics Fundamentals'],
    ['LINEAR ALGEBRA FOR ML', 'Linear Algebra for ML'],
    ['NEURAL NETWORKS AND DEEP LEARNING', 'Neural Networks and Deep Learning'],
    ['LARGE LANGUAGE MODELS AND GENERATIVE AI', 'Large Language Models and Generative AI'],
    ['MLOPS AND DEPLOYMENT', 'MLOps and Deployment'],
    ['AI ETHICS AND RESPONSIBLE AI', 'AI Ethics'],
    ['AI ETHICS', 'AI Ethics'],
  ]);
  const stripped = value
    .replace(/^ADDITIONAL TOPIC:\s*/i, '')
    .replace(/\s+—\s+AI\/ML(?:\s+SYSTEM DESIGN)?/i, '')
    .replace(/\s+—\s+ETHICS/i, '')
    .trim();
  const mapped = direct.get(stripped.toUpperCase());
  if (mapped) return mapped;
  const key = stripped.toLowerCase();
  if (key.includes('architecture round')) return 'AI/ML System Design';
  if (key.includes('coding round')) return 'AI/ML Coding';
  if (key.includes('faang tagged')) return 'AI/ML FAANG';
  if (key.includes('mock interview')) return 'AI/ML Mock Interview';
  if (key.includes('ethics')) return 'AI Ethics';
  return stripped
    .toLowerCase()
    .split(/\s+/)
    .map((word) => (word.length <= 3 && !['and', 'for'].includes(word) ? word.toUpperCase() : word[0]?.toUpperCase() + word.slice(1)))
    .join(' ')
    .replace(/\bMl\b/g, 'ML')
    .replace(/\bAi\b/g, 'AI')
    .replace(/\bNlp\b/g, 'NLP')
    .replace(/\bMlops\b/g, 'MLOps')
    .replace(/\bLlms?\b/g, (match) => match.toUpperCase());
}

function inferRoundKey(topic: string, roundType: string): AimlRoundKey {
  const searchable = `${topic} ${roundType}`.toLowerCase();
  if (searchable.includes('coding round')) return 'coding';
  if (searchable.includes('faang')) return 'faang';
  if (searchable.includes('mock interview')) return 'mock';
  if (searchable.includes('architecture round') || searchable.includes('system design')) return 'architecture';
  if (searchable.includes('fill in the blank')) return 'fill';
  if (searchable.includes('scenario')) return 'scenario';
  return 'concept';
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

function stripQuestionText(value: string) {
  return value.trim().replace(/\s+$/g, '');
}

function codeFence(answer: string) {
  const trimmed = answer.trim();
  if (!trimmed) return '';
  if (trimmed.includes('```')) return trimmed;
  return `\`\`\`python\n${trimmed}\n\`\`\``;
}

function parseTopicBlocks(markdown: string) {
  const topicMatches = [...markdown.matchAll(/^(?:TOPIC|ADDITIONAL TOPIC):\s+(.+)$/gm)];
  return topicMatches.map((match, index) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < topicMatches.length ? (topicMatches[index + 1].index ?? markdown.length) : markdown.length;
    return {
      topicHeading: String(match[1] ?? '').trim(),
      body: markdown.slice(start, end),
    };
  });
}

function parseRoundSubBlocks(block: string) {
  const matches = [
    ...block.matchAll(/^ROUND TYPE:\s+(.+)$/gm),
    ...block.matchAll(/^ADDITIONAL CODING ROUND\s*$/gm),
  ].sort((left, right) => (left.index ?? 0) - (right.index ?? 0));

  if (!matches.length) return [{ roundType: '', body: block }];

  return matches.map((match, index) => {
    const headingEnd = (match.index ?? 0) + match[0].length;
    const end = index + 1 < matches.length ? (matches[index + 1].index ?? block.length) : block.length;
    return {
      roundType: String(match[1] ?? match[0] ?? '').trim(),
      body: block.slice(headingEnd, end),
    };
  });
}

function parseQuestionsFromRoundBlock(topicHeading: string, roundType: string, block: string) {
  const roundKey = inferRoundKey(topicHeading, roundType);
  const config = AIML_ROUND_CONFIGS[roundKey];
  const topic = /^ADDITIONAL CODING ROUND/i.test(roundType)
    ? 'AI/ML Coding'
    : normalizeTopic(roundType.includes('ETHICS') ? 'AI Ethics' : topicHeading);
  const matches = [...block.matchAll(/^Q(\d+)\.\s+(.+)$/gm)];

  return matches.map((match, index) => {
    const questionNumber = Number(match[1] ?? 0);
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < matches.length ? (matches[index + 1].index ?? block.length) : block.length;
    const { lead, answer } = splitAnswerBlock(block.slice(start, end));
    const rawQuestionText = stripQuestionText(String(match[2] ?? ''));
    const tags = [
      'curated',
      'ai-ml',
      `round:${config.roundTag}`,
      `topic:${slugify(topic)}`,
    ];
    if (roundKey === 'faang') tags.push('faang');

    if (config.type === 'mcq') {
      const options = parseOptions(lead);
      const answerLetter = answer.match(/^([A-D])\b/i)?.[1]?.toUpperCase() ?? '';
      const selectedOption = options.find((option) => option.letter === answerLetter)?.text;
      const explanation = answer.replace(/^([A-D])\s*(?:—|-)?\s*/i, '').trim();
      return {
        id: `aiml-curated-${String(questionNumber).padStart(3, '0')}`,
        domain: 'ai-ml',
        domainLabel: 'AI/ML',
        topic,
        type: config.type,
        difficulty: config.difficulty,
        questionText: rawQuestionText,
        options: options.map((option) => option.text),
        correctAnswer: selectedOption ?? answer,
        explanation: explanation && explanation !== selectedOption ? explanation : '',
        tags,
        timeLimitMinutes: config.timeLimitMinutes,
      } satisfies BankQuestion;
    }

    return {
      id: `aiml-curated-${String(questionNumber).padStart(3, '0')}`,
      domain: 'ai-ml',
      domainLabel: 'AI/ML',
      topic,
      type: config.type,
      difficulty: config.difficulty,
      questionText: rawQuestionText,
      correctAnswer: config.type === 'coding' ? codeFence(answer) : answer,
      explanation: '',
      tags,
      timeLimitMinutes: config.timeLimitMinutes,
    } satisfies BankQuestion;
  }).filter((question) => question.questionText && question.correctAnswer);
}

function parseQuestionsFromBlock(topicHeading: string, block: string) {
  return parseRoundSubBlocks(block).flatMap((roundBlock) => parseQuestionsFromRoundBlock(topicHeading, roundBlock.roundType, roundBlock.body));
}

export type AimlCuratedBankReport = {
  totalQuestions: number;
  rounds: Array<{ key: AimlRoundKey; label: string; imported: number }>;
  topics: Array<{ topic: string; total: number }>;
};

export function loadAimlCuratedQuestions(): { questions: BankQuestion[]; report: AimlCuratedBankReport } {
  const markdown = readBundle();
  const questions = parseTopicBlocks(markdown).flatMap((block) => parseQuestionsFromBlock(block.topicHeading, block.body));
  const rounds = Object.values(AIML_ROUND_CONFIGS).map((config) => ({
    key: config.key,
    label: config.label,
    imported: questions.filter((question) => question.tags.includes(`round:${config.roundTag}`)).length,
  }));
  const topics = AIML_TOPICS.map((topic) => ({
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
