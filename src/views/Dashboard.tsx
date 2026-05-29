import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, ChartPie, CheckCircle2, Github, Heart, LoaderCircle, Play, Search, TrendingUp, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getGithubScanJob, listGithubRepos } from '../lib/githubRepos';
import { fetchLatestRoundAttemptSummary, type StoredRoundAttempt } from '../lib/questionBankApi';
import { fetchPracticeSessions, type PracticeSessionSummary } from '../lib/practiceSessions';
import { BackgroundRippleEffect } from '../components/ui/background-ripple-effect';
import {
  DOMAIN_LABELS,
  getDomainFamily,
} from '../lib/prep';
import { usePrepWorkspace } from '../hooks/usePrepWorkspace';
import { apiUrl } from '../lib/apiBase';

type Recommendation = {
  initials: string;
  title: string;
  meta: string;
  reason: string;
  route: string;
};

type ActivityRow = { activity_date: string; total: number };

type DomainStatsItem = {
  domain: string;
  label: string;
  attempted: number;
  correctRate: number;
  activityShare: number;
  sessions: number;
};

type DomainStatsPayload = {
  overallReadiness: number;
  totalAttempts: number;
  domains: DomainStatsItem[];
  strongestDomain: DomainStatsItem | null;
};

const DOMAIN_CHART_COLORS = ['#10b981', '#2563eb', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6', '#f97316'];

function activityFillStyle(count: number): React.CSSProperties {
  if (count <= 0) return { backgroundColor: 'transparent' };
  return { backgroundColor: `rgba(34, 197, 94, ${Math.min(0.95, 0.35 + count * 0.18)})` };
}

function ReadinessTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const value = Number(payload[0]?.value ?? 0);
  return (
    <div className="rounded-xl border border-blueprint-line bg-card px-3 py-2 text-sm text-primary shadow-xl">
      <p className="font-semibold">{label}</p>
      <p className="text-blueprint-muted">Score: {Number.isFinite(value) ? Math.round(value) : 0}%</p>
    </div>
  );
}

function ActivityTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const total = Number(payload[0]?.value ?? 0);
  return (
    <div className="rounded-xl border border-blueprint-line bg-card px-3 py-2 text-sm text-primary shadow-xl">
      <p className="font-semibold">{label}</p>
      <p className="text-blueprint-muted">{total} completed session{total === 1 ? '' : 's'}</p>
    </div>
  );
}

function DomainStatsTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const item = payload[0]?.payload as DomainStatsItem | undefined;
  if (!item) return null;
  return (
    <div className="rounded-xl border border-blueprint-line bg-card px-3 py-2 text-sm text-primary shadow-xl">
      <p className="font-semibold">{item.label}</p>
      <p className="text-blueprint-muted">{item.attempted} attempts - {item.activityShare}% of activity</p>
    </div>
  );
}

function renderDomainPieLabel(props: any) {
  const name = String(props.name ?? '');
  const percent = Math.round(Number(props.percent ?? 0) * 100);
  if (!percent) return null;
  return (
    <text x={props.x} y={props.y} fill="var(--color-primary)" textAnchor="middle" dominantBaseline="central" fontSize={12}>
      {`${name} ${percent}%`}
    </text>
  );
}

function buildRecommendations(domain: string): Recommendation[] {
  switch (domain) {
    case 'backend':
      return [
        { initials: 'AP', title: 'API Design Round', meta: 'Contracts, retries, and safe writes', reason: 'Recommended because backend prep often exposes API tradeoff gaps first.', route: '/coding-round' },
        { initials: 'SC', title: 'Backend Scenario Round', meta: 'Idempotency, rate limits, and observability', reason: 'Recommended because scenario rounds create the strongest signal for readiness.', route: '/scenario-round' },
        { initials: 'QB', title: 'Backend Question Bank', meta: 'Focused backend prompts only', reason: 'Recommended to widen coverage before your next timed round.', route: '/question-bank?type=all' },
      ];
    case 'full-stack':
      return [
        { initials: 'FS', title: 'Full Stack Build Round', meta: 'UI state, API contracts, and persistence', reason: 'Recommended because cross-layer reasoning is core to this domain.', route: '/coding-round' },
        { initials: 'DB', title: 'Cross-layer Debugging', meta: 'Trace client, server, and data flow', reason: 'Recommended to practice diagnosing failures end to end.', route: '/scenario-round' },
        { initials: 'QB', title: 'Full Stack Question Bank', meta: 'Questions for your selected domain', reason: 'Recommended to broaden coverage before timed practice.', route: '/question-bank?type=all' },
      ];
    case 'ai-ml':
      return [
        { initials: 'ML', title: 'Model Reasoning Round', meta: 'Metrics, failures, and tradeoffs', reason: 'Recommended because evaluation tradeoffs are common interview probes.', route: '/coding-round' },
        { initials: 'RT', title: 'Retrieval Scenario Round', meta: 'Chunking, ranking, and evaluation', reason: 'Recommended to connect model behavior with system design choices.', route: '/scenario-round' },
        { initials: 'QB', title: 'AI / ML Question Bank', meta: 'RAG, model, and pipeline prompts', reason: 'Recommended to cover fundamentals before deeper rounds.', route: '/question-bank?type=all' },
      ];
    case 'devops':
      return [
        { initials: 'CI', title: 'CI/CD Round', meta: 'Pipelines, deploy safety, and rollback', reason: 'Recommended because release safety is a high-signal DevOps area.', route: '/coding-round' },
        { initials: 'IR', title: 'Incident Scenario Round', meta: 'Observability and production response', reason: 'Recommended to build incident narration and prioritization.', route: '/scenario-round' },
        { initials: 'QB', title: 'DevOps Question Bank', meta: 'Infrastructure and reliability prompts', reason: 'Recommended to keep platform coverage balanced.', route: '/question-bank?type=all' },
      ];
    case 'data':
      return [
        { initials: 'ET', title: 'Pipeline Design Round', meta: 'Batch, streaming, and quality checks', reason: 'Recommended because pipeline tradeoffs reveal practical judgment.', route: '/coding-round' },
        { initials: 'DQ', title: 'Data Scenario Round', meta: 'Warehouse drift and recovery', reason: 'Recommended to practice handling imperfect production data.', route: '/scenario-round' },
        { initials: 'QB', title: 'Data Question Bank', meta: 'Data engineering prompts only', reason: 'Recommended to sharpen the areas you have not attempted yet.', route: '/question-bank?type=all' },
      ];
    case 'security':
      return [
        { initials: 'AT', title: 'Application Threat Review', meta: 'Auth, trust boundaries, and attack surfaces', reason: 'Recommended because threat modeling gives clear interview signal.', route: '/scenario-round' },
        { initials: 'SB', title: 'Secure Build Round', meta: 'Fix unsafe frontend and API behavior', reason: 'Recommended to turn security knowledge into implementation choices.', route: '/coding-round' },
        { initials: 'QB', title: 'Cybersecurity Question Bank', meta: 'Security-focused prompts for this track', reason: 'Recommended to keep coverage broad across security domains.', route: '/question-bank?type=all' },
      ];
    default:
      return [
        { initials: 'FE', title: 'Frontend Machine Coding', meta: 'State flow, async UI, and edge cases', reason: 'Recommended because machine coding is high leverage for frontend interviews.', route: '/coding-round' },
        { initials: 'RD', title: 'React Debugging Round', meta: 'Effects, stale state, and fixes', reason: 'Recommended to practice explaining fixes, not just naming concepts.', route: '/scenario-round' },
        { initials: 'QB', title: 'Frontend Question Bank', meta: 'Component and browser prompts only', reason: 'Recommended to keep topic coverage broad this week.', route: '/question-bank?type=all' },
      ];
  }
}

