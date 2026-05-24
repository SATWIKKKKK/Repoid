import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Bookmark, BookmarkCheck, History, LoaderCircle, Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DOMAIN_LABELS, updatePrepWorkspace } from '../lib/prep';
import { usePrepWorkspace } from '../hooks/usePrepWorkspace';
import {
  fetchPracticeOverview,
  searchPracticeSessionWithOptions,
  togglePracticeSessionSaved,
  type PracticeSessionSummary,
} from '../lib/practiceSessions';
import { updateUserPreferences } from '../lib/userPreferences';

const PENDING_PRACTICE_KEY = 'repoid-pending-practice-generation';
const PRACTICE_CACHE_PREFIX = 'repoid-practice-cache:';
const PRACTICE_CACHE_TTL_MS = 3 * 60 * 60 * 1000;

function formatSessionDate(value: string | null) {
  if (!value) return 'Not saved';
  return new Date(value).toLocaleDateString();
}

function sessionScoreLabel(session: PracticeSessionSummary) {
  if (session.score === null) return 'In progress';
  return `${session.correctAnswers}/${session.totalQuestions} · ${session.score}%`;
}

export default function Workflows() {
  const navigate = useNavigate();
  const location = useLocation();
  const workspace = usePrepWorkspace();
  const domain = workspace.selections.domain;
  const domainLabel = DOMAIN_LABELS[domain] ?? 'Selected Domain';
  const initialSearch = useMemo(() => new URLSearchParams(location.search).get('search') ?? '', [location.search]);
  const [topic, setTopic] = useState(initialSearch);
  const [overview, setOverview] = useState<{ suggestedTopics: string[]; history: PracticeSessionSummary[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [submittingTopic, setSubmittingTopic] = useState<string | null>(null);
  const [suggestionOffset, setSuggestionOffset] = useState(0);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [error, setError] = useState<{ message: string; suggestedDomain?: string; retryTopic?: string } | null>(null);
  const [pendingRetry, setPendingRetry] = useState<{ domain: string; topic: string; level: string } | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const lastLaunchRef = useRef(0);

  const displayedSuggestions = useMemo(() => {
    const suggestions = overview?.suggestedTopics ?? [];
    if (!suggestions.length) return [];
    const offset = suggestionOffset % suggestions.length;
    return [...suggestions.slice(offset), ...suggestions.slice(0, offset)].slice(0, 6);
  }, [overview?.suggestedTopics, suggestionOffset]);

  const filteredSuggestions = useMemo(() => {
    const query = topic.trim().toLowerCase();
    if (!query) return [];
    return (overview?.suggestedTopics ?? [])
      .filter((suggestion) => suggestion.toLowerCase().includes(query))
      .slice(0, 8);
  }, [overview?.suggestedTopics, topic]);

  useEffect(() => {
    setTopic(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(PENDING_PRACTICE_KEY) || 'null') as { domain?: string; topic?: string; level?: string } | null;
      if (parsed?.domain && parsed?.topic) setPendingRetry({ domain: parsed.domain, topic: parsed.topic, level: parsed.level || 'intermediate' });
    } catch {
      setPendingRetry(null);
    }
  }, []);

  useEffect(() => {
    if (!displayedSuggestions.length) return undefined;
    const timer = window.setInterval(() => setSuggestionOffset((current) => current + 6), 4500);
    return () => window.clearInterval(timer);
  }, [displayedSuggestions.length]);

  useEffect(() => {
    const count = overview?.suggestedTopics.length ?? 0;
    if (count > 0) setSuggestionOffset(Math.floor(Math.random() * count));
  }, [overview?.suggestedTopics]);

  useEffect(() => {
    setActiveSuggestionIndex(0);
  }, [topic]);

  useEffect(() => {
    if (!domain) {
      setError({ message: 'Choose your interview domain in onboarding before opening practice sessions.' });
      return;
    }

    let ignore = false;
    setLoading(true);
    void fetchPracticeOverview(domain).then((result) => {
      if (ignore) return;
      setLoading(false);
      if (result.ok === false) {
        setOverview(null);
        setError({ message: result.error, suggestedDomain: result.suggestedDomain });
        return;
      }
      setOverview({ suggestedTopics: result.data.suggestedTopics, history: result.data.history });
    });

    return () => {
      ignore = true;
    };
  }, [domain]);

  const launchTopic = async (rawTopic?: string) => {
    const nextTopic = (rawTopic ?? topic).trim();
    if (!nextTopic || !domain) return;
    const now = Date.now();
    if (now - lastLaunchRef.current < 450) return;
    lastLaunchRef.current = now;
    const pendingPayload = {
      domain,
      topic: nextTopic,
      level: workspace.selections.experienceLevel || 'intermediate',
    };
    const cacheKey = `${PRACTICE_CACHE_PREFIX}${pendingPayload.domain}:${pendingPayload.level}:${pendingPayload.topic.toLowerCase()}`;
    try {
      const cached = JSON.parse(window.localStorage.getItem(cacheKey) || 'null') as { expiresAt?: number; session?: { id?: string } } | null;
      if (cached?.expiresAt && cached.expiresAt > Date.now() && cached.session?.id) {
        navigate(`/round/practice/${cached.session.id}`);
        return;
      }
    } catch {
      // Cache is best-effort only.
    }
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setSubmittingTopic(nextTopic);
    setError(null);
    setPendingRetry(null);
    try {
      window.localStorage.setItem(PENDING_PRACTICE_KEY, JSON.stringify(pendingPayload));
    } catch {
      // Retry recovery is a local convenience.
    }
    const result = await searchPracticeSessionWithOptions(pendingPayload, { signal: controller.signal });
    if (controller.signal.aborted) return;
    setSubmittingTopic(null);
    abortRef.current = null;
    if (result.ok === false) {
      setError({
        message: result.aiUnavailable
          ? 'Generation failed before a complete session could be created. Please try again.'
          : result.error,
        suggestedDomain: result.suggestedDomain,
        retryTopic: result.aiUnavailable ? nextTopic : undefined,
      });
      if (result.aiUnavailable) setPendingRetry(pendingPayload);
      return;
    }
    try {
      window.localStorage.removeItem(PENDING_PRACTICE_KEY);
      window.localStorage.setItem(cacheKey, JSON.stringify({ expiresAt: Date.now() + PRACTICE_CACHE_TTL_MS, session: result.data }));
    } catch {
      // Ignore local cleanup failures.
    }
    navigate(`/round/practice/${result.data.id}`);
  };

  const handleToggleSaved = async (session: PracticeSessionSummary) => {
    const result = await togglePracticeSessionSaved(session.id, !session.savedAt);
    if (result.ok === false) {
      setError({ message: result.error });
      return;
    }
    setOverview((current) => current ? {
      ...current,
      history: current.history.map((item) => item.id === session.id ? { ...item, savedAt: result.data } : item),
    } : current);
  };

  const handleSwitchSuggestedDomain = async () => {
    if (!error?.suggestedDomain) return;
    const nextDomain = error.suggestedDomain;
    updatePrepWorkspace({ selections: { ...workspace.selections, domain: nextDomain } });
    void updateUserPreferences({ domain: nextDomain }).catch(() => undefined);
    setError(null);
  };

  return (
    <div className="min-h-full bg-background px-4 py-8 sm:px-6 lg:px-10 xl:px-14">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
      {submittingTopic ? (
        <div className="fixed inset-0 z-120 flex items-center justify-center bg-background/95 px-4 text-primary backdrop-blur-sm">
          <div className="rounded-2xl border border-blueprint-line bg-card px-8 py-7 text-center shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-blueprint-line bg-card">
              <LoaderCircle size={22} className="animate-spin text-primary" />
            </div>
            <p className="mt-4 text-body-lg font-semibold text-primary">framing qs for you...</p>
          </div>
        </div>
      ) : null}
      <main className="relative z-10 mx-auto w-full max-w-360 space-y-6">
        <section className="rounded-[28px] border border-blueprint-line bg-card p-6 shadow-[0_24px_48px_rgba(0,0,0,0.06)] sm:p-8">
          <div className="flex flex-col gap-5 border-b border-blueprint-line pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-ui-label text-blueprint-muted">Practice Tracks</p>
              <h1 className="mt-2 font-serif text-[clamp(2.2rem,4vw,4rem)] leading-tight text-primary">{domainLabel}</h1>
              <p className="mt-3 max-w-3xl text-body-lg text-blueprint-muted">
                Search any topic, validate it against your selected domain, and generate a fresh 40-question session on demand.
              </p>
            </div>
          </div>

          <form
            className="mt-6 rounded-[24px] border border-blueprint-line bg-blueprint-bg p-4 sm:p-5"
            onSubmit={(event) => {
              event.preventDefault();
              void launchTopic();
            }}
          >
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <div className="flex items-center gap-3 rounded-2xl border border-blueprint-line bg-white px-4 py-3">
                  <Search size={18} className="text-blueprint-muted" />
                  <input
                    value={topic}
                    onChange={(event) => setTopic(event.target.value)}
                    onKeyDown={(event) => {
                      if (!filteredSuggestions.length) return;
                      if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        setActiveSuggestionIndex((current) => Math.min(filteredSuggestions.length - 1, current + 1));
                      }
                      if (event.key === 'ArrowUp') {
                        event.preventDefault();
                        setActiveSuggestionIndex((current) => Math.max(0, current - 1));
                      }
                      if (event.key === 'Enter' && filteredSuggestions[activeSuggestionIndex]) {
                        event.preventDefault();
                        void launchTopic(filteredSuggestions[activeSuggestionIndex]);
                      }
                    }}
                    placeholder={`Search a ${domainLabel.toLowerCase()} topic like "${overview?.suggestedTopics?.[0] ?? 'React Hooks'}"`}
                    className="w-full border-0 bg-transparent text-body-lg text-primary outline-none"
                    role="combobox"
                    aria-expanded={filteredSuggestions.length > 0}
                    aria-controls="practice-topic-suggestions"
                  />
                </div>
                {filteredSuggestions.length ? (
                  <div id="practice-topic-suggestions" className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-blueprint-line bg-white shadow-xl">
                    {filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={suggestion}
                        type="button"
                        onMouseEnter={() => setActiveSuggestionIndex(index)}
                        onClick={() => {
                          setTopic(suggestion);
                          void launchTopic(suggestion);
                        }}
                        className={`block w-full px-4 py-3 text-left text-body-md ${index === activeSuggestionIndex ? 'bg-[#f5f3f3] text-primary' : 'text-primary'}`}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={!topic.trim() || Boolean(submittingTopic)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-ui-label text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submittingTopic ? <LoaderCircle size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                {submittingTopic ? 'Generating...' : 'Search'}
              </button>
            </div>

            {error ? (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-body-md text-red-700">
                <p>{error.message}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {error.suggestedDomain ? (
                    <button
                      type="button"
                      onClick={() => { void handleSwitchSuggestedDomain(); }}
                      className="rounded-full bg-white px-4 py-2 text-ui-label text-primary"
                    >
                      Switch to {DOMAIN_LABELS[error.suggestedDomain] ?? error.suggestedDomain}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => {
                      setTopic('');
                      setError(null);
                    }}
                    className="rounded-full border border-red-200 bg-transparent px-4 py-2 text-ui-label text-red-700"
                  >
                    Search something else
                  </button>
                  {error.retryTopic ? (
                    <button
                      type="button"
                      onClick={() => {
                        setTopic(error.retryTopic ?? '');
                        setError(null);
                        void launchTopic(error.retryTopic);
                      }}
                      className="rounded-full bg-red-700 px-4 py-2 text-ui-label text-white"
                    >
                      Retry generation
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}

            {pendingRetry ? (
              <div className="mt-4 rounded-2xl border border-blueprint-line bg-white px-4 py-4 text-body-md text-primary">
                <p className="font-medium">A question load was interrupted.</p>
                <p className="mt-1 text-blueprint-muted">Retry {pendingRetry.topic} to generate the session again.</p>
                <button
                  type="button"
                  onClick={() => {
                    setTopic(pendingRetry.topic);
                    void launchTopic(pendingRetry.topic);
                  }}
                  className="mt-3 rounded-full bg-primary px-4 py-2 text-ui-label text-white"
                >
                  Retry Topic
                </button>
              </div>
            ) : null}
          </form>

          <div className="mt-6">
            <div className="flex items-center gap-2 text-ui-label text-blueprint-muted">
              Featured topics for {domainLabel}
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:grid lg:grid-cols-6 lg:overflow-visible lg:pb-0">
              {displayedSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setTopic(suggestion);
                    void launchTopic(suggestion);
                  }}
                  className="shrink-0 rounded-full border border-blueprint-line bg-white px-4 py-2 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-blueprint-line bg-card p-6 sm:p-8">
          <div className="flex flex-col gap-3 border-b border-blueprint-line pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-ui-label text-blueprint-muted">
                <History size={15} /> Session History
              </div>
              <h2 className="mt-1 text-headline-md text-primary not-italic">Recent topic sessions</h2>
            </div>
            {loading ? <span className="inline-flex items-center gap-2 text-ui-label text-blueprint-muted"><LoaderCircle size={15} className="animate-spin" /> Refreshing</span> : null}
          </div>

          {overview?.history?.length ? (
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {overview.history.map((session) => (
                <article key={session.id} className="rounded-2xl border border-blueprint-line bg-blueprint-bg p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-ui-label text-blueprint-muted">{formatSessionDate(session.generatedAt)}</p>
                      <h3 className="mt-1 text-body-lg font-medium text-primary">{session.topic}</h3>
                      <p className="mt-2 text-body-md text-blueprint-muted">{sessionScoreLabel(session)}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { void handleToggleSaved(session); }}
                      className="inline-flex items-center gap-2 rounded-full border border-blueprint-line bg-white px-3 py-2 text-ui-label text-primary"
                    >
                      {session.savedAt ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
                      {session.savedAt ? 'Saved' : 'Save'}
                    </button>
                  </div>

                  {session.weakTags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(session.weakTags ?? []).slice(0, 3).map((tag) => (
                        <span key={`${session.id}-${tag}`} className="rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-ui-label text-amber-950 dark:border-amber-300/50 dark:bg-amber-500/20 dark:text-amber-100">{tag}</span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-wrap gap-3">
                    {session.status === 'completed' ? (
                      <button
                        type="button"
                        onClick={() => navigate(`/results/practice/${session.id}`)}
                        className="rounded-full border border-blueprint-line bg-white px-4 py-2 text-ui-label text-primary"
                      >
                        View Results
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => navigate(`/round/practice/${session.id}`)}
                        className="rounded-full border border-blueprint-line bg-white px-4 py-2 text-ui-label text-primary"
                      >
                        Resume Session
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={Boolean(submittingTopic)}
                      onClick={() => { void launchTopic(session.topic); }}
                      className="rounded-full bg-primary px-4 py-2 text-ui-label text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Retry Topic
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-5 rounded-2xl border border-dashed border-blueprint-line bg-blueprint-bg p-5">
              <p className="text-body-md font-medium text-primary">No topic sessions yet.</p>
              <p className="mt-2 text-body-md text-blueprint-muted">Search a topic above and your generated sessions will appear here with score, save toggle, and retry controls.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
