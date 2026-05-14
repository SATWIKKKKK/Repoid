import fs from 'node:fs';
import path from 'node:path';
import type { BankQuestion, QuestionType } from './questionBank.js';

type SectionKey = 'concept' | 'fill' | 'scenario' | 'architecture' | 'coding' | 'mock' | 'faang';

type ParsedQuestion = {
  globalNumber: number;
  text: string;
};

type SectionConfig = {
  key: SectionKey;
  questionHeading: string;
  answerHeading: string;
  type: QuestionType;
  topic: string;
  difficulty: 1 | 2 | 3;
  timeLimitMinutes: number;
  tags: string[];
};

const SECTION_CONFIGS: SectionConfig[] = [
  {
    key: 'concept',
    questionHeading: '## CONCEPT MCQs',
    answerHeading: '## CONCEPT MCQ — Answers',
    type: 'mcq',
    topic: 'Frontend Concepts',
    difficulty: 1,
    timeLimitMinutes: 8,
    tags: ['curated', 'frontend', 'concept'],
  },
  {
    key: 'fill',
    questionHeading: '## FILL IN THE BLANK',
    answerHeading: '## FILL IN THE BLANK — 80 Answers',
    type: 'fill_blank',
    topic: 'Frontend Syntax',
    difficulty: 1,
    timeLimitMinutes: 8,
    tags: ['curated', 'frontend', 'fill-blank'],
  },
  {
    key: 'scenario',
    questionHeading: '## SCENARIO',
    answerHeading: '## SCENARIO — 80 Answers',
    type: 'scenario',
    topic: 'Frontend Scenarios',
    difficulty: 2,
    timeLimitMinutes: 12,
    tags: ['curated', 'frontend', 'scenario'],
  },
  {
    key: 'architecture',
    questionHeading: '## ARCHITECTURE',
    answerHeading: '## ARCHITECTURE — 60 Answers',
    type: 'system_design',
    topic: 'Frontend Architecture',
    difficulty: 3,
    timeLimitMinutes: 20,
    tags: ['curated', 'frontend', 'architecture'],
  },
  {
    key: 'coding',
    questionHeading: '## CODING ROUND',
    answerHeading: '## CODING ROUND — 100 Answers',
    type: 'coding',
    topic: 'Frontend Coding',
    difficulty: 3,
    timeLimitMinutes: 45,
    tags: ['curated', 'frontend', 'coding'],
  },
  {
    key: 'mock',
    questionHeading: '## MOCK INTERVIEW',
    answerHeading: '## MOCK INTERVIEW — 60 Answers',
    type: 'mock',
    topic: 'Frontend Mock Interview',
    difficulty: 2,
    timeLimitMinutes: 25,
    tags: ['curated', 'frontend', 'mock'],
  },
  {
    key: 'faang',
    questionHeading: '## FAANG TAGGED',
    answerHeading: '## FAANG TAGGED — 40 Answers',
    type: 'system_design',
    topic: 'Frontend FAANG',
    difficulty: 3,
    timeLimitMinutes: 20,
    tags: ['curated', 'frontend', 'faang'],
  },
];

const BANK_PATH = path.resolve(process.cwd(), 'data', 'frontend-question-bank.md');

function readBundle() {
  return fs.existsSync(BANK_PATH) ? fs.readFileSync(BANK_PATH, 'utf8') : '';
}

