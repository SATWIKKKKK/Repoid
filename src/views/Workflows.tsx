import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { COMPANY_TYPE_LABELS, DOMAIN_LABELS, getDomainFamily } from '../lib/prep';
import { usePrepWorkspace } from '../hooks/usePrepWorkspace';

type PracticeTrack = {
  id: string;
  name: string;
  route: string;
  duration: string;
  icon: string;
  pattern: string;
  focus: string[];
  insight: string;
};

const TRACKS_BY_DOMAIN: Record<string, PracticeTrack[]> = {
  frontend: [
    {
      id: 'frontend-machine-coding',
      name: 'Frontend Machine Coding Session',
      route: '/coding-round',
      duration: '45 Min',
      icon: 'web',
      pattern: 'Build a UI feature, explain state transitions, and talk through edge cases under time pressure.',
      focus: ['State flow', 'Async UI', 'Rendering performance'],
      insight: 'Interviewers want stable UI behavior first. Fancy abstractions matter less than clear state and error handling.',
    },
    {
      id: 'react-debugging',
      name: 'React Debugging Round',
      route: '/scenario-round',
      duration: '30 Min',
      icon: 'bug_report',
      pattern: 'Find the bug, explain the root cause, and say how you would test the fix.',
      focus: ['Effects', 'Stale state', 'Race conditions'],
      insight: 'You score better here when you explain the failure before you jump into the patch.',
    },
    {
      id: 'project-walkthrough',
      name: 'Project Walkthrough Round',
      route: '/mock-interview',
      duration: '20 Min',
      icon: 'account_tree',
      pattern: 'Tell the story of one project, why you built it that way, and what you would change next.',
      focus: ['Tradeoffs', 'Architecture', 'Ownership'],
      insight: 'This is where weak project storytelling gets exposed. Keep the problem, decision, and result very clear.',
    },
  ],
  backend: [
    {
      id: 'api-design',
      name: 'API Design Round',
      route: '/coding-round',
      duration: '45 Min',
      icon: 'dns',
      pattern: 'Design the endpoint, handle failures, and explain how you keep writes safe under retries.',
      focus: ['Contracts', 'Idempotency', 'Retries'],
      insight: 'A clean contract is only half the answer. Interviewers listen for failure handling and data consistency.',
    },
    {
      id: 'scenario-backend',
      name: 'Scenario-Based Backend Test',
      route: '/scenario-round',
      duration: '30 Min',
      icon: 'hub',
      pattern: 'Respond to incident-style questions around queues, rate limits, and service behavior under load.',
      focus: ['Concurrency', 'Rate limiting', 'Observability'],
      insight: 'Stay concrete. Pick one likely failure mode and show how you would detect and contain it.',
    },
    {
      id: 'backend-project',
      name: 'Project Walkthrough Round',
      route: '/mock-interview',
      duration: '20 Min',
      icon: 'account_tree',
      pattern: 'Explain service boundaries, database choices, and what you learned from production issues.',
      focus: ['Architecture', 'Scaling choices', 'Tradeoffs'],
      insight: 'This round gets stronger when you name one decision you regret and how you would fix it now.',
    },
  ],
  'full-stack': [
    {
      id: 'full-stack-build',
      name: 'Full Stack Build Round',
      route: '/coding-round',
      duration: '50 Min',
      icon: 'deployed_code',
      pattern: 'Connect UI, API, and persistence while keeping the flow stable when requests fail.',
      focus: ['Contracts', 'Optimistic UI', 'Error states'],
      insight: 'The best answers keep the flow simple and explain what the user sees when something breaks.',
    },
    {
      id: 'debugging-round',
      name: 'Debugging Round',
      route: '/scenario-round',
      duration: '30 Min',
      icon: 'bug_report',
      pattern: 'Trace one bug across frontend, backend, and data flow before suggesting the patch.',
      focus: ['Tracing', 'State sync', 'Root cause'],
      insight: 'Do not jump between layers randomly. Move from symptom to source in a clear order.',
    },
    {
      id: 'system-project',
      name: 'Project Architecture Round',
      route: '/mock-interview',
      duration: '25 Min',
      icon: 'lan',
      pattern: 'Defend architecture choices across the client, API, and storage path.',
      focus: ['Tradeoffs', 'Boundaries', 'Ownership'],
      insight: 'You stand out here when you explain why the same problem was split across layers that way.',
    },
  ],
  'ai-ml': [
    {
      id: 'model-round',
      name: 'Model Reasoning Round',
      route: '/coding-round',
      duration: '40 Min',
      icon: 'neurology',
      pattern: 'Explain model choice, evaluation strategy, and what failure would look like in production.',
      focus: ['Evaluation', 'Failure modes', 'Tradeoffs'],
      insight: 'A confident answer names the metric, why it mattered, and what it failed to capture.',
    },
    {
      id: 'retrieval-round',
      name: 'Retrieval Scenario Test',
      route: '/scenario-round',
      duration: '35 Min',
      icon: 'manage_search',
      pattern: 'Handle chunking, ranking, latency, and bad retrieval results without losing answer quality.',
      focus: ['Retrieval quality', 'Latency', 'Fallbacks'],
      insight: 'Interviewers want to hear how you measure retrieval quality, not just how you build it.',
    },
    {
      id: 'ml-project',
      name: 'Project Walkthrough Round',
      route: '/mock-interview',
      duration: '20 Min',
      icon: 'account_tree',
      pattern: 'Walk through your data pipeline, model iteration loop, and what blocked you most.',
      focus: ['Pipeline design', 'Iteration', 'Tradeoffs'],
      insight: 'Be precise about the dataset, evaluation loop, and what changed between versions.',
    },
  ],
  security: [
    {
      id: 'secure-review',
      name: 'Security Review Round',
      route: '/scenario-round',
      duration: '35 Min',
      icon: 'security',
      pattern: 'Trace auth flaws, input risks, and trust boundary breaks before proposing a fix.',
      focus: ['Threat modeling', 'Authorization', 'Incident response'],
      insight: 'Security answers land better when you name the boundary, the exploit path, and the mitigation in that order.',
    },
    {
      id: 'secure-coding',
      name: 'Secure Coding Round',
      route: '/coding-round',
      duration: '45 Min',
      icon: 'verified_user',
      pattern: 'Patch unsafe client or API behavior while keeping the user flow intact.',
      focus: ['Validation', 'Session safety', 'XSS and CSRF'],
      insight: 'Interviewers want to see you reduce risk without turning every patch into a rewrite.',
    },
    {
      id: 'security-mock',
      name: 'Security Project Walkthrough',
      route: '/mock-interview',
      duration: '25 Min',
      icon: 'account_tree',
      pattern: 'Explain one security-sensitive project decision and the tradeoff behind it.',
      focus: ['Tradeoffs', 'Defense in depth', 'Ownership'],
      insight: 'The strongest answers connect threat assumptions to a concrete implementation choice.',
    },
  ],
  data: [
    {
      id: 'analytics-round',
      name: 'Analytics Reasoning Round',
      route: '/scenario-round',
      duration: '35 Min',
      icon: 'query_stats',
      pattern: 'Interpret a metric shift, isolate likely causes, and define the next slice to inspect.',
      focus: ['Metrics', 'Experimentation', 'Data quality'],
      insight: 'Be precise about what the metric proves and what it cannot prove yet.',
    },
    {
      id: 'data-build',
      name: 'Data Workflow Build Round',
      route: '/coding-round',
      duration: '45 Min',
      icon: 'table_chart',
      pattern: 'Design a small transformation or analysis flow with reliable intermediate states.',
      focus: ['Transformations', 'Edge cases', 'Validation'],
      insight: 'Interviewers care about correctness and interpretability as much as implementation speed.',
    },
    {
      id: 'data-mock',
      name: 'Data Project Walkthrough',
      route: '/mock-interview',
      duration: '25 Min',
      icon: 'account_tree',
      pattern: 'Tell the story of a dashboard, model, or analysis that changed a decision.',
      focus: ['Narrative', 'Tradeoffs', 'Stakeholder clarity'],
      insight: 'A useful data story ties the analysis to a decision, not just to a chart.',
    },
  ],
};

