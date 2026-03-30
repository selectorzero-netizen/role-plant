import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { readLoginReturnContext, resolvePostLoginTarget } from '../auth/returnPath';
import { ROUTES } from '../config/siteRoutes';
import { CTAButton, EmptyStatePanel, InlineNotice, StatusPill } from '../primitives/FeedbackPrimitives';
import { PageContainer, PageHeroSkeleton, PlaceholderFrame, SectionWrapper } from '../primitives/LayoutPrimitives';
import { SegmentedNav } from '../primitives/NavigationPrimitives';

const PlaceholderGrid: React.FC<{ labels: string[] }> = ({ labels }) => (
  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {labels.map((label) => (
      <PlaceholderFrame key={label} label={label} ratio="4/3" />
    ))}
  </div>
);

export const HomeShellPage: React.FC = () => (
  <>
    <PageHeroSkeleton
      eyebrow="Batch A Shell"
      title="Home route shell"
      description="This shell only establishes module slots, route ownership, and shared layout. Static content will be integrated in Batch B."
      primaryAction={<CTAButton to={ROUTES.selection}>Selection</CTAButton>}
      secondaryAction={<CTAButton to={ROUTES.standards} variant="secondary">Standards</CTAButton>}
    />
    <SectionWrapper title="Home modules" description="The route shell keeps these slots ready without shipping final content.">
      <PlaceholderGrid labels={['Hero', 'What We Frame', 'Current Batch Preview', 'Standards Preview', 'Cultivation Preview', 'Membership Preview', 'Support Preview']} />
    </SectionWrapper>
  </>
);

export const SelectionShellPage: React.FC<{ archive?: boolean }> = ({ archive = false }) => (
  <>
    <PageHeroSkeleton
      eyebrow="Batch A Shell"
      title={archive ? 'Selection archive shell' : 'Selection list shell'}
      description="Batch A only sets the route shell, legend slot, filter rail, and dossier entry pattern."
      primaryAction={<CTAButton to={archive ? ROUTES.selection : ROUTES.selectionArchive}>{archive ? 'Back to Current' : 'View Archive'}</CTAButton>}
      secondaryAction={<CTAButton to={ROUTES.selection} variant="secondary">Selection</CTAButton>}
    />
    <SectionWrapper title="Selection controls" description="The card wall remains a shell. Cards only lead to dossiers in later batches.">
      <div className="mb-6">
        <SegmentedNav
          items={[
            { label: 'Current', value: 'current' },
            { label: 'Archive', value: 'archive' },
          ]}
          activeValue={archive ? 'archive' : 'current'}
        />
      </div>
      <PlaceholderGrid labels={['Batch Intro', 'Legend', 'Filter Bar', 'Card Grid', 'Archive CTA']} />
    </SectionWrapper>
  </>
);

export const SelectionDossierShellPage: React.FC = () => {
  const { slug } = useParams();

  return (
    <>
      <PageHeroSkeleton
        eyebrow="Batch A Shell"
        title="Specimen dossier shell"
        description={`This shell reserves gallery, reading focus, state record, and action module structure for ${slug || 'specimen'}.`}
        primaryAction={<CTAButton to={ROUTES.login}>Start with Google</CTAButton>}
        secondaryAction={<CTAButton to={ROUTES.support} variant="secondary">Support</CTAButton>}
      />
      <SectionWrapper title="Dossier structure" description="The page shell is ready for gallery, summary, reading focus, and action states.">
        <div className="mb-6 flex flex-wrap gap-3">
          <StatusPill tone="current">Current</StatusPill>
          <StatusPill tone="observation">Observation</StatusPill>
          <StatusPill tone="archived">Archived</StatusPill>
        </div>
        <PlaceholderGrid labels={['Top Meta + Return', 'Hero Gallery', 'Specimen Summary', 'Reading Focus', 'State Record', 'Action Module', 'Care / Transaction Note']} />
      </SectionWrapper>
    </>
  );
};

