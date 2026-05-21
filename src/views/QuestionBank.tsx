import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchQuestions, fetchQuestionStats, generateTopicQuestions, type GeneratedQuestion } from '../lib/questionBankApi';
import DomainPickerDialog from '../components/DomainPickerDialog';
import { QUESTION_TYPES, type BankQuestion, type QuestionType } from '../lib/questionBank';
import { usePrepWorkspace } from '../hooks/usePrepWorkspace';
import { DOMAIN_LABELS, updatePrepWorkspace } from '../lib/prep';
import { updateUserPreferences } from '../lib/userPreferences';

const ALL_QUESTION_TYPES = QUESTION_TYPES.map((item) => item.id);
const PAGE_SIZE = 12;
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
  { id: 'fundamentals', label: 'Fundamentals' },
  { id: 'concept-mcq', label: 'Concept MCQ' },
  { id: 'fill-in-the-blank', label: 'Fill in the Blank' },
  { id: 'scenario', label: 'Scenario' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'coding-round', label: 'Coding Round' },
  { id: 'mock-interview', label: 'Mock Interview' },
  { id: 'faang-tagged', label: 'FAANG Tagged' },
];
const AI_SEARCH_ROUNDS = CURATED_ROUND_FILTERS.filter((item) => item.id !== 'fundamentals');
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
  const workspace = usePrepWorkspace();
  const [domain, setDomain] = useState(workspace.selections.domain);
  const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>(() => ALL_QUESTION_TYPES);
  const [selectedBackendTopics, setSelectedBackendTopics] = useState<string[]>([]);
  const [selectedBackendRounds, setSelectedBackendRounds] = useState<string[]>([]);
  const [search, setSearch] = useState(initialSearch);
  const [faangOnly, setFaangOnly] = useState(false);
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
  const [aiTopic, setAiTopic] = useState(initialSearch);
  const [aiRoundType, setAiRoundType] = useState('');
  const [aiQuestions, setAiQuestions] = useState<GeneratedQuestion[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [domainMismatchMessage, setDomainMismatchMessage] = useState<string | null>(null);

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
    setSelectedBackendTopics([]);
    setSelectedBackendRounds([]);
    setFaangOnly(false);
  }, [domain]);

  useEffect(() => {
    let ignore = false;
    void fetchQuestionStats().then((result) => {
      if (!result.ok || ignore) return;
      setStats(result.data);
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

  const toggleBackendTopic = (topic: string) => {
    setSelectedBackendTopics((current) => current.includes(topic)
      ? current.filter((item) => item !== topic)
      : [...current, topic]);
  };

  const toggleBackendRound = (roundId: string) => {
    setSelectedBackendRounds((current) => current.includes(roundId)
      ? current.filter((item) => item !== roundId)
      : [...current, roundId]);
  };

  const getRoundLabel = (question: BankQuestion) => {
    const round = CURATED_ROUND_FILTERS.find((item) => question.tags.includes(`round:${item.id}`));
    if (round) return round.label;
    if (question.tags.includes('round:mock-interview')) return 'Mock Interview';
    return QUESTION_TYPE_LABELS[question.type] ?? question.type.replace('_', ' ');
  };

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

  const handleAiSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!aiRoundType || !aiTopic.trim()) return;
    setAiLoading(true);
    setAiError(null);
    setAiQuestions([]);
    setDomainMismatchMessage(null);
    const result = await generateTopicQuestions({ domain, roundType: aiRoundType, topic: aiTopic.trim() });
    setAiLoading(false);
    if (result.ok === false) {
      if (/different domain|domain/i.test(result.error)) {
        setDomainMismatchMessage(result.error);
      } else {
        setAiError(result.error);
      }
      return;
    }
    setAiQuestions(result.data.questions);
  };

  return (
    <>
    <div className="min-h-full bg-background px-4 py-8 sm:px-8 lg:px-16">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
      <main className="relative z-10 mx-auto w-full max-w-360 space-y-8">
        <section className="border-b border-blueprint-line pb-8">
          <div>
            <p className="text-ui-label text-blueprint-muted">Question Bank</p>
            <h1 className="mt-2 text-display-xl text-primary">{selectedStats?.label ?? 'Domain'} interview questions</h1>
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

        <section className="surface-card space-y-5">
          <div>
            <p className="text-ui-label text-blueprint-muted">AI Search</p>
            <h2 className="mt-2 text-headline-md text-primary not-italic">Generate 30 questions by topic</h2>
            <p className="mt-2 max-w-3xl text-body-md text-blueprint-muted">
              Select a round type first, then search a topic inside your current domain.
            </p>
          </div>
          <form onSubmit={handleAiSearch} className="grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)_auto]">
            <select
              value={aiRoundType}
              onChange={(event) => setAiRoundType(event.target.value)}
              className="rounded-full border border-blueprint-line bg-card px-4 py-3 text-body-md text-primary outline-none focus:border-primary"
              aria-label="Select round type"
            >
              <option value="">Select round type</option>
              {AI_SEARCH_ROUNDS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
            <input
              value={aiTopic}
              onChange={(event) => setAiTopic(event.target.value)}
              placeholder="Search a topic, e.g. React hooks, SQL joins, RAG evaluation"
              className="rounded-full border border-blueprint-line bg-card px-4 py-3 text-body-md text-primary outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={!aiRoundType || !aiTopic.trim() || aiLoading}
              className="rounded-full bg-primary px-6 py-3 text-ui-label text-white transition-colors hover:bg-[#303031] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {aiLoading ? 'Generating...' : 'Search'}
            </button>
          </form>
          {aiLoading ? (
            <div className="surface-inset flex items-center gap-3 text-body-md text-primary">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-blueprint-line border-t-primary" />
              Generating questions...
            </div>
          ) : null}
          {aiError ? <p className="text-body-md text-red-600">{aiError}</p> : null}
          {aiQuestions.length ? (
            <div className="grid gap-4">
              {aiQuestions.map((item, index) => (
                <article key={`${item.question}-${index}`} className="surface-inset">
                  <p className="text-ui-label text-blueprint-muted">Question {index + 1}</p>
                  <h3 className="mt-2 text-body-lg font-semibold text-primary">{item.question}</h3>
                  <p className="mt-3 text-body-md text-primary">{item.answer}</p>
                  {item.explanation ? <p className="mt-2 text-body-md text-blueprint-muted">{item.explanation}</p> : null}
                </article>
              ))}
            </div>
          ) : null}
        </section>

        <section className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <div className="surface-card-compact">
              <p className="text-ui-label text-primary">Selected Domain</p>
              <div className="mt-3 rounded-2xl border border-blueprint-line bg-card p-4">
                <p className="text-body-lg font-semibold text-primary">{selectedStats?.label ?? DOMAIN_LABELS[domain] ?? 'Domain'}</p>
                <p className="mt-2 text-body-md text-blueprint-muted">
                  {selectedStats
                    ? `${selectedStats.total} questions currently available in this track.`
                    : 'Question counts will appear once the bank loads for this track.'}
                </p>
              </div>
              <button type="button" onClick={() => setDomainDialogOpen(true)} className="mt-3 text-ui-label text-blueprint-muted underline underline-offset-4 hover:text-primary">
                Change domain
              </button>
            </div>

            {!hasCuratedFilters ? <div className="surface-card-compact">
              <p className="text-ui-label text-primary">Round Type</p>
              <p className="mt-2 text-body-md text-blueprint-muted">
                Select one or more round types. If a combination does not exist for this domain, the results area will tell you.
              </p>
              <div className={`mt-3 flex flex-wrap gap-2 transition-opacity ${faangOnly ? 'pointer-events-none opacity-35' : ''}`}>
                <button
                  type="button"
                  disabled={faangOnly}
                  onClick={() => setSelectedTypes(ALL_QUESTION_TYPES)}
                  className={`rounded-full border px-4 py-2 text-ui-label transition-colors ${allTypesSelected ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-blueprint-muted hover:bg-[#f5f3f3] hover:text-primary dark:hover:bg-white/5'}`}
                >
                  All
                </button>
                {QUESTION_TYPES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    disabled={faangOnly}
                    onClick={() => toggleType(item.id)}
                    className={`rounded-full border px-4 py-2 text-ui-label transition-colors ${selectedTypes.includes(item.id) ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-blueprint-muted hover:bg-[#f5f3f3] hover:text-primary dark:hover:bg-white/5'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  setFaangOnly((value) => !value);
                  setSelectedTypes(ALL_QUESTION_TYPES);
                  setPage(1);
                }}
                className={`mt-4 rounded-full border px-4 py-2 text-ui-label font-semibold transition-colors ${
                  faangOnly
                    ? 'border-amber-400 bg-amber-400/10 text-amber-600 dark:border-amber-400 dark:bg-amber-400/15 dark:text-amber-300'
                    : 'border-blueprint-line bg-card text-blueprint-muted hover:border-amber-400 hover:bg-amber-400/10 hover:text-amber-600 dark:hover:border-amber-400 dark:hover:bg-amber-400/15 dark:hover:text-amber-300'
                }`}
              >
                ✦ FAANG tagged only
              </button>
            </div> : null}
          </aside>

          <section className="min-w-0 space-y-4">
            {loading && !questions.length ? null : (
              <div className="surface-card-compact flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-ui-label text-blueprint-muted">Results</p>
                  <h2 className="mt-2 text-headline-md text-primary not-italic">
                    {loading ? 'Loading…' : total ? `Showing ${rangeStart}–${rangeEnd} of ${total}` : 'No questions found'}
                  </h2>
                  <p className="mt-2 text-body-md text-blueprint-muted">
                    {loading
                      ? 'Fetching questions for the selected filters…'
                      : total
                        ? hasCuratedFilters
                          ? `${allBackendTopicsSelected ? `All ${curatedDomainLabel} topics selected.` : `${selectedBackendTopics.length} topic${selectedBackendTopics.length === 1 ? '' : 's'} selected.`} ${allBackendRoundsSelected ? `All ${curatedDomainLabel} round types selected.` : `${selectedBackendRounds.length} round type${selectedBackendRounds.length === 1 ? '' : 's'} selected.`}`
                          : `${allTypesSelected ? 'All round types selected.' : `${selectedTypes.length} round type${selectedTypes.length === 1 ? '' : 's'} selected.`}${faangOnly ? ' FAANG-only filter is active.' : ''}`
                        : 'This domain and round-type combination does not have matching questions right now. Try enabling more round types or changing the domain.'}
                  </p>
                </div>
                {!loading && totalPages > 0 ? (
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPage((current) => Math.max(1, current - 1))}
                      disabled={page <= 1}
                      className="rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/5"
                    >
                      Previous
                    </button>
                    <span className="text-ui-label text-blueprint-muted">
                      {page} / {totalPages}
                    </span>
                    <button
                      type="button"
                      onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                      disabled={page >= totalPages}
                      className="rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-white/5"
                    >
                      Next
                    </button>
                  </div>
                ) : null}
              </div>
            )}

            {hasCuratedFilters ? (
              <div className="surface-card-compact space-y-5">
                <div>
                  <p className="text-ui-label text-primary">Topic</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBackendTopics([])}
                      className={`rounded-full border px-4 py-2 text-ui-label transition-colors ${allBackendTopicsSelected ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-blueprint-muted hover:bg-[#f5f3f3] hover:text-primary dark:hover:bg-white/5'}`}
                    >
                      All
                    </button>
                    {curatedTopics.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => toggleBackendTopic(topic)}
                        className={`rounded-full border px-4 py-2 text-ui-label transition-colors ${selectedBackendTopics.includes(topic) ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-blueprint-muted hover:bg-[#f5f3f3] hover:text-primary dark:hover:bg-white/5'}`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-ui-label text-primary">Round Type</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBackendRounds([])}
                      className={`rounded-full border px-4 py-2 text-ui-label transition-colors ${allBackendRoundsSelected ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-blueprint-muted hover:bg-[#f5f3f3] hover:text-primary dark:hover:bg-white/5'}`}
                    >
                      All
                    </button>
                    {CURATED_ROUND_FILTERS
                      .filter((item) => !(domain === 'ai-ml' && item.id === 'fundamentals'))
                      .map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleBackendRound(item.id)}
                        className={`rounded-full border px-4 py-2 text-ui-label transition-colors ${selectedBackendRounds.includes(item.id) ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-blueprint-muted hover:bg-[#f5f3f3] hover:text-primary dark:hover:bg-white/5'}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}

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
            {!loading && !error && !questions.length ? (
              <div className="surface-card text-body-md text-blueprint-muted">
                No questions found.
              </div>
            ) : null}

            {!loading && !error ? (() => {
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
                    <pre className="surface-inset mt-4 max-w-full overflow-x-auto whitespace-pre-wrap wrap-break-word text-[13px] leading-6 text-blueprint-muted sm:whitespace-pre"><code className="block min-w-0">{question.codeSnippet}</code></pre>
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
                        {hasCodeBlock(question.correctAnswer) ? (
                          <div className="mt-3 space-y-3">
                            {parseAnswerSegments(question.correctAnswer).map((seg, si) =>
                              seg.kind === 'code' ? (
                                <pre key={si} className="max-w-full overflow-x-auto whitespace-pre-wrap wrap-break-word rounded-lg border border-blueprint-line bg-[#f8f7f5] p-3 text-[0.78rem] leading-relaxed text-primary sm:whitespace-pre dark:bg-white/5">
                                  <code className="block min-w-0">{seg.code}</code>
                                </pre>
                              ) : (
                                <ul key={si} className="space-y-1.5 text-body-md text-primary">
                                  {toPoints(seg.text, { allowCommaFallback: question.type !== 'coding' }).map((point, pi) => (
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
                            {toPoints(question.correctAnswer, { allowCommaFallback: question.type !== 'coding' }).map((point, pi) => (
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
          </section>
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
    {domainMismatchMessage ? (
      <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl border border-blueprint-line bg-card p-6 text-center shadow-2xl">
          <p className="text-ui-label text-blueprint-muted">Domain mismatch</p>
          <p className="mt-3 text-body-md text-primary">
            {domainMismatchMessage || 'This topic appears to be from a different domain. Please search within your selected domain.'}
          </p>
          <button type="button" onClick={() => setDomainMismatchMessage(null)} className="mt-5 rounded-full bg-primary px-5 py-2.5 text-ui-label text-white transition-colors hover:bg-[#303031]">
            OK
          </button>
        </div>
      </div>
    ) : null}
    </>
  );
}