export default function Workflows() {
  const navigate = useNavigate();
  const workspace = usePrepWorkspace();
  const domainLabel = DOMAIN_LABELS[workspace.selections.domain] ?? 'Frontend';
  const companyTypeLabel = COMPANY_TYPE_LABELS[workspace.selections.companyType] ?? 'Product Company';
  const domainFamily = getDomainFamily(workspace.selections.domain);

  const tracks = useMemo(() => {
    const source = TRACKS_BY_DOMAIN[domainFamily] ?? TRACKS_BY_DOMAIN.frontend;
    return source;
  }, [domainFamily]);

  return (
    <div className="min-h-full bg-background px-4 py-8 sm:px-6 lg:px-10 xl:px-14">
      <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
      <main className="relative z-10 mx-auto w-full max-w-360 space-y-8 lg:space-y-10">
        <section className="border-b border-blueprint-line pb-6">
          <div className="max-w-3xl lg:pr-6">
            <h1 className="text-display-xl text-primary">Practice Tracks</h1>
            <p className="mt-3 text-body-lg text-blueprint-muted">
              Pick the round you want to sharpen next. These tracks stay aligned with your {domainLabel.toLowerCase()} target and {companyTypeLabel.toLowerCase()} interview style.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,18rem),1fr))] gap-4 sm:gap-5 lg:gap-6">
          {tracks.map((track) => (
            <article key={track.id} className="surface-card flex h-full flex-col">
              <div className="flex h-full flex-col">
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="wrap-anywhere text-headline-md text-primary not-italic">{track.name}</h2>
                  </div>
                  <span className="inline-flex w-fit shrink-0 rounded-full bg-[#efeded] px-4 py-2 text-ui-label text-blueprint-muted">{track.duration}</span>
                </div>

                <div className="space-y-5 sm:space-y-6">
                  <div className="border-t border-blueprint-line pt-4">
                    <h3 className="text-ui-label text-blueprint-muted">Round Format</h3>
                    <p className="mt-2 text-body-md text-primary">{track.pattern}</p>
                  </div>
                  <div>
                    <h3 className="text-ui-label text-blueprint-muted">What This Round Checks</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {track.focus.map((tag) => (
                        <span key={tag} className="rounded-md bg-[#efeded] px-2 py-1 text-ui-label text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="surface-inset">
                    <div className="mb-2 flex items-center gap-2 text-ui-label text-blueprint-muted">
                      <span className="material-symbols-outlined text-[16px]">info</span>
                      Why This Matters
                    </div>
                    <p className="text-body-md text-primary">{track.insight}</p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate(track.route)}
                className="mt-6 w-full rounded-full border border-primary bg-primary px-5 py-3 text-ui-label text-white transition-colors hover:bg-[#303031]"
              >
                Open Round
              </button>
            </article>
          ))}

          <button type="button" onClick={() => navigate('/onboarding')} className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-blueprint-line bg-transparent p-6 text-center transition-colors hover:bg-white/50 sm:min-h-72 lg:min-h-80">
            <div className="flex h-16 w-16 items-center justify-center text-[#2d63b8]">
              <span className="material-symbols-outlined text-[32px]">add</span>
            </div>
            <div>
              <h3 className="text-headline-md text-primary not-italic">Custom Track</h3>
              <p className="mt-2 max-w-xs text-body-md text-blueprint-muted">
                Need a different mix? Build a track from your role target and project context.
              </p>
            </div>
          </button>
        </section>
      </main>
    </div>
  );
}
