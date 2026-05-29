import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, LoaderCircle, Search, Wand2 } from 'lucide-react';
import { fetchQuestions, fetchQuestionStats, generateBankQuestions } from '../lib/questionBankApi';
import DomainPickerDialog from '../components/DomainPickerDialog';
import { QUESTION_TYPES, type BankQuestion, type QuestionType } from '../lib/questionBank';
import { usePrepWorkspace } from '../hooks/usePrepWorkspace';
import { DOMAIN_LABELS, updatePrepWorkspace } from '../lib/prep';
import { updateUserPreferences } from '../lib/userPreferences';
import { exportQuestionsPdf } from '../lib/pdfExport';

const ALL_QUESTION_TYPES = QUESTION_TYPES.map((item) => item.id);
const PAGE_SIZE = 12;

const QB_STATE_KEY = 'qb-persist-v1';
type QBPersistedState = {
  domain?: string;
  topicDropdownValue?: string;
  roundDropdownValue?: string;
  selectedBackendTopics?: string[];
  selectedBackendRounds?: string[];
  aiGeneratedQuestions?: BankQuestion[];
  aiPage?: number;
  aiHistoryData?: BankQuestion[][];
  faangOnly?: boolean;
  selectedTypes?: QuestionType[];
};
function loadQBPersistedState(): QBPersistedState {
  try {
    const raw = sessionStorage.getItem(QB_STATE_KEY);
    return raw ? (JSON.parse(raw) as QBPersistedState) : {};
  } catch {
    return {};
  }
}

const FRONTEND_TOPICS = [
  'HTML Fundamentals',
  'CSS Fundamentals',
  'CSS Layouts - Flexbox And Grid',
  'Responsive Design',
  'JavaScript Fundamentals',
  'DOM Manipulation',
  'JavaScript Advanced',
  'Browser APIs and Web Platform',
  'TypeScript',
  'React',
  'State Management',
  'Routing',
  'Performance Optimization',
  'Build Tools and Module Bundlers',
  'Testing',
  'Accessibility (A11y)',
  'Security in Frontend',
  'Next.js and Modern Frameworks',
  'Progressive Web Apps and Web APIs',
  'Advanced Frontend Topics',
  'Interview Scenarios - Advanced Frontend',
  'Fill in the Blank - Mixed Advanced',
  'Scenario Questions - Intermediate',
  'More Fill in the Blank',
  'Additional Scenarios',
  'More Advanced MCQ',
  'Final Scenarios',
  'More Fill in the Blank - Final',
  'Additional Advanced MCQ',
  'Final Scenarios and Concepts',
  'Rapid Fire Fill in the Blank - Final 75',
];
const BACKEND_TOPICS = ['Node.js', 'Databases', 'Security', 'Authentication', 'Caching', 'Microservices', 'Docker & Kubernetes', 'System Design', 'APIs', 'Testing'];
const AIML_TOPICS = [
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
];
const CYBER_TOPICS = [
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
];
const DATA_SCIENCE_TOPICS = [
  'Statistics And Probability Fundamentals',
  'Data Collection And Exploration',
  'Data Wrangling And Preprocessing',
  'SQL For Data Science',
  'Python For Data Science',
  'Data Visualization',
  'Regression Analysis',
  'Classification And Model Evaluation',
  'Advanced Machine Learning',
  'Time Series Analysis',
  'Natural Language Processing For Data Science',
  'Experiment Design And A/B Testing',
  'Data Engineering For Data Scientists',
  'Causal Inference',
  'Deep Learning For Data Science',
  'Recommendation Systems',
  'Geospatial And Specialized Data',
  'Bayesian Data Analysis',
  'Data Science Tools And Ecosystem',
  'Advanced Topics In Data Science',
  'Scenarios - Advanced Data Science',
  'Applied Scenarios - Business Problems',
  'More Fill In The Blank - Mixed',
  'Applied Fill In The Blank - Algorithms',
  'Scenario - Statistics And Experimental',
  'Final Scenario Topics',
  'More Advanced Concepts',
  'More Scenario Questions',
  'Mixed Rapid Fire MCQ',
  'Final Fill In The Blank',
  'Data Science Scenarios',
  'Data Science Architecture',
  'Data Science Coding',
  'Data Science Mixed Concepts',
  'Data Science Mock Interview',
  'Data Science FAANG',
];
const DATA_ANALYTICS_TOPICS = [
  'Statistics Fundamentals',
  'Data Types And Data Structures',
  'Data Cleaning And Preprocessing',
  'SQL For Data Analytics',
  'Python For Data Analytics',
  'Data Visualization',
  'Exploratory Data Analysis (EDA)',
  'Probability And Distributions',
  'Hypothesis Testing',
  'Regression Analysis',
  'Machine Learning For Analysts',
  'Time Series Analysis',
  'Data Warehousing And ETL',
  'Business Analytics And Metrics',
  'Data Storytelling And Communication',
  'Advanced SQL - Analytics Patterns',
  'Advanced Analytics Techniques',
  'Data Engineering For Analysts',
  'Cloud Analytics Platforms',
  'Analytical Thinking And Problem Solving',
  'Advanced Statistics',
  'Analytics Engineering',
  'Statistical Modeling Advanced',
  'Geospatial And Text Analytics',
  'Causal Inference',
  'AB Testing Advanced',
  'Data Quality And Governance',
  'Analytics Strategy',
  'Interview Preparation Advanced',
  'Programming For Advanced Analytics',
  'Data Analytics Scenarios',
  'Data Analytics Coding',
  'Data Analytics Mixed Concepts',
  'Data Analytics Mock Interview',
  'Data Analytics FAANG',
];
const CURATED_ROUND_FILTERS = [
  { id: 'concept-mcq', label: 'Concept MCQ' },
  { id: 'fill-in-the-blank', label: 'Fill in the Blank' },
  { id: 'scenario', label: 'Scenario' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'coding-round', label: 'Coding Round' },
  { id: 'mock-interview', label: 'Mock Interview' },
  { id: 'faang-tagged', label: 'FAANG Tagged' },
];
const TOPIC_GROUPS = [
  { domain: 'frontend', label: 'Frontend', topics: FRONTEND_TOPICS },
  { domain: 'backend', label: 'Backend', topics: BACKEND_TOPICS },
  { domain: 'ai-ml', label: 'AI/ML', topics: AIML_TOPICS },
  { domain: 'data-science', label: 'Data Science', topics: DATA_SCIENCE_TOPICS },
  { domain: 'data-analytics', label: 'Data Analyst', topics: DATA_ANALYTICS_TOPICS },
  { domain: 'cybersecurity', label: 'Cybersecurity', topics: CYBER_TOPICS },
];
const QUESTION_TYPE_LABELS = Object.fromEntries(QUESTION_TYPES.map((item) => [item.id, item.label])) as Record<QuestionType, string>;

