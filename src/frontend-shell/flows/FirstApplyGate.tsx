import React, { useEffect, useState } from 'react';
import type { ApplyGateValues } from '../data/accountReadModel';
import { CTAButton, InlineNotice } from '../primitives/FeedbackPrimitives';
import { DialogPrimitive } from '../primitives/NavigationPrimitives';

// BATCH_C2_FIRST_APPLY_GATE
type Props = {
  open: boolean;
  specimenTitle: string;
  initialValues: ApplyGateValues;
  submitting: boolean;
  onClose: () => void;
  onSubmit: (values: ApplyGateValues) => Promise<void> | void;
};

type ErrorState = Partial<Record<keyof ApplyGateValues, string>>;

export const FirstApplyGate: React.FC<Props> = ({
  open,
  specimenTitle,
  initialValues,
  submitting,
  onClose,
  onSubmit,
}) => {
  const [form, setForm] = useState<ApplyGateValues>(initialValues);
  const [errors, setErrors] = useState<ErrorState>({});

  useEffect(() => {
    if (open) {
      setForm(initialValues);
      setErrors({});
    }
  }, [open, initialValues]);

  const validate = () => {
    const nextErrors: ErrorState = {};

    if (!form.name.trim()) nextErrors.name = 'Required';
    if (!form.email.trim()) nextErrors.email = 'Required';
    if (!form.phone.trim()) nextErrors.phone = 'Required';
    if (!form.region.trim()) nextErrors.region = 'Required';
    if (!form.growEnvironment.trim()) nextErrors.growEnvironment = 'Required';
    if (!form.experienceLevel.trim()) nextErrors.experienceLevel = 'Required';
    if (!form.consentAccepted) nextErrors.consentAccepted = 'Required';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const setField = <K extends keyof ApplyGateValues>(key: K, value: ApplyGateValues[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await onSubmit(form);
  };

  return (
    <DialogPrimitive open={open} onClose={onClose} title="First Apply Gate">
      <div className="space-y-5">
        <InlineNotice
          title={`Before your first real application for ${specimenTitle}`}
          body="This is not a membership review form. It only collects the minimum profile data needed before your first true Apply."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--shell-oxide)]">Name</span>
            <input
              value={form.name}
              onChange={(event) => setField('name', event.target.value)}
              placeholder="Your name"
              className="rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-4 py-3 text-sm text-[var(--shell-ink)] outline-none"
            />
            {errors.name ? <span className="text-xs text-[var(--shell-error)]">{errors.name}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--shell-oxide)]">Email</span>
            <input
              value={form.email}
              onChange={(event) => setField('email', event.target.value)}
              placeholder="name@example.com"
              className="rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-4 py-3 text-sm text-[var(--shell-ink)] outline-none"
            />
            {errors.email ? <span className="text-xs text-[var(--shell-error)]">{errors.email}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--shell-oxide)]">Phone</span>
            <input
              value={form.phone}
              onChange={(event) => setField('phone', event.target.value)}
              placeholder="Phone number"
              className="rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-4 py-3 text-sm text-[var(--shell-ink)] outline-none"
            />
            {errors.phone ? <span className="text-xs text-[var(--shell-error)]">{errors.phone}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--shell-oxide)]">Region</span>
            <input
              value={form.region}
              onChange={(event) => setField('region', event.target.value)}
              placeholder="City / region"
              className="rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-4 py-3 text-sm text-[var(--shell-ink)] outline-none"
            />
            {errors.region ? <span className="text-xs text-[var(--shell-error)]">{errors.region}</span> : null}
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--shell-oxide)]">Grow Environment</span>
            <select
              value={form.growEnvironment}
              onChange={(event) => setField('growEnvironment', event.target.value)}
              className="rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-4 py-3 text-sm text-[var(--shell-ink)] outline-none"
            >
              <option value="">Select</option>
              <option value="indoor-window">Indoor Window</option>
              <option value="balcony">Balcony</option>
              <option value="greenhouse">Greenhouse</option>
              <option value="mixed">Mixed Environment</option>
            </select>
            {errors.growEnvironment ? <span className="text-xs text-[var(--shell-error)]">{errors.growEnvironment}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--shell-oxide)]">Experience Level</span>
            <select
              value={form.experienceLevel}
              onChange={(event) => setField('experienceLevel', event.target.value)}
              className="rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-4 py-3 text-sm text-[var(--shell-ink)] outline-none"
            >
              <option value="">Select</option>
              <option value="new">New to caudiciforms</option>
              <option value="some">Some experience</option>
              <option value="regular">Regular grower</option>
              <option value="advanced">Advanced grower</option>
            </select>
            {errors.experienceLevel ? <span className="text-xs text-[var(--shell-error)]">{errors.experienceLevel}</span> : null}
          </label>
        </div>

        <label className="flex items-start gap-3 rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-4 py-4">
          <input
            type="checkbox"
            checked={form.consentAccepted}
            onChange={(event) => setField('consentAccepted', event.target.checked)}
            className="mt-1"
          />
          <span className="text-sm leading-7 text-[var(--shell-ink-soft)]">
            I understand this gate exists only before the first real Apply, and saving here returns me to the original dossier.
          </span>
        </label>
        {errors.consentAccepted ? (
          <span className="block text-xs text-[var(--shell-error)]">{errors.consentAccepted}</span>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <CTAButton variant="secondary" onClick={onClose}>Cancel</CTAButton>
          <CTAButton onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Saving…' : 'Save and Return to Specimen'}
          </CTAButton>
        </div>
      </div>
    </DialogPrimitive>
  );
};