function insightFromAttempt(attempt?: StoredRoundAttempt | null) {
  if (!attempt) return null;
  const results = Array.isArray(attempt.results) ? attempt.results : [];
  const missed = results.filter((result) => !result.isCorrect);
  const focus = missed[0]?.topic ?? (Array.isArray(attempt.focusAreas) ? attempt.focusAreas[0] : undefined);
  if (!focus) return null;
  return {
    title: `${focus} needs the next focused drill.`,
    body: attempt.summary || `Latest ${attempt.roundType.replace('-', ' ')} score: ${attempt.score}%.`,
    timestamp: new Date(attempt.submittedAt ?? attempt.startedAt).toLocaleDateString(),
  };
}

function insightFromPracticeSession(session: PracticeSessionSummary) {
  const focus = session.weakTags[0];
  if (!focus || session.score === null) return null;
  return {
    title: `${focus} needs another practice pass.`,
    body: `${session.topic} finished at ${session.score}%. Saved practice sessions now feed your gap review and readiness score.`,
    timestamp: new Date(session.completedAt ?? session.generatedAt).toLocaleDateString(),
  };
}

function weightedAverage(scores: number[]) {
  const validScores = scores.filter((score) => Number.isFinite(score));
  const weights = [1, 0.86, 0.72, 0.58, 0.44];
  const slice = validScores.slice(0, weights.length);
  const totalWeight = slice.reduce((sum, _score, index) => sum + weights[index], 0);
  if (!slice.length || !totalWeight) return null;
  const weighted = slice.reduce((sum, score, index) => sum + (score * weights[index]), 0);
  return Math.round(weighted / totalWeight);
}

