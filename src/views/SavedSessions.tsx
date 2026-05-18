import React, { useEffect, useMemo, useState } from 'react';
import { BookmarkCheck, LoaderCircle, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DOMAIN_LABELS, getVisibleDomainOptions } from '../lib/prep';
import { fetchSavedSessions, type SavedRoundType, type SavedSessionCard } from '../lib/savedSessions';

const ROUND_FILTERS: Array<{ id: 'all' | SavedRoundType; label: string }> = [
  { id: 'all', label: 'ALL' },
  { id: 'practice', label: 'PRACTICE' },
  { id: 'scenario', label: 'SCENARIO' },
  { id: 'coding', label: 'CODING' },
  { id: 'mock', label: 'MOCK' },
];

const ROUND_BADGES: Record<SavedRoundType, string> = {
  practice: 'PRACTICE',
  scenario: 'SCENARIO',
  coding: 'CODING',
  mock: 'MOCK',
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Saved recently';
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function statusLabel(session: SavedSessionCard) {
  if (session.status === 'completed' || session.status === 'submitted') return 'completed';
  if (session.status === 'abandoned') return 'abandoned';
  return 'in-progress';
}

export default function SavedSessions() {
  const navigate = useNavigate();
  const domains = useMemo(() => getVisibleDomainOptions(), []);
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedRoundType, setSelectedRoundType] = useState<'all' | SavedRoundType>('all');
  const [sessions, setSessions] = useState<SavedSessionCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    void fetchSavedSessions({ domain: selectedDomain, roundType: selectedRoundType }).then((result) => {
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
  }, [selectedDomain, selectedRoundType]);

  const selectedLabel = selectedDomain === 'all' ? 'all domains' : (DOMAIN_LABELS[selectedDomain] ?? selectedDomain);

  return (
    <div className="min-h-full bg-background px-4 py-8 sm:px-6 lg:px-10 xl:px-14">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-40" />
      <main className="relative z-10 mx-auto w-full max-w-360 space-y-6">
        <section className="surface-card">
          <div className="flex flex-col gap-5 border-b border-blueprint-line pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-ui-label text-blueprint-muted">Saved</p>
              <h1 className="mt-2 text-display-xl text-primary">Saved sessions</h1>
              <p className="mt-3 max-w-2xl text-body-lg text-blueprint-muted">
                Resume or review saved work across practice, scenario, coding, and mock interview rounds.
              </p>
            </div>
            {loading ? (
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-blueprint-muted">
                <LoaderCircle size={15} className="animate-spin" /> Loading...
              </span>
            ) : null}
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {ROUND_FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedRoundType(filter.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-ui-label ${selectedRoundType === filter.id ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-primary'}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
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

        {sessions.length ? (
          <section className="grid gap-4 lg:grid-cols-2">
            {sessions.map((session) => {
              const completed = statusLabel(session) === 'completed';
              return (
                <article key={`${session.roundType}-${session.id}`} className="surface-card-compact">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full border border-blueprint-line bg-card px-3 py-1 text-ui-label text-primary">{ROUND_BADGES[session.roundType]}</span>
                        <span className="rounded-full border border-blueprint-line bg-blueprint-bg px-3 py-1 text-ui-label text-blueprint-muted">{session.domainLabel}</span>
                      </div>
                      <h2 className="mt-3 text-headline-sm text-primary">{session.title}</h2>
                      <p className="mt-2 text-body-md text-blueprint-muted">
                        Saved {formatDate(session.savedAt)} · {session.score === null ? statusLabel(session) : `${session.score}/10`}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-blueprint-line bg-card px-3 py-1.5 text-ui-label text-primary">
                      <BookmarkCheck size={14} /> {statusLabel(session)}
                    </span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => navigate(completed ? session.resultsPath : session.resumePath)}
                      className="rounded-full bg-primary px-5 py-2.5 text-ui-label text-white"
                    >
                      {completed ? 'View Results' : 'Resume'}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(session.roundType === 'practice' ? `/practice-tracks?search=${encodeURIComponent(session.title)}` : session.resumePath)}
                      className="inline-flex items-center gap-2 rounded-full border border-blueprint-line bg-card px-5 py-2.5 text-ui-label text-primary"
                    >
                      <RotateCcw size={14} /> Open Round
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <section className="surface-card text-center">
            <p className="text-headline-sm text-primary">No saved sessions yet for {selectedLabel}.</p>
            <p className="mt-3 text-body-md text-blueprint-muted">Save any round and it will stay here after refresh.</p>
            <button type="button" onClick={() => navigate('/practice-tracks')} className="mt-5 rounded-full bg-primary px-5 py-2.5 text-ui-label text-white">
              Open Practice Tracks
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
