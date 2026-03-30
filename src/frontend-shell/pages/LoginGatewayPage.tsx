import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { readLoginReturnContext, resolvePostLoginTarget } from '../auth/returnPath';
import { ROUTES } from '../config/siteRoutes';
import { CTAButton, InlineNotice } from '../primitives/FeedbackPrimitives';
import { PageHeroSkeleton, SectionWrapper } from '../primitives/LayoutPrimitives';

// BATCH_C2_LOGIN_GATEWAY
export const LoginGatewayPage: React.FC = () => {
  const auth = useAuth() as any;
  const userProfile = auth.userProfile;
  const isAuthReady = Boolean(auth.isAuthReady);
  const authError = auth.authError as string | undefined;
  const login = auth.login as (() => Promise<void>) | undefined;
  const retryInit = auth.retryInit as (() => void) | undefined;

  const location = useLocation();
  const navigate = useNavigate();
  const returnContext = readLoginReturnContext(location.state);
  const target = resolvePostLoginTarget(returnContext, ROUTES.account);

  useEffect(() => {
    if (isAuthReady && userProfile) {
      navigate(target, {
        replace: true,
        state: returnContext ? { returnContext } : undefined,
      });
    }
  }, [isAuthReady, userProfile, target, navigate, returnContext]);

  return (
    <>
      <PageHeroSkeleton
        eyebrow="Login"
        title="Start with Google"
        description="This gateway keeps your origin, intent, and target together so you can return to the right place after sign-in."
        primaryAction={
          <CTAButton onClick={() => { if (login) { void login(); } }}>
            Start with Google
          </CTAButton>
        }
        secondaryAction={<CTAButton to={ROUTES.membership} variant="secondary">Back to Membership</CTAButton>}
      />

      <SectionWrapper title="Return-path context" description="Batch C2 validates that login carries the right context forward.">
        <div className="grid gap-5 md:grid-cols-2">
          <InlineNotice title="Origin Route" body={returnContext?.originRoute || 'No origin route provided.'} />
          <InlineNotice title="Intent" body={returnContext?.intent || 'No intent provided.'} />
          <InlineNotice title="Specimen Slug" body={returnContext?.specimenSlug || 'Not applicable for this entry.'} />
          <InlineNotice title="Application ID" body={returnContext?.applicationId || 'Not applicable for this entry.'} />
        </div>

        <div className="mt-6">
          {!isAuthReady ? (
            <InlineNotice title="Checking auth state" body="Please wait while auth readiness is confirmed." />
          ) : authError ? (
            <InlineNotice
              tone="error"
              title="Sign-in error"
              body={authError}
            >
              {retryInit ? (
                <div className="mt-4">
                  <CTAButton onClick={() => retryInit()}>Retry</CTAButton>
                </div>
              ) : null}
            </InlineNotice>
          ) : (
            <InlineNotice
              title="Post-login target"
              body={`After successful sign-in, this gateway will return you to: ${target}`}
            />
          )}
        </div>
      </SectionWrapper>
    </>
  );
};
