import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { createLoginReturnContext, type LoginIntent } from '../auth/returnPath';
import { ROUTES } from '../config/siteRoutes';
import { InlineNotice } from '../primitives/FeedbackPrimitives';
import { PageContainer } from '../primitives/LayoutPrimitives';

type ProtectedAppRouteProps = {
  children: React.ReactNode;
  intent: LoginIntent;
  specimenSlug?: string;
  applicationId?: string;
  postLoginTarget?: string;
};

export const ProtectedAppRoute: React.FC<ProtectedAppRouteProps> = ({
  children,
  intent,
  specimenSlug,
  applicationId,
  postLoginTarget,
}) => {
  const location = useLocation();
  const { userProfile, isAuthReady, authError } = useAuth();

  if (!isAuthReady) {
    return (
      <PageContainer className="py-16">
        <InlineNotice title="Loading access…" body="Batch A only checks the guard structure here." />
      </PageContainer>
    );
  }

  if (authError) {
    return (
      <PageContainer className="py-16">
        <InlineNotice tone="error" title="Auth error" body="The guard could not confirm access." />
      </PageContainer>
    );
  }

  if (!userProfile) {
    const origin = `${location.pathname}${location.search}`;
    return (
      <Navigate
        to={ROUTES.login}
        replace
        state={{
          returnContext: createLoginReturnContext({
            originRoute: origin,
            intent,
            specimenSlug,
            applicationId,
            postLoginTarget: postLoginTarget ?? origin,
          }),
        }}
      />
    );
  }

  return <>{children}</>;
};

type AdminProtectedRouteProps = {
  children: React.ReactNode;
  requireRoles?: string[];
};

export const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({
  children,
  requireRoles = ['admin'],
}) => {
  const location = useLocation();
  const { userProfile, isAuthReady, authError } = useAuth();

  if (!isAuthReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F7F5] text-sm tracking-[0.22em] uppercase">
        Checking Admin Access…
      </div>
    );
  }

  if (authError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F7F5] px-6">
        <div className="max-w-xl">
          <InlineNotice tone="error" title="Admin auth error" body="Unable to confirm admin access." />
        </div>
      </div>
    );
  }

  if (!userProfile) {
    const origin = `${location.pathname}${location.search}`;
    return (
      <Navigate
        to={ROUTES.login}
        replace
        state={{
          returnContext: createLoginReturnContext({
            originRoute: origin,
            intent: 'admin-access',
            postLoginTarget: origin,
          }),
        }}
      />
    );
  }

  const currentRole = userProfile.role || '';
  const hasRole = requireRoles.includes(currentRole) || currentRole === 'super_admin';

  if (!hasRole) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F7F5] px-6">
        <div className="max-w-xl">
          <InlineNotice
            tone="warning"
            title="Admin access required"
            body="This route stays reserved for the admin tool surface."
          />
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
