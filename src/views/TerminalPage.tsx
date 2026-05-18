import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Bookmark, BookmarkCheck, History, LoaderCircle, Mic, Square } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import RoundDomainGate from '../components/RoundDomainGate';
import RoundShell from '../components/RoundShell';
import { DOMAIN_LABELS } from '../lib/prep';
import { usePrepWorkspace } from '../hooks/usePrepWorkspace';
import {
  fetchMockOverview,
  fetchMockInterview,
  finishMockInterview,
  respondToMockQuestion,
  saveMockInterview,
  startMockInterview,
  type MockInterviewHistoryItem,
  type MockInterviewState,
  type MockInterviewType,
  type MockLevel,
  type MockPersona,
} from '../lib/mockInterview';
import { View } from '../App';

interface TerminalPageProps {
  onViewChange: (view: View) => void;
}

const LEVELS: Array<{ id: MockLevel; title: string; body: string }> = [
  { id: 'junior', title: 'Junior', body: '0-2 years' },
  { id: 'mid', title: 'Mid', body: '2-5 years' },
  { id: 'senior', title: 'Senior', body: '5+ years' },
];

const TYPES: Array<{ id: MockInterviewType; title: string; body: string }> = [
  { id: 'technical', title: 'Technical Deep Dive', body: 'Heavy on domain-specific technical questions.' },
  { id: 'design', title: 'System Design', body: 'Architecture and design decisions.' },
  { id: 'mixed', title: 'Behavioral + Technical Mix', body: 'Balanced, realistic interview coverage.' },
];

const PERSONAS: Array<{ id: MockPersona; name: string; tag: string; body: string }> = [
  { id: 'alex', name: 'Alex', tag: 'Supportive Mentor', body: 'Encouraging, thorough, and specific.' },
  { id: 'jordan', name: 'Jordan', tag: 'Skeptical Senior', body: 'Pushes for depth and challenges vague answers.' },
  { id: 'sam', name: 'Sam', tag: 'Startup CTO', body: 'Pragmatic, fast, and focused on judgment.' },
];

function personaMeta(persona: MockPersona) {
  return PERSONAS.find((item) => item.id === persona) ?? PERSONAS[0];
}

function pickNextIndex(interview: MockInterviewState) {
  const answered = new Set(interview.responses.map((item) => item.questionId));
  const next = interview.questions.findIndex((question) => !answered.has(question.id));
  return next === -1 ? Math.max(0, interview.questions.length - 1) : next;
}

function formatInterviewDate(value: string | null) {
  if (!value) return 'Not completed yet';
  return new Date(value).toLocaleDateString();
}

function mockHistoryScoreLabel(item: MockInterviewHistoryItem) {
  if (item.score === null) return item.status === 'completed' ? 'Completed' : 'In progress';
  return `${item.score}/10`;
}

