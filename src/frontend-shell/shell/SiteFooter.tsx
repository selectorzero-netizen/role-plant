import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { PUBLIC_NAV_ITEMS, ROUTES } from '../config/siteRoutes';
import { CTAButton } from '../primitives/FeedbackPrimitives';
import { PageContainer } from '../primitives/LayoutPrimitives';

export const SiteFooter: React.FC = () => {
  const { userProfile } = useAuth();
  const accountEntry = userProfile
    ? { label: 'Continue to Account', to: ROUTES.account }
    : { label: 'Start with Google', to: ROUTES.login };

  return (
    <footer className="border-t border-[var(--shell-border)] bg-[var(--shell-paper-strong)] py-10">
      <PageContainer className="grid gap-8 md:grid-cols-[1fr_1fr]">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--shell-oxide)]">龜甲龍</p>
          <p className="mt-3 max-w-[520px] text-sm leading-7 text-[var(--shell-ink-soft)]">
            以龜甲龍為核心的前台入口，先提供品牌、選擇與方法的基本閱讀路徑。
          </p>
        </div>

        <div className="grid gap-3 md:justify-self-end md:text-right">
          {PUBLIC_NAV_ITEMS.map((item) => (
            <Link key={item.to} to={item.to} className="text-[11px] uppercase tracking-[0.22em] text-[var(--shell-ink-soft)] hover:text-[var(--shell-ink)]">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="md:col-span-2 md:flex md:justify-end">
          <CTAButton to={accountEntry.to} variant="secondary" size="sm">
            {accountEntry.label}
          </CTAButton>
        </div>
      </PageContainer>
    </footer>
  );
};
