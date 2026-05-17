import React, { useEffect, useMemo, useState } from 'react';
import { BookmarkCheck, LoaderCircle, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DOMAIN_LABELS, getVisibleDomainOptions } from '../lib/prep';
import { fetchPracticeSessions, type PracticeSessionSummary } from '../lib/practiceSessions';

function scoreLabel(session: PracticeSessionSummary) {
  if (session.score === null) return 'In progress';
  return `${session.correctAnswers}/${session.totalQuestions} correct · ${session.score}%`;
}

export default function SavedSessions() {
  const navigate = useNavigate();
  const domains = useMemo(() => getVisibleDomainOptions(), []);
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [sessions, setSessions] = useState<PracticeSessionSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    void fetchPracticeSessions({ savedOnly: true }).then((result) => {
      if (ignore) return;
      setLoading(false);
      if (result.ok === false) {
        setError(result.error);
        return;
      }
      setSessions(result.data);
    }).catch((err) => {
      if (!ignore) {
        setLoading(false);
        setError(err instanceof Error ? err.message : 'Unable to load saved sessions.');
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  const filteredSessions = sessions.filter((session) => selectedDomain === 'all' || session.domain === selectedDomain);
  const selectedLabel = selectedDomain === 'all' ? 'all domains' : (DOMAIN_LABELS[selectedDomain] ?? selectedDomain);

  return (
    <div className="min-h-full bg-background px-4 py-8 sm:px-6 lg:px-10 xl:px-14">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-40" />
      <main className="relative z-10 mx-auto w-full max-w-360 space-y-6">
        <section className="surface-card">
          <div className="flex flex-col gap-5 border-b border-blueprint-line pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-ui-label text-blueprint-muted">Saved</p>
              <h1 className="mt-2 text-display-xl text-primary">Saved practice sessions</h1>
              <p className="mt-3 max-w-2xl text-body-lg text-blueprint-muted">
                Review domain-specific practice sessions end to end, including in-progress sessions that were saved before completion.
              </p>
            </div>
            {loading ? (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-blueprint-muted">
                <LoaderCircle size={15} className="animate-spin" /> Loading...
              </span>
            ) : null}
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSelectedDomain('all')}
              className={`shrink-0 rounded-full border px-4 py-2 text-ui-label ${selectedDomain === 'all' ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-primary'}`}
            >
              All domains
            </button>
            {domains.map((domain) => (
              <button
                key={domain.id}
                type="button"
                onClick={() => setSelectedDomain(domain.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-ui-label ${selectedDomain === domain.id ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-primary'}`}
              >
                {domain.label}
              </button>
            ))}
          </div>
        </section>

        {error ? <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-body-md text-red-700">{error}</p> : null}

        {filteredSessions.length ? (
          <section className="grid gap-4 lg:grid-cols-2">
            {filteredSessions.map((session) => (
              <article key={session.id} className="surface-card-compact">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-ui-label text-blueprint-muted">{session.domainLabel}</p>
                    <h2 className="mt-1 text-headline-sm text-primary">{session.topic}</h2>
                    <p className="mt-2 text-body-md text-blueprint-muted">{scoreLabel(session)}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-blueprint-line bg-card px-3 py-1.5 text-ui-label text-primary">
                    <BookmarkCheck size={14} /> Saved
                  </span>
                </div>
                {session.weakTags.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {session.weakTags.slice(0, 4).map((tag) => (
                      <span key={`${session.id}-${tag}`} className="rounded-full border border-blueprint-line bg-[#f5f3f3] px-3 py-1 text-ui-label text-blueprint-muted">{tag}</span>
                    ))}
                  </div>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(session.status === 'completed' ? `/results/practice/${session.id}` : `/round/practice/${session.id}`)}
                    className="rounded-full bg-primary px-5 py-2.5 text-ui-label text-white"
                  >
                    {session.status === 'completed' ? 'View End to End' : 'Resume Session'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/practice-tracks?search=${encodeURIComponent(session.topic)}`)}
                    className="inline-flex items-center gap-2 rounded-full border border-blueprint-line bg-card px-5 py-2.5 text-ui-label text-primary"
                  >
                    <RotateCcw size={14} /> Retry Topic
                  </button>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="surface-card text-center">
            <p className="text-headline-sm text-primary">No saved sessions yet for {selectedLabel}.</p>
            <p className="mt-3 text-body-md text-blueprint-muted">Save a practice session from results or session history and it will stay here after refresh.</p>
            <button type="button" onClick={() => navigate('/practice-tracks')} className="mt-5 rounded-full bg-primary px-5 py-2.5 text-ui-label text-white">
              Open Practice Tracks
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
