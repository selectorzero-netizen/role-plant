import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { PUBLIC_NAV_ITEMS, ROUTES } from '../config/siteRoutes';
import { CTAButton } from '../primitives/FeedbackPrimitives';
import { SheetPrimitive } from '../primitives/NavigationPrimitives';
import { cx } from '../primitives/cx';

export const MobileNavSheet: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { userProfile } = useAuth();
  const accountEntry = userProfile
    ? { label: 'Continue to Account', to: ROUTES.account }
    : { label: 'Start with Google', to: ROUTES.login };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center justify-center rounded-full border border-[var(--shell-border)] px-4 text-[10px] uppercase tracking-[0.24em] text-[var(--shell-ink)]"
      >
        Menu
      </button>

      <SheetPrimitive open={open} onClose={() => setOpen(false)} title="Navigate" side="right">
        <div className="flex flex-col gap-4">
          {PUBLIC_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cx(
                  'rounded-2xl px-4 py-3 text-sm transition-colors',
                  isActive ? 'bg-[var(--shell-ink)] text-white' : 'bg-[var(--shell-panel)] text-[var(--shell-ink)]'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}

          <div className="pt-2">
            <CTAButton to={accountEntry.to} className="w-full" onClick={() => setOpen(false)}>
              {accountEntry.label}
            </CTAButton>
          </div>
        </div>
      </SheetPrimitive>
    </>
  );
};
