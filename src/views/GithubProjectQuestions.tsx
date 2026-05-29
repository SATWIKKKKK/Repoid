import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Check, Download, LoaderCircle, RefreshCw, Trash2, X } from 'lucide-react';
import { GithubScanOverlay } from '../components/GithubRepoScanner';
import { deleteGithubRepo, getGithubQuestionSet, RepoQuestion, RepoQuestionSet } from '../lib/githubRepos';
import { exportQuestionsPdf } from '../lib/pdfExport';

const optionLetters = ['A', 'B', 'C', 'D'];

function difficultyClass(difficulty: RepoQuestion['difficulty']) {
  if (difficulty === 'hard') return 'bg-red-50 text-red-700 border-red-100';
  if (difficulty === 'medium') return 'bg-amber-50 text-amber-700 border-amber-100';
  return 'bg-emerald-50 text-emerald-700 border-emerald-100';
}

function highlightedCode(code: string) {
  const parts = code.split(/(\b(?:const|let|var|function|return|await|async|if|else|for|while|try|catch|throw|class|import|from|export|type|interface|new)\b|["'`][^"'`]*["'`])/g);
  return parts.map((part, index) => {
    if (/^(const|let|var|function|return|await|async|if|else|for|while|try|catch|throw|class|import|from|export|type|interface|new)$/.test(part)) {
      return <span key={`${part}-${index}`} className="text-sky-300">{part}</span>;
    }
    if (/^["'`]/.test(part)) {
      return <span key={`${part}-${index}`} className="text-emerald-300">{part}</span>;
    }
    return <React.Fragment key={`${part}-${index}`}>{part}</React.Fragment>;
  });
}