export default function TerminalPage(_props: TerminalPageProps) {
  const navigate = useNavigate();
  const params = useParams<{ interviewId?: string }>();
  const interviewId = String(params.interviewId ?? '').trim();
  const workspace = usePrepWorkspace();
  const domain = workspace.selections.domain;
  const domainLabel = DOMAIN_LABELS[domain] ?? 'Selected Domain';
  const [domainConfirmed, setDomainConfirmed] = useState(Boolean(interviewId));
  const [launchFlowStarted, setLaunchFlowStarted] = useState(Boolean(interviewId));
  const [level, setLevel] = useState<MockLevel | null>(null);
  const [interviewType, setInterviewType] = useState<MockInterviewType | null>(null);
  const [persona, setPersona] = useState<MockPersona | null>(null);
  const [overview, setOverview] = useState<{ activeInterviewId: string | null; history: MockInterviewHistoryItem[] } | null>(null);
  const [loadingOverview, setLoadingOverview] = useState(false);
  const [historySaveId, setHistorySaveId] = useState<string | null>(null);
  const [interview, setInterview] = useState<MockInterviewState | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [draft, setDraft] = useState('');
  const [followUpDraft, setFollowUpDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [elapsedLoading, setElapsedLoading] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [finishing, setFinishing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const question = interview?.questions[currentIndex] ?? null;
  const currentResponse = question ? interview?.responses.find((item) => item.questionId === question.id) ?? null : null;
  const meta = personaMeta(interview?.persona ?? persona ?? 'alex');
  const setupReady = Boolean(level && interviewType && persona);
  const answeredCount = interview?.responses.length ?? 0;
  const voiceSupported = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  const overviewHistory = overview?.history ?? [];

  useEffect(() => {
    if (!interviewId) return undefined;
    let ignore = false;
    setLoading(true);
    setError(null);
    void fetchMockInterview(interviewId).then((result) => {
      if (ignore) return;
      setLoading(false);
      if (result.ok === false) {
        setError(result.error);
        return;
      }
      setInterview(result.data);
      setCurrentIndex(pickNextIndex(result.data));
    });
    return () => {
      ignore = true;
    };
  }, [interviewId]);

  useEffect(() => {
    if (!domain || interviewId) return undefined;
    let ignore = false;
    setLoadingOverview(true);
    void fetchMockOverview(domain).then((result) => {
      if (ignore) return;
      setLoadingOverview(false);
      if (result.ok === false) {
        setOverview(null);
        setError(result.error);
        return;
      }
      setOverview({
        activeInterviewId: result.data.activeInterviewId,
        history: result.data.history,
      });
    });
    return () => {
      ignore = true;
    };
  }, [domain, interviewId]);

  useEffect(() => {
    if (interviewId) setLaunchFlowStarted(true);
  }, [interviewId]);

  useEffect(() => {
    if (!loading && !finishing) return undefined;
    const started = Date.now();
    const interval = window.setInterval(() => setElapsedLoading(Math.floor((Date.now() - started) / 1000)), 1000);
    return () => window.clearInterval(interval);
  }, [finishing, loading]);

  useEffect(() => {
    if (!question) return;
    setDraft(currentResponse?.answer ?? '');
    setFollowUpDraft(currentResponse?.followUpAnswer ?? '');
  }, [currentResponse?.answer, currentResponse?.followUpAnswer, question?.id]);

  const startInterview = useCallback(async () => {
    if (!level || !interviewType || !persona || loading) return;
    setLoading(true);
    setElapsedLoading(0);
    setError(null);
    const result = await startMockInterview({ domain, level, interviewType, persona, forceNew: Boolean(overview?.activeInterviewId) });
    setLoading(false);
    if (result.ok === false) {
      setError(result.error);
      return;
    }
    setInterview(result.data);
    setCurrentIndex(pickNextIndex(result.data));
    navigate(`/round/mock/${encodeURIComponent(result.data.id)}`, { replace: true });
  }, [domain, interviewType, level, loading, navigate, overview?.activeInterviewId, persona]);

  const handleSaveHistoryInterview = useCallback(async (historyItem: MockInterviewHistoryItem) => {
    if (historySaveId === historyItem.id) return;
    setHistorySaveId(historyItem.id);
    const result = await saveMockInterview(historyItem.id, true);
    setHistorySaveId(null);
    if (result.ok === false) {
      setError(result.error);
      return;
    }
    setOverview((current) => current ? {
      ...current,
      history: current.history.map((item) => item.id === historyItem.id ? { ...item, savedAt: result.data.savedAt } : item),
    } : current);
  }, [historySaveId]);

  const openHistoryInterview = useCallback((historyItem: MockInterviewHistoryItem) => {
    if (historyItem.status === 'completed') {
      navigate(`/results/mock/${encodeURIComponent(historyItem.id)}`);
      return;
    }
    navigate(`/round/mock/${encodeURIComponent(historyItem.id)}`);
  }, [navigate]);

  const submitAnswer = async () => {
    if (!interview || !question || !draft.trim() || submitting) return;
    setSubmitting(true);
    setError(null);
    const result = await respondToMockQuestion(interview.id, {
      questionId: question.id,
      answer: draft,
      followUpAnswer: followUpDraft,
    });
    setSubmitting(false);
    if (result.ok === false) {
      setError(result.error);
      return;
    }
    setInterview(result.data.interview);
  };

  const finishInterview = useCallback(async () => {
    if (!interview || finishing) return;
    setFinishing(true);
    setElapsedLoading(0);
    const result = await finishMockInterview(interview.id);
    setFinishing(false);
    if (result.ok === false) {
      setError(result.error);
      return;
    }
    navigate(`/results/mock/${encodeURIComponent(interview.id)}`, { replace: true });
  }, [finishing, interview, navigate]);

  const nextQuestion = () => {
    if (!interview) return;
    if (currentIndex >= interview.questions.length - 1) {
      void finishInterview();
      return;
    }
    setCurrentIndex((index) => index + 1);
  };

  const startListening = () => {
    if (!voiceSupported || listening) return;
    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.onresult = (event: any) => {
      let transcript = '';
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        transcript += event.results[index][0].transcript;
      }
      if (transcript.trim()) setDraft((current) => `${current}${current ? ' ' : ''}${transcript.trim()}`);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop?.();
    setListening(false);
  };

  if (!domain) {
    return (
      <div className="min-h-full bg-background px-4 py-8 sm:px-8 lg:px-16">
        <section className="surface-card">
          <p className="text-body-md text-red-700">Choose your interview domain in onboarding before opening mock interview.</p>
        </section>
      </div>
    );
  }

  if (!interviewId && !interview && !launchFlowStarted) {
    return (
      <div className="min-h-full bg-background px-4 py-8 sm:px-8 lg:px-12">
        <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
        <main className="relative z-10 mx-auto w-full max-w-6xl space-y-6">
          <section className="surface-card">
            <p className="text-ui-label tracking-[0.2em] text-blueprint-muted">MOCK INTERVIEW</p>
            <h1 className="mt-3 text-display-xl text-primary">Practice a realistic mock interview for {domainLabel}.</h1>
            <p className="mt-3 max-w-3xl text-body-lg text-blueprint-muted">
              Start from a clean landing page, then continue into the existing setup flow for level, interview type, and interviewer persona.
            </p>
            {error ? <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-body-md text-red-700">{error}</p> : null}
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => { setLaunchFlowStarted(true); setError(null); }} className="rounded-full bg-primary px-6 py-3 text-ui-label text-white hover:bg-[#303031]">
                {overview?.activeInterviewId ? 'Start New Mock Interview' : 'Start Mock Interview'}
              </button>
              {overview?.activeInterviewId ? (
                <button type="button" onClick={() => navigate(`/round/mock/${encodeURIComponent(overview.activeInterviewId!)}`)} className="rounded-full border border-blueprint-line px-6 py-3 text-ui-label text-primary hover:bg-[#f5f3f3]">
                  Resume Active Interview
                </button>
              ) : null}
            </div>
          </section>

          <section className="surface-card">
            <div className="flex items-center gap-3">
              <History size={18} className="text-blueprint-muted" />
              <div>
                <p className="text-ui-label text-blueprint-muted">Session History</p>
                <h2 className="text-headline-md text-primary">Recent mock interviews</h2>
              </div>
            </div>
            {loadingOverview ? <p className="mt-4 text-body-md text-blueprint-muted">Loading mock interview history...</p> : null}
            {!loadingOverview && overviewHistory.length === 0 ? <p className="mt-4 text-body-md text-blueprint-muted">No mock interviews yet. Start one to populate your history.</p> : null}
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {overviewHistory.map((item) => {
                const persona = personaMeta(item.persona);
                const typeLabel = TYPES.find((entry) => entry.id === item.interviewType)?.title ?? 'Mock Interview';
                return (
                  <article key={item.id} className="rounded-2xl border border-blueprint-line bg-blueprint-bg p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-ui-label text-blueprint-muted">{formatInterviewDate(item.completedAt ?? item.startedAt)}</p>
                        <h3 className="mt-2 text-headline-md text-primary">
                          <button type="button" onClick={() => openHistoryInterview(item)} className="text-left hover:underline">
                            {item.interviewTitle}
                          </button>
                        </h3>
                        <p className="mt-1 text-body-md text-blueprint-muted">{typeLabel} · {item.level} · {persona.name}</p>
                      </div>
                      <span className="rounded-full border border-blueprint-line bg-white px-3 py-1 text-ui-label text-primary">{mockHistoryScoreLabel(item)}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => { void handleSaveHistoryInterview(item); }}
                        disabled={historySaveId === item.id}
                        className="inline-flex items-center gap-2 rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-primary hover:bg-[#f5f3f3] disabled:opacity-60"
                      >
                        {historySaveId === item.id ? <LoaderCircle size={15} className="animate-spin" /> : item.savedAt ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
                        {historySaveId === item.id ? 'Saving...' : item.savedAt ? 'Saved' : 'Save'}
                      </button>
                      {item.status === 'completed' ? (
                        <button type="button" onClick={() => navigate(`/results/mock/${encodeURIComponent(item.id)}`)} className="rounded-full bg-primary px-4 py-2 text-ui-label text-white hover:bg-[#303031]">
                          View Results
                        </button>
                      ) : (
                        <button type="button" onClick={() => navigate(`/round/mock/${encodeURIComponent(item.id)}`)} className="rounded-full bg-primary px-4 py-2 text-ui-label text-white hover:bg-[#303031]">
                          Resume
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (!interviewId && launchFlowStarted && !domainConfirmed) {
    return <RoundDomainGate roundTitle="MOCK INTERVIEW" domain={domain} subject="mock interviews" onConfirmed={() => setDomainConfirmed(true)} />;
  }

  if (!interviewId && !interview) {
    return (
      <div className="min-h-full bg-background px-4 py-8 sm:px-8 lg:px-12">
        <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
        {loading ? (
          <div className="fixed inset-0 z-80 flex items-center justify-center bg-background/90 px-4">
            <div className="rounded-2xl border border-blueprint-line bg-card p-7 text-center shadow-2xl">
              <LoaderCircle size={24} className="mx-auto animate-spin text-primary" />
              <h2 className="mt-4 text-headline-md text-primary">Preparing your interviewer...</h2>
              <p className="mt-2 text-body-md text-blueprint-muted">Elapsed: {elapsedLoading}s · estimated 12s</p>
            </div>
          </div>
        ) : null}
        <main className="relative z-10 mx-auto w-full max-w-6xl space-y-6">
          <section className="surface-card">
            <p className="text-ui-label tracking-[0.2em] text-blueprint-muted">MOCK INTERVIEW</p>
            <h1 className="mt-3 text-display-xl text-primary">{domainLabel} mock interview setup</h1>
            {error ? <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-body-md text-red-700">{error}</p> : null}
          </section>

          <section className="surface-card">
            <h2 className="text-headline-sm text-primary">Experience Level</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {LEVELS.map((item) => (
                <button key={item.id} type="button" onClick={() => setLevel(item.id)} className={`rounded-xl border p-5 text-left ${level === item.id ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-primary'}`}>
                  <p className="text-headline-sm">{item.title}</p>
                  <p className="mt-2 text-body-md opacity-75">{item.body}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="surface-card">
            <h2 className="text-headline-sm text-primary">Interview Type</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {TYPES.map((item) => (
                <button key={item.id} type="button" onClick={() => setInterviewType(item.id)} className={`rounded-xl border p-5 text-left ${interviewType === item.id ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-primary'}`}>
                  <p className="text-headline-sm">{item.title}</p>
                  <p className="mt-2 text-body-md opacity-75">{item.body}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="surface-card">
            <h2 className="text-headline-sm text-primary">Interviewer Persona</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {PERSONAS.map((item) => (
                <button key={item.id} type="button" onClick={() => setPersona(item.id)} className={`rounded-xl border p-5 text-left ${persona === item.id ? 'border-primary bg-primary text-white' : 'border-blueprint-line bg-card text-primary'}`}>
                  <p className="text-ui-label opacity-70">{item.tag}</p>
                  <h3 className="mt-2 text-headline-sm">{item.name}</h3>
                  <p className="mt-2 text-body-md opacity-75">{item.body}</p>
                </button>
              ))}
            </div>
          </section>

          <div className="flex flex-wrap gap-3">
            <button type="button" disabled={!setupReady || loading} onClick={() => { void startInterview(); }} className="rounded-full bg-primary px-6 py-3 text-ui-label text-white disabled:cursor-not-allowed disabled:opacity-60">
              {overview?.activeInterviewId ? 'Start New Interview' : 'Start Interview'}
            </button>
            <button type="button" onClick={() => { setLaunchFlowStarted(false); setDomainConfirmed(false); }} className="rounded-full border border-blueprint-line px-6 py-3 text-ui-label text-primary">
              Back
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (loading && !interview) {
    return <div className="min-h-screen bg-background p-8 text-body-md text-blueprint-muted">Loading interview...</div>;
  }

  return (
    <RoundShell
      attemptId={interview?.id}
      feature="mock-interview"
      label={`${interview?.domainLabel ?? domainLabel} Mock Interview`}
      startedAt={interview?.startedAt}
      pausedMs={interview?.pausedMs ?? 0}
      counter={`Q${Math.min(currentIndex + 1, interview?.questions.length || 8)} / ${interview?.questions.length || 8}`}
      timerLimitSeconds={45 * 60}
      onEndEarly={() => { void finishInterview(); }}
      onMaxVisibilityLeaves={() => { void finishInterview(); }}
      kickOutResultsPath={interview ? `/results/mock/${encodeURIComponent(interview.id)}` : undefined}
      kickOutTopic={interview?.interviewTitle}
    >
      <div className="min-h-[calc(100vh-72px)] bg-background px-4 py-6 sm:px-8 lg:px-12">
        <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
        {finishing ? (
          <div className="fixed inset-0 z-90 flex items-center justify-center bg-background/90 px-4">
            <div className="rounded-2xl border border-blueprint-line bg-card p-7 text-center shadow-2xl">
              <LoaderCircle size={24} className="mx-auto animate-spin text-primary" />
              <h2 className="mt-4 text-headline-md text-primary">Interview complete. Generating your readiness report...</h2>
              <p className="mt-2 text-body-md text-blueprint-muted">Elapsed: {elapsedLoading}s</p>
            </div>
          </div>
        ) : null}
        <main className="relative z-10 mx-auto w-full max-w-5xl space-y-5">
          {error ? <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-body-md text-red-700">{error}</p> : null}
          <section className="surface-card">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-ui-label text-blueprint-muted">{meta.name} · {meta.tag}</p>
                <h1 className="mt-2 text-headline-lg text-primary">{question?.question ?? 'Loading question...'}</h1>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-headline-sm text-white">{meta.name[0]}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-blueprint-line bg-blueprint-bg px-3 py-1 text-ui-label text-primary">{question?.type ?? 'question'}</span>
              <span className="rounded-full border border-blueprint-line bg-blueprint-bg px-3 py-1 text-ui-label text-blueprint-muted">{answeredCount} answered</span>
            </div>
          </section>

          <section className="surface-card">
            <label className="text-ui-label text-blueprint-muted">Your answer</label>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              disabled={!question || Boolean(currentResponse)}
              className="mt-3 min-h-72 w-full resize-none rounded-xl border border-blueprint-line bg-blueprint-bg p-4 text-body-md text-primary outline-none focus:border-primary disabled:opacity-70"
              placeholder="Answer like you would in a real interview. Name tradeoffs, examples, and validation."
            />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-ui-label text-blueprint-muted">
              <span className={draft.length < 100 ? 'text-amber-700' : 'text-blueprint-muted'}>{draft.length} characters · 100 soft minimum</span>
              {voiceSupported ? (
                <button type="button" onClick={listening ? stopListening : startListening} className="inline-flex items-center gap-2 rounded-full border border-blueprint-line px-4 py-2 text-primary">
                  {listening ? <Square size={15} /> : <Mic size={15} />} {listening ? 'Stop Listening' : 'Microphone'}
                </button>
              ) : null}
            </div>
            {currentResponse?.followUpQuestion ? (
              <div className="mt-5 rounded-xl border border-blueprint-line bg-card p-4">
                <p className="text-ui-label text-blueprint-muted">Optional follow-up</p>
                <p className="mt-2 text-body-md text-primary">{currentResponse.followUpQuestion}</p>
                <textarea value={followUpDraft} onChange={(event) => setFollowUpDraft(event.target.value)} className="mt-3 h-24 w-full resize-none rounded-xl border border-blueprint-line bg-blueprint-bg p-3 text-body-md text-primary outline-none" />
              </div>
            ) : null}
            {currentResponse ? (
              <div className="mt-5 rounded-2xl border border-blueprint-line bg-blueprint-bg p-4">
                <p className="text-ui-label text-blueprint-muted">{meta.name}</p>
                <p className="mt-2 text-body-md text-primary">{currentResponse.spokenResponse}</p>
              </div>
            ) : null}
            <div className="mt-5 flex justify-end gap-3">
              {currentResponse ? (
                <button type="button" onClick={nextQuestion} className="rounded-full bg-primary px-6 py-3 text-ui-label text-white">
                  {currentIndex >= (interview?.questions.length ?? 1) - 1 ? 'Finish Interview' : 'Next Question'}
                </button>
              ) : (
                <button type="button" disabled={!draft.trim() || submitting} onClick={() => { void submitAnswer(); }} className="rounded-full bg-primary px-6 py-3 text-ui-label text-white disabled:opacity-60">
                  {submitting ? 'Interviewer Thinking...' : 'Submit Answer'}
                </button>
              )}
            </div>
          </section>
        </main>
      </div>
    </RoundShell>
  );
}
