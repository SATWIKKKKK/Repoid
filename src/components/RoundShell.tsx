import React, { Component, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { abandonRound, logFocusEvent } from '../lib/roundRuntime';

const MAX_VISIBILITY_LEAVES = 5;
const MAX_TOTAL_ABSENCE_MS = 10 * 60 * 1000;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
}

class RoundErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="w-full max-w-lg rounded-2xl border border-blueprint-line bg-card p-6 text-center shadow-xl">
            <p className="text-ui-label text-blueprint-muted">Progress Saved</p>
            <h2 className="mt-2 text-headline-md text-primary not-italic">Something went wrong in this round.</h2>
            <p className="mt-3 text-body-md text-blueprint-muted">Your attempt is still open. Retry the current screen to continue from the saved state.</p>
            <button type="button" onClick={() => this.setState({ hasError: false })} className="mt-5 rounded-full bg-primary px-5 py-2.5 text-ui-label text-white">
              Retry Current Question
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function RoundShell({
  attemptId,
  feature,
  label,
  startedAt,
  pausedMs = 0,
  counter,
  timerLimitSeconds,
  onEndEarly,
  onMaxVisibilityLeaves,
  kickOutResultsPath,
  kickOutTopic,
  kickOutCompletedLabel,
  children,
}: {
  attemptId?: string | null;
  feature: string;
  label: string;
  startedAt?: string | null;
  pausedMs?: number;
  counter?: string;
  timerLimitSeconds?: number;
  onEndEarly?: () => void;
  onMaxVisibilityLeaves?: () => Promise<void> | void;
  kickOutResultsPath?: string;
  kickOutTopic?: string;
  kickOutCompletedLabel?: string;
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const timerRef = useRef<HTMLSpanElement | null>(null);
  const timerIntervalRef = useRef<number | null>(null);
  const pauseStartedAtRef = useRef<number | null>(null);
  const hiddenStartedAtRef = useRef<number | null>(null);
  const totalAbsenceMsRef = useRef(0);
  const kickOutHandledRef = useRef(false);
  const pausedMsRef = useRef(pausedMs);
  const [visibilityWarning, setVisibilityWarning] = useState(false);
  const [visibilityLeaveCount, setVisibilityLeaveCount] = useState(0);
  const [fullscreenWarning, setFullscreenWarning] = useState(false);
  const [kickOutActive, setKickOutActive] = useState(false);
  const [kickOutSubmitting, setKickOutSubmitting] = useState(false);
  const [offline, setOffline] = useState(() => typeof navigator !== 'undefined' ? !navigator.onLine : false);
  const [endConfirm, setEndConfirm] = useState(false);
  const [endConfirmStep, setEndConfirmStep] = useState(0);
  const isMobile = useMemo(() => typeof navigator !== 'undefined' && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent), []);
  const startedAtMs = useMemo(() => startedAt ? new Date(startedAt).getTime() : Date.now(), [startedAt]);
  const leaveCountKey = attemptId ? `repoid-round-leaves:${feature}:${attemptId}` : '';
  const visibilityEnforced = Boolean(attemptId && onMaxVisibilityLeaves);

  useEffect(() => {
    if (!attemptId) return undefined;
    try {
      window.localStorage.setItem('repoid-active-round', JSON.stringify({ attemptId, feature, path: window.location.pathname }));
    } catch {
      return undefined;
    }
    return undefined;
  }, [attemptId, feature]);

  useEffect(() => {
    kickOutHandledRef.current = false;
    hiddenStartedAtRef.current = null;
    totalAbsenceMsRef.current = 0;
    setKickOutActive(false);
    setKickOutSubmitting(false);
    if (!leaveCountKey) {
      setVisibilityLeaveCount(0);
      return;
    }
    try {
      setVisibilityLeaveCount(Number(window.localStorage.getItem(leaveCountKey) ?? 0));
    } catch {
      setVisibilityLeaveCount(0);
    }
  }, [leaveCountKey]);

  useEffect(() => {
    const updateTimer = () => {
      if (!timerRef.current) return;
      const elapsedSeconds = Math.max(0, Math.floor((Date.now() - startedAtMs - pausedMsRef.current) / 1000));
      if (timerLimitSeconds) {
        timerRef.current.textContent = `${formatTime(Math.min(elapsedSeconds, timerLimitSeconds))} / ${formatTime(timerLimitSeconds)}`;
        return;
      }
      timerRef.current.textContent = formatTime(elapsedSeconds);
    };
    updateTimer();
    timerIntervalRef.current = window.setInterval(updateTimer, 1000);
    return () => {
      if (timerIntervalRef.current !== null) {
        window.clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [startedAtMs, timerLimitSeconds]);

  useEffect(() => {
    const triggerKickOut = (leaveCount: number) => {
      if (!attemptId || !visibilityEnforced || kickOutHandledRef.current) return;
      kickOutHandledRef.current = true;
      setVisibilityWarning(false);
      setKickOutActive(true);
      setKickOutSubmitting(true);
      void logFocusEvent(attemptId, feature, 'visibility-limit-exceeded', {
        count: leaveCount,
        totalAbsenceMs: totalAbsenceMsRef.current,
      });
      Promise.resolve(onMaxVisibilityLeaves?.())
        .catch(() => undefined)
        .finally(() => setKickOutSubmitting(false));
    };

    const handleVisibility = () => {
      if (!attemptId || !visibilityEnforced) return;
      if (document.hidden) {
        hiddenStartedAtRef.current = Date.now();
        let nextCount = 1;
        try {
          nextCount = Number(window.localStorage.getItem(leaveCountKey) ?? 0) + 1;
          window.localStorage.setItem(leaveCountKey, String(nextCount));
        } catch {
          nextCount = visibilityLeaveCount + 1;
        }
        setVisibilityLeaveCount(nextCount);
        void logFocusEvent(attemptId, feature, 'visibility-hidden');
      } else {
        let count = visibilityLeaveCount;
        try {
          count = Number(window.localStorage.getItem(leaveCountKey) ?? visibilityLeaveCount);
        } catch {
          count = visibilityLeaveCount;
        }
        if (hiddenStartedAtRef.current) {
          totalAbsenceMsRef.current += Date.now() - hiddenStartedAtRef.current;
          hiddenStartedAtRef.current = null;
        }
        if (count >= MAX_VISIBILITY_LEAVES || totalAbsenceMsRef.current >= MAX_TOTAL_ABSENCE_MS) {
          triggerKickOut(count);
          return;
        }
        setVisibilityWarning(true);
        void logFocusEvent(attemptId, feature, 'visibility-returned', {
          count,
          totalAbsenceMs: totalAbsenceMsRef.current,
        });
      }
    };
    const handleFullscreen = () => {
      if (!attemptId) return;
      if (!document.fullscreenElement) {
        pauseStartedAtRef.current = Date.now();
        setFullscreenWarning(true);
        void logFocusEvent(attemptId, feature, 'fullscreen-exit');
      }
    };
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (attemptId) void abandonRound(attemptId, feature, 'beforeunload');
      event.preventDefault();
      event.returnValue = '';
    };
    const handleKeydown = (event: KeyboardEvent) => {
      if (kickOutActive) return;
      const isExitShortcut = (event.altKey && event.key === 'ArrowLeft')
        || ((event.ctrlKey || event.metaKey) && ['w', 'r'].includes(event.key.toLowerCase()));
      if (isExitShortcut) {
        event.preventDefault();
        setEndConfirm(true);
      }
      if (event.key === 'Escape') setEndConfirm(true);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('fullscreenchange', handleFullscreen);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('fullscreenchange', handleFullscreen);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [attemptId, feature, kickOutActive, leaveCountKey, onMaxVisibilityLeaves, visibilityEnforced, visibilityLeaveCount]);

  useEffect(() => {
    const goOnline = () => setOffline(false);
    const goOffline = () => setOffline(true);
    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    };
  }, []);

  const resumeFullscreen = async () => {
    if (pauseStartedAtRef.current) {
      pausedMsRef.current += Date.now() - pauseStartedAtRef.current;
      pauseStartedAtRef.current = null;
    }
    setFullscreenWarning(false);
    await document.documentElement.requestFullscreen?.().catch(() => undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 border-b border-blueprint-line bg-card/95 px-4 py-3 backdrop-blur">
        {isMobile ? <p className="mb-2 rounded-lg border border-blueprint-line bg-[#fff7df] px-3 py-2 text-ui-label text-primary">Round in progress - navigating away will end your session.</p> : null}
        <div className="mx-auto flex max-w-360 items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-ui-label text-blueprint-muted">{label}</p>
            {counter ? <p className="text-body-md text-primary">{counter}</p> : null}
          </div>
          <div className="flex items-center gap-3">
            <span ref={timerRef} className="rounded-full border border-blueprint-line px-3 py-1.5 text-ui-label text-primary">{timerLimitSeconds ? `0:00 / ${formatTime(timerLimitSeconds)}` : '0:00'}</span>
            <button type="button" onClick={() => setEndConfirm(true)} className="rounded-full border border-blueprint-line px-4 py-2 text-ui-label text-primary">End Early</button>
          </div>
        </div>
      </div>

      {offline ? <div className="fixed left-1/2 top-20 z-90 -translate-x-1/2 rounded-full border border-blueprint-line bg-card px-5 py-3 text-ui-label text-primary shadow-xl">Connection lost - your answer is saved locally.</div> : null}
      {visibilityWarning ? <div className="fixed inset-0 z-90 flex items-center justify-center bg-black/40 px-4"><div className="max-w-md rounded-2xl bg-card p-6 text-center"><h2 className="text-headline-md text-primary not-italic">You left the round.</h2><p className="mt-2 text-body-md text-blueprint-muted">You left the round ({visibilityLeaveCount} of {MAX_VISIBILITY_LEAVES} allowed). Return limit: {MAX_VISIBILITY_LEAVES} times. Leaving again will auto-submit your round.</p><button type="button" onClick={() => setVisibilityWarning(false)} className="mt-5 rounded-full bg-primary px-5 py-2.5 text-ui-label text-white">Resume</button></div></div> : null}
      {kickOutActive ? (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/55 px-4">
          <div className="w-full max-w-xl rounded-3xl border border-blueprint-line bg-card p-8 text-center shadow-2xl">
            <p className="text-ui-label text-blueprint-muted">Round Submitted</p>
            <h2 className="mt-3 text-headline-lg text-primary not-italic">You've been away too long. Your round has been automatically submitted with the answers you completed.</h2>
            {kickOutTopic ? <p className="mt-4 text-body-lg text-primary">{kickOutTopic}</p> : null}
            {kickOutCompletedLabel ? <p className="mt-2 text-body-md text-blueprint-muted">{kickOutCompletedLabel}</p> : null}
            <button
              type="button"
              disabled={kickOutSubmitting || !kickOutResultsPath}
              onClick={() => {
                if (!kickOutResultsPath) return;
                navigate(kickOutResultsPath, { replace: true });
              }}
              className="mt-6 rounded-full bg-primary px-6 py-3 text-ui-label text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              View My Results
            </button>
          </div>
        </div>
      ) : null}
      {fullscreenWarning ? <div className="fixed inset-0 z-95 flex items-center justify-center bg-black/40 px-4"><div className="max-w-md rounded-2xl bg-card p-6 text-center"><h2 className="text-headline-md text-primary not-italic">Return to fullscreen.</h2><p className="mt-2 text-body-md text-blueprint-muted">The round is paused while this overlay is active.</p><button type="button" onClick={() => { void resumeFullscreen(); }} className="mt-5 rounded-full bg-primary px-5 py-2.5 text-ui-label text-white">Re-enter Fullscreen</button></div></div> : null}
      {endConfirm ? (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/45 px-4">
          <div className="max-w-md rounded-2xl bg-card p-6">
            <p className="text-ui-label text-blueprint-muted">Active Round</p>
            <h2 className="mt-2 text-headline-md text-primary not-italic">You are in an active round. Leaving will end your session.</h2>
            <p className="mt-2 text-body-md text-blueprint-muted">
              {endConfirmStep ? 'Confirm one more time to end this round early.' : 'Return to the round or choose to end early.'}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setEndConfirm(false);
                  setEndConfirmStep(0);
                }}
                className="rounded-full bg-[#dc2626] px-5 py-2.5 text-ui-label text-white"
              >
                Return to Round
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!endConfirmStep) {
                    setEndConfirmStep(1);
                    return;
                  }
                  setEndConfirm(false);
                  setEndConfirmStep(0);
                  onEndEarly?.();
                }}
                className="rounded-full bg-gray-200 px-5 py-2.5 text-ui-label text-gray-900"
              >
                {endConfirmStep ? 'Confirm End Round' : 'End Round Early'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <RoundErrorBoundary>{children}</RoundErrorBoundary>
    </div>
  );
}
