import React, { useEffect, useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, Clock3, Github, Loader2, RefreshCw, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getGithubScanJob, scanGithubRepo } from '../lib/githubRepos';

type ScannerProps = {
  repoUrl: string;
  force?: boolean;
  onClose?: () => void;
  onError?: (message: string) => void;
  onComplete?: (repoId: string) => void;
};

export function GithubScanOverlay({ repoUrl, force = false, onClose, onError, onComplete }: ScannerProps) {
  const navigate = useNavigate();
  const [result, setResult] = useState<{ repoId?: string; message?: string; status?: string } | null>(null);
  const [pendingJobId, setPendingJobId] = useState<string | null>(null);
  const [takingLonger, setTakingLonger] = useState(false);
  const [restartCount, setRestartCount] = useState(0);
  const repoLabel = useMemo(() => {
    try {
      const parsed = new URL(repoUrl);
      const [owner, repo] = parsed.pathname.replace(/^\/+|\/+$/g, '').split('/');
      return owner && repo ? `${owner}/${repo}` : repoUrl;
    } catch {
      return repoUrl;
    }
  }, [repoUrl]);

  useEffect(() => {
    let ignore = false;

    setResult(null);
    setPendingJobId(null);
    setTakingLonger(false);
    const longerTimer = window.setTimeout(() => setTakingLonger(true), 18000);

    const setTerminalResult = (next: { repoId?: string; message?: string; status?: string }) => {
      if (ignore) return;
      setPendingJobId(null);
      setTakingLonger(false);
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
          if (job.repoId) {
            setResult({ status: 'complete', repoId: job.repoId });
            return;
          }

          setResult({ status: 'failed', message: 'The scan finished, but no question set was saved. Please start a fresh scan.' });
          return;
        }

        if (job.status === 'pending') {
          setResult({ status: 'pending', message: job.message ?? 'Generating questions...' });
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
    if (result?.status === 'complete' && result.repoId) {
      onComplete?.(result.repoId);
      navigate(`/github-project-qs/${result.repoId}`);
    }
  }, [navigate, onComplete, result]);

  const errorMessage = result?.status && !['complete', 'pending'].includes(result.status)
    ? (result.message ?? 'We had trouble analyzing this repository. Please try again.')
    : null;
  const infoMessage = result?.status === 'pending'
    ? (result.message || (takingLonger
      ? 'Still working on this repository.'
      : 'Preparing your repository questions.'))
    : null;
  const canForceRestart = result?.status === 'pending' && !force && restartCount === 0;
  const statusLabel = result?.status === 'complete'
    ? 'Ready'
    : result?.status === 'pending' || !result?.status
      ? 'Scanning'
      : result?.status === 'private'
        ? 'Private Repo'
        : 'Scan Failed';

  const restartScan = () => {
    setRestartCount((count) => count + 1);
  };

  if (force) {
    return (
      <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-[28px] border border-blueprint-line bg-card p-6 shadow-[0_28px_80px_rgba(0,0,0,0.18)] sm:p-7">
          <div className="flex items-center gap-3 text-blueprint-muted">
            <Github size={18} />
            <span className="text-ui-label uppercase tracking-[0.08em]">GitHub repo scan</span>
          </div>
          <h1 className="mt-3 text-headline-lg text-primary">{repoLabel}</h1>
          <div className="mt-6 rounded-2xl border border-blueprint-line bg-blueprint-bg p-5 dark:bg-[#242424]">
            <div className="flex items-start gap-3">
              {errorMessage ? <AlertCircle size={20} className="mt-1 shrink-0 text-red-600 dark:text-red-300" /> : <Loader2 size={20} className="mt-1 shrink-0 animate-spin text-primary" />}
              <p className="text-body-lg text-primary">
                {errorMessage ?? 'Rescanning this repository for better questions, please wait...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
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
      <div className="w-full max-w-lg rounded-[28px] border border-blueprint-line bg-card p-6 shadow-[0_28px_80px_rgba(0,0,0,0.18)] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 text-blueprint-muted">
              <Github size={18} />
              <span className="text-ui-label uppercase tracking-[0.08em]">GitHub repo scan</span>
            </div>
            <h1 className="mt-3 text-headline-lg text-primary">{repoLabel}</h1>
            <p className="mt-2 text-body-md text-blueprint-muted">
              We are generating repository-specific questions and will open them automatically when the scan finishes.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-primary">
            {result?.status === 'complete' ? <CheckCircle2 size={15} /> : result?.status && result.status !== 'pending' ? <AlertCircle size={15} /> : <Loader2 size={15} className="animate-spin" />}
            {statusLabel}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-blueprint-line bg-blueprint-bg dark:bg-[#242424] p-4">
          <div className="flex items-start gap-3">
            {errorMessage ? <AlertCircle size={18} className="mt-1 shrink-0 text-red-600 dark:text-red-300" /> : result?.status === 'complete' ? <CheckCircle2 size={18} className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-300" /> : <Clock3 size={18} className="mt-1 shrink-0 text-primary" />}
            <div>
              <p className="text-body-lg text-primary">
                {errorMessage
                  ? errorMessage
                  : result?.status === 'complete'
                    ? 'Question set ready. Redirecting now.'
                    : infoMessage || 'Scanning files and preparing the question set.'}
              </p>
              <p className="mt-2 text-body-md text-blueprint-muted">
                {errorMessage
                  ? 'You can retry the scan or connect GitHub access for private repositories.'
                  : takingLonger
                    ? 'This repository is taking longer than usual, but the scan is still running.'
                    : 'Keep this tab open and we will take you straight to the generated questions.'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-blueprint-line bg-card p-4">
          <p className="text-ui-label text-blueprint-muted">Repository URL</p>
          <p className="mt-2 break-all text-body-md text-primary">{repoUrl}</p>
        </div>

        <div className="mt-5 rounded-2xl border border-blueprint-line bg-card p-4 sm:p-5">
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

          </div>
        </div>
    </div>
  );
}
