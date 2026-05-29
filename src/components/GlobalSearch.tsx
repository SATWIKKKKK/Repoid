import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePrepWorkspace } from '../hooks/usePrepWorkspace';
import { DOMAIN_LABELS } from '../lib/prep';
import { cn } from '../lib/utils';

type SearchTarget = {
  label: string;
  meta: string;
  route: string;
  keywords: string[];
};

const BASE_TARGETS: SearchTarget[] = [
  { label: 'Question Bank', meta: 'Browse interview prompts', route: '/question-bank', keywords: ['questions', 'bank', 'mcq', 'architecture', 'coding'] },
  { label: 'Practice Tracks', meta: 'Open role-aligned drills', route: '/practice-tracks', keywords: ['tracks', 'rounds', 'practice', 'drills'] },
  { label: 'Coding Round', meta: 'Start coding practice', route: '/coding-round', keywords: ['coding', 'machine coding', 'implementation'] },
  { label: 'Scenario Round', meta: 'Debug production-style cases', route: '/scenario-round', keywords: ['scenario', 'debugging', 'incidents'] },
  { label: 'Mock Interview', meta: 'Practice spoken answers', route: '/mock-interview', keywords: ['mock', 'interview', 'behavioral'] },
  { label: 'GitHub Repos', meta: 'Scan and revisit repositories', route: '/github-repos', keywords: ['github', 'repo', 'repositories', 'scanner'] },
  { label: 'Settings', meta: 'Change domain and preferences', route: '/settings/profile', keywords: ['settings', 'preferences', 'domain'] },
];

export default function GlobalSearch({ compact = false }: { compact?: boolean }) {
  const navigate = useNavigate();
  const workspace = usePrepWorkspace();
  const domainLabel = DOMAIN_LABELS[workspace.selections.domain] ?? 'Frontend';
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const placeholders = [
    `Search ${domainLabel} questions`,
    'Search scenario drills',
    'Search GitHub repositories',
    'Search coding rounds',
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPlaceholderIndex((index) => (index + 1) % placeholders.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [placeholders.length]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const targets = useMemo(() => {
    const dynamicTarget: SearchTarget = {
      label: `${domainLabel} questions`,
      meta: 'Search directly inside Question Bank',
      route: `/question-bank?search=${encodeURIComponent(query.trim() || domainLabel)}`,
      keywords: [domainLabel.toLowerCase(), 'questions', 'topic'],
    };
    return [dynamicTarget, ...BASE_TARGETS];
  }, [domainLabel, query]);

  const normalized = query.trim().toLowerCase();
  const suggestions = useMemo(() => {
    if (!normalized) return targets.slice(0, 5);
    return targets
      .filter((target) => [target.label, target.meta, ...target.keywords].some((value) => value.toLowerCase().includes(normalized)))
      .slice(0, 6);
  }, [normalized, targets]);

  useEffect(() => {
    setActiveIndex(0);
  }, [normalized]);

  const choose = (target?: SearchTarget) => {
    const fallback = normalized
      ? `/question-bank?search=${encodeURIComponent(query.trim())}`
      : '/question-bank';
    navigate(target?.route ?? fallback);
    setQuery('');
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={cn('relative w-full', compact ? 'max-w-[34rem]' : 'max-w-[42rem]')}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          choose(suggestions[activeIndex]);
        }}
        className="relative flex h-12 items-center rounded-full border border-blueprint-line bg-card shadow-[inset_0_0_0_1px_rgba(0,0,0,0.03),0_12px_28px_rgba(0,0,0,0.08)]"
      >
        <Search size={16} className="pointer-events-none absolute left-4 text-blueprint-muted" />
        <input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (!suggestions.length) return;
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setActiveIndex((index) => (index + 1) % suggestions.length);
            }
            if (event.key === 'ArrowUp') {
              event.preventDefault();
              setActiveIndex((index) => (index - 1 + suggestions.length) % suggestions.length);
            }
            if (event.key === 'Escape') setOpen(false);
          }}
          placeholder={placeholders[placeholderIndex]}
          className="h-full w-full bg-transparent pl-11 pr-14 text-sm text-primary outline-none placeholder:text-blueprint-muted sm:text-base"
          aria-expanded={open}
          aria-haspopup="listbox"
        />
        <button type="submit" aria-label="Search" className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 shrink-0 items-center justify-center transition-colors text-[#1a1212] dark:text-[#e8c4a0] sm:rounded-full sm:border sm:border-blueprint-line sm:bg-[#f4f4f4] sm:hover:bg-white sm:dark:bg-[#f3ecec] sm:dark:text-[#111111] sm:dark:hover:bg-white">
          <ArrowRight size={15} />
        </button>
      </form>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.55rem)] z-[70] overflow-hidden rounded-2xl border border-blueprint-line bg-card p-2 shadow-[0_18px_42px_rgba(0,0,0,0.14)]">
          <div role="listbox" className="grid gap-1">
            {suggestions.length ? suggestions.map((target, index) => (
              <button
                key={`${target.label}-${target.route}`}
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(target)}
                className={cn(
                  'flex items-start justify-between gap-3 rounded-xl px-3 py-3 text-left transition-colors',
                  index === activeIndex ? 'bg-[#f5f3f3]' : 'hover:bg-[#f5f3f3]',
                )}
              >
                <span>
                  <span className="block text-sm font-semibold text-primary">{target.label}</span>
                  <span className="mt-1 block text-sm text-blueprint-muted">{target.meta}</span>
                </span>
                <ArrowRight size={15} className="mt-1 shrink-0 text-blueprint-muted" />
              </button>
            )) : (
              <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => choose()} className="rounded-xl px-3 py-3 text-left hover:bg-[#f5f3f3]">
                <span className="block text-sm font-semibold text-primary">Search Question Bank</span>
                <span className="mt-1 block text-sm text-blueprint-muted">Look for "{query.trim()}" across saved questions.</span>
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
