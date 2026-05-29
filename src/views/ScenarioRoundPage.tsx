import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Bookmark, BookmarkCheck, History, LoaderCircle, Mic, Search } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import RoundShell from '../components/RoundShell';
import { DOMAIN_LABELS, updatePrepWorkspace } from '../lib/prep';
import { usePrepWorkspace } from '../hooks/usePrepWorkspace';
import {
  fetchScenario,
  fetchScenarioAttempt,
  fetchScenarioOverview,
  generateScenario,
  saveScenarioAttempt,
  startScenarioAttempt,
  submitScenarioAttempt,
  type Scenario,
  type ScenarioAttempt,
  type ScenarioHistoryItem,
} from '../lib/scenarioSessions';
import { getScenarioTagCloud, toScenarioDomain } from '../lib/scenarioConfig';
import { updateUserPreferences } from '../lib/userPreferences';

const PENDING_SCENARIO_KEY = 'repoid-pending-scenario-generation';
const VOICE_TOOLTIP_KEY = 'repoid_voice_tooltip_seen';
const SCENARIO_DRAFT_PREFIX = 'repoid-scenario-answer-draft:';
const SCENARIO_GENERATION_ESTIMATED_TOTAL_SECONDS = 12;

type SpeechRecognitionAlternativeLike = {
  transcript?: string;
};

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternativeLike;
};

