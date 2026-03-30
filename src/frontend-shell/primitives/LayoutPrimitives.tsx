import React from 'react';
import { cx } from './cx';

export const PageContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cx('mx-auto w-full max-w-[1200px] px-5 md:px-8', className)}>{children}</div>
);

export const SectionWrapper: React.FC<{
  children: React.ReactNode;
  title?: string;
  description?: string;
  tone?: 'light' | 'muted' | 'dark';
  className?: string;
}> = ({ children, title, description, tone = 'light', className }) => {
  const toneClass =
    tone === 'dark'
      ? 'bg-[var(--shell-soil)] text-[var(--shell-chalk)]'
      : tone === 'muted'
      ? 'bg-[var(--shell-clay)]'
      : 'bg-transparent';

  return (
    <section className={cx('py-16 md:py-24', toneClass, className)}>
      <PageContainer>
        {title || description ? (
          <div className="mb-8 md:mb-10 max-w-[680px]">
            {title ? (
              <h2 className="text-2xl md:text-4xl font-light tracking-tight">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-3 text-sm md:text-base leading-7 text-[var(--shell-ink-soft)] dark:text-[var(--shell-chalk-soft)]">
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
        {children}
      </PageContainer>
    </section>
  );
};

export const PageHeroSkeleton: React.FC<{
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: 'light' | 'dark';
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
}> = ({ eyebrow, title, description, tone = 'light', primaryAction, secondaryAction }) => {
  const sectionTone = tone === 'dark' ? 'bg-[var(--shell-soil)] text-[var(--shell-chalk)]' : 'bg-transparent';
  const descTone = tone === 'dark' ? 'text-[var(--shell-chalk-soft)]' : 'text-[var(--shell-ink-soft)]';

  return (
    <section className={cx('py-20 md:py-28', sectionTone)}>
      <PageContainer className="grid items-end gap-10 md:grid-cols-[1.2fr_0.8fr]">
        <div className="max-w-[760px]">
          {eyebrow ? (
            <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[var(--shell-oxide)]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-4xl md:text-6xl font-light tracking-tight">{title}</h1>
          {description ? (
            <p className={cx('mt-5 max-w-[620px] text-base md:text-lg leading-8', descTone)}>
              {description}
            </p>
          ) : null}
          {(primaryAction || secondaryAction) ? (
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {primaryAction}
              {secondaryAction}
            </div>
          ) : null}
        </div>
        <div className="hidden md:block">
          <div className="aspect-[16/9] rounded-2xl border border-[var(--shell-border)] bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(0,0,0,0.08))]" />
        </div>
      </PageContainer>
    </section>
  );
};

export const PlaceholderFrame: React.FC<{
  label: string;
  ratio?: string;
  note?: string;
}> = ({ label, ratio = '16/9', note }) => (
  <div
    className="rounded-2xl border border-dashed border-[var(--shell-border)] bg-[var(--shell-panel)] p-5"
    style={{ aspectRatio: ratio }}
  >
    <div className="flex h-full flex-col justify-between">
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--shell-oxide)]">Placeholder</p>
        <h3 className="mt-3 text-lg font-medium text-[var(--shell-ink)]">{label}</h3>
      </div>
      {note ? <p className="text-xs leading-6 text-[var(--shell-ink-soft)]">{note}</p> : null}
    </div>
  </div>
);