function normalizePoint(text: string): string {
  return text.replace(/^[\s*•\-—]+/, '').replace(/\.$/, '').trim();
}

// Split prose text into bullet points.
// Sentences are delimited by ". " followed by an uppercase letter or a digit.
// Falls back to splitting on ", " for comma-step style answers (no period-sentences found).
function toPoints(text: string, options: { allowCommaFallback?: boolean } = {}): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const lineSplit = trimmed.split(/\n+/).map((line) => normalizePoint(line)).filter(Boolean);
  if (lineSplit.length > 1) return lineSplit;

  // Split on ". " where next char is uppercase/digit (sentence boundary)
  const sentenceSplit = trimmed.split(/\.\s+(?=[A-Z0-9])/).map((s) => normalizePoint(s)).filter(Boolean);
  if (sentenceSplit.length > 1) return sentenceSplit;

  if (options.allowCommaFallback === false) {
    return [normalizePoint(trimmed)];
  }

  // No sentence boundary found — try comma-and split ("…, and …, …")
  const commaSplit = trimmed.split(/,\s+(?:and\s+)?(?=[a-z])/i).map((s) => normalizePoint(s)).filter(Boolean);
  if (commaSplit.length > 1) return commaSplit;
  // Single point — return as-is without trailing period
  return [normalizePoint(trimmed)];
}