function daysForMonth(monthKey: string, activityByDate: Map<string, number>) {
  const [year, month] = monthKey.split('-').map(Number);
  if (!year || !month) return [];
  const first = new Date(year, month - 1, 1);
  const last = new Date(year, month, 0);
  return Array.from({ length: last.getDate() }, (_item, index) => {
    const date = new Date(year, month - 1, index + 1);
    const key = date.toISOString().slice(0, 10);
    return { key, date, count: activityByDate.get(key) ?? 0 };
  });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const workspace = usePrepWorkspace();
  const [repoCount, setRepoCount] = useState(0);
  const [attempts, setAttempts] = useState<StoredRoundAttempt[]>([]);
  const [practiceSessions, setPracticeSessions] = useState<PracticeSessionSummary[]>([]);
  const [quickStartOpen, setQuickStartOpen] = useState(false);
  const [goalOpen, setGoalOpen] = useState(false);
  const [consistencyOpen, setConsistencyOpen] = useState(false);
  const [readinessOpen, setReadinessOpen] = useState(false);
  const [domainStatsOpen, setDomainStatsOpen] = useState(false);
  const [heatmapRange, setHeatmapRange] = useState(30);
  const [heatmapMonth, setHeatmapMonth] = useState('recent');
  const [activityRows, setActivityRows] = useState<ActivityRow[]>([]);
  const [domainStats, setDomainStats] = useState<DomainStatsPayload | null>(null);
  const [hoveredActivity, setHoveredActivity] = useState<{ key: string; date: Date; count: number } | null>(null);
  const [activePracticeId, setActivePracticeId] = useState<string | null>(null);
  const [quickRoute, setQuickRoute] = useState('/scenario-round');
  const [loadingRepos, setLoadingRepos] = useState(true);
  const [loadingAttempts, setLoadingAttempts] = useState(true);
  const [loadingPractice, setLoadingPractice] = useState(true);
  const plan = workspace.prepPlan;
  const domain = workspace.selections.domain;
  const domainFamily = getDomainFamily(domain);
  const domainLabel = DOMAIN_LABELS[domain] ?? 'Frontend';
  const focusAreas = plan?.focusAreas?.slice(0, 3) ?? [];
  const recommendations = buildRecommendations(domainFamily);
  const currentDomainPracticeSessions = useMemo(
    () => practiceSessions.filter((session) => session.domain === domain && session.score !== null),
    [domain, practiceSessions],
  );
  const latestSignals = useMemo(() => ([
    ...attempts.map((attempt) => ({ score: attempt.score, timestamp: attempt.submittedAt ?? attempt.startedAt })),
    ...currentDomainPracticeSessions.map((session) => ({ score: session.score ?? 0, timestamp: session.completedAt ?? session.generatedAt })),
  ].sort((left, right) => new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime())), [attempts, currentDomainPracticeSessions]);
  const activityByDate = useMemo(() => {
    const map = new Map<string, number>();
    for (const signal of latestSignals) {
      const key = new Date(signal.timestamp).toISOString().slice(0, 10);
      map.set(key, (map.get(key) ?? 0) + 1);
    }
    for (const row of activityRows) {
      const key = new Date(row.activity_date).toISOString().slice(0, 10);
      map.set(key, Number(row.total ?? 0));
    }
    return map;
  }, [activityRows, latestSignals]);
  const heatmapDays = useMemo(() => {
    const today = new Date();
    return Array.from({ length: heatmapRange }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (heatmapRange - 1 - index));
      const key = date.toISOString().slice(0, 10);
      return { key, date, count: activityByDate.get(key) ?? 0 };
    });
  }, [activityByDate, heatmapRange]);
  const heatmapMonthOptions = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 6 }, (_item, index) => {
      const date = new Date(today.getFullYear(), today.getMonth() - index, 1);
      const value = date.toISOString().slice(0, 7);
      return {
        value,
        label: date.toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      };
    });
  }, []);
  const displayedHeatmapDays = useMemo(() => {
    if (heatmapMonth === 'recent') return heatmapDays;
    return daysForMonth(heatmapMonth, activityByDate);
  }, [activityByDate, heatmapDays, heatmapMonth]);
  const activityTrendData = useMemo(() => {
    return heatmapDays.slice(-14).map((day) => ({
      label: day.date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      shortLabel: day.date.toLocaleDateString('en-IN', { day: '2-digit' }),
      total: day.count,
    }));
  }, [heatmapDays]);
  const latestScore = latestSignals[0]?.score;
  const calculatedScore = weightedAverage(latestSignals.map((signal) => signal.score));
  const hasAnyActivity = attempts.length > 0 || currentDomainPracticeSessions.length > 0;
  const prepScore = hasAnyActivity ? Math.min(96, Math.max(0, calculatedScore ?? latestScore ?? 0)) : 0;
  const previousScore = latestSignals[1]?.score ?? Math.max(42, prepScore - 12);
  const scoreDelta = prepScore - previousScore;
  const sparkline = [prepScore - 10, prepScore - 8, prepScore - 6, prepScore - 5, prepScore - 3, previousScore, prepScore].map((score) => Math.min(96, Math.max(38, score)));
  const domainBreakdown = useMemo(() => {
    const aggregates = new Map<string, { total: number; count: number }>();
    for (const session of practiceSessions) {
      if (session.score === null) continue;
      const bucket = aggregates.get(session.domain) ?? { total: 0, count: 0 };
      bucket.total += session.score;
      bucket.count += 1;
      aggregates.set(session.domain, bucket);
    }
    const items = [...aggregates.entries()]
      .map(([domainId, aggregate]) => ({
        label: DOMAIN_LABELS[domainId] ?? domainId,
        value: Math.round(aggregate.total / Math.max(aggregate.count, 1)),
      }))
      .sort((left, right) => right.value - left.value);
    if (items.length) return items.slice(0, 4);

    const practiceAverage = currentDomainPracticeSessions.length
      ? Math.round(currentDomainPracticeSessions.reduce((sum, session) => sum + (session.score ?? 0), 0) / currentDomainPracticeSessions.length)
      : Math.max(42, prepScore - 10);
    const timedAverage = attempts.length
      ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.score, 0) / attempts.length)
      : Math.max(40, prepScore - 14);

    return [
      { label: domainLabel, value: prepScore },
      { label: 'Practice Sessions', value: practiceAverage },
      { label: 'Timed Rounds', value: timedAverage },
    ];
  }, [attempts, currentDomainPracticeSessions, domainLabel, practiceSessions, prepScore]);
  const readinessChartData = useMemo(() => {
    const timedAverage = attempts.length
      ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.score, 0) / attempts.length)
      : 0;
    const practiceAverage = currentDomainPracticeSessions.length
      ? Math.round(currentDomainPracticeSessions.reduce((sum, session) => sum + (session.score ?? 0), 0) / currentDomainPracticeSessions.length)
      : 0;
    const consistencyScore = heatmapDays.length
      ? Math.min(100, Math.round((heatmapDays.filter((day) => day.count > 0).length / Math.min(30, heatmapDays.length)) * 100))
      : 0;
    return [
      { name: 'Timed rounds', value: timedAverage, fill: '#10b981' },
      { name: 'Practice sessions', value: practiceAverage, fill: '#059669' },
      { name: 'Consistency', value: consistencyScore, fill: '#34d399' },
    ];
  }, [attempts, currentDomainPracticeSessions, heatmapDays]);
  const domainActivityChartData = useMemo(() => {
    return (domainStats?.domains ?? []).filter((item) => item.attempted > 0);
  }, [domainStats]);
  const insights = useMemo(() => {
    const practiceInsights = currentDomainPracticeSessions.map(insightFromPracticeSession).filter(Boolean) as Array<{ title: string; body: string; timestamp: string }>;
    const roundInsights = attempts.map(insightFromAttempt).filter(Boolean) as Array<{ title: string; body: string; timestamp: string }>;
    return [...practiceInsights, ...roundInsights].slice(0, 4);
  }, [attempts, currentDomainPracticeSessions]);
  const gapTopics = useMemo(() => {
    const fromPracticeSessions = currentDomainPracticeSessions.flatMap((session) => Array.isArray(session.weakTags) ? session.weakTags : []);
    const fromAttempts = attempts.flatMap((attempt) => Array.isArray(attempt.focusAreas) ? attempt.focusAreas : []);
    const fromResults = attempts.flatMap((attempt) => Array.isArray(attempt.results) ? attempt.results.filter((result) => !result.isCorrect).map((result) => result.topic) : []);
    return Array.from(new Set([...fromPracticeSessions, ...fromAttempts, ...fromResults])).slice(0, 4);
  }, [attempts, currentDomainPracticeSessions]);

  useEffect(() => {
    let ignore = false;
    setLoadingRepos(true);
    void listGithubRepos().then((data) => {
      if (ignore) return;
      setLoadingRepos(false);
      setRepoCount(data.repos.length);
      data.pendingJobs.forEach((job) => {
        void getGithubScanJob(job.id).catch(() => null);
      });
    }).catch(() => {
      if (!ignore) setLoadingRepos(false);
    });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    fetch(apiUrl('/api/activity/heatmap?days=60'), { credentials: 'include' })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load activity.')))
      .then((payload) => {
        if (!ignore) setActivityRows(Array.isArray(payload.rows) ? payload.rows : []);
      })
      .catch(() => {
        if (!ignore) setActivityRows([]);
      });
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    fetch(apiUrl('/api/dashboard/domain-stats'), { credentials: 'include' })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error('Unable to load domain stats.')))
      .then((payload: DomainStatsPayload) => {
        if (!ignore) setDomainStats(payload);
      })
      .catch(() => {
        if (!ignore) setDomainStats(null);
      });
    return () => {
      ignore = true;
    };
  }, [domain]);

  useEffect(() => {
    try {
      setActivePracticeId(window.localStorage.getItem('repoid-active-practice-session'));
    } catch {
      setActivePracticeId(null);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    setLoadingAttempts(true);
    void fetchLatestRoundAttemptSummary(domain).then((result) => {
      if (ignore) return;
      setLoadingAttempts(false);
      setAttempts(result.ok ? (result.data ?? []).filter((attempt) => attempt.domain === domain) : []);
    }).catch(() => {
      if (!ignore) setLoadingAttempts(false);
    });
    return () => {
      ignore = true;
    };
  }, [domain]);

  useEffect(() => {
    let ignore = false;
    setLoadingPractice(true);
    void fetchPracticeSessions({ savedOnly: true }).then((result) => {
      if (ignore) return;
      setLoadingPractice(false);
      if (result.ok === false) return;
      setPracticeSessions(result.data);
    }).catch(() => {
      if (!ignore) setLoadingPractice(false);
    });
    return () => {
      ignore = true;
    };
  }, []);

  const startQuickRound = () => {
    setQuickStartOpen(false);
    navigate(quickRoute);
  };

  return (
    <div className="min-h-full bg-background">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
      <div className="pointer-events-none fixed inset-0 opacity-20">
        <BackgroundRippleEffect rows={10} cols={28} cellSize={66} />
      </div>
      <main className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 pb-14 pt-6 sm:px-6 lg:px-10">
        <section className="border-b border-blueprint-line/80 pb-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="page-title">Dashboard</h1>
              <p className="mt-3 text-body-lg text-blueprint-muted">
                Your {domainLabel.toLowerCase()} workspace.
              </p>
            </div>
            <button type="button" onClick={() => setQuickStartOpen(true)} className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-3 text-ui-label text-white transition-colors hover:bg-[#303031]">
              <Play size={15} /> Start Round
            </button>
          </div>
        </section>

        <button type="button" onClick={() => navigate('/github-repos')} className={repoCount > 0 ? 'surface-card saved-highlight text-left transition-colors hover:bg-white/85' : 'surface-card text-left transition-colors hover:bg-white/85'}>
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3 text-ui-label text-blueprint-muted">
                <Github size={18} />
                <span className="text-primary repo-scanner-title">GitHub Repo Scanner for Interviews</span>
              </div>
              <h2 className="mt-3 text-headline-md text-primary not-italic">Generate repo-specific interview questions.</h2>
              <p className="mt-2 max-w-3xl text-body-md text-blueprint-muted">
                Open the scanner to analyze public repositories or connected private repositories.
              </p>
            </div>
            <span className="search-arrow-hover inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-ui-label text-white">
              Open Scanner <ArrowRight size={15} />
            </span>
          </div>
          <div className="mt-4 flex items-start gap-2 text-blueprint-muted">
            {loadingRepos ? (
              <span className="loading-state"><LoaderCircle size={15} className="animate-spin" /> Loading...</span>
            ) : (
              <>
                <Search size={16} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-ui-label">{repoCount} repos scanned yet</p>
                  {repoCount === 0 ? <p className="mt-1 text-sm">Open the scanner to get started</p> : null}
                </div>
              </>
            )}
          </div>
        </button>

        {(loadingAttempts || loadingPractice) ? (
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-blueprint-muted">
            <LoaderCircle size={15} className="animate-spin" /> Loading...
          </div>
        ) : null}

        <section className="surface-card">
          <div className="border-b border-blueprint-line pb-4">
            <p className="text-ui-label text-blueprint-muted">Prep Readiness</p>
            <h2 className="mt-1 text-headline-md text-primary not-italic">How your score is calculated</h2>
            <p className="mt-2 text-body-md text-blueprint-muted">Updated from your latest scored rounds, saved practice sessions, weak tags, and activity.</p>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
            <div className="surface-inset">
              <p className="text-ui-label text-blueprint-muted">Overall</p>
              <p className="mt-3 font-serif text-[56px] leading-none text-primary">
                {prepScore}<span className="align-super text-lg font-sans text-blueprint-muted">%</span>
              </p>
              <div className="mt-4 flex h-10 items-end gap-1" aria-label="Last 7 days readiness trend">
                {sparkline.map((score, index) => (
                  <span key={`${score}-${index}`} className="prep-readiness-bar w-2 rounded-full" style={{ height: `${Math.max(10, score / 2.4)}px` }} />
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1 rounded-full border border-blueprint-line bg-[#f5f3f3] px-3 py-1.5 text-ui-label text-primary">
                <TrendingUp size={13} /> {scoreDelta >= 0 ? '+' : ''}{scoreDelta}% from last week
              </span>
            </div>
            <div className="surface-inset min-h-[260px]">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={readinessChartData} margin={{ top: 12, right: 12, left: -24, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: 'var(--color-primary)', fontSize: 12 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: 'var(--color-primary)', fontSize: 12 }} />
                  <Tooltip cursor={{ fill: 'rgba(16,185,129,0.08)' }} content={<ReadinessTooltip />} />
                  <Bar dataKey="value" minPointSize={4} radius={[8, 8, 0, 0]}>
                    {readinessChartData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="surface-inset">
              <p className="text-body-md text-primary">
                Formula: the latest five scored signals are averaged with descending weights of 100%, 86%, 72%, 58%, and 44%. Timed rounds and completed practice sessions both count, then weak tags and activity explain what to work on next.
              </p>
            </div>
            <div className="surface-inset h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={readinessChartData} dataKey="value" innerRadius={42} outerRadius={70} paddingAngle={3}>
                    {readinessChartData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                  </Pie>
                  <Tooltip content={<ReadinessTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="surface-card">
          <div className="flex flex-col gap-4 border-b border-blueprint-line pb-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-ui-label text-blueprint-muted">Consistency</p>
              <h2 className="mt-1 text-headline-md text-primary not-italic">Activity heatmap</h2>
              <p className="mt-2 text-body-md text-blueprint-muted">Brighter green squares mean more completed practice activity on that date.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                [7, '7 days'],
                [15, '15 days'],
                [30, '30 days'],
                [60, '2 months'],
              ].map(([days, label]) => (
                <button
                  key={String(days)}
                  type="button"
                  onClick={() => { setHeatmapMonth('recent'); setHeatmapRange(Number(days)); }}
                  className={`rounded-full border px-3 py-2 text-ui-label ${heatmapMonth === 'recent' && heatmapRange === days ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-primary'}`}
                >
                  {label}
                </button>
              ))}
              <select
                value={heatmapMonth}
                onChange={(event) => setHeatmapMonth(event.target.value)}
                className="rounded-full border border-blueprint-line bg-card px-3 py-2 text-ui-label text-primary outline-none"
                aria-label="Filter activity heatmap by month"
              >
                <option value="recent">Recent</option>
                {heatmapMonthOptions.map((month) => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="relative mt-5 grid gap-1" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(18px, 1fr))' }}>
            {displayedHeatmapDays.map((day) => (
              <span
                key={day.key}
                onMouseEnter={() => setHoveredActivity(day)}
                onMouseLeave={() => setHoveredActivity(null)}
                onFocus={() => setHoveredActivity(day)}
                onBlur={() => setHoveredActivity(null)}
                tabIndex={0}
                title={`${day.date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}: ${day.count} session${day.count === 1 ? '' : 's'}`}
                className="aspect-square rounded-sm border border-blueprint-line bg-transparent outline-none"
                style={activityFillStyle(day.count)}
              />
            ))}
            {hoveredActivity ? (
              <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-xl border border-blueprint-line bg-card px-3 py-2 text-xs text-primary shadow-xl">
                <p className="font-semibold">{hoveredActivity.date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                <p className="text-blueprint-muted">{hoveredActivity.count === 0 ? 'No activity' : `${hoveredActivity.count} session${hoveredActivity.count === 1 ? '' : 's'}`}</p>
              </div>
            ) : null}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-4">
          <button type="button" onClick={() => setGoalOpen(true)} className="surface-card text-left transition-colors hover:bg-white/85">
            <p className="text-ui-label text-blueprint-muted">Daily Goal</p>
            <div className="mt-4 flex items-start gap-3">
              <CheckCircle2 size={24} className={hasAnyActivity ? 'text-emerald-600' : 'text-blueprint-muted'} />
              <div>
                <p className="text-body-md font-medium text-primary">Today's goal: complete 1 session</p>
                <p className="mt-1 text-body-md text-blueprint-muted">{hasAnyActivity ? 'Goal filled by your latest round or saved practice session.' : 'One saved practice session or timed round will complete this for today.'}</p>
              </div>
            </div>
          </button>
          <button type="button" onClick={() => navigate('/practice-tracks')} className="surface-card text-left transition-colors hover:bg-white/85">
            <p className="text-ui-label text-blueprint-muted">Gap Review</p>
            <p className="mt-4 text-headline-md text-primary not-italic">Current weak areas</p>
            {gapTopics.length ? (
              <div className="mt-4 grid gap-2">
                {gapTopics.slice(0, 3).map((topic, index) => (
                  <div key={topic} className="rounded-lg border border-blueprint-line bg-blueprint-bg px-3 py-2">
                    <p className="text-ui-label text-blueprint-muted">Priority {index + 1}</p>
                    <p className="mt-1 truncate text-body-md text-primary">{topic}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-body-md text-blueprint-muted">Complete your first round to see your weak areas.</p>
            )}
          </button>
          <button type="button" onClick={() => setDomainStatsOpen(true)} className="surface-card text-left transition-colors hover:bg-white/85 dark:hover:bg-white/5">
            <p className="text-ui-label text-blueprint-muted">Domain Stats</p>
            <div className="mt-3 flex items-start gap-3">
              <ChartPie size={22} className="mt-0.5 text-emerald-600 dark:text-emerald-300" />
              <div>
                <span className="inline-flex items-center gap-2 text-body-md font-medium text-primary">
                  {domainLabel} <ArrowRight size={14} />
                </span>
                <p className="mt-1 text-body-md text-blueprint-muted">
                  {domainStats?.totalAttempts ? `${domainStats.totalAttempts} total attempts tracked.` : 'Open stats after completing sessions.'}
                </p>
              </div>
            </div>
          </button>
          <article className="surface-card">
            <p className="text-ui-label text-blueprint-muted">Mock Interview</p>
            <div className="mt-4 flex gap-3">
              <CalendarDays size={22} className="text-blueprint-muted" />
              <p className="text-body-md text-primary">Add your interview date later; for now, focus on one scenario and one review round this week.</p>
            </div>
          </article>
        </section>

        <section className="surface-card">
          <div className="border-b border-blueprint-line pb-4">
            <p className="text-ui-label text-blueprint-muted">Live Activity</p>
            <h2 className="mt-1 text-headline-md text-primary not-italic">Recent sessions</h2>
            <p className="mt-2 text-body-md text-blueprint-muted">Updated from your latest saved sessions and timed round completions.</p>
          </div>
          <div className="mt-5 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityTrendData} margin={{ top: 8, right: 12, left: -24, bottom: 0 }}>
                <XAxis dataKey="shortLabel" tick={{ fill: 'var(--color-primary)', fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fill: 'var(--color-primary)', fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'rgba(16,185,129,0.08)' }} content={<ActivityTooltip />} />
                <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                  {activityTrendData.map((entry, index) => (
                    <Cell key={`${entry.label}-${index}`} fill={entry.total > 0 ? '#22c55e' : 'transparent'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>



        {insights.length || focusAreas.length ? (
          <section className="surface-card">
            <div className="border-b border-blueprint-line pb-4">
              <p className="text-ui-label text-blueprint-muted"></p>
              <h2 className="mt-1 text-headline-md text-primary not-italic">What we observed</h2>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {insights.map((signal) => (
                <div key={`${signal.title}-${signal.timestamp}`} className="surface-inset">
                  <p className="text-body-md font-medium text-primary">{signal.title}</p>
                  <p className="mt-2 text-body-md text-blueprint-muted">{signal.body}</p>
                  <span className="mt-3 inline-block rounded border border-blueprint-line bg-[#f5f3f3] px-2 py-1 text-ui-label text-blueprint-muted">
                    {signal.timestamp}
                  </span>
                </div>
              ))}
              {!insights.length && focusAreas.map((focus) => (
                <div key={focus} className="surface-inset">
                  <p className="text-body-md font-medium text-primary">{focus}</p>
                  <p className="mt-2 text-body-md text-blueprint-muted">Generated from your saved prep plan.</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="surface-card">
          <div className="mb-5 flex items-end justify-between border-b border-blueprint-line pb-4">
            <div>
              <p className="text-ui-label text-blueprint-muted"></p>
              <h2 className="mt-1 text-headline-md text-primary not-italic">Next best modules</h2>
            </div>
          </div>
          <div className="grid gap-3 lg:grid-cols-3">
            {recommendations.map((item) => (
              <button key={item.title} type="button" onClick={() => navigate(item.route)} className="flex items-center gap-4 rounded-xl border border-blueprint-line bg-[#fbf9f9] p-4 text-left transition-colors hover:bg-white">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#efeded] text-ui-label text-primary">
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-body-md font-medium text-primary">{item.title}</p>
                  <p className="mt-1 text-body-md text-blueprint-muted">{item.meta}</p>
                  <p className="mt-2 text-sm leading-5 text-blueprint-muted">{item.reason}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <footer className="flex flex-col items-center justify-between gap-4 border-t border-blueprint-line py-6 text-sm text-blueprint-muted sm:flex-row">
          <div className="flex flex-wrap justify-center gap-4">
            <button type="button" onClick={() => navigate('/privacy')} className="hover:text-primary">Privacy Policy</button>
            <button type="button" onClick={() => navigate('/terms')} className="hover:text-primary">Terms</button>
            <button type="button" onClick={() => navigate('/contact')} className="hover:text-primary">Contact Us</button>
          </div>
          <p className="flex items-center gap-2">
            2026 Repoid. All rights reserved. Made by Satwik
            <Heart size={14} className="fill-[#6b4a2f] text-[#6b4a2f] dark:fill-white dark:text-white" />
          </p>
        </footer>
      </main>

      {quickStartOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-md rounded-2xl border border-blueprint-line bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-ui-label text-blueprint-muted">Quick Start</p>
                <h2 className="mt-2 text-headline-md text-primary not-italic">Pick a round type</h2>
              </div>
              <button type="button" aria-label="Close" onClick={() => setQuickStartOpen(false)} className="text-blueprint-muted hover:text-primary"><X size={18} /></button>
            </div>
            <div className="mt-5 grid gap-2">
              {[
                ['/scenario-round', 'Scenario Round'],
                ['/coding-round', 'Coding Round'],
                ['/mock-interview', 'Mock Interview'],
                ['/practice-tracks', 'Practice Session'],
              ].map(([route, label]) => (
                <button key={route} type="button" onClick={() => setQuickRoute(route)} className={`rounded-xl border px-4 py-3 text-left text-body-md ${quickRoute === route ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-[#fbf9f9] text-primary'}`}>
                  {label}
                </button>
              ))}
            </div>
            <button type="button" onClick={startQuickRound} className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-ui-label text-white">Start</button>
          </div>
        </div>
      ) : null}

      {activePracticeId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-md rounded-2xl border border-blueprint-line bg-card p-6 text-center shadow-2xl">
            <p className="text-ui-label text-blueprint-muted">Practice In Progress</p>
            <h2 className="mt-2 text-headline-md text-primary not-italic">Resume your active session?</h2>
            <p className="mt-3 text-body-md text-blueprint-muted">Your timer kept running and your saved answers will load from the same question.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button type="button" onClick={() => setActivePracticeId(null)} className="rounded-full border border-blueprint-line px-5 py-2.5 text-ui-label text-primary">
                Later
              </button>
              <button type="button" onClick={() => navigate(`/round/practice/${activePracticeId}`)} className="rounded-full bg-primary px-5 py-2.5 text-ui-label text-white">
                Resume Session
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {goalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-blueprint-line bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-ui-label text-blueprint-muted">Daily Goal</p>
                <h2 className="mt-2 text-headline-md text-primary not-italic">Complete 1 focused session today</h2>
              </div>
              <button type="button" aria-label="Close" onClick={() => setGoalOpen(false)} className="text-blueprint-muted hover:text-primary"><X size={18} /></button>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                ['Current target', 'Finish one practice session, coding round, or scenario round.'],
                ['What counts', 'A submitted round or saved completed practice session updates this card.'],
                ['Coming next', 'Custom daily goals, reminders, and per-domain targets.'],
              ].map(([label, body]) => (
                <div key={label} className="surface-inset">
                  <p className="text-ui-label text-blueprint-muted">{label}</p>
                  <p className="mt-1 text-body-md text-primary">{body}</p>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => { setGoalOpen(false); navigate('/practice-tracks'); }} className="mt-5 rounded-full bg-primary px-5 py-2.5 text-ui-label text-white">
              Start Practice
            </button>
          </div>
        </div>
      ) : null}

      {consistencyOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-2xl rounded-2xl border border-blueprint-line bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-ui-label text-blueprint-muted">Consistency</p>
                <h2 className="mt-2 text-headline-md text-primary not-italic">Activity heatmap</h2>
              </div>
              <button type="button" aria-label="Close" onClick={() => setConsistencyOpen(false)} className="text-blueprint-muted hover:text-primary"><X size={18} /></button>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                [7, 'Last 7 Days'],
                [15, 'Last 15 Days'],
                [30, 'Last 30 Days'],
                [45, 'Last 45 Days'],
                [60, 'Last 2 Months'],
              ].map(([days, label]) => (
                <button
                  key={String(days)}
                  type="button"
                  onClick={() => setHeatmapRange(Number(days))}
                  className={`rounded-full border px-3 py-2 text-ui-label ${heatmapRange === days ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-primary'}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="relative mt-5 grid gap-1" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(14px, 1fr))' }}>
              {heatmapDays.map((day) => (
                <span
                  key={day.key}
                  onMouseEnter={() => setHoveredActivity(day)}
                  onMouseLeave={() => setHoveredActivity(null)}
                  onFocus={() => setHoveredActivity(day)}
                  onBlur={() => setHoveredActivity(null)}
                  tabIndex={0}
                  className="aspect-square rounded-sm border border-blueprint-line bg-transparent outline-none"
                  style={activityFillStyle(day.count)}
                />
              ))}
              {hoveredActivity ? (
                <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-xl border border-blueprint-line bg-card px-3 py-2 text-xs text-primary shadow-xl">
                  <p className="font-semibold">{hoveredActivity.date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  <p className="text-blueprint-muted">{hoveredActivity.count === 0 ? 'No activity' : `${hoveredActivity.count} session${hoveredActivity.count === 1 ? '' : 's'}`}</p>
                </div>
              ) : null}
            </div>
            <p className="mt-4 text-body-md text-blueprint-muted">Brighter green squares mean more completed practice activity on that day.</p>
          </div>
        </div>
      ) : null}

      {domainStatsOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-blueprint-line bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-ui-label text-blueprint-muted">Domain Stats</p>
                <h2 className="mt-2 text-headline-md text-primary not-italic">{domainLabel} readiness</h2>
              </div>
              <button type="button" aria-label="Close" onClick={() => setDomainStatsOpen(false)} className="text-blueprint-muted hover:text-primary"><X size={18} /></button>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
              <div className="surface-inset">
                <p className="text-ui-label text-blueprint-muted">Overall Readiness</p>
                <p className="mt-3 font-serif text-[56px] leading-none text-primary">
                  {domainStats?.overallReadiness ?? 0}
                  <span className="align-super text-lg font-sans text-blueprint-muted">%</span>
                </p>
                <p className="mt-3 text-body-md text-blueprint-muted">
                  Based on correct answers divided by total attempted questions across all tracked sessions.
                </p>
              </div>

              <div className="surface-inset min-h-[300px]">
                <div className="flex h-full flex-col gap-4 lg:flex-row lg:items-center">
                  <div className="h-[260px] min-w-0 flex-1">
                    {domainActivityChartData.length ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={domainActivityChartData}
                            dataKey="attempted"
                            nameKey="label"
                            innerRadius={58}
                            outerRadius={92}
                            paddingAngle={3}
                            labelLine={false}
                            label={renderDomainPieLabel}
                          >
                            {domainActivityChartData.map((entry, index) => (
                              <Cell key={entry.domain} fill={DOMAIN_CHART_COLORS[index % DOMAIN_CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip content={<DomainStatsTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center p-6 text-center text-body-md text-blueprint-muted">
                        Complete more sessions to see your domain activity breakdown.
                      </div>
                    )}
                  </div>
                  <div className="grid gap-2 lg:w-56">
                    {domainActivityChartData.map((item, index) => (
                      <div key={item.domain} className="flex items-center justify-between gap-3 text-body-md">
                        <span className="flex min-w-0 items-center gap-2 text-primary">
                          <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: DOMAIN_CHART_COLORS[index % DOMAIN_CHART_COLORS.length] }} />
                          <span className="truncate">{item.label}</span>
                        </span>
                        <span className="text-blueprint-muted">{item.activityShare}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
              <div className="surface-inset">
                <p className="text-ui-label text-blueprint-muted">Strongest Domain</p>
                {domainStats?.strongestDomain ? (
                  <>
                    <p className="mt-3 text-headline-md text-primary not-italic">{domainStats.strongestDomain.label}</p>
                    <p className="mt-2 text-body-md text-blueprint-muted">
                      {domainStats.strongestDomain.correctRate}% score across {domainStats.strongestDomain.attempted} attempted question{domainStats.strongestDomain.attempted === 1 ? '' : 's'}.
                    </p>
                  </>
                ) : (
                  <p className="mt-3 text-body-md text-blueprint-muted">Complete more sessions to see your strongest domain.</p>
                )}
              </div>

              <div className="surface-inset">
                <p className="text-ui-label text-blueprint-muted">Per-domain Breakdown</p>
                {domainActivityChartData.length ? (
                  <div className="mt-4 grid gap-3">
                    {domainActivityChartData.map((item) => (
                      <div key={item.domain} className="rounded-xl border border-blueprint-line bg-card p-4">
                        <div className="flex items-center justify-between gap-3">
                          <p className="min-w-0 truncate text-body-md font-medium text-primary">{item.label}</p>
                          <span className="shrink-0 text-ui-label text-blueprint-muted">{item.correctRate}%</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-3 text-sm text-blueprint-muted">
                          <span>{item.attempted} attempt{item.attempted === 1 ? '' : 's'}</span>
                          <span>{item.sessions} session{item.sessions === 1 ? '' : 's'}</span>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-blueprint-line/40">
                          <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${Math.min(100, Math.max(0, item.correctRate))}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-body-md text-blueprint-muted">No completed session data is available yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {readinessOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
          <div className="w-full max-w-3xl rounded-2xl border border-blueprint-line bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-ui-label text-blueprint-muted">Prep Readiness</p>
                <h2 className="mt-2 text-headline-md text-primary not-italic">How your score is calculated</h2>
              </div>
              <button type="button" aria-label="Close" onClick={() => setReadinessOpen(false)} className="text-blueprint-muted hover:text-primary"><X size={18} /></button>
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
              <div className="surface-inset">
                <p className="text-ui-label text-blueprint-muted">Overall</p>
                <p className="mt-3 font-serif text-[48px] leading-none text-primary">{prepScore}<span className="align-super text-lg font-sans text-blueprint-muted">%</span></p>
                <p className="mt-3 text-body-md text-blueprint-muted">
                  Recent scored work is weighted most heavily. Empty accounts start at 0 until rounds or practice sessions create signal.
                </p>
              </div>
              <div className="surface-inset min-h-[260px]">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={readinessChartData} margin={{ top: 12, right: 12, left: -24, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fill: 'var(--color-primary)', fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fill: 'var(--color-primary)', fontSize: 12 }} />
                    <Tooltip cursor={{ fill: 'rgba(16,185,129,0.08)' }} content={<ReadinessTooltip />} />
                    <Bar dataKey="value" minPointSize={4} radius={[8, 8, 0, 0]}>
                      {readinessChartData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div className="surface-inset">
                <p className="text-body-md text-primary">
                  Formula: the latest five scored signals are averaged with descending weights of 100%, 86%, 72%, 58%, and 44%. Timed rounds and completed practice sessions both count, then weak tags and activity help explain what to work on next.
                </p>
              </div>
              <div className="surface-inset h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={readinessChartData} dataKey="value" innerRadius={42} outerRadius={70} paddingAngle={3}>
                      {readinessChartData.map((entry) => <Cell key={entry.name} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip content={<ReadinessTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      ) : null}

    </div>
  );
}
