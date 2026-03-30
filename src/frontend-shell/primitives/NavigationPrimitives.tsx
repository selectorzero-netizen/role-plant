import React, { useMemo } from 'react';
import { cx } from './cx';

export type SegmentedItem = {
  label: string;
  value: string;
};

export const SegmentedNav: React.FC<{
  items: SegmentedItem[];
  activeValue: string;
  onSelect?: (value: string) => void;
}> = ({ items, activeValue, onSelect }) => (
  <div className="inline-flex flex-wrap rounded-full border border-[var(--shell-border)] bg-[var(--shell-panel)] p-1">
    {items.map((item) => (
      <button
        key={item.value}
        type="button"
        onClick={() => onSelect?.(item.value)}
        className={cx(
          'rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors',
          activeValue === item.value
            ? 'bg-[var(--shell-ink)] text-white'
            : 'text-[var(--shell-ink-soft)] hover:bg-[var(--shell-paper-strong)]'
        )}
      >
        {item.label}
      </button>
    ))}
  </div>
);

export const AccordionPrimitive: React.FC<{
  items: Array<{ title: string; body: string }>;
}> = ({ items }) => (
  <div className="space-y-3">
    {items.map((item) => (
      <details key={item.title} className="rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-5 py-4">
        <summary className="cursor-pointer list-none text-sm font-medium text-[var(--shell-ink)]">
          {item.title}
        </summary>
        <p className="mt-3 text-sm leading-7 text-[var(--shell-ink-soft)]">{item.body}</p>
      </details>
    ))}
  </div>
);

type SurfaceProps = {
  open: boolean;
  title?: string;
  onClose?: () => void;
  children: React.ReactNode;
};

export const DialogPrimitive: React.FC<SurfaceProps> = ({ open, title, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center px-4">
      <button type="button" aria-label="Close dialog overlay" className="absolute inset-0 bg-black/35" onClick={onClose} />
      <div className="relative z-[91] w-full max-w-[560px] rounded-3xl border border-[var(--shell-border)] bg-[var(--shell-paper)] p-6 shadow-xl">
        {title ? <p className="mb-4 text-sm font-medium text-[var(--shell-ink)]">{title}</p> : null}
        {children}
      </div>
    </div>
  );
};

export const SheetPrimitive: React.FC<SurfaceProps & { side?: 'right' | 'bottom' }> = ({
  open,
  title,
  onClose,
  side = 'right',
  children,
}) => {
  if (!open) return null;

  const panelClass = useMemo(
    () =>
      side === 'bottom'
        ? 'fixed inset-x-0 bottom-0 rounded-t-3xl'
        : 'fixed inset-y-0 right-0 h-full w-full max-w-[420px] rounded-l-3xl',
    [side]
  );

  return (
    <div className="fixed inset-0 z-[90]">
      <button type="button" aria-label="Close sheet overlay" className="absolute inset-0 bg-black/35" onClick={onClose} />
      <div className={cx(panelClass, 'z-[91] border border-[var(--shell-border)] bg-[var(--shell-paper)] p-6 shadow-xl')}>
        <div className="mb-5 flex items-center justify-between gap-4">
          {title ? <p className="text-sm font-medium text-[var(--shell-ink)]">{title}</p> : <span />}
          <button type="button" onClick={onClose} className="text-[10px] uppercase tracking-[0.22em] text-[var(--shell-ink-soft)]">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
