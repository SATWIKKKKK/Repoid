import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Github, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getGithubScanJob, listGithubRepos } from '../lib/githubRepos';
import { fetchLatestRoundAttemptSummary, type StoredRoundAttempt } from '../lib/questionBankApi';
import {
  COMPANY_TYPE_LABELS,
  DOMAIN_LABELS,
  getDomainFamily,
  INTERVIEW_TYPE_LABELS,
  TIMELINE_LABELS,
} from '../lib/prep';
import { usePrepWorkspace } from '../hooks/usePrepWorkspace';

type Recommendation = {
  initials: string;
  title: string;
  meta: string;
  route: string;
};

function buildRecommendations(domain: string): Recommendation[] {
  switch (domain) {
    case 'backend':
      return [
        { initials: 'AP', title: 'API Design Round', meta: 'Contracts, retries, and safe writes', route: '/coding-round' },
        { initials: 'SC', title: 'Backend Scenario Round', meta: 'Idempotency, rate limits, and observability', route: '/scenario-round' },
        { initials: 'QB', title: 'Backend Question Bank', meta: 'Focused backend prompts only', route: '/question-bank?type=all' },
      ];
    case 'full-stack':
      return [
        { initials: 'FS', title: 'Full Stack Build Round', meta: 'UI state, API contracts, and persistence', route: '/coding-round' },
        { initials: 'DB', title: 'Cross-layer Debugging', meta: 'Trace client, server, and data flow', route: '/scenario-round' },
        { initials: 'QB', title: 'Full Stack Question Bank', meta: 'Questions for your selected domain', route: '/question-bank?type=all' },
      ];
    case 'ai-ml':
      return [
        { initials: 'ML', title: 'Model Reasoning Round', meta: 'Metrics, failures, and tradeoffs', route: '/coding-round' },
        { initials: 'RT', title: 'Retrieval Scenario Round', meta: 'Chunking, ranking, and evaluation', route: '/scenario-round' },
        { initials: 'QB', title: 'AI / ML Question Bank', meta: 'RAG, model, and pipeline prompts', route: '/question-bank?type=all' },
      ];
    case 'devops':
      return [
        { initials: 'CI', title: 'CI/CD Round', meta: 'Pipelines, deploy safety, and rollback', route: '/coding-round' },
        { initials: 'IR', title: 'Incident Scenario Round', meta: 'Observability and production response', route: '/scenario-round' },
        { initials: 'QB', title: 'DevOps Question Bank', meta: 'Infrastructure and reliability prompts', route: '/question-bank?type=all' },
      ];
    case 'data':
      return [
        { initials: 'ET', title: 'Pipeline Design Round', meta: 'Batch, streaming, and quality checks', route: '/coding-round' },
        { initials: 'DQ', title: 'Data Scenario Round', meta: 'Warehouse drift and recovery', route: '/scenario-round' },
        { initials: 'QB', title: 'Data Question Bank', meta: 'Data engineering prompts only', route: '/question-bank?type=all' },
      ];
    case 'security':
      return [
        { initials: 'AT', title: 'Application Threat Review', meta: 'Auth, trust boundaries, and attack surfaces', route: '/scenario-round' },
        { initials: 'SB', title: 'Secure Build Round', meta: 'Fix unsafe frontend and API behavior', route: '/coding-round' },
        { initials: 'QB', title: 'Cybersecurity Question Bank', meta: 'Security-focused prompts for this track', route: '/question-bank?type=all' },
      ];
    default:
      return [
        { initials: 'FE', title: 'Frontend Machine Coding', meta: 'State flow, async UI, and edge cases', route: '/coding-round' },
        { initials: 'RD', title: 'React Debugging Round', meta: 'Effects, stale state, and fixes', route: '/scenario-round' },
        { initials: 'QB', title: 'Frontend Question Bank', meta: 'Component and browser prompts only', route: '/question-bank?type=all' },
      ];
  }
}

