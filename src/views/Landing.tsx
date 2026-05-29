import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Check,
  ChevronDown,
  Code2,
  Database,
  Github,
  Layers3,
  MoonStar,
  Quote,
  ServerCog,
  ShieldCheck,
  SunMedium,
} from 'lucide-react';
import { useThemePreference } from '../hooks/useThemePreference';
import { PRICING_PLANS } from '../lib/pricingContent';
import { applyThemePreference, shouldUseDarkTheme } from '../lib/theme';
import { updateUserPreferences } from '../lib/userPreferences';
import { View } from '../App';
import { BackgroundRippleEffect } from '../components/ui/background-ripple-effect';
import Logo from '../components/Logo';
import { FOOTER_LINK_GROUPS } from '../lib/footerLinks';

const TRUST_METRICS = [
  { value: '640+', label: 'interview questions', note: 'spread across role-specific banks and round formats' },
  { value: '6', label: 'domains covered', note: 'frontend, backend, AI/ML, data, analytics, and cyber' },
  { value: 'GitHub', label: 'repo scanning', note: 'generate questions from the code you have actually built' },
  { value: '4', label: 'round types', note: 'scenario based, coding, mock, and practice rounds' },
];

const HOW_IT_WORKS = [
  { icon: BrainCircuit, title: 'Choose your domain', body: 'Start with the exact track and round type you are preparing for instead of generic interview noise.' },
  { icon: Github, title: 'Attach your projects', body: 'Scan public or private GitHub repositories to generate questions tied to your real architecture and code decisions.' },
  { icon: Layers3, title: 'Practice by round', body: 'Switch between question bank, coding, scenario, and mock interview modes depending on the stage of your prep.' },
  { icon: BarChart3, title: 'Measure what improves', body: 'Use saved sessions, readiness signals, and repeat practice to focus on weak areas before interview day.' },
];

const DOMAIN_CARDS = [
  {
    title: 'Frontend',
    body: 'React, state management, browser behavior, UI tradeoffs, and product-facing debugging questions.',
    icon: Code2,
  },
  {
    title: 'Backend',
    body: 'APIs, databases, auth, performance, scaling, and service design scenarios for production systems.',
    icon: ServerCog,
  },
  {
    title: 'AI/ML',
    body: 'ML foundations, model evaluation, inference tradeoffs, vector search, and LLM application design.',
    icon: BrainCircuit,
  },
  {
    title: 'Data Science',
    body: 'Statistics, experimentation, feature engineering, model selection, and business interpretation.',
    icon: Database,
  },
  {
    title: 'Data Analytics',
    body: 'SQL, metrics, dashboards, product sense, and decision-making questions tied to real data use cases.',
    icon: BarChart3,
  },
  {
    title: 'Cybersecurity',
    body: 'Threat models, access control, secure design, incident response, and vulnerability reasoning.',
    icon: ShieldCheck,
  },
];

const LANDING_FAQS = [
  {
    question: 'Is this just a question bank?',
    answer: 'No. Repoid combines curated domain banks with repo-aware GitHub scans, round-specific practice, saved sessions, and progress tracking so your prep is grounded in both interview patterns and your own work.',
  },
  {
    question: 'Do I need to pay to start?',
    answer: 'No. The Free tier includes all domains, the full question bank, unlimited practice sessions, 3 coding rounds, 3 scenario rounds, 3 mock interviews, and 3 GitHub repo scans.',
  },
  {
    question: 'Which domains are covered?',
    answer: 'Frontend, Backend, AI/ML, Data Science, Data Analytics, and Cybersecurity are built in as first-class tracks with their own question styles.',
  },
  {
    question: 'How does GitHub repo scanning help?',
    answer: 'Paste a repository URL, generate a scan, and practice questions based on your project choices, architecture, and implementation details instead of generic prompts.',
  },
  {
    question: 'What does a serious prep flow look like?',
    answer: 'Pick your track, scan one or two core projects, practice mixed rounds every day, and use saved sessions to revisit weak spots before interviews.',
  },
];



interface LandingProps {
  isAuthenticated: boolean;
  onStart: () => void;
  onViewDocs: () => void;
  onViewChange: (view: View) => void;
}

