import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LoaderCircle, Mic, Square } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import RoundDomainGate from '../components/RoundDomainGate';
import RoundShell from '../components/RoundShell';
import { DOMAIN_LABELS } from '../lib/prep';
import { usePrepWorkspace } from '../hooks/usePrepWorkspace';
import {
  fetchMockInterview,
  finishMockInterview,
  respondToMockQuestion,
  startMockInterview,
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

export default function TerminalPage(_props: TerminalPageProps) {
  const navigate = useNavigate();
  const params = useParams<{ interviewId?: string }>();
  const interviewId = String(params.interviewId ?? '').trim();
  const workspace = usePrepWorkspace();
  const domain = workspace.selections.domain;
  const domainLabel = DOMAIN_LABELS[domain] ?? 'Selected Domain';
  const [domainConfirmed, setDomainConfirmed] = useState(Boolean(interviewId));
  const [level, setLevel] = useState<MockLevel | null>(null);
  const [interviewType, setInterviewType] = useState<MockInterviewType | null>(null);
  const [persona, setPersona] = useState<MockPersona | null>(null);
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
    const result = await startMockInterview({ domain, level, interviewType, persona });
    setLoading(false);
    if (result.ok === false) {
      setError(result.error);
      return;
    }
    setInterview(result.data);
    setCurrentIndex(pickNextIndex(result.data));
    navigate(`/round/mock/${encodeURIComponent(result.data.id)}`, { replace: true });
  }, [domain, interviewType, level, loading, navigate, persona]);

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

  if (!interviewId && !domainConfirmed) {
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

          <button type="button" disabled={!setupReady || loading} onClick={() => { void startInterview(); }} className="rounded-full bg-primary px-6 py-3 text-ui-label text-white disabled:cursor-not-allowed disabled:opacity-60">
            Start Interview
          </button>
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
