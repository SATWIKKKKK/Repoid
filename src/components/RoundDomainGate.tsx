import React, { useState } from 'react';
import DomainPickerDialog from './DomainPickerDialog';
import { DOMAIN_LABELS, getStoredPrepWorkspace, updatePrepWorkspace } from '../lib/prep';
import { updateUserPreferences } from '../lib/userPreferences';

export default function RoundDomainGate({
  roundTitle,
  domain,
  onConfirmed,
  subject = 'coding problems',
}: {
  roundTitle: string;
  domain: string;
  subject?: string;
  onConfirmed: (domain: string) => void;
}) {
  const [step, setStep] = useState<'confirm' | 'picker' | 'changed'>('confirm');
  const [previousDomain, setPreviousDomain] = useState(domain);
  const [currentDomain, setCurrentDomain] = useState(domain);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentLabel = DOMAIN_LABELS[currentDomain] ?? currentDomain;
  const previousLabel = DOMAIN_LABELS[previousDomain] ?? previousDomain;

  const persistDomain = async (nextDomain: string) => {
    setSaving(true);
    setError(null);
    const result = await updateUserPreferences({ domain: nextDomain });
    setSaving(false);
    if (result.ok === false) {
      setError(result.error);
      return null;
    }
    updatePrepWorkspace({ selections: { ...getStoredPrepWorkspace().selections, domain: result.data.domain } });
    return result.data.domain;
  };

  const handleDomainSave = async (nextDomain: string) => {
    const saved = await persistDomain(nextDomain);
    if (!saved) return;
    setCurrentDomain(saved);
    setStep('changed');
  };

  const handleRestorePrevious = async () => {
    const restored = await persistDomain(previousDomain);
    if (!restored) return;
    onConfirmed(restored);
  };

  return (
    <>
      {step !== 'picker' ? (
        <div className="fixed inset-0 z-80 flex items-center justify-center bg-background px-4">
          <div className="pointer-events-none fixed inset-0 blueprint-grid opacity-30" />
          <div className="relative w-full max-w-xl rounded-2xl border border-blueprint-line bg-card p-7 text-center shadow-[0_28px_80px_rgba(0,0,0,0.2)]">
            <p className="text-ui-label tracking-[0.2em] text-blueprint-muted">{step === 'changed' ? 'Confirm Domain Change' : roundTitle}</p>
            <h1 className="mt-3 text-headline-lg text-primary not-italic">
              {step === 'changed' ? `You've switched to ${currentLabel}.` : `You're currently set to ${currentLabel} domain.`}
            </h1>
            <p className="mt-3 text-body-lg text-blueprint-muted">
              {step === 'changed'
                ? `Generate ${subject} for ${currentLabel}?`
                : `Ready to practice ${currentLabel} ${subject}?`}
            </p>
            {error ? <p className="mt-4 text-body-md text-red-600">{error}</p> : null}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {step === 'changed' ? (
                <>
                  <button type="button" onClick={() => onConfirmed(currentDomain)} className="rounded-full bg-primary px-6 py-3 text-ui-label text-white">
                    Yes, use {currentLabel}
                  </button>
                  <button type="button" disabled={saving} onClick={() => void handleRestorePrevious()} className="rounded-full border border-blueprint-line px-6 py-3 text-ui-label text-primary disabled:opacity-60">
                    {saving ? 'Restoring...' : `Go back to ${previousLabel}`}
                  </button>
                </>
              ) : (
                <>
                  <button type="button" onClick={() => onConfirmed(currentDomain)} className="rounded-full bg-primary px-6 py-3 text-ui-label text-white">
                    Yes, continue with {currentLabel}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviousDomain(currentDomain);
                      setStep('picker');
                    }}
                    className="rounded-full border border-blueprint-line px-6 py-3 text-ui-label text-primary"
                  >
                    Change Domain
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
      <DomainPickerDialog
        open={step === 'picker'}
        value={currentDomain}
        saving={saving}
        error={error}
        title="Change interview domain"
        description="Choose the domain for this round. You will confirm it before generation starts."
        onClose={() => setStep('confirm')}
        onSave={(nextDomain) => { void handleDomainSave(nextDomain); }}
      />
    </>
  );
}