export default function Landing({ isAuthenticated, onStart, onViewDocs, onViewChange }: LandingProps) {
  const isAuthed = isAuthenticated;
  const storedThemePreference = useThemePreference();
  const [themePreference, setThemePreference] = useState(storedThemePreference);
  const isDarkMode = shouldUseDarkTheme(themePreference);
  const [openFaq, setOpenFaq] = useState(-1);

  useEffect(() => {
    setThemePreference(storedThemePreference);
  }, [storedThemePreference]);

  const handleThemeToggle = async () => {
    const nextTheme = isDarkMode ? 'light' : 'dark';
    setThemePreference(nextTheme);
    applyThemePreference(nextTheme);
    if (!isAuthed) return;
    await updateUserPreferences({ theme: nextTheme });
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openDashboard = () => {
    if (isAuthed) {
      onViewDocs();
      return;
    }
    onViewChange('signup');
  };

  const openPricing = () => {
    onViewChange(isAuthed ? 'pricing' : 'signup');
  };

  const primaryCta = () => {
    if (isAuthed) {
      openDashboard();
      return;
    }
    onStart();
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-primary">
      <div className="pointer-events-none fixed inset-0 landing-blueprint-grid opacity-30 dark:opacity-25" />
      <div className="pointer-events-none fixed inset-0 opacity-20 dark:opacity-30">
        <BackgroundRippleEffect rows={12} cols={32} cellSize={64} className="landing-ripple-theme" />
      </div>

      <nav className="landing-navbar sticky top-3 z-40 mx-3 rounded-2xl border border-blueprint-line sm:top-4 sm:mx-4">
        <div className="mx-auto flex min-h-14 w-full max-w-360 items-center justify-between gap-3 px-4 py-2 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3 lg:gap-8">
            <button type="button" onClick={() => onViewChange('landing')} className="flex items-center">
              <Logo
                className="h-8 w-auto sm:h-10 md:h-12 lg:h-14"
                alt="Repoid navbar logo"
                lightSrc="/assets/repoid-logo-black.svg"
                darkSrc="/assets/repoid-logo-white.svg"
              />
            </button>
            <div className="hidden items-center gap-1 lg:flex">
              <button type="button" onClick={() => scrollToSection('preview')} className="rounded-full px-3 py-2 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] dark:hover:bg-white/5">
                Preview
              </button>
              <button type="button" onClick={() => scrollToSection('domains')} className="rounded-full px-3 py-2 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] dark:hover:bg-white/5">
                Domains
              </button>
              <button type="button" onClick={() => scrollToSection('landing-pricing')} className="rounded-full px-3 py-2 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] dark:hover:bg-white/5">
                Plans
              </button>
              <button type="button" onClick={() => scrollToSection('faq')} className="rounded-full px-3 py-2 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] dark:hover:bg-white/5">
                FAQ
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => void handleThemeToggle()}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-blueprint-line bg-card text-blueprint-muted transition-colors hover:bg-[#f5f3f3] hover:text-primary dark:hover:bg-white/5"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <SunMedium size={16} /> : <MoonStar size={16} />}
            </button>

            <button
              type="button"
              onClick={() => onViewChange('auth')}
              className="hidden text-ui-label text-primary transition-colors hover:text-blueprint-muted sm:inline-flex"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => onViewChange('signup')}
              className="landing-primary-action rounded-full px-5 py-2 text-ui-label shadow-[0_8px_24px_rgba(26,26,26,0.16)] transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto flex w-full max-w-360 flex-col px-4 pb-20 sm:px-8 lg:px-12">
        <section className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center py-16 text-center sm:py-20">
          <h1 className="max-w-3xl font-serif leading-[1.05] text-[clamp(2.4rem,5.5vw,4.5rem)] text-primary">
            AI interview prep that adapts to your role, your timeline, and your own project.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[clamp(1rem,2vw,1.2rem)] leading-8 text-blueprint-muted">
            Practice domain-specific questions, run timed rounds, scan your GitHub repositories, and track weak spots before your interviews.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={primaryCta}
              className="landing-primary-action inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-ui-label shadow-[0_14px_34px_rgba(17,17,17,0.22)] transition-colors"
            >
              {isAuthed ? 'Go to Dashboard' : 'Start Free'} <ArrowRight size={14} />
            </button>
          </div>
        </section>

        <section className="border-y border-blueprint-line py-8">
          <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
            {TRUST_METRICS.map((metric) => (
              <article key={metric.label} className="surface-card-compact">
                <p className="text-technical-mono text-blueprint-muted">{metric.label}</p>
                <p className="mt-3 font-serif text-[clamp(1.8rem,3.5vw,2.4rem)] leading-none text-primary">{metric.value}</p>
                <p className="mt-2 text-body-md text-blueprint-muted">{metric.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="preview" className="py-16 sm:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="text-ui-label text-blueprint-muted">Product preview</p>
            <h2 className="mt-2 text-headline-lg text-primary">Know what you are signing up for before you commit.</h2>
            <p className="mt-4 text-body-lg text-blueprint-muted">
              The product is built around the real workflow: pick a domain, open a round, scan your repo, and practice from a surface that looks like a serious prep tool instead of a static question list.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Question card UI',
                body: 'Topic tags, round labels, and answer review that stays compact when you need to move fast.',
                points: ['Filter by the active domain and round type.', 'Open answers inline without losing your place.', 'Export the current set when you need offline revision.'],
              },
              {
                title: 'Repo scanner',
                body: 'Saved scan versions for each project so you can revisit older prep passes instead of overwriting them.',
                points: ['Keep scans tied to the signed-in user.', 'Generate project-specific prompts from real architecture.', 'Resume older scan versions when revising the same repo.'],
              },
              {
                title: 'Round selector',
                body: 'Switch cleanly between question bank, coding, mock interviews, and scenario rounds as interviews get closer.',
                points: ['Practice timed coding and scenario rounds.', 'Run mock interviews with structured reports.', 'Track completed attempts and weak areas.'],
              },
            ].map((item) => (
              <article key={item.title} className="surface-card">
                <h3 className="text-headline-sm text-primary">{item.title}</h3>
                <p className="mt-3 text-body-md text-blueprint-muted">{item.body}</p>
                <ul className="mt-5 grid gap-3">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3 text-body-md text-primary">
                      <Check size={16} className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-300" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-blueprint-line py-16">
          <div className="mb-10">
            <p className="text-ui-label text-blueprint-muted">How it works</p>
            <h2 className="mt-2 max-w-2xl text-headline-lg text-primary">A cleaner path from profile to practice.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item, index) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="relative border-l border-blueprint-line pl-5">
                  <span className="mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-blueprint-line bg-card text-primary">
                    <Icon size={18} />
                  </span>
                  <span className="text-ui-label text-blueprint-muted">Step {index + 1}</span>
                  <h3 className="mt-2 text-headline-sm text-primary">{item.title}</h3>
                  <p className="mt-3 text-body-md text-blueprint-muted">{item.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section id="domains" className="py-16 sm:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="text-ui-label text-blueprint-muted">Domains</p>
            <h2 className="mt-2 text-headline-lg text-primary">Built for the track you are actually targeting.</h2>
            <p className="mt-4 text-body-lg text-blueprint-muted">
              Each domain carries different question styles, different technical depth, and different expectations. Repoid keeps those differences visible instead of flattening everything into one generic question stream.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {DOMAIN_CARDS.map((domain) => {
              const Icon = domain.icon;
              return (
                <article key={domain.title} className="surface-card transition-transform duration-200 hover:-translate-y-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blueprint-line bg-card text-primary">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-5 text-headline-sm text-primary">{domain.title}</h3>
                  <p className="mt-3 text-body-md text-blueprint-muted">{domain.body}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-y border-blueprint-line py-16 sm:py-20">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-ui-label text-blueprint-muted">Use cases</p>
              <h2 className="mt-2 text-headline-lg text-primary">Built for students preparing for serious SDE and product engineering interviews.</h2>
              <p className="mt-4 text-body-lg text-blueprint-muted">
                Use Repoid as a structured prep loop for campus hiring, off-campus roles, and company-specific interviews where your projects and tradeoffs matter as much as textbook answers.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  title: 'Three weeks before Atlassian',
                  body: 'Scan your React or Node project, run frontend and backend rounds daily, and review architecture answers that map back to your own shipped work.',
                },
                {
                  title: 'Placement season mode',
                  body: 'Rotate through domain banks, coding rounds, and mock interviews while tracking weak spots so revision gets sharper instead of broader.',
                },
              ].map((item) => (
                <article key={item.title} className="surface-card">
                  <Quote size={20} className="text-blueprint-muted" />
                  <h3 className="mt-4 text-headline-sm text-primary">{item.title}</h3>
                  <p className="mt-3 text-body-md text-blueprint-muted">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="landing-pricing" className="py-16 sm:py-20">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-ui-label text-blueprint-muted">Pricing</p>
              <h2 className="mt-2 text-headline-lg text-primary">Start free, then move to paid plans when the interview pressure gets real.</h2>
              <p className="mt-4 text-body-lg text-blueprint-muted">
                Free gives you a real starting point. Monthly is the focused sprint plan. Yearly is for full placement season coverage. Paid checkout lives in the billing flow inside the app, but the comparison is clear here.
              </p>
            </div>
            <button type="button" onClick={openPricing} className="inline-flex items-center gap-2 rounded-full border border-blueprint-line bg-card px-6 py-3 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] dark:hover:bg-white/5">
              {isAuthed ? 'Open full pricing' : 'Sign up to view pricing'} <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <article
                key={plan.id}
                className={`surface-card relative flex min-h-107.5 flex-col ${plan.featured ? 'border-primary shadow-[0_20px_48px_rgba(0,0,0,0.14)]' : ''}`}
              >
                {plan.featured ? (
                  <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-ui-label text-white">Most Popular</span>
                ) : null}
                <p className="text-ui-label text-blueprint-muted">{plan.name}</p>
                <h3 className="mt-3 text-headline-lg text-primary not-italic">
                  {plan.price}
                  <span className="ml-2 text-body-md text-blueprint-muted">{plan.cadence}</span>
                </h3>
                <p className="mt-3 text-body-md text-blueprint-muted">{plan.description}</p>
                <div className="my-6 h-px bg-blueprint-line" />
                <ul className="flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-body-md text-primary">
                      <Check size={17} className="pricing-check-icon mt-1 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={plan.id === 'free' ? primaryCta : openPricing}
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-ui-label transition-colors ${plan.featured ? 'bg-primary text-white hover:bg-[#303031]' : 'border border-blueprint-line bg-card text-primary hover:bg-[#f5f3f3] dark:hover:bg-white/5'}`}
                >
                  {plan.id === 'free' ? (isAuthed ? 'Go to Dashboard' : 'Start free') : (isAuthed ? `Choose ${plan.name}` : `Sign up for ${plan.name}`)}
                  <ArrowRight size={15} />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="faq" className="border-y border-blueprint-line py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1fr]">
            <div>
              <p className="text-ui-label text-blueprint-muted">FAQ</p>
              <h2 className="mt-2 text-headline-lg text-primary">Answer the objections before a visitor bounces.</h2>
            </div>
            <div className="grid gap-3">
              {LANDING_FAQS.map((faq, index) => {
                const open = openFaq === index;
                return (
                  <button key={faq.question} type="button" onClick={() => setOpenFaq(open ? -1 : index)} className="w-full rounded-xl border border-blueprint-line bg-card px-5 py-5 text-left shadow-[0_10px_26px_rgba(0,0,0,0.06)]">
                    <span className="flex items-center justify-between gap-4 text-body-lg font-semibold text-primary">
                      {faq.question}
                      <ChevronDown size={18} className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                    </span>
                    {open ? <span className="mt-3 block text-body-md text-blueprint-muted">{faq.answer}</span> : null}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="landing-cta-panel rounded-xl border p-6 shadow-[0_14px_34px_rgba(0,0,0,0.14)] sm:p-7">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
              <div className="max-w-3xl">
                <h2 className="landing-cta-title font-serif text-[clamp(2rem,5vw,3.75rem)] leading-[1.05]">Your interview is coming. Start today.</h2>
                <p className="landing-cta-copy mt-4 max-w-2xl text-body-lg">
                  Stop collecting random links. Open a track, scan a project, and build a prep loop that gets sharper every session.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 lg:justify-end lg:pt-1">
                <button
                  type="button"
                  onClick={primaryCta}
                  className="landing-cta-button inline-flex items-center gap-2 rounded-full px-7 py-3 text-ui-label transition-colors"
                >
                  {isAuthed ? 'Dashboard' : 'Start Free'} <ArrowRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={openPricing}
                  className="landing-cta-button inline-flex items-center gap-2 rounded-full border px-7 py-3 text-ui-label transition-colors"
                >
                  {isAuthed ? 'View pricing' : 'See paid plans'} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-blueprint-line py-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_2fr]">
            <div>
              <a href="/" className="inline-block">
                <Logo className="h-8 w-auto" alt="Repoid logo" />
              </a>
              <p className="mt-3 max-w-sm text-body-md text-blueprint-muted">Interview prep for domain tracks, GitHub scans, and serious round-by-round practice.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FOOTER_LINK_GROUPS.map((group) => (
                <div key={group.title}>
                  <p className="text-ui-label text-primary">{group.title}</p>
                  <div className="mt-4 grid gap-2">
                    {group.links.map((link) => (
                      <a key={link.href} href={link.href} className="text-body-md text-blueprint-muted transition-colors hover:text-primary">
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
