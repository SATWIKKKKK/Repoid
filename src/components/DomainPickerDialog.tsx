import React, { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { getVisibleDomainOptions } from '../lib/prep';
import { cn } from '../lib/utils';

interface DomainPickerDialogProps {
  open: boolean;
  value: string;
  title?: string;
  description?: string;
  saving?: boolean;
  error?: string | null;
  onClose: () => void;
  onSave: (domain: string) => void | Promise<void>;
}

export default function DomainPickerDialog({
  open,
  value,
  title = 'Change domain',
  description = 'Update your question bank, rounds, practice tracks, and dashboard context in one place.',
  saving = false,
  error = null,
  onClose,
  onSave,
}: DomainPickerDialogProps) {
  const options = useMemo(() => getVisibleDomainOptions(), []);
  const [selectedDomain, setSelectedDomain] = useState(value);

  useEffect(() => {
    if (open) setSelectedDomain(value);
  }, [open, value]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="flex max-h-[min(88vh,760px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-blueprint-line bg-card p-5 shadow-[0_28px_80px_rgba(0,0,0,0.24)] sm:p-6">
        <div className="flex items-start justify-between gap-4 border-b border-blueprint-line pb-4">
          <div className="max-w-2xl">
            <p className="text-ui-label text-blueprint-muted">Workspace Preference</p>
            <h2 className="mt-2 text-headline-md text-primary not-italic">{title}</h2>
            <p className="mt-2 text-body-md text-blueprint-muted">{description}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-blueprint-line p-2 text-blueprint-muted transition-colors hover:bg-[#f5f3f3] hover:text-primary dark:hover:bg-white/5" aria-label="Close domain picker">
            <X size={16} />
          </button>
        </div>

        <div className="mt-5 grid gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
          {options.map((option) => {
            const selected = option.id === selectedDomain;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setSelectedDomain(option.id)}
                className={cn(
                  'rounded-xl border p-4 text-left transition-all',
                  selected
                    ? 'border-primary bg-primary text-white shadow-[0_16px_30px_rgba(0,0,0,0.12)]'
                    : 'border-blueprint-line bg-card text-primary hover:bg-[#f5f3f3] dark:hover:bg-white/5',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-body-md font-semibold">{option.label}</p>
                    <p className={cn('mt-2 text-sm leading-6', selected ? 'text-white/78' : 'text-blueprint-muted')}>
                      {option.description}
                    </p>
                  </div>
                  <span className={cn('mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2', selected ? 'border-white bg-white/10' : 'border-blueprint-line bg-transparent')}>
                    {selected ? <span className="h-2.5 w-2.5 rounded-full bg-white" /> : null}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {error ? <p className="mt-5 text-body-md text-red-600">{error}</p> : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onClose} className="rounded-full border border-blueprint-line px-5 py-2.5 text-ui-label text-primary transition-colors hover:bg-[#f5f3f3] dark:hover:bg-white/5">
            Cancel
          </button>
          <button type="button" onClick={() => void onSave(selectedDomain)} disabled={saving || selectedDomain === value} className="rounded-full bg-primary px-6 py-2.5 text-ui-label text-white transition-colors hover:bg-[#303031] disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? 'Saving...' : 'Save domain'}
          </button>
        </div>
      </div>
    </div>
  );
}
