import React, { useEffect, useState } from 'react';
import { CheckCircle2, Github, Plus, RefreshCw, Trash2, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { GithubScanOverlay } from '../components/GithubRepoScanner';
import { deleteGithubRepo, GithubRepo, isValidGithubRepoUrl, listGithubRepos, normalizeGithubRepoInput } from '../lib/githubRepos';

export default function GithubRepos() {
  const location = useLocation();
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [pendingJobs, setPendingJobs] = useState<Array<{ id: string; repoUrl: string; repoName: string }>>([]);
  const [githubConnected, setGithubConnected] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [duplicate, setDuplicate] = useState<GithubRepo | null>(null);
  const [scanRequest, setScanRequest] = useState<{ repoUrl: string; force: boolean; nonce: number } | null>(null);
  const [deletingRepoId, setDeletingRepoId] = useState<string | null>(null);
  const [repoPendingDelete, setRepoPendingDelete] = useState<GithubRepo | null>(null);
  const githubConnectUrl = '/api/auth/oauth/github?next=/github-repos';

  const refreshRepos = () => {
    void listGithubRepos()
      .then((data) => {
        setRepos(data.repos);
        setPendingJobs(data.pendingJobs);
        setGithubConnected(data.githubConnected);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load repos.'));
  };

  useEffect(() => {
    refreshRepos();
  }, []);

  useEffect(() => {
    const errorCode = new URLSearchParams(location.search).get('error');
    if (errorCode === 'oauth_github_not_configured') {
      setError('GitHub private repo access is not configured yet. Add GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in .env, then restart the server.');
    } else if (errorCode === 'oauth_state' || errorCode === 'oauth_config') {
      setError('GitHub connection failed. Please try connecting GitHub again.');
    }
  }, [location.search]);

  useEffect(() => {
    if (!pendingJobs.length) return;

    const interval = window.setInterval(() => refreshRepos(), 5000);
    return () => window.clearInterval(interval);
  }, [pendingJobs.length]);

  const submit = (force = false) => {
    setError(null);
    setDuplicate(null);
    const trimmed = repoUrl.trim();
    if (!isValidGithubRepoUrl(trimmed)) {
      setError('Please paste a valid GitHub repository URL.');
      return;
    }
    const existing = repos.find((repo) => normalizeGithubRepoInput(repo.repoUrl).toLowerCase() === normalizeGithubRepoInput(trimmed).toLowerCase());
    if (existing && !force) {
      setDuplicate(existing);
      return;
    }
    setModalOpen(false);
    setScanRequest({ repoUrl: trimmed, force, nonce: Date.now() });
  };

  const rescanRepo = (repo: GithubRepo) => {
    setError(null);
    setRepoUrl(repo.repoUrl);
    setScanRequest({ repoUrl: repo.repoUrl, force: true, nonce: Date.now() });
  };

  const removeRepo = async (repo: GithubRepo) => {
    setDeletingRepoId(repo.id);
    setError(null);
    try {
      await deleteGithubRepo(repo.id);
      setRepos((current) => current.filter((item) => item.id !== repo.id));
      setRepoPendingDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete this repository scan.');
    } finally {
      setDeletingRepoId(null);
    }
  };

  return (
    <div className="min-h-full bg-background">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
      <main className="relative z-10 mx-auto w-full max-w-[1320px] px-4 pb-14 pt-6 sm:px-6 lg:px-10">
        <header className="mb-6 flex flex-col gap-4 border-b border-blueprint-line pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-headline-lg text-primary">GitHub Repos</h1>
            <p className="mt-2 max-w-2xl text-body-md text-blueprint-muted">Scan a repository and save project-specific interview questions.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => setModalOpen(true)} className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-ui-label text-white transition-colors hover:bg-[#303031]">
              <Plus size={16} /> Add Repo
            </button>
          </div>
        </header>

        {error ? <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-body-md text-red-700">{error}</p> : null}

        <section className="surface-card-compact mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-ui-label text-blueprint-muted">Private repositories</p>
            <p className="mt-2 text-body-md text-primary">
              {githubConnected ? 'GitHub is connected. Paste any repository URL your GitHub account can access.' : 'Enable access once, then paste any repository URL your GitHub account can access.'}
            </p>
          </div>
          {githubConnected ? (
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label font-bold text-primary dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-200">
              <CheckCircle2 size={15} /> GitHub connected
            </span>
          ) : (
            <button type="button" onClick={() => window.location.replace(githubConnectUrl)} className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-ui-label font-bold text-white transition-colors hover:bg-[#303031]">
              <Github size={16} /> Enable private repo access
            </button>
          )}
        </section>

        {repos.length ? (
          <section className="grid gap-4 lg:grid-cols-2">
            {repos.map((repo) => (
              <article key={repo.id} className="surface-card-compact saved-highlight rounded-2xl">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-headline-sm text-primary">{repo.repoName}</p>
                      {repo.versionNumber && (repo.scanCount ?? 1) > 1 ? (
                        <span className="rounded-full border border-blueprint-line bg-blueprint-bg px-3 py-1 text-ui-label text-primary">
                          Version {repo.versionNumber}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 break-all text-sm text-blueprint-muted">{repo.repoUrl}</p>
                  </div>
                  <span className="rounded-full border border-blueprint-line bg-card px-3 py-1 text-ui-label text-primary dark:border-emerald-500/50 dark:bg-emerald-600 dark:text-white">{repo.isLatestVersion === false ? 'Saved' : 'Latest'}</span>
                </div>
                <p className="mt-4 text-body-md text-blueprint-muted">
                  Scanned {new Date(repo.scannedAt).toLocaleDateString()}
                  {(repo.scanCount ?? 1) > 1 ? ` • ${repo.scanCount} saved versions` : ''}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {repo.detectedStack.slice(0, 5).map((item) => (
                    <span key={item} className="language-tag rounded-full border px-3 py-1 text-ui-label">{item}</span>
                  ))}
                </div>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <Link to={`/github-project-qs/${repo.id}`} className="inline-flex justify-center rounded-full bg-primary px-5 py-2.5 text-ui-label text-white transition-colors hover:bg-[#303031] sm:col-span-2">
                    View Questions
                  </Link>
                  <button type="button" onClick={() => rescanRepo(repo)} className="inline-flex items-center justify-center gap-2 rounded-full border border-blueprint-line bg-card px-4 py-2.5 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] dark:hover:bg-white/5">
                    <RefreshCw size={14} /> Re-scan
                  </button>
                  <button type="button" disabled={deletingRepoId === repo.id} onClick={() => setRepoPendingDelete(repo)} className="inline-flex items-center justify-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2.5 text-ui-label text-red-700 transition-colors hover:bg-red-100 disabled:opacity-60">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section className="surface-card rounded-2xl text-center">
            <p className="text-headline-sm text-primary">No scanned repositories yet</p>
            <p className="mt-3 text-body-md text-blueprint-muted">Add a public repo, or connect GitHub first for private repos.</p>
            <button type="button" onClick={() => setModalOpen(true)} className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-ui-label text-white transition-colors hover:bg-[#303031]">
              <Plus size={16} /> Add GitHub Repo
            </button>
          </section>
        )}
      </main>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4">
          <div className="w-full max-w-md rounded-2xl border border-blueprint-line bg-card p-5 shadow-2xl sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-headline-sm text-primary">Scan a new repository</h2>
              <button type="button" onClick={() => setModalOpen(false)} aria-label="Close" className="text-blueprint-muted hover:text-primary"><X size={18} /></button>
            </div>
            <input value={repoUrl} onChange={(event) => { setRepoUrl(event.target.value); setError(null); setDuplicate(null); }} placeholder="Paste your GitHub repo URL" className="w-full border-0 border-b border-blueprint-line bg-transparent px-0 py-3 text-body-md text-primary outline-none focus:border-primary" />
            <p className="mt-3 text-sm text-blueprint-muted">For private repos, connect GitHub first and then paste the repo URL.</p>
            {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
            {duplicate ? (
              <div className="mt-4 rounded-xl border border-blueprint-line bg-[#f5f3f3] p-4 text-body-md text-primary">
                <p>You have already scanned this repository.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link className="rounded-full bg-primary px-4 py-2 text-ui-label text-white transition-colors hover:bg-[#303031]" to={`/github-project-qs/${duplicate.id}`}>
                    View Existing Questions
                  </Link>
                  <button type="button" onClick={() => submit(true)} className="rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-primary transition-colors hover:bg-[#fbfafa]">
                    Re-scan
                  </button>
                </div>
              </div>
            ) : null}
            <button type="button" onClick={() => submit()} className="mt-6 w-full rounded-full bg-primary px-5 py-3 text-ui-label text-white transition-colors hover:bg-[#303031]">Submit</button>
          </div>
        </div>
      ) : null}

      {scanRequest ? (
        <GithubScanOverlay
          key={scanRequest.nonce}
          repoUrl={scanRequest.repoUrl}
          force={scanRequest.force}
          onClose={() => setScanRequest(null)}
          onError={setError}
          onComplete={refreshRepos}
        />
      ) : null}

      {repoPendingDelete ? (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] border border-blueprint-line bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-ui-label text-blueprint-muted">Delete saved scan</p>
                <h2 className="mt-2 text-headline-md text-primary not-italic">{repoPendingDelete.repoName}</h2>
                <p className="mt-3 text-body-md text-blueprint-muted">
                  This removes the selected repository scan and its generated questions.
                  {repoPendingDelete.versionNumber && (repoPendingDelete.scanCount ?? 1) > 1 ? ` Version ${repoPendingDelete.versionNumber} will be deleted and the other saved versions will stay available.` : ''}
                </p>
              </div>
              <button type="button" onClick={() => setRepoPendingDelete(null)} aria-label="Close" className="rounded-full border border-blueprint-line p-2 text-blueprint-muted transition-colors hover:border-primary hover:text-primary">
                <X size={16} />
              </button>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button type="button" onClick={() => setRepoPendingDelete(null)} className="rounded-full border border-blueprint-line px-5 py-2.5 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] dark:hover:bg-white/5">
                Cancel
              </button>
              <button type="button" disabled={deletingRepoId === repoPendingDelete.id} onClick={() => void removeRepo(repoPendingDelete)} className="inline-flex items-center gap-2 rounded-full bg-red-700 px-5 py-2.5 text-ui-label text-white transition-colors hover:bg-red-800 disabled:opacity-60">
                <Trash2 size={14} /> Delete scan
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
