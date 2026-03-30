import React from 'react';
import { Link } from 'react-router-dom';
import { cx } from './cx';

type CTAButtonProps = {
  to?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const variantMap: Record<NonNullable<CTAButtonProps['variant']>, string> = {
  primary: 'bg-[var(--shell-ink)] text-white hover:bg-[var(--shell-moss)]',
  secondary: 'border border-[var(--shell-border)] bg-transparent text-[var(--shell-ink)] hover:bg-[var(--shell-paper-strong)]',
  ghost: 'text-[var(--shell-ink)] hover:bg-[var(--shell-paper-strong)]',
};

const sizeMap: Record<NonNullable<CTAButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-[11px]',
  md: 'px-6 py-3 text-xs',
};

export const CTAButton: React.FC<CTAButtonProps> = ({
  to,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  children,
  onClick,
}) => {
  const classes = cx(
    'inline-flex items-center justify-center gap-2 rounded-full uppercase tracking-[0.22em] transition-colors',
    variantMap[variant],
    sizeMap[size],
    disabled && 'cursor-not-allowed opacity-50 pointer-events-none',
    className
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
};

export const StatusPill: React.FC<{
  tone?: 'default' | 'current' | 'observation' | 'archived' | 'warning' | 'success' | 'error';
  children: React.ReactNode;
}> = ({ tone = 'default', children }) => {
  const toneClass =
    tone === 'current'
      ? 'bg-[#eef2e5] text-[var(--shell-moss)] border-[var(--shell-moss)]/30'
      : tone === 'observation'
      ? 'bg-[#f2eee6] text-[var(--shell-oxide)] border-[var(--shell-oxide)]/30'
      : tone === 'archived'
      ? 'bg-[#ece8e2] text-[#6f6a64] border-[#6f6a64]/25'
      : tone === 'warning'
      ? 'bg-[#f6efd9] text-[var(--shell-warning)] border-[var(--shell-warning)]/30'
      : tone === 'success'
      ? 'bg-[#eef2e5] text-[var(--shell-moss)] border-[var(--shell-moss)]/30'
      : tone === 'error'
      ? 'bg-[#f4e8e4] text-[var(--shell-error)] border-[var(--shell-error)]/30'
      : 'bg-[var(--shell-panel)] text-[var(--shell-ink)] border-[var(--shell-border)]';

  return (
    <span className={cx('inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.24em]', toneClass)}>
      {children}
    </span>
  );
};

export const InlineNotice: React.FC<{
  tone?: 'info' | 'warning' | 'error' | 'success';
  title: string;
  body?: string;
  children?: React.ReactNode;
}> = ({ tone = 'info', title, body, children }) => {
  const toneClass =
    tone === 'warning'
      ? 'border-[var(--shell-warning)]/40 bg-[#f8f2de]'
      : tone === 'error'
      ? 'border-[var(--shell-error)]/35 bg-[#f6ebe7]'
      : tone === 'success'
      ? 'border-[var(--shell-moss)]/35 bg-[#eef2e6]'
      : 'border-[var(--shell-border)] bg-[var(--shell-panel)]';

  return (
    <div className={cx('rounded-2xl border px-5 py-4', toneClass)}>
      <p className="text-sm font-medium text-[var(--shell-ink)]">{title}</p>
      {body ? <p className="mt-2 text-sm leading-7 text-[var(--shell-ink-soft)]">{body}</p> : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
};

export const EmptyStatePanel: React.FC<{
  title: string;
  body: string;
  action?: React.ReactNode;
}> = ({ title, body, action }) => (
  <div className="rounded-2xl border border-dashed border-[var(--shell-border)] bg-[var(--shell-panel)] px-6 py-8 text-center">
    <p className="text-lg font-medium text-[var(--shell-ink)]">{title}</p>
    <p className="mx-auto mt-3 max-w-[520px] text-sm leading-7 text-[var(--shell-ink-soft)]">{body}</p>
    {action ? <div className="mt-6">{action}</div> : null}
  </div>
);