function QuestionBody({ question }: { question: RepoQuestion }) {
  const parts: Array<{ type: 'text' | 'code'; value: string; language?: string }> = [];
  const regex = /```(\w+)?\s*([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(question.questionText)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'text', value: question.questionText.slice(lastIndex, match.index) });
    }
    parts.push({ type: 'code', language: match[1] || 'code', value: match[2].trim() });
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < question.questionText.length) {
    parts.push({ type: 'text', value: question.questionText.slice(lastIndex) });
  }

  if (!parts.length) parts.push({ type: 'text', value: question.questionText });

  return (
    <div className="space-y-4">
      {parts.map((part, index) => (
        part.type === 'code' ? (
          <pre key={`${question.id}-code-${index}`} className="overflow-x-auto rounded-lg border border-[#222] bg-[#111315] p-4 text-[13px] leading-6 text-slate-100">
            <code>{highlightedCode(part.value)}</code>
          </pre>
        ) : (
          <p key={`${question.id}-text-${index}`} className="whitespace-pre-wrap text-body-lg leading-8 text-primary">{part.value.trim()}</p>
        )
      ))}
    </div>
  );
}

function AnswerBlock({ answer }: { answer: string }) {
  const codeMatch = answer.match(/```(\w+)?\s*([\s\S]*?)```/);
  if (!codeMatch) {
    return <p className="whitespace-pre-wrap rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-3 text-body-md leading-7 text-emerald-900">{answer}</p>;
  }

  const before = answer.slice(0, codeMatch.index).trim();
  const code = codeMatch[2].trim();
  const after = answer.slice((codeMatch.index ?? 0) + codeMatch[0].length).trim();
  return (
    <div className="rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-3 text-emerald-900">
      {before ? <p className="whitespace-pre-wrap text-body-md leading-7">{before}</p> : null}
      <pre className="my-3 overflow-x-auto rounded-lg border border-[#222] bg-[#111315] p-4 text-[13px] leading-6 text-slate-100">
        <code>{highlightedCode(code)}</code>
      </pre>
      {after ? <p className="whitespace-pre-wrap text-body-md leading-7">{after}</p> : null}
    </div>
  );
}

export default function GithubProjectQuestions() {
  const navigate = useNavigate();
  const { repoId = '' } = useParams<{ repoId: string }>();
  const [data, setData] = useState<RepoQuestionSet | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [visibleAnswers, setVisibleAnswers] = useState<Record<string, boolean>>({});
  const [showWarning, setShowWarning] = useState(true);
  const [scanRequest, setScanRequest] = useState<{ repoUrl: string; nonce: number } | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [exportingPdf, setExportingPdf] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;
    let timer: number | undefined;
    let attempts = 0;

    const load = () => {
      void getGithubQuestionSet(repoId)
        .then((questionSet) => {
          if (ignore) return;
          setData(questionSet);
          setError(null);
        })
        .catch((err) => {
          if (ignore) return;
          attempts += 1;
          const message = err instanceof Error ? err.message : 'Unable to load questions.';
          if (attempts < 6 && /not ready|not saved|unable to load repo questions|questions/i.test(message)) {
            timer = window.setTimeout(load, 1500);
            return;
          }
          setError(message);
        });
    };

    setData(null);
    setError(null);
    load();

    return () => {
      ignore = true;
      if (timer) window.clearTimeout(timer);
    };
  }, [repoId]);

  const rescan = () => {
    if (!data?.repo.repoUrl) return;
    setError(null);
    setScanRequest({ repoUrl: data.repo.repoUrl, nonce: Date.now() });
  };

  const removeRepo = async () => {
    if (!data) return;
    setDeleting(true);
    try {
      const fallbackVersion = (data.versions ?? []).find((version) => version.id !== data.repo.id);
      await deleteGithubRepo(data.repo.id);
      setDeleteDialogOpen(false);
      navigate(fallbackVersion ? `/github-project-qs/${fallbackVersion.id}` : '/github-repos', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete this repository scan.');
    } finally {
      setDeleting(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-full bg-background p-8">
        <div className="mx-auto max-w-2xl rounded-xl border border-blueprint-line bg-card p-6">
          <h1 className="text-headline-md text-primary">Analysis not ready</h1>
          <p className="mt-3 text-body-md text-blueprint-muted">{error}</p>
          <Link to="/github-repos" className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-ui-label text-white">
            Back to GitHub Repos
          </Link>
        </div>
      </div>
    );
  }
  if (!data) return <div className="min-h-full bg-background p-8"><span className="loading-state"><LoaderCircle size={16} className="animate-spin" /> Loading...</span></div>;
  const questionNumberById = new Map<string, number>();
  data.sections.flatMap((section) => section.questions).forEach((question, index) => {
    questionNumberById.set(question.id, index + 1);
  });
  const allAnswersVisible = data.sections.flatMap((section) => section.questions).every((question) => visibleAnswers[question.id]);
  const setAllAnswersVisible = (visible: boolean) => {
    const next: Record<string, boolean> = {};
    data.sections.flatMap((section) => section.questions).forEach((question) => {
      next[question.id] = visible;
    });
    setVisibleAnswers(next);
  };

  const exportPdf = async () => {
    setExportingPdf(true);
    setExportError(null);
    setExportNotice('Your PDF is exporting...');
    try {
      await exportQuestionsPdf({
        title: `${data.repo.repoName} repo questions`,
        sourceId: data.repo.id,
        exportType: 'github-repo',
        questions: data.sections.flatMap((section) => section.questions).map((question) => ({
          questionText: question.questionText,
          correctAnswer: question.correctAnswer,
        })),
      });
      setExportNotice('Your PDF export is ready.');
    } catch (err) {
      setExportError(err instanceof Error ? err.message : 'Unable to export PDF.');
      setExportNotice(null);
    } finally {
      setExportingPdf(false);
    }
  };

  return (
    <div className="min-h-full scroll-smooth bg-background">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-25" />
      <div className="relative z-10 mx-auto max-w-[1180px] px-4 py-8 lg:px-8">
        <main className="scroll-smooth">
          {showWarning && data.warnings?.length ? (
            <div className="mb-6 flex items-start justify-between gap-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-body-md text-amber-800">
              <p>Limited files found in this repository. Questions are based on available content and may be fewer than usual.</p>
              <button type="button" onClick={() => setShowWarning(false)} aria-label="Dismiss warning" className="text-amber-700 hover:text-amber-900">
                <X size={16} />
              </button>
            </div>
          ) : null}
          <div className="border-b border-blueprint-line pb-6">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="page-title">{data.repo.repoName}</h1>
                {(data.detectedDomains ?? []).map((domain) => (
                  <span key={domain} className="language-tag rounded-full border px-3 py-1.5 text-ui-label">{domain}</span>
                ))}
              </div>
              <p className="mt-3 text-ui-label text-blueprint-muted">Brief summary</p>
              <p className="mt-2 max-w-4xl text-body-lg leading-8 text-blueprint-muted">{data.projectSummary}</p>
            </div>
            <div className="mt-6 flex flex-col gap-4 rounded-xl border border-blueprint-line bg-card p-4 shadow-[0_8px_24px_rgba(0,0,0,0.03)] lg:flex-row lg:items-center lg:justify-between">
              {(data.versions?.length ?? 0) > 1 ? (
                <div className="min-w-0">
                  <div className="w-full lg:w-[360px]">
                    <select
                      id="repo-version"
                      value={data.repo.id}
                      onChange={(event) => navigate(`/github-project-qs/${event.target.value}`)}
                      className="w-full rounded-xl border border-blueprint-line bg-card px-4 py-3 text-body-md text-primary outline-none transition-colors focus:border-primary"
                    >
                      {(data.versions ?? []).map((version) => (
                        <option key={version.id} value={version.id}>
                          {`Version ${version.versionNumber ?? 1}${version.isLatestVersion ? ' (latest)' : ''} • ${new Date(version.scannedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : null}
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                <button type="button" onClick={() => setAllAnswersVisible(!allAnswersVisible)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-blueprint-line bg-card px-4 py-2.5 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] dark:hover:bg-white/5">
                  <Check size={14} /> {allAnswersVisible ? 'Hide Answers' : 'Show Answers'}
                </button>
                <button type="button" disabled={exportingPdf} onClick={exportPdf} className="inline-flex items-center justify-center gap-2 rounded-lg border border-blueprint-line bg-card px-4 py-2.5 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] disabled:opacity-60 dark:hover:bg-white/5">
                  {exportingPdf ? <LoaderCircle size={14} className="animate-spin" /> : <Download size={14} />} Export PDF
                </button>
                <button type="button" onClick={rescan} className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-ui-label text-white transition-colors hover:bg-[#303031]">
                  <RefreshCw size={14} /> Re-scan
                </button>
                <button type="button" disabled={deleting} onClick={() => setDeleteDialogOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-100 bg-red-50 px-4 py-2.5 text-ui-label text-red-700 transition-colors hover:bg-red-100 disabled:opacity-60">
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
            {exportNotice ? <div className="mt-4 rounded-xl border border-blueprint-line bg-card px-4 py-3 text-body-md text-primary">{exportNotice}</div> : null}
            {exportError ? <div className="mt-4 rounded-xl border border-red-300/40 bg-red-500/10 px-4 py-3 text-body-md text-red-700 dark:text-red-200">{exportError.split(/\b(Upgrade)\b/i).map((part, i) => /^upgrade$/i.test(part) ? <button key={i} type="button" onClick={() => navigate('/pricing')} className="font-bold underline hover:opacity-80">{part}</button> : part)}</div> : null}
          </div>

          {data.sections.some((section) => section.questions.some((question) => !question.correctAnswer)) ? (
            <div className="mt-6 flex flex-col gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-body-md text-amber-800 sm:flex-row sm:items-center sm:justify-between">
              <p>Some older questions in this saved scan do not have answers. Re-scan this repository to regenerate all questions with proper answers.</p>
              <button type="button" onClick={rescan} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-amber-900 px-4 py-2.5 text-ui-label text-white transition-colors hover:bg-amber-950">
                <RefreshCw size={14} /> Re-scan now
              </button>
            </div>
          ) : null}

          <nav className="scrollbar-hidden sticky top-16 z-30 mt-6 flex gap-2 overflow-x-auto border-b border-blueprint-line bg-background/95 py-3 backdrop-blur">
            {data.sections.map((section) => (
              <a key={section.sectionId} href={`#${section.sectionId}`} className="inline-flex shrink-0 items-center gap-2 rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-primary transition-colors hover:bg-primary hover:text-white dark:hover:bg-[#e8e4e4] dark:hover:text-[#111111]">
                <span>{section.sectionTitle}</span>
                <span className="rounded-full border border-current px-2 py-0.5">{section.questions.length}</span>
              </a>
            ))}
          </nav>

          <div className="mt-12 space-y-14">
            {data.sections.map((section) => (
              <section key={section.sectionId} id={section.sectionId} className="scroll-mt-8 border-t border-blueprint-line pt-8">
                <div className="mb-6">
                  <h2 className="text-headline-md text-primary">{section.sectionTitle}</h2>
                  <p className="mt-2 text-body-md text-blueprint-muted">{section.sectionDescription}</p>
                </div>
                <div className="space-y-5">
                  {section.questions.map((question, index) => (
                    <article key={question.id} className="rounded-lg border border-blueprint-line bg-card p-5 shadow-[0_8px_24px_rgba(0,0,0,0.03)]">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="text-ui-label text-blueprint-muted">Question {questionNumberById.get(question.id) ?? index + 1}</span>
                        <span className={`rounded-full border px-2 py-1 text-ui-label ${difficultyClass(question.difficulty)}`}>{question.difficulty}</span>
                        <span className="rounded-full border border-blueprint-line bg-blueprint-bg px-2 py-1 text-ui-label text-blueprint-muted">{question.conceptTag}</span>
                      </div>
                      <QuestionBody question={question} />
                      <div className="mt-4 space-y-2">
                        {question.options?.length ? (
                          <>
                          {question.options.map((option, optionIndex) => (
                            <div key={option} className="flex gap-3 rounded-lg border border-blueprint-line bg-blueprint-bg px-3 py-2 text-body-md text-blueprint-muted">
                              <span className="font-semibold text-primary">{optionLetters[optionIndex] ?? optionIndex + 1}</span>
                              <span>{option}</span>
                            </div>
                          ))}
                          </>
                        ) : null}
                        {question.correctAnswer ? (
                          <>
                            <button
                              type="button"
                              onClick={() => setVisibleAnswers((answers) => ({ ...answers, [question.id]: !answers[question.id] }))}
                              className="mt-2 inline-flex items-center gap-2 rounded-full border border-blueprint-line bg-card px-4 py-2 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] dark:hover:bg-white/5"
                            >
                              <Check size={14} /> {visibleAnswers[question.id] ? 'Hide Answer' : 'Show Answer'}
                            </button>
                            {visibleAnswers[question.id] ? <AnswerBlock answer={question.correctAnswer} /> : null}
                          </>
                        ) : (
                          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-3 text-body-md text-amber-800">
                            No answer was saved for this older question. Re-scan this repository to regenerate it with proper answers.
                          </div>
                        )}
                      </div>
                      <p className="mt-3 text-ui-label text-blueprint-muted">{question.fileReference}</p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
      {scanRequest ? (
        <GithubScanOverlay
          key={scanRequest.nonce}
          repoUrl={scanRequest.repoUrl}
          force
          onClose={() => setScanRequest(null)}
          onError={setError}
          onComplete={(nextRepoId) => navigate(`/github-project-qs/${nextRepoId}`, { replace: true })}
        />
      ) : null}

      {deleteDialogOpen ? (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] border border-blueprint-line bg-card p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-ui-label text-blueprint-muted">Delete saved scan</p>
                <h2 className="mt-2 text-headline-md text-primary not-italic">{data.repo.repoName}</h2>
                <p className="mt-3 text-body-md text-blueprint-muted">
                  This removes the current saved scan and its generated questions.
                  {(data.versions?.length ?? 0) > 1 ? ` The remaining versions for this repo will stay available in the version selector.` : ''}
                </p>
              </div>
              <button type="button" onClick={() => setDeleteDialogOpen(false)} aria-label="Close" className="rounded-full border border-blueprint-line p-2 text-blueprint-muted transition-colors hover:border-primary hover:text-primary">
                <X size={16} />
              </button>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button type="button" onClick={() => setDeleteDialogOpen(false)} className="rounded-full border border-blueprint-line px-5 py-2.5 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] dark:hover:bg-white/5">
                Cancel
              </button>
              <button type="button" disabled={deleting} onClick={() => void removeRepo()} className="inline-flex items-center gap-2 rounded-full bg-red-700 px-5 py-2.5 text-ui-label text-white transition-colors hover:bg-red-800 disabled:opacity-60">
                <Trash2 size={14} /> Delete scan
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
