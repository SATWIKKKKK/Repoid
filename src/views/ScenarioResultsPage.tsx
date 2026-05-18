import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookmarkCheck } from 'lucide-react';
import { fetchScenarioResult, saveScenarioAttempt, type ScenarioResultAttempt } from '../lib/scenarioSessions';

function verdictConfig(score: number | null) {
  if (score === null) return { label: 'Pending', className: 'border-blueprint-line bg-card text-primary' };
  if (score >= 8) return { label: 'Strong Pass', className: 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/50 dark:bg-emerald-950/40 dark:text-emerald-300' };
  if (score >= 6) return { label: 'Pass', className: 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/50 dark:bg-sky-950/40 dark:text-sky-300' };
  if (score >= 4) return { label: 'Needs Work', className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/50 dark:bg-amber-950/40 dark:text-amber-300' };
  return { label: 'Retry', className: 'border-red-200 bg-red-50 text-red-700 dark:border-red-500/50 dark:bg-red-950/40 dark:text-red-300' };
}

export default function ScenarioResultsPage() {
  const navigate = useNavigate();
  const params = useParams<{ attemptId?: string }>();
  const attemptId = String(params.attemptId ?? '').trim();
  const [attempt, setAttempt] = useState<ScenarioResultAttempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contextOpen, setContextOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!attemptId) {
      setError('Scenario attempt id is missing.');
      setLoading(false);
      return;
    }
    let ignore = false;
    setLoading(true);
    setError(null);
    void fetchScenarioResult(attemptId).then((result) => {
      if (ignore) return;
      setLoading(false);
      if (result.ok === false) {
        setError(result.error);
        return;
      }
      setAttempt(result.data);
    });
    return () => {
      ignore = true;
    };
  }, [attemptId]);

  const scenario = attempt?.scenario ?? null;
  const verdict = useMemo(() => verdictConfig(scenario?.score ?? null), [scenario?.score]);

  return (
    <div className="min-h-full bg-background px-4 py-8 sm:px-8 lg:px-16">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
      <main className="relative z-10 mx-auto w-full max-w-6xl space-y-6">
        {loading ? (
          <section className="surface-card">
            <p className="text-body-md text-blueprint-muted">Loading scenario results...</p>
          </section>
        ) : null}

        {error ? (
          <section className="surface-card">
            <p className="text-body-md text-red-700">{error}</p>
          </section>
        ) : null}

        {scenario ? (
          <>
            <section className="rounded-[28px] border border-blueprint-line bg-card p-6 shadow-[0_24px_48px_rgba(0,0,0,0.06)] sm:p-8">
              <p className="text-ui-label tracking-[0.22em] text-blueprint-muted">SCENARIO RESULTS</p>
              <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-display-xl text-primary">{scenario.topic}</h1>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full border border-blueprint-line bg-blueprint-bg px-3 py-1 text-ui-label text-primary">{scenario.domainLabel}</span>
                    <span className={`rounded-full border px-3 py-1 text-ui-label ${verdict.className}`}>{verdict.label}</span>
                  </div>
                </div>
                <div className="rounded-[24px] border border-blueprint-line bg-blueprint-bg px-6 py-5 text-center">
                  <p className="text-ui-label text-blueprint-muted">Score</p>
                  <p className="mt-2 font-serif text-[clamp(3rem,8vw,5rem)] leading-none text-primary">{scenario.score ?? 0}<span className="text-headline-md text-blueprint-muted">/10</span></p>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-blueprint-line bg-blueprint-bg">
                <button
                  type="button"
                  onClick={() => setContextOpen((current) => !current)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-ui-label text-primary">Re-read original scenario context</span>
                  <span className="text-ui-label text-blueprint-muted">{contextOpen ? 'Hide' : 'Show'}</span>
                </button>
                {contextOpen ? (
                  <div className="border-t border-blueprint-line px-5 py-4 space-y-4">
                    <p className="text-body-md text-primary">{scenario.context}</p>
                    <div className="flex flex-wrap gap-2 text-ui-label text-blueprint-muted">
                      <span className="rounded-full bg-white px-3 py-1">{scenario.role}</span>
                      <span className="rounded-full bg-white px-3 py-1">{scenario.type}</span>
                    </div>
                    <div>
                      <p className="text-ui-label text-blueprint-muted">Question</p>
                      <p className="mt-2 text-body-md text-primary">{scenario.question}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-3">
              <article className="rounded-2xl border border-blueprint-line border-l-4 border-l-[#16a34a] bg-card p-5 dark:border-l-[#4ade80]">
                <p className="text-ui-label text-[#16a34a] dark:text-[#4ade80]">WHAT YOU GOT RIGHT</p>
                <p className="mt-3 text-body-md text-primary">{scenario.whatWorked || 'No positive signal was recorded for this attempt.'}</p>
              </article>
              <article className="rounded-2xl border border-blueprint-line border-l-4 border-l-[#dc2626] bg-card p-5 dark:border-l-[#f87171]">
                <p className="text-ui-label text-[#dc2626] dark:text-[#f87171]">WHAT YOU MISSED</p>
                <p className="mt-3 text-body-md text-primary">{scenario.whatWasMissed || 'No missed areas were recorded for this attempt.'}</p>
              </article>
              <article className="rounded-2xl border border-blueprint-line border-l-4 border-l-[#b45309] bg-card p-5 dark:border-l-[#d97706]">
                <p className="text-ui-label text-[#b45309] dark:text-[#d97706]">SENIOR ENGINEER WOULD SAY</p>
                <p className="mt-3 text-body-md text-primary">{scenario.seniorEngineerWouldSay || 'No senior-engineer comparison was returned for this attempt.'}</p>
              </article>
            </section>

            <section className="rounded-2xl border border-blueprint-line bg-card p-6">
              <p className="text-ui-label text-blueprint-muted">Overall feedback</p>
              <p className="mt-3 text-body-lg text-primary">{scenario.feedback || 'Feedback was not available for this attempt.'}</p>
            </section>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                disabled={saving}
                onClick={async () => {
                  setSaving(true);
                  await saveScenarioAttempt(attemptId, true);
                  setSaving(false);
                }}
                className="inline-flex items-center gap-2 rounded-full border border-blueprint-line px-6 py-3 text-ui-label text-primary hover:bg-[#f5f3f3] disabled:opacity-60"
              >
                <BookmarkCheck size={16} /> {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/scenario-round')}
                className="rounded-full bg-primary px-6 py-3 text-ui-label text-white hover:bg-[#303031]"
              >
                Try Another Scenario
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="rounded-full border border-blueprint-line px-6 py-3 text-ui-label text-primary hover:bg-[#f5f3f3]"
              >
                View Dashboard
              </button>
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
}