export const StandardsShellPage: React.FC = () => (
  <>
    <PageHeroSkeleton
      eyebrow="Batch A Shell"
      title="Standards route shell"
      description="Batch A only wires the route and layout skeleton for the standards mother page."
      primaryAction={<CTAButton to={ROUTES.cultivation}>Cultivation</CTAButton>}
      secondaryAction={<CTAButton to={ROUTES.selection} variant="secondary">Selection</CTAButton>}
    />
    <SectionWrapper title="Standards modules" description="The page skeleton keeps the reading-logic sections in place.">
      <PlaceholderGrid labels={['What We See', 'What We Keep / Reject', 'How We Read a Specimen', 'Why Standards Matter', 'Closing CTA']} />
    </SectionWrapper>
  </>
);

export const CultivationShellPage: React.FC = () => (
  <>
    <PageHeroSkeleton
      eyebrow="Batch A Shell"
      title="Cultivation route shell"
      description="Batch A only reserves the rhythm, water, root, and mistake sections for later static content implementation."
      primaryAction={<CTAButton to={ROUTES.selection}>Selection</CTAButton>}
      secondaryAction={<CTAButton to={ROUTES.support} variant="secondary">Support</CTAButton>}
    />
    <SectionWrapper title="Cultivation modules" description="No final copy yet—only structure, spacing, and CTA ownership.">
      <PlaceholderGrid labels={['Seasonal Rhythm', 'Water / Temperature', 'Space / Pot / Root', 'Common Mistakes', 'Closing CTA']} />
    </SectionWrapper>
  </>
);

export const MembershipShellPage: React.FC = () => {
  const { userProfile } = useAuth();
  const primaryAction = userProfile ? (
    <CTAButton to={ROUTES.account}>Continue to Account</CTAButton>
  ) : (
    <CTAButton to={ROUTES.login}>Start with Google</CTAButton>
  );

  return (
    <>
      <PageHeroSkeleton
        eyebrow="Batch A Shell"
        title="Membership route shell"
        description="Batch A only anchors the public membership explanation page and its CTA slots. Full CTA state validation lands in later flow batches."
        primaryAction={primaryAction}
        secondaryAction={<CTAButton to={ROUTES.selection} variant="secondary">Selection</CTAButton>}
      />
      <SectionWrapper title="Membership modules" description="These slots stay static in Batch A. They do not validate account flow yet.">
        <PlaceholderGrid labels={['Why an Account Exists', 'What Happens First Time', 'What Membership Is Not', 'Flow Timeline', 'Closing CTA']} />
      </SectionWrapper>
    </>
  );
};

export const SupportShellPage: React.FC = () => {
  const { userProfile } = useAuth();
  const accountBoundAction = userProfile ? (
    <CTAButton to={ROUTES.account}>Continue to Account</CTAButton>
  ) : (
    <CTAButton to={ROUTES.login}>Start with Google</CTAButton>
  );

  return (
    <>
      <PageHeroSkeleton
        eyebrow="Batch A Shell"
        title="Support route shell"
        description="Batch A only anchors FAQ, public contact, and account-bound support split at the shell level."
        primaryAction={<CTAButton to={ROUTES.support}>Support</CTAButton>}
        secondaryAction={<CTAButton to={ROUTES.story} variant="secondary">Story</CTAButton>}
      />
      <SectionWrapper title="Support modules" description="Public support stays here. Bound support keeps its future handoff to application detail.">
        <div className="grid gap-5 md:grid-cols-2">
          <PlaceholderFrame label="FAQ Categories" ratio="4/3" />
          <PlaceholderFrame label="Public Contact Entry" ratio="4/3" />
        </div>
        <div className="mt-6">
          <InlineNotice
            tone="warning"
            title="Account-bound support stays out of public contact"
            body="This shell only reserves the split. Real account-bound support remains for later flow implementation."
          >
            {accountBoundAction}
          </InlineNotice>
        </div>
      </SectionWrapper>
    </>
  );
};

export const StoryShellPage: React.FC = () => (
  <>
    <PageHeroSkeleton
      eyebrow="Batch A Shell"
      title="Story route shell"
      description="Batch A only preserves the route, shell, and longform section order for Story."
      primaryAction={<CTAButton to={ROUTES.standards}>Standards</CTAButton>}
      secondaryAction={<CTAButton to={ROUTES.selection} variant="secondary">Selection</CTAButton>}
    />
    <SectionWrapper title="Story modules" description="Story remains a static companion page, not a journal system.">
      <PlaceholderGrid labels={['Why This Plant', 'What We Frame', 'From Selection to Cultivation', 'What This Brand Will Become', 'Closing CTA']} />
    </SectionWrapper>
  </>
);