function insightFromAttempt(attempt: StoredRoundAttempt) {
  const missed = attempt.results.filter((result) => !result.isCorrect);
  const focus = missed[0]?.topic ?? attempt.focusAreas[0];
  if (!focus) return null;
  return {
    title: `${focus} needs the next focused drill.`,
    body: attempt.summary || `Latest ${attempt.roundType.replace('-', ' ')} score: ${attempt.score}%.`,
    timestamp: new Date(attempt.submittedAt ?? attempt.startedAt).toLocaleDateString(),
  };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const workspace = usePrepWorkspace();
  const [repoCount, setRepoCount] = useState(0);
  const [attempts, setAttempts] = useState<StoredRoundAttempt[]>([]);
  const plan = workspace.prepPlan;
  const domain = workspace.selections.domain;
  const domainFamily = getDomainFamily(domain);
  const domainLabel = DOMAIN_LABELS[domain] ?? 'Frontend';
  const interviewTypeLabel = INTERVIEW_TYPE_LABELS[workspace.selections.interviewType] ?? 'Interview';
  const companyTypeLabel = COMPANY_TYPE_LABELS[workspace.selections.companyType] ?? 'Product Company';
  const timelineLabel = TIMELINE_LABELS[workspace.selections.timeline] ?? '1 week';
  const focusAreas = plan?.focusAreas.slice(0, 3) ?? [];
  const recommendations = buildRecommendations(domainFamily);
  const latestScore = attempts[0]?.score;
  const prepScore = Math.min(96, Math.max(45, latestScore ?? (plan ? 72 : 58)));
  const insights = useMemo(() => attempts.map(insightFromAttempt).filter(Boolean) as Array<{ title: string; body: string; timestamp: string }>, [attempts]);
  const gapTopics = useMemo(() => {
    const fromAttempts = attempts.flatMap((attempt) => attempt.focusAreas);
    const fromResults = attempts.flatMap((attempt) => attempt.results.filter((result) => !result.isCorrect).map((result) => result.topic));
    return Array.from(new Set([...fromAttempts, ...fromResults])).slice(0, 4);
  }, [attempts]);

  useEffect(() => {
    let ignore = false;
    void listGithubRepos().then((data) => {
      if (ignore) return;
      setRepoCount(data.repos.length);
      data.pendingJobs.forEach((job) => {
        void getGithubScanJob(job.id).catch(() => null);
      });
    }).catch(() => undefined);
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    void fetchLatestRoundAttemptSummary(domain).then((result) => {
      if (ignore) return;
      setAttempts(result.ok ? result.data.filter((attempt) => attempt.domain === domain) : []);
    }).catch(() => undefined);
    return () => {
      ignore = true;
    };
  }, [domain]);

  return (
    <div className="min-h-full bg-background">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
      <main className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-col gap-6 px-4 pb-14 pt-6 sm:px-6 lg:px-10">
        <section className="border-b border-blueprint-line/80 pb-6">
          <div className="max-w-3xl">
            <h1 className="text-display-xl text-primary">Dashboard</h1>
            <p className="mt-3 text-body-lg text-blueprint-muted">
              Your {domainLabel.toLowerCase()} {interviewTypeLabel.toLowerCase()} workspace for {companyTypeLabel.toLowerCase()} interviews over {timelineLabel.toLowerCase()}.
            </p>
          </div>
        </section>

        <button type="button" onClick={() => navigate('/github-repos')} className="surface-card text-left transition-colors hover:bg-white/85">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-3 text-ui-label text-blueprint-muted">
                <Github size={18} />
                GitHub Repo Scanner for Interviews
              </div>
              <h2 className="mt-3 text-headline-md text-primary not-italic">Generate repo-specific interview questions.</h2>
              <p className="mt-2 max-w-3xl text-body-md text-blueprint-muted">
                Open the scanner to analyze public repositories or connected private repositories.
              </p>
            </div>
            <span className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-ui-label text-white">
              Open Scanner <ArrowRight size={15} />
            </span>
          </div>
          <p className="mt-4 text-ui-label text-blueprint-muted">View {repoCount} scanned repos</p>
        </button>

        <section className="grid gap-5 lg:grid-cols-[minmax(16rem,0.85fr)_minmax(0,1.15fr)]">
          <article className="surface-card min-h-0">
            <div className="flex items-start justify-between gap-4">
              <span className="text-ui-label text-blueprint-muted">Prep Readiness</span>
              <span className="rounded-full border border-blueprint-line bg-[#f5f3f3] px-3 py-1.5 text-ui-label text-primary">
                Today
              </span>
            </div>
            <div className="mt-6 border-t border-blueprint-line pt-6">
              <p className="font-serif text-[clamp(4rem,10vw,96px)] leading-none text-primary">
                {prepScore}<span className="ml-1 text-headline-md text-blueprint-muted">%</span>
              </p>
              <p className="mt-4 text-body-md text-blueprint-muted">
                {attempts.length
                  ? `Based on your latest ${domainLabel.toLowerCase()} round attempts.`
                  : 'Start a timed round to replace this estimate with real attempt data.'}
              </p>
            </div>
          </article>

          <article id="gap-review" className="surface-card min-h-0">
            <div className="flex flex-col gap-2 border-b border-blueprint-line pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-ui-label text-blueprint-muted">Gap Review</p>
                <h2 className="mt-1 text-headline-md text-primary not-italic">Current weak areas</h2>
              </div>
              <button type="button" onClick={() => navigate('/practice-tracks')} className="w-fit rounded-full border border-blueprint-line bg-white px-4 py-2 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3]">
                Drill Gaps
              </button>
            </div>
            {gapTopics.length ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {gapTopics.map((topic, index) => (
                  <div key={topic} className="surface-inset">
                    <p className="text-ui-label text-blueprint-muted">Priority {index + 1}</p>
                    <p className="mt-1 text-body-md font-medium text-primary">{topic}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-body-md text-blueprint-muted">
                No saved round data yet. Finish a coding, scenario, or mock interview round to populate this box.
              </p>
            )}
          </article>
        </section>

        {insights.length || focusAreas.length ? (
          <section className="surface-card">
            <div className="border-b border-blueprint-line pb-4">
              <p className="text-ui-label text-blueprint-muted">Prep Insights</p>
              <h2 className="mt-1 text-headline-md text-primary not-italic">What changed from your data</h2>
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
              <p className="text-ui-label text-blueprint-muted">Recommendations</p>
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

    </div>
  );
}