function extractSection(markdown: string, heading: string) {
  const start = markdown.indexOf(heading);
  if (start === -1) return '';
  const rest = markdown.slice(start + heading.length);
  const nextHeadingIndex = rest.search(/\n## /);
  return nextHeadingIndex === -1 ? rest : rest.slice(0, nextHeadingIndex);
}

function stripInlineFormatting(value: string) {
  return value
    .trim()
    .replace(/^["']|["']$/g, '')
    .replace(/^`|`$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseQuestions(section: string, key: SectionKey): ParsedQuestion[] {
  const matches = [...section.matchAll(/^### Q(\d+)\.\s+(.+)$/gm)];
  return matches
    .map((match) => ({
      globalNumber: Number(match[1]),
      text: String(match[2] ?? '').trim(),
    }))
    .filter((question) => {
      if (key !== 'fill') return Boolean(question.text);
      return !/^These are real code patterns/i.test(question.text);
    });
}

function parseMcqAnswers(section: string) {
  return [...section.matchAll(/(\d+)\.\s*([A-D])/g)].map((match) => ({
    index: Number(match[1]),
    answer: String(match[2] ?? '').trim(),
  }));
}

function parseLineAnswers(section: string) {
  return section
    .split(/\r?\n/)
    .map((line) => line.trim())
    .map((line) => line.match(/^(\d+)\.\s+(.+)$/))
    .filter(Boolean)
    .map((match) => ({
      index: Number(match![1]),
      answer: String(match![2] ?? '').trim(),
    }));
}

function parseBoldAnswers(section: string) {
  const headingMatches = [...section.matchAll(/^\*\*(\d+)\.[^*]*\*\*(.*)$/gm)];
  return headingMatches
    .map((match, index) => {
      const headingStart = match.index ?? 0;
      const headingLineEnd = section.indexOf('\n', headingStart);
      const blockStart = headingLineEnd === -1 ? section.length : headingLineEnd + 1;
      const end = index + 1 < headingMatches.length
        ? (headingMatches[index + 1].index ?? section.length)
        : section.length;
      const inlineAnswer = String(match[2] ?? '').trim();
      const blockAnswer = section
        .slice(blockStart, end)
        .replace(/^\s+|\s+$/g, '')
        .trim();
      const answer = [inlineAnswer, blockAnswer]
        .filter(Boolean)
        .join('\n\n')
        .replace(/\n---\s*$/, '')
        .trim();

      return {
        index: Number(match[1]),
        answer,
      };
    })
    .filter((entry) => Boolean(entry.answer));
}

function parseMcqQuestionText(value: string) {
  const firstOption = value.search(/\sA\)\s/);
  const questionText = firstOption === -1 ? value.trim() : value.slice(0, firstOption).trim();
  const optionBlock = firstOption === -1 ? '' : value.slice(firstOption).trim();
  const options = [...optionBlock.matchAll(/([A-D])\)\s*(.*?)(?=\s+[A-D]\)\s|$)/g)].map((match) => ({
    letter: String(match[1] ?? '').trim(),
    text: stripInlineFormatting(String(match[2] ?? '').trim()),
  }));
  return { questionText, options };
}

export type FrontendCuratedBankReport = {
  totalQuestions: number;
  totalAnswers: number;
  importedQuestions: number;
  skippedQuestionNumbers: number[];
  sections: Array<{
    key: SectionKey;
    questions: number;
    answers: number;
    imported: number;
    missingAnswers: number[];
  }>;
};

export function loadFrontendCuratedQuestions(): { questions: BankQuestion[]; report: FrontendCuratedBankReport } {
  const markdown = readBundle();
  const skippedQuestionNumbers: number[] = [];
  const questions: BankQuestion[] = [];
  const sections: FrontendCuratedBankReport['sections'] = [];

  for (const config of SECTION_CONFIGS) {
    const questionSection = extractSection(markdown, config.questionHeading);
    const answerSection = extractSection(markdown, config.answerHeading);
    const parsedQuestions = parseQuestions(questionSection, config.key);
    const parsedAnswers = config.key === 'concept'
      ? parseMcqAnswers(answerSection)
      : config.key === 'fill'
        ? parseLineAnswers(answerSection)
        : parseBoldAnswers(answerSection);
    const answersByIndex = new Map(parsedAnswers.map((answer) => [answer.index, answer.answer]));
    const missingAnswers: number[] = [];
    let imported = 0;

    parsedQuestions.forEach((question, localOffset) => {
      const localIndex = localOffset + 1;
      const answer = answersByIndex.get(localIndex);
      if (!answer) {
        missingAnswers.push(localIndex);
        return;
      }

      let questionText = question.text;
      let options: string[] | undefined;
      let correctAnswer = answer.trim();

      if (config.type === 'mcq') {
        const parsed = parseMcqQuestionText(question.text);
        questionText = parsed.questionText;
        options = parsed.options.map((option) => option.text);
        const selectedOption = parsed.options.find((option) => option.letter === answer.trim());
        correctAnswer = selectedOption?.text ?? answer.trim();
      }

      questions.push({
        id: `frontend-curated-${config.key}-${String(localIndex).padStart(3, '0')}`,
        domain: 'frontend',
        domainLabel: 'Frontend',
        topic: config.topic,
        type: config.type,
        difficulty: config.difficulty,
        questionText,
        options,
        correctAnswer,
        explanation: '',
        tags: config.tags,
        timeLimitMinutes: config.timeLimitMinutes,
      });
      imported += 1;
    });

    const rawQuestionCount = [...questionSection.matchAll(/^### Q(\d+)\./gm)].length;
    if (rawQuestionCount !== parsedQuestions.length) {
      const parsedNumbers = new Set(parsedQuestions.map((question) => question.globalNumber));
      [...questionSection.matchAll(/^### Q(\d+)\./gm)]
        .map((match) => Number(match[1]))
        .filter((number) => !parsedNumbers.has(number))
        .forEach((number) => skippedQuestionNumbers.push(number));
    }

    sections.push({
      key: config.key,
      questions: parsedQuestions.length,
      answers: parsedAnswers.length,
      imported,
      missingAnswers,
    });
  }

  return {
    questions,
    report: {
      totalQuestions: sections.reduce((sum, section) => sum + section.questions, 0),
      totalAnswers: sections.reduce((sum, section) => sum + section.answers, 0),
      importedQuestions: questions.length,
      skippedQuestionNumbers,
      sections,
    },
  };
}
