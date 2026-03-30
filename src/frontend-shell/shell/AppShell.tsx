import React from 'react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-[var(--shell-paper)] text-[var(--shell-ink)]">
    <SiteHeader />
    <main>{children}</main>
    <SiteFooter />
  </div>
);
