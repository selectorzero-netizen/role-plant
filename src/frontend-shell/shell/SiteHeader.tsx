import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { PUBLIC_NAV_ITEMS, ROUTES } from '../config/siteRoutes';
import { CTAButton } from '../primitives/FeedbackPrimitives';
import { PageContainer } from '../primitives/LayoutPrimitives';
import { cx } from '../primitives/cx';
import { MobileNavSheet } from './MobileNavSheet';

export const SiteHeader: React.FC = () => {
  const { userProfile } = useAuth();
  const accountEntry = userProfile
    ? { label: 'Continue to Account', to: ROUTES.account }
    : { label: 'Start with Google', to: ROUTES.login };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--shell-border)] bg-[color:var(--shell-paper)]/95 backdrop-blur">
      <PageContainer className="flex h-16 items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-5">
          <Link to={ROUTES.home} className="shrink-0 text-sm uppercase tracking-[0.28em] text-[var(--shell-ink)]">
            龜甲龍
          </Link>

          <nav className="hidden lg:flex items-center gap-5">
            {PUBLIC_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cx(
                    'text-[11px] uppercase tracking-[0.22em] transition-colors',
                    isActive ? 'text-[var(--shell-ink)]' : 'text-[var(--shell-ink-soft)] hover:text-[var(--shell-ink)]'
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <CTAButton to={accountEntry.to} variant="secondary" size="sm">
            {accountEntry.label}
          </CTAButton>
        </div>

        <div className="lg:hidden">
          <MobileNavSheet />
        </div>
      </PageContainer>
    </header>
  );
};