type SpeechRecognitionEventLike = Event & {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionErrorEventLike = Event & {
  error: string;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

type VoiceWindow = Window & {
  SpeechRecognition?: SpeechRecognitionConstructor;
  webkitSpeechRecognition?: SpeechRecognitionConstructor;
};

function formatSessionDate(value: string | null) {
  if (!value) return 'Not completed yet';
  return new Date(value).toLocaleDateString();
}

function scenarioScoreLabel(item: ScenarioHistoryItem) {
  if (item.score === null) return 'In progress';
  return `${item.score}/10`;
}

function appendTranscript(base: string, chunk: string) {
  const normalizedChunk = chunk.trim();
  if (!normalizedChunk) return base;
  const normalizedBase = base.trimEnd();
  if (!normalizedBase) return normalizedChunk;
  return `${normalizedBase} ${normalizedChunk}`;
}

function scenarioDraftKey(attemptId: string) {
  return `${SCENARIO_DRAFT_PREFIX}${attemptId}`;
}

function formatScenarioTypeLabel(value: string) {
  if (!value) return 'Scenario';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function ScenarioRoundPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ attemptId?: string }>();
  const workspace = usePrepWorkspace();
  const attemptId = String(params.attemptId ?? '').trim();
  const scenarioId = useMemo(() => new URLSearchParams(location.search).get('scenarioId') ?? '', [location.search]);
  const domain = toScenarioDomain(workspace.selections.domain);
  const domainLabel = DOMAIN_LABELS[workspace.selections.domain] ?? 'Selected Domain';

  const [overview, setOverview] = useState<{ suggestedTopics: string[]; history: ScenarioHistoryItem[] } | null>(null);
  const [loadingOverview, setLoadingOverview] = useState(false);
  const [loadingScenario, setLoadingScenario] = useState(false);
  const [loadingAttempt, setLoadingAttempt] = useState(false);
  const [startingScenario, setStartingScenario] = useState(false);
  const [submittingTopic, setSubmittingTopic] = useState<string | null>(null);
  const [submittingRound, setSubmittingRound] = useState(false);
  const [error, setError] = useState<{ message: string; suggestedDomain?: string; retryTopic?: string } | null>(null);
  const [pendingRetry, setPendingRetry] = useState<{ domain: string; topic: string; level: string } | null>(null);
  const [topic, setTopic] = useState('');
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [suggestionOffset, setSuggestionOffset] = useState(0);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [attempt, setAttempt] = useState<ScenarioAttempt | null>(null);
  const [draftAnswer, setDraftAnswer] = useState('');
  const [clockNow, setClockNow] = useState(Date.now());
  const [expiring, setExpiring] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [voiceListening, setVoiceListening] = useState(false);
  const [voiceProcessing, setVoiceProcessing] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceMessage, setVoiceMessage] = useState<string | null>(null);
  const [voiceTooltipVisible, setVoiceTooltipVisible] = useState(false);
  const [historySaveId, setHistorySaveId] = useState<string | null>(null);

  const generationStartedAt = useRef<number | null>(null);
  const generationPhaseRef = useRef<HTMLParagraphElement | null>(null);
  const elapsedRef = useRef<HTMLSpanElement | null>(null);
  const remainingRef = useRef<HTMLSpanElement | null>(null);
  const autoSubmitHandledRef = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const voiceRestartTimeoutRef = useRef<number | null>(null);
  const voiceProcessingTimeoutRef = useRef<number | null>(null);
  const voiceStoppedManuallyRef = useRef(true);
  const accumulatedTranscriptRef = useRef('');
  // Keep a ref always in sync with draftAnswer so callbacks/event handlers always read the latest value.
  const draftAnswerRef = useRef('');
  // Debounce timer for server-side draft saves.
  const serverSaveTimerRef = useRef<number | null>(null);

  const voiceSupported = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const speechWindow = window as VoiceWindow;
    return Boolean(speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition);
  }, []);

  const displayedSuggestions = useMemo(() => {
    const suggestions = overview?.suggestedTopics ?? getScenarioTagCloud(domain ?? '');
    if (!suggestions.length) return [];
    const offset = suggestionOffset % suggestions.length;
    return [...suggestions.slice(offset), ...suggestions.slice(0, offset)].slice(0, 6);
  }, [domain, overview?.suggestedTopics, suggestionOffset]);

  const filteredSuggestions = useMemo(() => {
    const suggestions = overview?.suggestedTopics ?? getScenarioTagCloud(domain ?? '');
    const query = topic.trim().toLowerCase();
    if (!query) return [];
    return suggestions.filter((suggestion) => suggestion.toLowerCase().includes(query)).slice(0, 8);
  }, [domain, overview?.suggestedTopics, topic]);

  const overviewHistory = overview?.history ?? [];
  const elapsedSeconds = attempt
    ? Math.max(0, Math.floor((clockNow - new Date(attempt.startedAt).getTime()) / 1000))
    : 0;
  const roundExpired = Boolean(attempt && elapsedSeconds >= attempt.durationMinutes * 60);
  const wordCount = draftAnswer.trim().split(/\s+/).filter(Boolean).length;
  const characterCount = draftAnswer.trim().length;

  const clearVoiceTimers = useCallback(() => {
    if (voiceRestartTimeoutRef.current !== null) {
      window.clearTimeout(voiceRestartTimeoutRef.current);
      voiceRestartTimeoutRef.current = null;
    }
    if (voiceProcessingTimeoutRef.current !== null) {
      window.clearTimeout(voiceProcessingTimeoutRef.current);
      voiceProcessingTimeoutRef.current = null;
    }
  }, []);

  const applyVoiceText = useCallback((nextValue: string) => {
    setDraftAnswer(nextValue);
  }, []);

  const stopVoiceInput = useCallback((message?: string, asError = false) => {
    voiceStoppedManuallyRef.current = true;
    clearVoiceTimers();
    try {
      recognitionRef.current?.stop();
    } catch {
      // Ignore browser stop races.
    }
    setVoiceListening(false);
    setVoiceProcessing(false);
    setInterimTranscript('');
    if (message) {
      if (asError) setVoiceError(message);
      else setVoiceMessage(message);
    }
  }, [clearVoiceTimers]);

  const startVoiceInput = useCallback(() => {
    if (!voiceSupported || !textareaRef.current) return;
    const speechWindow = window as VoiceWindow;
    const SpeechRecognitionCtor = speechWindow.SpeechRecognition || speechWindow.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognitionCtor();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        let finalTranscript = '';
        let interimText = '';

        for (let index = event.resultIndex; index < event.results.length; index += 1) {
          const result = event.results[index];
          const transcript = String(result[0]?.transcript ?? '').trim();
          if (!transcript) continue;
          if (result.isFinal) finalTranscript = appendTranscript(finalTranscript, transcript);
          else interimText = appendTranscript(interimText, transcript);
        }

        setVoiceTooltipVisible(false);
        setVoiceMessage(null);
        setVoiceError(null);

        if (finalTranscript) {
          accumulatedTranscriptRef.current = appendTranscript(accumulatedTranscriptRef.current, finalTranscript);
          setVoiceProcessing(true);
          if (voiceProcessingTimeoutRef.current !== null) window.clearTimeout(voiceProcessingTimeoutRef.current);
          voiceProcessingTimeoutRef.current = window.setTimeout(() => setVoiceProcessing(false), 350);
        }

        if (interimText) {
          setInterimTranscript(interimText);
          applyVoiceText(appendTranscript(accumulatedTranscriptRef.current, interimText));
        } else {
          setInterimTranscript('');
          applyVoiceText(accumulatedTranscriptRef.current);
        }
      };

      recognition.onerror = (event) => {
        if (event.error === 'no-speech') return;
        if (event.error === 'audio-capture') {
          stopVoiceInput('Microphone not accessible. Check browser permissions.', true);
          return;
        }
        if (event.error === 'not-allowed') {
          stopVoiceInput('Microphone permission denied. Enable it in browser settings.', true);
          return;
        }
        if (event.error === 'network') {
          stopVoiceInput('Voice recognition requires an internet connection.', true);
          return;
        }
        stopVoiceInput('Voice input stopped. Your text is saved - continue typing.', true);
      };

      recognition.onend = () => {
        if (voiceStoppedManuallyRef.current) {
          setVoiceListening(false);
          return;
        }
        if (voiceRestartTimeoutRef.current !== null) window.clearTimeout(voiceRestartTimeoutRef.current);
        voiceRestartTimeoutRef.current = window.setTimeout(() => {
          if (voiceStoppedManuallyRef.current) return;
          // Re-seed accumulated from the actual DOM value so any typing done between
          // voice sessions is preserved when voice auto-restarts.
          const currentText = textareaRef.current?.value ?? draftAnswerRef.current;
          accumulatedTranscriptRef.current = currentText;
          try {
            recognition.start();
            setVoiceListening(true);
          } catch (err) {
            const msg = String(err).toLowerCase();
            // 'already started' / 'invalid state' means recognition is already running — that's fine.
            if (!msg.includes('already started') && !msg.includes('invalid state')) {
              stopVoiceInput('Voice input stopped. Your text is saved - continue typing.', true);
            }
          }
        }, 300);
      };

      recognitionRef.current = recognition;
    }

    try {
      const seenTooltip = window.localStorage.getItem(VOICE_TOOLTIP_KEY);
      if (!seenTooltip) {
        setVoiceTooltipVisible(true);
        window.localStorage.setItem(VOICE_TOOLTIP_KEY, '1');
        window.setTimeout(() => setVoiceTooltipVisible(false), 3000);
      }
    } catch {
      // Ignore localStorage failures.
    }

    voiceStoppedManuallyRef.current = false;
    // Always seed from the actual DOM value so any typed text is never lost when resuming voice.
    accumulatedTranscriptRef.current = textareaRef.current.value;
    setInterimTranscript('');
    setVoiceError(null);
    setVoiceMessage(null);
    textareaRef.current.focus();

    try {
      recognitionRef.current.start();
      setVoiceListening(true);
    } catch {
      stopVoiceInput('Voice input stopped. Your text is saved - continue typing.', true);
    }
  }, [applyVoiceText, draftAnswer, stopVoiceInput, voiceSupported]);

  const launchTopic = useCallback(async (rawTopic?: string) => {
    const nextTopic = (rawTopic ?? topic).trim();
    if (!nextTopic || !domain) return;
    const pendingPayload = {
      domain,
      topic: nextTopic,
      level: workspace.selections.experienceLevel || 'intermediate',
    };
    setSubmittingTopic(nextTopic);
    setError(null);
    setPendingRetry(null);
    try {
      window.localStorage.setItem(PENDING_SCENARIO_KEY, JSON.stringify(pendingPayload));
    } catch {
      // Retry recovery is a local convenience.
    }
    const result = await generateScenario(pendingPayload);
    setSubmittingTopic(null);
    if (result.ok === false) {
      setError({
        message: result.aiUnavailable
          ? 'Scenario generation failed before a complete scenario could be created. Please try again.'
          : result.error,
        suggestedDomain: result.suggestedDomain,
        retryTopic: result.aiUnavailable ? nextTopic : undefined,
      });
      if (result.aiUnavailable) setPendingRetry(pendingPayload);
      return;
    }
    try {
      window.localStorage.removeItem(PENDING_SCENARIO_KEY);
    } catch {
      // Ignore local cleanup failures.
    }
    navigate(`/scenario-round?scenarioId=${encodeURIComponent(result.data.id)}`);
  }, [domain, navigate, topic, workspace.selections.experienceLevel]);

  const beginScenario = useCallback(async () => {
    if (!scenario || startingScenario) return;
    setStartingScenario(true);
    setError(null);
    const result = await startScenarioAttempt(scenario.id);
    setStartingScenario(false);
    if (result.ok === false) {
      setError({ message: result.error });
      return;
    }
    navigate(`/round/scenario/${encodeURIComponent(result.data.id)}`);
  }, [navigate, scenario, startingScenario]);

  const finalizeRound = useCallback(async (options: { autoSubmitted?: boolean; navigateOnComplete?: boolean; answerOverride?: string } = {}) => {
    if (!attempt || submittingRound) return null;
    const autoSubmitted = options.autoSubmitted ?? false;
    const navigateOnComplete = options.navigateOnComplete ?? true;
    const nextAnswer = options.answerOverride ?? draftAnswer;
    setSubmittingRound(true);
    const result = await submitScenarioAttempt(attempt.scenario.id, attempt.id, {
      answer: nextAnswer,
      autoSubmitted,
      timeSpentSeconds: Math.min(elapsedSeconds, attempt.durationMinutes * 60),
    });
    setSubmittingRound(false);
    setExpiring(false);
    if (result.ok === false) {
      setError({ message: result.error });
      return null;
    }
    setAttempt(result.data);
    if (navigateOnComplete) {
      navigate(`/results/scenario/${encodeURIComponent(result.data.id)}`, autoSubmitted ? { replace: true } : undefined);
    }
    return result.data;
  }, [attempt, draftAnswer, elapsedSeconds, navigate, submittingRound]);

  const handleSwitchSuggestedDomain = useCallback(async () => {
    if (!error?.suggestedDomain) return;
    const nextDomain = error.suggestedDomain;
    updatePrepWorkspace({ selections: { ...workspace.selections, domain: nextDomain } });
    void updateUserPreferences({ domain: nextDomain }).catch(() => undefined);
    setError(null);
  }, [error?.suggestedDomain, workspace.selections]);

  const openHistoryItem = useCallback((item: ScenarioHistoryItem) => {
    if (item.status === 'completed') {
      navigate(`/results/scenario/${encodeURIComponent(item.attemptId)}`);
      return;
    }
    navigate(`/round/scenario/${encodeURIComponent(item.attemptId)}`);
  }, [navigate]);

  const handleSaveScenarioItem = useCallback(async (item: ScenarioHistoryItem) => {
    if (historySaveId === item.attemptId) return;
    setHistorySaveId(item.attemptId);
    const result = await saveScenarioAttempt(item.attemptId, true);
    setHistorySaveId(null);
    if (result.ok === false) return;
    setOverview((current) => current ? {
      ...current,
      history: current.history.map((entry) => entry.attemptId === item.attemptId ? { ...entry, savedAt: result.data } : entry),
    } : current);
  }, [historySaveId]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const handleVisibilityChange = () => {
      if (document.hidden && voiceListening) {
        stopVoiceInput('Recording paused - tab switch detected.');
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [stopVoiceInput, voiceListening]);

  useEffect(() => () => {
    clearVoiceTimers();
    try {
      recognitionRef.current?.abort();
    } catch {
      // Ignore browser abort races.
    }
  }, [clearVoiceTimers]);

  useEffect(() => {
    voiceStoppedManuallyRef.current = true;
    accumulatedTranscriptRef.current = '';
    clearVoiceTimers();
    setInterimTranscript('');
    setVoiceListening(false);
    setVoiceProcessing(false);
    setVoiceError(null);
    setVoiceMessage(null);
    try {
      recognitionRef.current?.stop();
    } catch {
      // Ignore browser stop races while changing attempts.
    }
  }, [attempt?.id, clearVoiceTimers]);

  useEffect(() => {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(PENDING_SCENARIO_KEY) || 'null') as { domain?: string; topic?: string; level?: string } | null;
      if (parsed?.domain && parsed?.topic) setPendingRetry({ domain: parsed.domain, topic: parsed.topic, level: parsed.level || 'intermediate' });
    } catch {
      setPendingRetry(null);
    }
  }, []);

  useEffect(() => {
    if (!attemptId && !scenarioId) {
      setAttempt(null);
      setScenario(null);
    }
  }, [attemptId, scenarioId]);

  useEffect(() => {
    if (!domain || attemptId || scenarioId) return undefined;
    let ignore = false;
    setLoadingOverview(true);
    void fetchScenarioOverview(domain).then((result) => {
      if (ignore) return;
      setLoadingOverview(false);
      if (result.ok === false) {
        setOverview(null);
        setError({ message: result.error, suggestedDomain: result.suggestedDomain });
        return;
      }
      setOverview({
        suggestedTopics: Array.isArray(result.data.suggestedTopics) ? result.data.suggestedTopics : [],
        history: Array.isArray(result.data.history) ? result.data.history : [],
      });
    });
    return () => {
      ignore = true;
    };
  }, [attemptId, domain, scenarioId]);

  useEffect(() => {
    const suggestions = overview?.suggestedTopics ?? getScenarioTagCloud(domain ?? '');
    if (suggestions.length) setSuggestionOffset(Math.floor(Math.random() * suggestions.length));
  }, [domain, overview?.suggestedTopics]);

  useEffect(() => {
    setActiveSuggestionIndex(0);
  }, [topic]);

  useEffect(() => {
    if (!scenarioId || attemptId) {
      setScenario(null);
      return undefined;
    }
    let ignore = false;
    setLoadingScenario(true);
    setError(null);
    void fetchScenario(scenarioId).then((result) => {
      if (ignore) return;
      setLoadingScenario(false);
      if (result.ok === false) {
        setScenario(null);
        setError({ message: result.error });
        return;
      }
      setScenario(result.data);
      setTopic(result.data.topic);
    });
    return () => {
      ignore = true;
    };
  }, [attemptId, scenarioId]);

  useEffect(() => {
    if (!attemptId) return undefined;
    let ignore = false;
    autoSubmitHandledRef.current = false;
    setLoadingAttempt(true);
    setError(null);
    void fetchScenarioAttempt(attemptId).then((result) => {
      if (ignore) return;
      setLoadingAttempt(false);
      if (result.ok === false) {
        setAttempt(null);
        setError({ message: result.error });
        return;
      }
      setAttempt(result.data);
      setScenario(result.data.scenario);
      let savedDraft = '';
      try {
        savedDraft = window.localStorage.getItem(scenarioDraftKey(result.data.id)) ?? '';
      } catch {
        savedDraft = '';
      }
      setDraftAnswer(savedDraft || result.data.answer || '');
      if (result.data.status === 'completed') {
        navigate(`/results/scenario/${encodeURIComponent(result.data.id)}`, { replace: true });
      }
    });
    return () => {
      ignore = true;
    };
  }, [attemptId, navigate]);

  useEffect(() => {
    // Keep draftAnswerRef always in sync so callbacks can read latest without stale closures.
    draftAnswerRef.current = draftAnswer;
    if (!attempt?.id || attempt.status === 'completed') return;
    try {
      window.localStorage.setItem(scenarioDraftKey(attempt.id), draftAnswer);
    } catch {
      // Local draft persistence is best-effort.
    }
    // Debounced server-side save every 8 s of inactivity.
    if (serverSaveTimerRef.current !== null) window.clearTimeout(serverSaveTimerRef.current);
    serverSaveTimerRef.current = window.setTimeout(() => {
      serverSaveTimerRef.current = null;
      void fetch(`/api/round-drafts/scenario-round/${encodeURIComponent(attempt.id)}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload: { answer: draftAnswer } }),
      }).catch(() => undefined);
    }, 8000);
  }, [attempt?.id, attempt?.status, draftAnswer]);

  // Save to localStorage synchronously on page unload so a hard refresh doesn't lose data.
  useEffect(() => {
    const handleBeforeUnload = () => {
      const id = attempt?.id;
      if (!id || attempt?.status === 'completed') return;
      try { window.localStorage.setItem(scenarioDraftKey(id), draftAnswerRef.current); } catch { /* ignore */ }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [attempt?.id, attempt?.status]);

  useEffect(() => {
    if (!attempt) return undefined;
    const timer = window.setInterval(() => setClockNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [attempt?.id]);

  useEffect(() => {
    if (!attempt || !roundExpired || submittingRound || autoSubmitHandledRef.current) return;
    autoSubmitHandledRef.current = true;
    setExpiring(true);
    void finalizeRound({ autoSubmitted: true, navigateOnComplete: true, answerOverride: draftAnswer });
  }, [attempt, draftAnswer, finalizeRound, roundExpired, submittingRound]);

  useEffect(() => {
    if (!submittingTopic) return undefined;
    generationStartedAt.current = Date.now();
    const writeCountdown = () => {
      const elapsed = Math.max(0, Math.floor((Date.now() - (generationStartedAt.current ?? Date.now())) / 1000));
      if (generationPhaseRef.current) generationPhaseRef.current.textContent = 'Building your scenario...';
      if (elapsedRef.current) elapsedRef.current.textContent = `${elapsed}s`;
      if (remainingRef.current) remainingRef.current.textContent = `${Math.max(0, SCENARIO_GENERATION_ESTIMATED_TOTAL_SECONDS - elapsed)}s`;
    };
    writeCountdown();
    const timer = window.setInterval(writeCountdown, 1000);
    return () => {
      window.clearInterval(timer);
      generationStartedAt.current = null;
    };
  }, [submittingTopic]);

  if (!domain) {
    return (
      <div className="min-h-full bg-background px-4 py-8 sm:px-8 lg:px-16">
        <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
        <main className="relative z-10 mx-auto w-full max-w-4xl">
          <section className="surface-card">
            <p className="text-body-md text-red-700">Choose your interview domain in onboarding before opening the scenario round.</p>
          </section>
        </main>
      </div>
    );
  }

  if (attemptId) {
    return (
      <div className="min-h-full bg-background px-4 py-6 sm:px-8 lg:px-16">
        <RoundShell
          attemptId={attempt?.id}
          feature="scenario-round"
          label={`${domainLabel} Scenario Round`}
          startedAt={attempt?.startedAt}
          timerLimitSeconds={attempt ? attempt.durationMinutes * 60 : 30 * 60}
          onEndEarly={() => { void finalizeRound(); }}
          onMaxVisibilityLeaves={() => { void finalizeRound({ autoSubmitted: true, navigateOnComplete: false, answerOverride: draftAnswer }); }}
          kickOutResultsPath={attempt ? `/results/scenario/${encodeURIComponent(attempt.id)}` : undefined}
          kickOutTopic={attempt?.scenario.topic ?? topic}
          kickOutCompletedLabel={draftAnswer.trim() ? 'Your drafted answer will be submitted.' : 'No answer was drafted yet.'}
        >
          <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
          {expiring ? (
            <div className="fixed inset-0 z-95 flex items-center justify-center bg-white/80 px-4 backdrop-blur-sm">
              <div className="max-w-md rounded-2xl border border-blueprint-line bg-white p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.14)]">
                <p className="text-ui-label text-blueprint-muted">Time Is Up</p>
                <h2 className="mt-3 text-headline-lg text-primary">Submitting your scenario now.</h2>
                <p className="mt-3 text-body-md text-blueprint-muted">Your saved response is being finalized and scored.</p>
              </div>
            </div>
          ) : null}
          <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-5 sm:px-0">
            {loadingAttempt ? <p className="text-body-md text-blueprint-muted">Loading scenario attempt...</p> : null}
            {error ? <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-body-md text-red-700">{error.message}</p> : null}
            {!loadingAttempt && attempt ? (
              <>
                <section className="rounded-2xl border border-blueprint-line bg-card p-4 shadow-[0_16px_34px_rgba(0,0,0,0.06)] sm:p-5">
                  <p className="text-ui-label text-blueprint-muted">Scenario Context</p>
                  <p className="mt-3 max-h-32 overflow-y-auto pr-2 text-body-md leading-7 text-primary [scrollbar-gutter:stable]">{attempt.scenario.context}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-blueprint-bg px-3 py-1 text-ui-label text-blueprint-muted">{attempt.scenario.topic}</span>
                    <span className="rounded-full bg-blueprint-bg px-3 py-1 text-ui-label text-blueprint-muted">{attempt.scenario.role}</span>
                    <span className="rounded-full bg-blueprint-bg px-3 py-1 text-ui-label text-blueprint-muted">{formatScenarioTypeLabel(attempt.scenario.type)}</span>
                  </div>
                </section>

                <section className="surface-card">
                  <p className="text-ui-label text-blueprint-muted">Single prompt</p>
                  <h1 className="mt-4 font-serif text-[clamp(1.5rem,2.8vw,2.25rem)] leading-tight text-primary">{attempt.scenario.question}</h1>

                  <div className="mt-6 overflow-hidden rounded-2xl border border-blueprint-line bg-blueprint-bg">
                    <button
                      type="button"
                      onClick={() => setHintOpen((current) => !current)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-ui-label text-primary">Hint</span>
                      <span className="text-ui-label text-blueprint-muted">{hintOpen ? 'Hide' : 'Show'}</span>
                    </button>
                    {hintOpen ? (
                      <div className="border-t border-blueprint-line px-5 py-4 text-body-md text-blueprint-muted">
                        {attempt.scenario.hint}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-6 grid gap-3">
                    <textarea
                      ref={textareaRef}
                      value={draftAnswer}
                      onChange={(event) => {
                        setDraftAnswer(event.target.value);
                        accumulatedTranscriptRef.current = event.target.value;
                      }}
                      disabled={submittingRound || expiring}
                      className={`min-h-[16rem] w-full resize-none rounded-2xl border border-blueprint-line bg-blueprint-bg p-5 text-body-md text-primary outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-70 sm:min-h-[18rem] ${interimTranscript ? 'italic opacity-80' : ''}`}
                      placeholder="Answer as if you are explaining your diagnosis, decision, tradeoff, and validation plan to a senior interviewer."
                    />

                    {voiceSupported ? (
                      <div className="flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (voiceListening) stopVoiceInput();
                            else startVoiceInput();
                          }}
                          disabled={submittingRound || expiring}
                          className={`relative inline-flex min-h-11 min-w-11 items-center gap-3 rounded-full border px-4 py-2 text-ui-label transition-colors ${voiceListening ? 'border-red-300 bg-red-50 text-red-700' : 'border-blueprint-line bg-card text-primary'} disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                          <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-current">
                            {voiceListening ? <span className="absolute inset-0 rounded-full border-2 border-red-400 animate-ping" /> : null}
                            {voiceProcessing ? <LoaderCircle size={18} className="animate-spin" /> : <Mic size={18} />}
                          </span>
                          <span>{voiceListening ? 'Listening...' : voiceProcessing ? 'Processing...' : 'Speak answer'}</span>
                        </button>
                        {voiceListening ? (
                          <button
                            type="button"
                            onClick={() => stopVoiceInput()}
                            disabled={submittingRound || expiring}
                            className="rounded-xl border border-blueprint-line bg-card px-4 py-2 text-ui-label text-primary disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            Stop Listening
                          </button>
                        ) : null}
                        {voiceTooltipVisible ? (
                          <p className="text-ui-label text-blueprint-muted">We'll ask for microphone access. Your audio is processed locally and never sent as audio to the server.</p>
                        ) : null}
                      </div>
                    ) : null}

                    {voiceError ? <p className="text-ui-label text-red-600">{voiceError}</p> : null}
                    {voiceMessage ? <p className="text-ui-label text-blueprint-muted">{voiceMessage}</p> : null}

                    <div className="flex flex-wrap items-center justify-between gap-3 text-ui-label text-blueprint-muted">
                      <span>{characterCount} characters</span>
                      <span>{wordCount} words{wordCount < 150 ? ' - aim for 150+ words for a strong answer.' : ''}</span>
                    </div>
                  </div>
                </section>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/scenario-round?scenarioId=${encodeURIComponent(attempt.scenario.id)}`)}
                    className="rounded-full border border-blueprint-line px-6 py-3 text-ui-label text-primary hover:bg-[#f5f3f3]"
                  >
                    Back To Brief
                  </button>
                  <button
                    type="button"
                    disabled={!draftAnswer.trim() || submittingRound || expiring}
                    onClick={() => { void finalizeRound(); }}
                    className="rounded-full bg-primary px-8 py-3 text-ui-label text-white hover:bg-[#303031] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submittingRound ? 'Submitting...' : 'Submit Answer'}
                  </button>
                </div>
              </>
            ) : null}
          </main>
        </RoundShell>
      </div>
    );
  }

  if (scenarioId) {
    return (
      <div className="min-h-full bg-background px-4 py-8 sm:px-8 lg:px-16">
        <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
        <main className="relative z-10 mx-auto w-full max-w-5xl space-y-6">
          {loadingScenario ? <p className="text-body-md text-blueprint-muted">Loading scenario preview...</p> : null}
          {error ? <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-body-md text-red-700">{error.message}</p> : null}
          {scenario ? (
            <section className="rounded-[28px] border border-blueprint-line bg-card p-6 shadow-[0_24px_48px_rgba(0,0,0,0.06)] sm:p-8">
              <p className="text-ui-label text-blueprint-muted">Before You Start</p>
              <h1 className="mt-3 page-title">{scenario.title}</h1>
              <div className="mt-5 flex flex-wrap gap-2 text-ui-label text-blueprint-muted">
                <span className="rounded-full bg-blueprint-bg px-3 py-1">{scenario.topic}</span>
                <span className="rounded-full bg-blueprint-bg px-3 py-1">{scenario.role}</span>
                <span className="rounded-full bg-blueprint-bg px-3 py-1">{formatScenarioTypeLabel(scenario.type)}</span>
                <span className="rounded-full bg-blueprint-bg px-3 py-1">30 minutes</span>
              </div>
              <div className="mt-6 rounded-2xl border border-blueprint-line bg-blueprint-bg p-4 sm:p-5">
                <p className="text-ui-label text-blueprint-muted">Context</p>
                <p className="mt-3 max-h-36 overflow-y-auto pr-2 text-body-md leading-7 text-primary [scrollbar-gutter:stable]">{scenario.context}</p>
              </div>
              <div className="mt-6 rounded-2xl border border-blueprint-line bg-card p-5">
                <p className="text-ui-label text-blueprint-muted">Question</p>
                <h2 className="mt-3 font-serif text-[clamp(1.45rem,2.8vw,2.15rem)] leading-tight text-primary">{scenario.question}</h2>
                <p className="mt-4 text-body-md text-blueprint-muted">Hint: {scenario.hint}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => navigate('/scenario-round')} className="rounded-full border border-blueprint-line px-6 py-3 text-ui-label text-primary hover:bg-[#f5f3f3]">
                  Back
                </button>
                <button
                  type="button"
                  disabled={startingScenario}
                  onClick={() => { void beginScenario(); }}
                  className="rounded-full bg-primary px-6 py-3 text-ui-label text-white hover:bg-[#303031] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {startingScenario ? 'Starting...' : 'Start Scenario Round'}
                </button>
              </div>
            </section>
          ) : null}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-background px-4 py-8 sm:px-8 lg:px-16">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
      {submittingTopic ? (
        <div className="fixed inset-0 z-120 flex items-center justify-center bg-background text-primary">
          <div className="rounded-2xl border border-blueprint-line bg-card px-6 py-5 text-center shadow-2xl">
            <LoaderCircle size={24} className="mx-auto animate-spin text-primary" />
            <p ref={generationPhaseRef} className="mt-4 text-body-lg text-primary">Building your scenario...</p>
          </div>
        </div>
      ) : null}
      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="rounded-[28px] border border-blueprint-line bg-card p-6 shadow-[0_24px_48px_rgba(0,0,0,0.06)] sm:p-8">
          <p className="text-ui-label text-blueprint-muted">Scenario Round</p>
          <h1 className="mt-3 page-title">Practice one deep scenario question for {domainLabel}.</h1>
          <span className="mt-3 inline-block rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm text-amber-800">
            You're given a real workplace crisis. Solve it.
          </span>
          <p className="mt-3 max-w-3xl text-body-lg text-blueprint-muted">
            Search a domain-specific topic and we will generate one realistic scenario with a single open-ended question that rewards clear engineering tradeoffs and specific validation thinking.
          </p>

          <form
            className="mt-6"
            onSubmit={(event) => {
              event.preventDefault();
              void launchTopic();
            }}
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1 rounded-2xl border border-blueprint-line bg-blueprint-bg px-4 py-3">
                <div className="flex items-center gap-3">
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
                    placeholder="Search a scenario topic e.g. React Server Components, API Rate Limiting, Docker Networking"
                    className="w-full bg-transparent text-body-lg text-primary outline-none placeholder:text-blueprint-muted"
                  />
                </div>
                {filteredSuggestions.length ? (
                  <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-20 rounded-2xl border border-blueprint-line bg-card p-2 shadow-[0_24px_48px_rgba(0,0,0,0.08)]">
                    {filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => {
                          setTopic(suggestion);
                          void launchTopic(suggestion);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-body-md ${index === activeSuggestionIndex ? 'bg-blueprint-bg text-primary' : 'text-blueprint-muted hover:bg-blueprint-bg'}`}
                      >
                        <span>{suggestion}</span>
                        <ArrowRight size={16} />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <button type="submit" disabled={!topic.trim() || submittingTopic !== null} className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-ui-label text-white transition-colors hover:bg-[#303031] disabled:cursor-not-allowed disabled:opacity-60">
                {submittingTopic ? 'Building...' : 'Build Scenario'}
              </button>
            </div>
          </form>

          {error ? (
            <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-body-md text-red-700">
              <p>{error.message}</p>
              <div className="mt-3 flex flex-wrap gap-3">
                {error.suggestedDomain ? (
                  <button type="button" onClick={() => { void handleSwitchSuggestedDomain(); }} className="rounded-full border border-red-200 bg-white px-4 py-2 text-ui-label text-red-700 hover:bg-red-100">
                    Switch Domain
                  </button>
                ) : null}
                {pendingRetry && error.retryTopic ? (
                  <button type="button" onClick={() => { void launchTopic(pendingRetry.topic); }} className="rounded-full border border-red-200 bg-white px-4 py-2 text-ui-label text-red-700 hover:bg-red-100">
                    Retry Generation
                  </button>
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="mt-6">
            <p className="text-ui-label text-blueprint-muted">Featured topics for {domainLabel}</p>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
              {displayedSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setTopic(suggestion);
                    void launchTopic(suggestion);
                  }}
                  className="whitespace-nowrap rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-primary transition-colors hover:bg-blueprint-bg"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="surface-card">
          <div className="flex items-center gap-3">
            <History size={18} className="text-blueprint-muted" />
            <div>
              <p className="text-ui-label text-blueprint-muted">Session History</p>
              <h2 className="text-headline-md text-primary">Recent scenario attempts</h2>
            </div>
          </div>
          {loadingOverview ? <p className="mt-4 text-body-md text-blueprint-muted">Loading scenario history...</p> : null}
          {!loadingOverview && overviewHistory.length === 0 ? <p className="mt-4 text-body-md text-blueprint-muted">No saved scenario attempts yet. Build your first scenario to start a history.</p> : null}
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {overviewHistory.map((item) => (
              <article key={item.attemptId} className="rounded-2xl border border-blueprint-line bg-blueprint-bg p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-ui-label text-blueprint-muted">{item.completedAt ? formatSessionDate(item.completedAt) : formatSessionDate(item.generatedAt)}</p>
                    <h3 className="mt-2 text-headline-md text-primary">
                      <button type="button" onClick={() => openHistoryItem(item)} className="text-left hover:underline">
                        {item.topic}
                      </button>
                    </h3>
                    <p className="mt-1 text-body-md text-blueprint-muted">{item.title}</p>
                  </div>
                  <span className="rounded-full border border-blueprint-line bg-white px-3 py-1 text-ui-label text-primary">{scenarioScoreLabel(item)}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => { void handleSaveScenarioItem(item); }}
                    disabled={historySaveId === item.attemptId}
                    className="inline-flex items-center gap-2 rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-primary hover:bg-[#f5f3f3] disabled:opacity-60"
                  >
                    {historySaveId === item.attemptId ? <LoaderCircle size={15} className="animate-spin" /> : item.savedAt ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
                    {historySaveId === item.attemptId ? 'Saving...' : item.savedAt ? 'Saved' : 'Save'}
                  </button>
                  <button type="button" onClick={() => { setTopic(item.topic); void launchTopic(item.topic); }} className="rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-primary hover:bg-[#f5f3f3]">
                    Retry Topic
                  </button>
                  {item.status === 'completed' ? (
                    <button type="button" onClick={() => navigate(`/results/scenario/${encodeURIComponent(item.attemptId)}`)} className="rounded-full bg-primary px-4 py-2 text-ui-label text-white hover:bg-[#303031]">
                      View Results
                    </button>
                  ) : (
                    <button type="button" onClick={() => navigate(`/round/scenario/${encodeURIComponent(item.attemptId)}`)} className="rounded-full bg-primary px-4 py-2 text-ui-label text-white hover:bg-[#303031]">
                      Resume
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