export const LoginShellPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, userProfile, isAuthReady, authError } = useAuth();
  const returnContext = readLoginReturnContext(location.state);
  const target = resolvePostLoginTarget(returnContext);

  useEffect(() => {
    if (isAuthReady && userProfile) {
      navigate(target, { replace: true });
    }
  }, [isAuthReady, userProfile, target, navigate]);

  return (
    <>
      <PageHeroSkeleton
        eyebrow="Batch A Shell"
        title="Login gateway shell"
        description="Batch A only proves that login exists as a route shell and can carry return-path context."
        primaryAction={<CTAButton onClick={() => { void login(); }}>Start with Google</CTAButton>}
        secondaryAction={<CTAButton to={ROUTES.membership} variant="secondary">Membership</CTAButton>}
      />
      <SectionWrapper title="Return-path context" description="This shell shows whether origin, intent, and targets can be carried through the gateway.">
        <div className="grid gap-5 md:grid-cols-2">
          <InlineNotice title="Origin Route" body={returnContext?.originRoute || 'No origin route provided.'} />
          <InlineNotice title="Intent" body={returnContext?.intent || 'No intent provided.'} />
          <InlineNotice title="Specimen Slug" body={returnContext?.specimenSlug || 'Not applicable for this entry.'} />
          <InlineNotice title="Application ID" body={returnContext?.applicationId || 'Not applicable for this entry.'} />
        </div>
        {authError ? (
          <div className="mt-6">
            <InlineNotice tone="error" title="Auth error" body={authError} />
          </div>
        ) : null}
      </SectionWrapper>
    </>
  );
};

export const AccountOverviewShellPage: React.FC = () => (
  <>
    <PageHeroSkeleton
      eyebrow="Batch A Shell"
      title="Account overview shell"
      description="Batch A only sets the protected account surface, tabs, and empty-state ownership. Real data and flow logic land later."
      primaryAction={<CTAButton to={ROUTES.selection}>Selection</CTAButton>}
      secondaryAction={<CTAButton to={ROUTES.support} variant="secondary">Support</CTAButton>}
    />
    <SectionWrapper title="Account overview modules" description="This shell reserves the tool-layer entry points without implementing data flows yet.">
      <PlaceholderGrid labels={['Account Header', 'Quick Status Summary', 'Following Entry', 'Applications Entry', 'Support Entry', 'Profile Prompt']} />
    </SectionWrapper>
  </>
);

export const ApplicationDetailShellPage: React.FC = () => {
  const { id } = useParams();

  return (
    <>
      <PageHeroSkeleton
        eyebrow="Batch A Shell"
        title="Application detail shell"
        description={`Batch A only reserves the route and section order for application ${id || 'detail'}.`}
        primaryAction={<CTAButton to={ROUTES.account}>Account</CTAButton>}
        secondaryAction={<CTAButton to={ROUTES.support} variant="secondary">Support</CTAButton>}
      />
      <SectionWrapper title="Application detail modules" description="Timeline, current action, specimen recap, and bound support stay as placeholders in Batch A.">
        <PlaceholderGrid labels={['Top Meta', 'Status Timeline', 'Current Action Block', 'Specimen Recap', 'Order / Aftercare Notes', 'Bound Support Entry']} />
      </SectionWrapper>
    </>
  );
};

export const LegacyRetiredPage: React.FC<{
  legacyPath: string;
  replacementTo: string;
  replacementLabel: string;
}> = ({ legacyPath, replacementTo, replacementLabel }) => (
  <>
    <PageHeroSkeleton
      eyebrow="Legacy Route Retired"
      title={`${legacyPath} is retired`}
      description="This route no longer owns the active frontend. The new shell keeps it isolated so old IA cannot steer new work."
      primaryAction={<CTAButton to={replacementTo}>{replacementLabel}</CTAButton>}
      secondaryAction={<CTAButton to={ROUTES.home} variant="secondary">Home</CTAButton>}
    />
    <SectionWrapper>
      <EmptyStatePanel
        title="Legacy route isolated"
        body="This placeholder exists only to stop old routes from silently steering the new frontend shell."
      />
    </SectionWrapper>
  </>
);
