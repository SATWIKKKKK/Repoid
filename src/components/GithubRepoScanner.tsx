import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, Clock3, Github, Loader2, RefreshCw, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GITHUB_SCAN_LINES, getGithubScanJob, scanGithubRepo } from '../lib/githubRepos';

type ScannerProps = {
  repoUrl: string;
  force?: boolean;
  onClose?: () => void;
  onError?: (message: string) => void;
  onComplete?: () => void;
};

function isTerminalStatus(status?: string) {
  return Boolean(status && status !== 'pending');
}

export function GithubScanOverlay({ repoUrl, force = false, onClose, onError, onComplete }: ScannerProps) {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(1);
  const [result, setResult] = useState<{ repoId?: string; message?: string; status?: string } | null>(null);
  const [pendingJobId, setPendingJobId] = useState<string | null>(null);
  const [takingLonger, setTakingLonger] = useState(false);
  const [minElapsed, setMinElapsed] = useState(false);
  const [restartCount, setRestartCount] = useState(0);

  useEffect(() => {
    let ignore = false;

    setVisibleCount(1);
    setResult(null);
    setPendingJobId(null);
    setTakingLonger(false);
    setMinElapsed(false);

    const interval = window.setInterval(() => {
      setVisibleCount((count) => Math.min(GITHUB_SCAN_LINES.length, count + 1));
    }, 450);
    const minimumTimer = window.setTimeout(() => setMinElapsed(true), 1200);
    const longerTimer = window.setTimeout(() => setTakingLonger(true), 18000);

    const setTerminalResult = (next: { repoId?: string; message?: string; status?: string }) => {
      if (ignore) return;
      setPendingJobId(null);
      setTakingLonger(false);
      if (next.status === 'complete') setVisibleCount(GITHUB_SCAN_LINES.length);
      setResult(next);
    };

    void scanGithubRepo(repoUrl, force || restartCount > 0)
      .then((scanResult) => {
        if (ignore) return;

        if (scanResult.status === 'complete' || scanResult.status === 'duplicate') {
          if (!scanResult.repoId) {
            setTerminalResult({ status: 'failed', message: 'The scan finished, but no saved question set was returned. Please start a fresh scan.' });
            return;
          }

          setTerminalResult({ status: 'complete', repoId: scanResult.repoId });
          return;
        }

        if (scanResult.status === 'private') {
          setVisibleCount(2);
          setTerminalResult({ status: 'private', message: scanResult.message });
          return;
        }

        if (scanResult.status === 'pending') {
          if (!scanResult.jobId) {
            setTerminalResult({ status: 'failed', message: scanResult.message || 'Unable to keep this scan alive.' });
            return;
          }

          setPendingJobId(scanResult.jobId);
          setResult({ status: 'pending', message: scanResult.message });
          return;
        }

        setTerminalResult({ status: scanResult.status, message: scanResult.message });
      })
      .catch((error) => {
        setTerminalResult({ status: 'failed', message: error instanceof Error ? error.message : 'Unable to scan this repository.' });
      });

    return () => {
      ignore = true;
      window.clearInterval(interval);
      window.clearTimeout(minimumTimer);
      window.clearTimeout(longerTimer);
    };
  }, [force, repoUrl, restartCount]);

  useEffect(() => {
    if (!pendingJobId) return;

    let ignore = false;

    const poll = async () => {
      try {
        const job = await getGithubScanJob(pendingJobId);
        if (ignore) return;

        if (job.status === 'complete') {
          setPendingJobId(null);
          setTakingLonger(false);
          setVisibleCount(GITHUB_SCAN_LINES.length);
          if (job.repoId) {
            setResult({ status: 'complete', repoId: job.repoId });
            return;
          }

          setResult({ status: 'failed', message: 'The scan finished, but no question set was saved. Please start a fresh scan.' });
          return;
        }

        if (job.status === 'failed') {
          setPendingJobId(null);
          setTakingLonger(false);
          const status = job.message?.startsWith('This repository is private') ? 'private' : 'failed';
          setResult({ status, message: job.message ?? 'We had trouble analyzing this repository. Please try again.' });
        }
      } catch {
        if (ignore) return;
        setPendingJobId(null);
        setTakingLonger(false);
        setResult({ status: 'failed', message: 'Unable to check this repository scan.' });
      }
    };

    void poll();
    const interval = window.setInterval(() => {
      void poll();
    }, 4000);

    return () => {
      ignore = true;
      window.clearInterval(interval);
    };
  }, [pendingJobId]);

  useEffect(() => {
    if (result?.status === 'complete' && result.repoId && minElapsed) {
      onComplete?.();
      navigate(`/github-project-qs/${result.repoId}`);
    }
  }, [minElapsed, navigate, onComplete, result]);

  const lines = useMemo(() => {
    if (result?.status === 'complete') return GITHUB_SCAN_LINES;
    if (result?.status === 'private') return GITHUB_SCAN_LINES.slice(0, 2);
    return GITHUB_SCAN_LINES.slice(0, visibleCount);
  }, [result?.status, visibleCount]);

  const errorMessage = result?.status && !['complete', 'pending'].includes(result.status)
    ? (result.message ?? 'We had trouble analyzing this repository. Please try again.')
    : null;
  const infoMessage = result?.status === 'pending'
    ? (takingLonger
      ? 'Still working on this repository.'
      : 'Preparing your repository questions.')
    : null;
  const canForceRestart = result?.status === 'pending' && !force && restartCount === 0;
  const progress = result?.status === 'complete'
    ? 100
    : Math.max(8, Math.round((Math.min(visibleCount, GITHUB_SCAN_LINES.length) / GITHUB_SCAN_LINES.length) * 100));
  const statusLabel = result?.status === 'complete'
    ? 'Ready'
    : result?.status === 'pending' || !result?.status
      ? 'Scanning'
      : result?.status === 'private'
        ? 'Private Repo'
        : 'Scan Failed';
  const terminalResult = isTerminalStatus(result?.status);

  const restartScan = () => {
    setRestartCount((count) => count + 1);
  };

  return (
    <div className="fixed inset-0 z-80 overflow-y-auto bg-background px-4 py-6 text-primary backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 blueprint-grid opacity-20" />
      <div className="pointer-events-none absolute -left-16 top-10 h-60 w-60 rounded-full bg-[#efe6e6] blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-10 h-72 w-72 rounded-full bg-[#f3ecec] blur-3xl" />
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-blueprint-line bg-card text-blueprint-muted transition-colors hover:bg-[#f5f3f3] hover:text-primary dark:hover:bg-white/5"
        >
          <X size={18} />
        </button>
      ) : null}
      <div className="relative mx-auto flex min-h-full w-full max-w-5xl items-center">
        <div className="w-full rounded-3xl border border-blueprint-line bg-card p-5 shadow-[0_28px_80px_rgba(0,0,0,0.12)] sm:p-6">
          <div className="flex flex-col gap-5 border-b border-blueprint-line pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3 text-blueprint-muted">
                <Github size={18} />
                <span className="text-ui-label uppercase tracking-[0.08em]">GitHub repo scanner</span>
              </div>
              <h1 className="mt-3 text-headline-lg text-primary">Preparing your repository questions</h1>
              <p className="mt-2 max-w-2xl text-body-md text-blueprint-muted">We will open the question set as soon as it is ready.</p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blueprint-line bg-[#f7f2f2] px-4 py-2 text-ui-label text-primary">
              {result?.status === 'complete' ? <CheckCircle2 size={15} /> : result?.status && result.status !== 'pending' ? <AlertCircle size={15} /> : <Loader2 size={15} className="animate-spin" />}
              {statusLabel}
            </div>
          </div>

          <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px]">
            <section className="rounded-2xl border border-blueprint-line bg-[#faf7f7] p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-ui-label text-blueprint-muted">Progress</p>
                <span className="text-ui-label text-blueprint-muted">{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-[#e6dfdf]">
                <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-5 space-y-2 font-mono text-[13px] leading-6 text-blueprint-muted">
                {lines.map((line, index) => (
                  <p key={line} className={index === lines.length - 1 && !terminalResult ? 'text-primary' : undefined}>
                    <span className="mr-3 inline-block w-6 text-right text-blueprint-muted">{String(index + 1).padStart(2, '0')}</span>
                    {line}
                  </p>
                ))}
              </div>
              {!errorMessage && result?.status !== 'complete' ? (
                <div className="mt-5 rounded-xl border border-blueprint-line bg-card px-4 py-3 text-body-md text-blueprint-muted">
                  {takingLonger ? 'Still running. You can leave this page and return from GitHub Repos.' : 'Scanning files and generating questions.'}
                </div>
              ) : null}
            </section>

            <aside className="space-y-3 rounded-2xl border border-blueprint-line bg-[#f7f4f4] p-4">
              <div className="rounded-xl border border-blueprint-line bg-card p-4">
                <p className="text-ui-label text-blueprint-muted">Repository</p>
                <p className="mt-2 break-all text-body-md text-primary">{repoUrl}</p>
              </div>
              <div className="rounded-xl border border-blueprint-line bg-card p-4">
                <p className="text-ui-label text-blueprint-muted">What happens next</p>
                <div className="mt-3 space-y-3 text-sm text-blueprint-muted">
                  {[
                    'Fetch repository',
                    'Read key files',
                    'Generate questions',
                    'Open results',
                  ].map((item, index) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${index < visibleCount ? 'bg-primary' : 'bg-[#d7cfcf]'}`} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-blueprint-line bg-card p-4">
                <p className="text-ui-label text-blueprint-muted">Current state</p>
                <p className="mt-2 text-body-md text-primary">
                  {result?.status === 'complete'
                    ? 'The question set is ready and this screen will redirect now.'
                    : errorMessage
                      ? 'The scan stopped before a usable question set could be saved.'
                      : takingLonger
                        ? 'Still running.'
                        : 'The scan is active and still building the question set.'}
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-4 rounded-2xl border border-blueprint-line bg-[#faf7f7] p-4 sm:p-5">
            {errorMessage ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="mt-1 shrink-0 text-primary" />
                  <div>
                    <p className="text-body-lg text-primary">{errorMessage}</p>
                    <p className="mt-2 text-body-md text-blueprint-muted">Try again, or connect GitHub if this is a private repository.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {result?.status === 'private' ? (
                    <button type="button" onClick={() => window.location.replace('/api/auth/oauth/github?next=/github-repos')} className="rounded-full bg-primary px-5 py-3 text-ui-label font-bold text-white transition-colors hover:bg-[#303031]">
                      Enable private repo access
                    </button>
                  ) : (
                    <button type="button" onClick={restartScan} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-ui-label text-white transition-colors hover:bg-[#303031]">
                      <RefreshCw size={15} /> Start fresh scan
                    </button>
                  )}
                  {onClose ? (
                    <button type="button" onClick={() => { onError?.(errorMessage); onClose(); }} className="rounded-full border border-blueprint-line bg-card px-5 py-3 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] dark:hover:bg-white/5">
                      Close
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}

            {!errorMessage && infoMessage ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <Clock3 size={18} className="mt-1 shrink-0 text-primary" />
                  <div>
                    <p className="text-body-lg text-primary">{infoMessage}</p>
                    <p className="mt-2 text-body-md text-blueprint-muted">Results will open automatically.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {canForceRestart ? (
                    <button type="button" onClick={restartScan} className="inline-flex items-center gap-2 rounded-full border border-blueprint-line bg-card px-5 py-3 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] dark:hover:bg-white/5">
                      <RefreshCw size={15} /> Start fresh scan
                    </button>
                  ) : null}
                  {onClose ? (
                    <button type="button" onClick={onClose} className="rounded-full border border-blueprint-line bg-card px-5 py-3 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] dark:hover:bg-white/5">
                      Close
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}

            {!errorMessage && result?.status === 'complete' ? (
              <div className="flex items-start gap-3">
                <CheckCircle2 size={18} className="mt-1 shrink-0 text-primary" />
                <div>
                  <p className="text-body-lg text-primary">The question set is ready.</p>
                  <p className="mt-2 text-body-md text-blueprint-muted">Redirecting to the saved repository questions now.</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