function renderInlineCode(text: string) {
  return text.split(/(`[^`]+`)/g).filter(Boolean).map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="rounded-md bg-[#ebe7e7] px-1.5 py-0.5 font-mono text-[0.92em] text-primary dark:bg-white/10">
          {part.slice(1, -1)}
        </code>
      );
    }

    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

// Parse an answer that may contain fenced code blocks into prose/code segments.
type AnswerSegment = { kind: 'prose'; text: string } | { kind: 'code'; lang: string; code: string };

function parseAnswerSegments(text: string): AnswerSegment[] {
  const segments: AnswerSegment[] = [];
  const fenceRegex = /```(\w*)\n?([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  // eslint-disable-next-line no-cond-assign
  while ((match = fenceRegex.exec(text)) !== null) {
    const prose = text.slice(lastIndex, match.index).trim();
    if (prose) segments.push({ kind: 'prose', text: prose });
    segments.push({ kind: 'code', lang: match[1] || 'js', code: match[2].trim() });
    lastIndex = match.index + match[0].length;
  }
  const trailing = text.slice(lastIndex).trim();
  if (trailing) segments.push({ kind: 'prose', text: trailing });
  return segments;
}

function hasCodeBlock(text: string) {
  return text.includes('```');
}

function useInitialSearch() {
  const location = useLocation();
  return new URLSearchParams(location.search).get('search') ?? '';
}

export default function QuestionBank() {
  const initialSearch = useInitialSearch();
  const navigate = useNavigate();
  const workspace = usePrepWorkspace();
  const [persistedState] = useState(loadQBPersistedState);
  const sameDomain = persistedState.domain === workspace.selections.domain;
  const [domain, setDomain] = useState(workspace.selections.domain);
  const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>(() =>
    sameDomain && persistedState.selectedTypes?.length ? persistedState.selectedTypes : ALL_QUESTION_TYPES
  );
  const [selectedBackendTopics, setSelectedBackendTopics] = useState<string[]>(() =>
    sameDomain ? (persistedState.selectedBackendTopics ?? []) : []
  );
  const [selectedBackendRounds, setSelectedBackendRounds] = useState<string[]>(() =>
    sameDomain ? (persistedState.selectedBackendRounds ?? []) : []
  );
  const [topicDropdownValue, setTopicDropdownValue] = useState(() =>
    sameDomain ? (persistedState.topicDropdownValue ?? '') : ''
  );
  const [roundDropdownValue, setRoundDropdownValue] = useState(() =>
    sameDomain ? (persistedState.roundDropdownValue ?? '') : ''
  );
  const [search, setSearch] = useState(initialSearch);
  const [faangOnly, setFaangOnly] = useState(() => sameDomain ? (persistedState.faangOnly ?? false) : false);
  const [stats, setStats] = useState<Array<{ id: string; label: string; total: number }>>([]);
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [openAnswers, setOpenAnswers] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [domainDialogOpen, setDomainDialogOpen] = useState(false);
  const [domainError, setDomainError] = useState<string | null>(null);
  const [savingDomain, setSavingDomain] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiGeneratedQuestions, setAiGeneratedQuestions] = useState<BankQuestion[]>(() =>
    sameDomain ? (persistedState.aiGeneratedQuestions ?? []) : []
  );
  const [aiGenerateError, setAiGenerateError] = useState<string | null>(null);
  const [aiPage, setAiPage] = useState(() => sameDomain ? (persistedState.aiPage ?? 1) : 1);
  const aiHistory = useRef<BankQuestion[][]>(sameDomain ? (persistedState.aiHistoryData ?? []) : []);
  const isInitialMount = useRef(true);
  const lastAutoGenerateKey = useRef<string | null>(
    sameDomain && persistedState.selectedBackendTopics?.length && persistedState.aiGeneratedQuestions?.length
      ? `${persistedState.selectedBackendTopics[0]}::${persistedState.selectedBackendRounds?.[0] ?? ''}`
      : null
  );

  const allTypesSelected = selectedTypes.length === ALL_QUESTION_TYPES.length;
  const hasCuratedFilters = ['frontend', 'backend', 'ai-ml', 'cybersecurity', 'data-science', 'data-analytics'].includes(domain);
  const curatedTopics = domain === 'frontend'
    ? FRONTEND_TOPICS
    : domain === 'ai-ml'
    ? AIML_TOPICS
    : domain === 'cybersecurity'
      ? CYBER_TOPICS
      : domain === 'data-science'
        ? DATA_SCIENCE_TOPICS
        : domain === 'data-analytics'
          ? DATA_ANALYTICS_TOPICS
          : BACKEND_TOPICS;
  const curatedDomainLabel = domain === 'frontend'
    ? 'frontend'
    : domain === 'ai-ml'
    ? 'AI/ML'
    : domain === 'cybersecurity'
      ? 'cybersecurity'
      : domain === 'data-science'
        ? 'data science'
        : domain === 'data-analytics'
          ? 'data analytics'
          : 'backend';
  const curatedTopicOptions = useMemo(() => {
    const group = TOPIC_GROUPS.find((item) => item.domain === domain);
    return (group?.topics ?? curatedTopics).map((topic) => ({
      value: `${domain}::${topic}`,
      topic,
      domain,
    }));
  }, [curatedTopics, domain]);
  const allBackendTopicsSelected = selectedBackendTopics.length === 0;
  const allBackendRoundsSelected = selectedBackendRounds.length === 0;
  const selectedTypesKey = useMemo(() => selectedTypes.join('|'), [selectedTypes]);
  const selectedBackendTopicsKey = useMemo(() => selectedBackendTopics.join('|'), [selectedBackendTopics]);
  const selectedBackendRoundsKey = useMemo(() => selectedBackendRounds.join('|'), [selectedBackendRounds]);
  const rangeStart = total ? (page - 1) * PAGE_SIZE + 1 : 0;
  const rangeEnd = total ? Math.min(total, rangeStart + questions.length - 1) : 0;

  useEffect(() => {
    setDomain(workspace.selections.domain);
  }, [workspace.selections.domain]);

  useEffect(() => {
    setSearch(initialSearch);
    setPage(1);
  }, [initialSearch]);

  useEffect(() => {
    setPage(1);
  }, [domain, faangOnly, search, selectedBackendRoundsKey, selectedBackendTopicsKey, selectedTypesKey]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setSelectedBackendTopics([]);
    setSelectedBackendRounds([]);
    setTopicDropdownValue('');
    setRoundDropdownValue('');
    setFaangOnly(false);
    setAiGeneratedQuestions([]);
    setAiGenerateError(null);
    lastAutoGenerateKey.current = null;
    aiHistory.current = [];
    setAiPage(1);
  }, [domain]);

  // Persist QB state to sessionStorage so filters + AI questions survive refresh
  useEffect(() => {
    try {
      const state: QBPersistedState = {
        domain,
        topicDropdownValue,
        roundDropdownValue,
        selectedBackendTopics,
        selectedBackendRounds,
        aiGeneratedQuestions,
        aiPage,
        aiHistoryData: aiHistory.current,
        faangOnly,
        selectedTypes,
      };
      sessionStorage.setItem(QB_STATE_KEY, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  }, [domain, topicDropdownValue, roundDropdownValue, selectedBackendTopics, selectedBackendRounds, aiGeneratedQuestions, aiPage, faangOnly, selectedTypes]);

  useEffect(() => {
    let ignore = false;
    void fetchQuestionStats().then((result) => {
      if (!result.ok || ignore) return;
      if (result.data) setStats(result.data);
    });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    void fetchQuestions({
      domain,
      types: hasCuratedFilters || allTypesSelected ? undefined : selectedTypes,
      search,
      faangOnly: hasCuratedFilters ? false : faangOnly,
      topics: hasCuratedFilters && selectedBackendTopics.length ? selectedBackendTopics : undefined,
      roundTags: hasCuratedFilters && selectedBackendRounds.length ? selectedBackendRounds : undefined,
      page,
      pageSize: PAGE_SIZE,
    }).then((result) => {
      if (ignore) return;
      if ('error' in result) {
        setError(result.error);
        setQuestions([]);
        setTotal(0);
        setTotalPages(0);
        setLoading(false);
        return;
      }
      setQuestions(result.data.questions);
      setOpenAnswers({});
      setTotal(result.data.total);
      setTotalPages(result.data.totalPages);
      setLoading(false);
    });
    return () => {
      ignore = true;
    };
  }, [allTypesSelected, domain, faangOnly, hasCuratedFilters, page, search, selectedBackendRounds, selectedBackendTopics, selectedTypes]);

  const selectedStats = stats.find((item) => item.id === domain);
  const projectQuestions = workspace.repoAnalysis?.projectSpecificQuestions ?? workspace.manualAnalysis?.projectSpecificQuestions ?? [];
  const bulletDotClass = 'relative top-[-0.08em] h-1.5 w-1.5 shrink-0 rounded-full';

  const toggleType = (typeId: QuestionType) => {
    setSelectedTypes((current) => {
      if (current.includes(typeId)) {
        if (current.length === 1) return current;
        return ALL_QUESTION_TYPES.filter((item) => item !== typeId && current.includes(item));
      }

      return ALL_QUESTION_TYPES.filter((item) => item === typeId || current.includes(item));
    });
  };

  const handleCuratedSearch = () => {
    const option = curatedTopicOptions.find((item) => item.value === topicDropdownValue);
    if (!option || !roundDropdownValue) return;
    setSelectedBackendTopics([option.topic]);
    setSelectedBackendRounds([roundDropdownValue]);
    setSearch('');
    setPage(1);
    setAiGeneratedQuestions([]);
    setAiGenerateError(null);
    lastAutoGenerateKey.current = null;
    aiHistory.current = [];
    setAiPage(1);
  };

  const handleExportPdf = async () => {
    setExportingPdf(true);
    setExportError(null);
    try {
      await exportQuestionsPdf({
        title: `${selectedStats?.label ?? domain} question bank`,
        domain: selectedStats?.label ?? domain,
        exportType: 'question-bank',
        questions: questions.map((question) => ({
          questionText: question.questionText,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation,
        })),
      });
    } catch (err) {
      setExportError(err instanceof Error ? err.message : 'Unable to export PDF.');
    } finally {
      setExportingPdf(false);
    }
  };

  const getRoundLabel = (question: BankQuestion) => {
    const round = CURATED_ROUND_FILTERS.find((item) => question.tags.includes(`round:${item.id}`));
    if (round) return round.label;
    if (question.tags.includes('round:mock-interview')) return 'Mock Interview';
    return QUESTION_TYPE_LABELS[question.type] ?? question.type.replace('_', ' ');
  };

  const handleGenerateWithAI = useCallback(async () => {
    const topic = selectedBackendTopics[0] ?? '';
    const roundType = selectedBackendRounds[0] ?? '';
    if (!topic || !roundType) return;
    setAiGenerating(true);
    setAiGenerateError(null);
    setAiGeneratedQuestions([]);
    const result = await generateBankQuestions({ domain, topic, roundType });
    setAiGenerating(false);
    if (result.ok === false) {
      setAiGenerateError(result.error);
      return;
    }
    const newHistory = [...aiHistory.current, result.data];
    aiHistory.current = newHistory;
    setAiPage(newHistory.length);
    setAiGeneratedQuestions(result.data);
  }, [domain, selectedBackendTopics, selectedBackendRounds]);

  const handleAiNext = useCallback(async () => {
    const nextIdx = aiPage; // aiPage is 1-indexed, nextIdx is 0-indexed next slot
    if (aiHistory.current[nextIdx]) {
      setAiGeneratedQuestions(aiHistory.current[nextIdx]);
      setAiPage(nextIdx + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      await handleGenerateWithAI();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [aiPage, handleGenerateWithAI]);

  const handleAiPrev = useCallback(() => {
    const prevIdx = aiPage - 2; // aiPage is 1-indexed
    if (prevIdx >= 0 && aiHistory.current[prevIdx]) {
      setAiPage(aiPage - 1);
      setAiGeneratedQuestions(aiHistory.current[prevIdx]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [aiPage]);

  // Auto-trigger AI generation when DB returns empty for a curated filter combo.
  useEffect(() => {
    if (loading || error || !hasCuratedFilters) return;
    if (questions.length > 0 || aiGenerating || aiGeneratedQuestions.length > 0) return;
    if (!selectedBackendTopics.length || !selectedBackendRounds.length) return;
    const key = `${selectedBackendTopics[0]}::${selectedBackendRounds[0]}`;
    if (lastAutoGenerateKey.current === key) return;
    lastAutoGenerateKey.current = key;
    void handleGenerateWithAI();
  }, [loading, error, questions.length, aiGenerating, aiGeneratedQuestions.length, hasCuratedFilters, selectedBackendTopics, selectedBackendRounds, handleGenerateWithAI]);

  const handleDomainSave = async (nextDomain: string) => {
    setDomainError(null);
    setSavingDomain(true);
    const result = await updateUserPreferences({ domain: nextDomain });
    setSavingDomain(false);
    if ('error' in result) {
      setDomainError(result.error);
      return;
    }

    updatePrepWorkspace({ selections: { ...workspace.selections, domain: result.data.domain } });
    setDomainDialogOpen(false);
  };

  return (
    <>
    <div className="min-h-full bg-background px-4 py-8 sm:px-8 lg:px-16">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
      <main className="relative z-10 mx-auto w-full max-w-360 space-y-8">
        <section className="border-b border-blueprint-line pb-8">
          <div>
            <p className="text-ui-label text-blueprint-muted">Question Bank</p>
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <h1 className="page-title">{selectedStats?.label ?? 'Domain'} interview questions</h1>
              {!loading && questions.length > 0 ? (
                <button type="button" onClick={handleExportPdf} disabled={exportingPdf} className="inline-flex items-center gap-2 rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-primary hover:bg-[#f5f3f3] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/5">
                  {exportingPdf ? <LoaderCircle size={15} className="animate-spin" /> : <Download size={15} />} Export PDF
                </button>
              ) : null}
            </div>
            <p className="mt-3 max-w-3xl text-body-lg text-blueprint-muted">
              Questions stay aligned with your selected domain, round types, and search terms. You can switch domains directly from this page.
            </p>
          </div>
        </section>

        {projectQuestions.length ? (
          <section className="surface-card space-y-5">
            <div>
              <p className="text-ui-label text-blueprint-muted">From your project scan</p>
              <h2 className="mt-2 text-headline-md text-primary not-italic">Project-specific interview questions</h2>
              <p className="mt-2 max-w-3xl text-body-md text-blueprint-muted">
                These prompts were generated from the repository or project description you added during onboarding.
              </p>
            </div>
            <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
              {projectQuestions.slice(0, 6).map((question, index) => (
                <div key={`${question}-${index}`} className="surface-inset">
                  <span className="rounded-full border border-blueprint-line bg-card px-3 py-1.5 text-ui-label text-blueprint-muted">Project Prompt {index + 1}</span>
                  <p className="mt-4 text-body-md font-medium text-primary">{question}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="space-y-4">
          {/* ── Compact horizontal filter bar ── */}
          <div className="surface-card-compact">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {/* Change domain button */}
              <button type="button" onClick={() => setDomainDialogOpen(true)} className="shrink-0 rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-primary hover:bg-[#f5f3f3] dark:hover:bg-white/5">
                Change domain
              </button>

              {hasCuratedFilters ? (
                <div className="flex flex-1 flex-wrap items-center gap-2">
                  <select value={topicDropdownValue} onChange={(event) => setTopicDropdownValue(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-blueprint-line bg-card px-3 pr-7 py-2.5 text-body-md text-primary outline-none focus:border-primary">
                    <option value="">Select topic</option>
                    {curatedTopicOptions.map((item) => (
                      <option key={`${item.domain}-${item.topic}`} value={item.value}>{item.topic}</option>
                    ))}
                  </select>
                  <select value={roundDropdownValue} onChange={(event) => setRoundDropdownValue(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-blueprint-line bg-card px-3 pr-7 py-2.5 text-body-md text-primary outline-none focus:border-primary">
                    <option value="">Select round</option>
                    {CURATED_ROUND_FILTERS.map((item) => (
                      <option key={item.id} value={item.id}>{item.label}</option>
                    ))}
                  </select>
                  <button type="button" onClick={handleCuratedSearch} disabled={!topicDropdownValue || !roundDropdownValue} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-ui-label text-white disabled:cursor-not-allowed disabled:opacity-50">
                    <Search size={16} /> Search
                  </button>
                </div>
              ) : (
                <div className={`flex flex-1 flex-wrap gap-2 transition-opacity ${faangOnly ? 'pointer-events-none opacity-35' : ''}`}>
                  <button type="button" disabled={faangOnly} onClick={() => setSelectedTypes(ALL_QUESTION_TYPES)} className={`rounded-full border px-4 py-2 text-ui-label transition-colors ${allTypesSelected ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-blueprint-muted hover:bg-[#f5f3f3] hover:text-primary dark:hover:bg-white/5'}`}>All</button>
                  {QUESTION_TYPES.map((item) => (
                    <button key={item.id} type="button" disabled={faangOnly} onClick={() => toggleType(item.id)} className={`rounded-full border px-4 py-2 text-ui-label transition-colors ${selectedTypes.includes(item.id) ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-blueprint-muted hover:bg-[#f5f3f3] hover:text-primary dark:hover:bg-white/5'}`}>{item.label}</button>
                  ))}
                  <button type="button" onClick={() => { setFaangOnly((value) => !value); setSelectedTypes(ALL_QUESTION_TYPES); setPage(1); }} className={`rounded-full border px-4 py-2 text-ui-label font-semibold transition-colors ${faangOnly ? 'border-amber-400 bg-amber-400/10 text-amber-600 dark:border-amber-400 dark:bg-amber-400/15 dark:text-amber-300' : 'border-blueprint-line bg-card text-blueprint-muted hover:border-amber-400 hover:bg-amber-400/10 hover:text-amber-600 dark:hover:border-amber-400 dark:hover:bg-amber-400/15 dark:hover:text-amber-300'}`}>✦ FAANG</button>
                </div>
              )}
            </div>
          </div>

          {/* ── Full-width questions area ── */}
          <div className="min-w-0 space-y-4">
            {exportError ? <div className="rounded-xl border border-red-300/40 bg-red-500/10 px-4 py-3 text-body-md text-red-700 dark:text-red-200">{exportError.split(/\b(Upgrade)\b/i).map((part, i) => /^upgrade$/i.test(part) ? <button key={i} type="button" onClick={() => navigate('/pricing')} className="font-bold underline hover:opacity-80">{part}</button> : part)}</div> : null}

            {loading ? (
              <div className="grid gap-4 xl:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="surface-card flex animate-pulse flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                      <div className="h-7 w-20 rounded-full bg-blueprint-line/40" />
                      <div className="h-7 w-24 rounded-full bg-blueprint-line/40" />
                      <div className="h-7 w-10 rounded-full bg-blueprint-line/40" />
                    </div>
                    <div className="h-3.5 w-1/3 rounded bg-blueprint-line/40" />
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded bg-blueprint-line/40" />
                      <div className="h-4 w-5/6 rounded bg-blueprint-line/40" />
                      <div className="h-4 w-3/4 rounded bg-blueprint-line/40" />
                    </div>
                    <div className="mt-auto h-10 rounded-xl bg-blueprint-line/25" />
                  </div>
                ))}
              </div>
            ) : null}
            {error ? <p className="text-body-md text-red-600">{error}</p> : null}
            {aiGenerating ? (
              <div className="surface-card space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                    <Wand2 size={18} className="text-primary animate-pulse" />
                  </span>
                  <div>
                    <p className="text-ui-label text-primary">Loading...</p>
                    <p className="mt-0.5 text-body-md text-blueprint-muted">Building questions for <strong>{selectedBackendTopics[0]}</strong> — {CURATED_ROUND_FILTERS.find((r) => r.id === selectedBackendRounds[0])?.label ?? selectedBackendRounds[0]}...</p>
                  </div>
                </div>
                <div className="grid gap-4 xl:grid-cols-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="surface-card flex animate-pulse flex-col gap-3">
                      <div className="flex flex-wrap gap-2">
                        <div className="h-7 w-20 rounded-full bg-blueprint-line/40" />
                        <div className="h-7 w-24 rounded-full bg-blueprint-line/40" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-full rounded bg-blueprint-line/40" />
                        <div className="h-4 w-5/6 rounded bg-blueprint-line/40" />
                        <div className="h-4 w-3/4 rounded bg-blueprint-line/40" />
                      </div>
                      <div className="mt-auto h-10 rounded-xl bg-blueprint-line/25" />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {!loading && !error && !questions.length && !aiGenerating && !aiGeneratedQuestions.length ? (
              <div className="surface-card space-y-4">
                <div>
                  {hasCuratedFilters && selectedBackendTopics.length > 0 && selectedBackendRounds.length > 0 ? (
                    <>
                      <p className="text-body-md text-blueprint-muted">
                        No stored questions found — generating fresh questions for <strong>{selectedBackendTopics[0]}</strong>…
                      </p>
                      {aiGenerateError ? <p className="mt-2 text-body-md text-red-600">{aiGenerateError}</p> : null}
                    </>
                  ) : (
                    <p className="text-body-md text-blueprint-muted">No stored questions found for this combination. Try enabling more round types or changing the domain.</p>
                  )}
                </div>
              </div>
            ) : null}

            {!loading && !error ? (() => {
              const isCodingRound = selectedBackendRounds[0] === 'coding-round';
              const card = (question: (typeof questions)[number], idx: number) => (
                <article key={`${question.id}-${idx}`} className="surface-card flex min-w-0 flex-col overflow-hidden">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-blueprint-line bg-card px-3 py-1.5 text-ui-label text-primary">{question.domainLabel}</span>
                    <span className="rounded-full border border-blueprint-line bg-card px-3 py-1.5 text-ui-label text-blueprint-muted">{getRoundLabel(question)}</span>
                    <span className="rounded-full border border-blueprint-line bg-card px-3 py-1.5 text-ui-label text-blueprint-muted">{question.topic}</span>
                    <span className="rounded-full border border-blueprint-line bg-card px-3 py-1.5 text-ui-label text-blueprint-muted">D{question.difficulty}</span>
                    {question.tags.includes('faang') ? <span className="rounded-full border border-blueprint-line bg-card px-3 py-1.5 text-ui-label text-primary">FAANG</span> : null}
                  </div>
                  {domain !== 'backend' ? <p className="text-ui-label text-blueprint-muted">{question.topic}</p> : null}
                  <h2 className="mt-2 min-h-24 wrap-break-word text-body-lg font-semibold text-primary">{question.questionText}</h2>
                  {question.codeSnippet ? (
                    <pre className="surface-inset mt-4 max-h-64 overflow-auto text-[13px] leading-6 text-blueprint-muted"><code className="block whitespace-pre">{question.codeSnippet}</code></pre>
                  ) : null}
                  {question.options?.length ? (
                    <div className="mt-4 grid gap-2">
                      {question.options.map((option) => (
                        <div key={option} className="surface-inset px-3 py-2 text-body-md text-blueprint-muted">
                          {option}
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div className="surface-inset mt-4 min-w-0 p-3">
                    <button
                      type="button"
                      onClick={() => setOpenAnswers((current) => ({ ...current, [question.id]: !current[question.id] }))}
                      className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 text-left text-ui-label text-primary"
                      aria-expanded={Boolean(openAnswers[question.id])}
                    >
                      <span className="min-w-0">Answer</span>
                      <span className="whitespace-nowrap text-blueprint-muted">{openAnswers[question.id] ? 'Hide' : 'Show'}</span>
                    </button>
                    {openAnswers[question.id] ? (
                      <>
                        {hasCodeBlock(question.correctAnswer) || question.type === 'coding' || isCodingRound ? (
                          <div className="mt-3 space-y-3">
                            {parseAnswerSegments(question.correctAnswer).map((seg, si) =>
                              seg.kind === 'code' ? (
                                <pre key={si} className="max-h-96 overflow-auto rounded-lg border border-blueprint-line bg-[#f8f7f5] p-3 text-[0.78rem] leading-relaxed text-primary dark:bg-white/5"><code className="block whitespace-pre">{seg.code}</code></pre>
                              ) : (
                                <ul key={si} className="space-y-1.5 text-body-md text-primary">
                                  {toPoints(seg.text, { allowCommaFallback: false }).map((point, pi) => (
                                    <li key={pi} className="flex items-baseline gap-2">
                                      <span className={`${bulletDotClass} bg-primary`} />
                                      <span className="min-w-0 wrap-break-word">{renderInlineCode(point)}</span>
                                    </li>
                                  ))}
                                </ul>
                              )
                            )}
                          </div>
                        ) : (
                          <ul className="mt-3 space-y-1.5 text-body-md text-primary">
                            {toPoints(question.correctAnswer, { allowCommaFallback: true }).map((point, pi) => (
                              <li key={pi} className="flex items-baseline gap-2">
                                <span className={`${bulletDotClass} bg-primary`} />
                                <span className="min-w-0 wrap-break-word">{renderInlineCode(point)}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {question.explanation ? (
                          <ul className="mt-3 space-y-1.5 text-body-md text-blueprint-muted">
                            {toPoints(question.explanation, { allowCommaFallback: question.type !== 'coding' }).map((point, pi) => (
                              <li key={pi} className="flex items-baseline gap-2">
                                <span className={`${bulletDotClass} bg-blueprint-muted`} />
                                <span className="min-w-0 wrap-break-word">{renderInlineCode(point)}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </article>
              );

              // Two independent flex columns — zero cross-card height coupling.
              // min-h on h2 keeps answer bars at a consistent level for typical question lengths.
              const left  = questions.filter((_, i) => i % 2 === 0);
              const right = questions.filter((_, i) => i % 2 === 1);

              return (
                <>
                  <div className="flex flex-col gap-4 xl:hidden">
                    {questions.map((q, i) => card(q, i))}
                  </div>
                  <div className="hidden min-w-0 xl:flex xl:gap-4">
                    <div className="flex min-w-0 flex-1 flex-col gap-4">
                      {left.map((q, i) => card(q, i * 2))}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-4">
                      {right.map((q, i) => card(q, i * 2 + 1))}
                    </div>
                  </div>
                </>
              );
            })() : null}

            {!aiGenerating && aiGeneratedQuestions.length > 0 ? (() => {
              const aiCard = (question: BankQuestion, idx: number) => (
                <article key={`ai-${question.id}-${idx}`} className="surface-card flex min-w-0 flex-col overflow-hidden ring-1 ring-primary/20">
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-blueprint-line bg-card px-3 py-1.5 text-ui-label text-blueprint-muted">{CURATED_ROUND_FILTERS.find((r) => r.id === selectedBackendRounds[0])?.label ?? selectedBackendRounds[0]}</span>
                    <span className="rounded-full border border-blueprint-line bg-card px-3 py-1.5 text-ui-label text-blueprint-muted">{question.topic}</span>
                    <span className="rounded-full border border-blueprint-line bg-card px-3 py-1.5 text-ui-label text-blueprint-muted">D{question.difficulty}</span>
                  </div>
                  <h2 className="mt-2 min-h-24 wrap-break-word text-body-lg font-semibold text-primary">{question.questionText}</h2>
                  {question.codeSnippet ? (
                    <pre className="surface-inset mt-4 max-h-64 overflow-auto text-[13px] leading-6 text-blueprint-muted"><code className="block whitespace-pre">{question.codeSnippet}</code></pre>
                  ) : null}
                  {question.options?.length ? (
                    <div className="mt-4 grid gap-2">
                      {question.options.map((option) => (
                        <div key={option} className="surface-inset px-3 py-2 text-body-md text-blueprint-muted">{option}</div>
                      ))}
                    </div>
                  ) : null}
                  <div className="surface-inset mt-4 min-w-0 p-3">
                    <button
                      type="button"
                      onClick={() => setOpenAnswers((current) => ({ ...current, [question.id]: !current[question.id] }))}
                      className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 text-left text-ui-label text-primary"
                      aria-expanded={Boolean(openAnswers[question.id])}
                    >
                      <span className="min-w-0">Answer</span>
                      <span className="whitespace-nowrap text-blueprint-muted">{openAnswers[question.id] ? 'Hide' : 'Show'}</span>
                    </button>
                    {openAnswers[question.id] ? (
                      <>
                        {hasCodeBlock(question.correctAnswer) || question.type === 'coding' ? (
                          <div className="mt-3 space-y-3">
                            {parseAnswerSegments(question.correctAnswer).map((seg, si) =>
                              seg.kind === 'code' ? (
                                <pre key={si} className="max-h-96 overflow-auto rounded-lg border border-blueprint-line bg-[#f8f7f5] p-3 text-[0.78rem] leading-relaxed text-primary dark:bg-white/5"><code className="block whitespace-pre">{seg.code}</code></pre>
                              ) : (
                                <ul key={si} className="space-y-1.5 text-body-md text-primary">
                                  {toPoints(seg.text, { allowCommaFallback: false }).map((point, pi) => (
                                    <li key={pi} className="flex items-baseline gap-2">
                                      <span className={`${bulletDotClass} bg-primary`} />
                                      <span className="min-w-0 wrap-break-word">{renderInlineCode(point)}</span>
                                    </li>
                                  ))}
                                </ul>
                              )
                            )}
                          </div>
                        ) : (
                          <ul className="mt-3 space-y-1.5 text-body-md text-primary">
                            {toPoints(question.correctAnswer, { allowCommaFallback: false }).map((point, pi) => (
                              <li key={pi} className="flex items-baseline gap-2">
                                <span className={`${bulletDotClass} bg-primary`} />
                                <span className="min-w-0 wrap-break-word">{renderInlineCode(point)}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {question.explanation ? (
                          <ul className="mt-3 space-y-1.5 text-body-md text-blueprint-muted">
                            {toPoints(question.explanation, { allowCommaFallback: false }).map((point, pi) => (
                              <li key={pi} className="flex items-baseline gap-2">
                                <span className={`${bulletDotClass} bg-blueprint-muted`} />
                                <span className="min-w-0 wrap-break-word">{renderInlineCode(point)}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </>
                    ) : null}
                  </div>
                </article>
              );
              const aiLeft = aiGeneratedQuestions.filter((_, i) => i % 2 === 0);
              const aiRight = aiGeneratedQuestions.filter((_, i) => i % 2 === 1);
              return (
                <div className="space-y-4">
                  <div className="flex flex-col gap-4 xl:hidden">
                    {aiGeneratedQuestions.map((q, i) => aiCard(q, i))}
                  </div>
                  <div className="hidden min-w-0 xl:flex xl:gap-4">
                    <div className="flex min-w-0 flex-1 flex-col gap-4">{aiLeft.map((q, i) => aiCard(q, i * 2))}</div>
                    <div className="flex min-w-0 flex-1 flex-col gap-4">{aiRight.map((q, i) => aiCard(q, i * 2 + 1))}</div>
                  </div>
                  {/* AI pagination */}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleAiPrev}
                      disabled={aiPage <= 1}
                      className="rounded-full border border-blueprint-line bg-card px-5 py-2.5 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-white/5"
                    >
                      Previous
                    </button>
                    <span className="text-ui-label text-blueprint-muted">Page {aiPage}</span>
                    <button
                      type="button"
                      onClick={() => { void handleAiNext(); }}
                      className="rounded-full border border-blueprint-line bg-card px-5 py-2.5 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] dark:hover:bg-white/5"
                    >
                      Next
                    </button>
                  </div>
                </div>
              );
            })() : null}

            {!loading && totalPages > 1 ? (
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setPage((current) => Math.max(1, current - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page <= 1}
                  className="rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/5"
                >
                  Previous
                </button>
                <span className="text-ui-label text-blueprint-muted">{page} / {totalPages}</span>
                <button
                  type="button"
                  onClick={() => { setPage((current) => Math.min(totalPages, current + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page >= totalPages}
                  className="rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/5"
                >
                  Next
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </div>
    <DomainPickerDialog
      open={domainDialogOpen}
      value={workspace.selections.domain}
      saving={savingDomain}
      error={domainError}
      onClose={() => {
        setDomainDialogOpen(false);
        setDomainError(null);
      }}
      onSave={handleDomainSave}
    />
    </>
  );
}
