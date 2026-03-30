import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import {
  APPLICATION_DISPLAY_ORDER,
  getApplicationDetail,
  getApplicationPrimaryLabel,
  getDisplayStatusTone,
  getUserProfileSnapshot,
  isApplyGateComplete,
  listUserApplications,
  listUserFavorites,
  removeFavoriteById,
  type FlowApplicationRecord,
  type FlowFavoriteRecord,
  type FlowInquiryRecord,
  type FlowProfile,
} from '../data/accountReadModel';
import { listSelectionPlants, type SelectionPlantRecord } from '../data/selectionReadModel';
import { ROUTES } from '../config/siteRoutes';
import {
  CTAButton,
  EmptyStatePanel,
  InlineNotice,
  StatusPill,
} from '../primitives/FeedbackPrimitives';
import { PageHeroSkeleton, SectionWrapper } from '../primitives/LayoutPrimitives';
import { SegmentedNav } from '../primitives/NavigationPrimitives';
import { useToast } from '../providers/ToastProvider';

// BATCH_C2_ACCOUNT_PAGES
type AccountTab = 'overview' | 'following' | 'applications' | 'profile';

function resolvePlantFromFavorite(
  favorite: FlowFavoriteRecord,
  items: SelectionPlantRecord[]
): SelectionPlantRecord | null {
  return (
    items.find((item) =>
      [item.id, item.slug, item.specimenId].includes(favorite.plantId || favorite.specimenSlug || favorite.specimenId || '')
    ) || null
  );
}

function resolvePlantFromApplication(
  application: FlowApplicationRecord,
  items: SelectionPlantRecord[]
): SelectionPlantRecord | null {
  return (
    items.find((item) =>
      [item.id, item.slug, item.specimenId].includes(application.plantId || application.specimenSlug || application.specimenId || '')
    ) || null
  );
}

const InfoCard: React.FC<{ title: string; body: string }> = ({ title, body }) => (
  <div className="rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-5 py-5">
    <h3 className="text-lg font-medium text-[var(--shell-ink)]">{title}</h3>
    <p className="mt-3 text-sm leading-7 text-[var(--shell-ink-soft)]">{body}</p>
  </div>
);

const SectionTabs: React.FC<{
  value: AccountTab;
  onChange: (next: AccountTab) => void;
}> = ({ value, onChange }) => (
  <SegmentedNav
    items={[
      { label: 'Overview', value: 'overview' },
      { label: 'Following', value: 'following' },
      { label: 'Applications', value: 'applications' },
      { label: 'Profile', value: 'profile' },
    ]}
    activeValue={value}
    onSelect={(next) => onChange(next as AccountTab)}
  />
);

export const AccountPage: React.FC = () => {
  const { userProfile } = useAuth() as any;
  const { pushToast } = useToast();

  const [tab, setTab] = useState<AccountTab>('overview');
  const [profile, setProfile] = useState<FlowProfile | null>(null);
  const [favorites, setFavorites] = useState<FlowFavoriteRecord[]>([]);
  const [applications, setApplications] = useState<FlowApplicationRecord[]>([]);
  const [plants, setPlants] = useState<SelectionPlantRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    if (!userProfile) return;
    setLoading(true);
    setError(null);

    try {
      const [profileSnapshot, favoriteRows, applicationRows, selectionItems] = await Promise.all([
        getUserProfileSnapshot(userProfile),
        listUserFavorites(userProfile),
        listUserApplications(userProfile),
        listSelectionPlants(),
      ]);

      setProfile(profileSnapshot);
      setFavorites(favoriteRows);
      setApplications(applicationRows);
      setPlants(selectionItems);
    } catch {
      setError('Unable to read account state from the current baseline.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, [userProfile]);

  const mergedFavorites = useMemo(
    () =>
      favorites.map((favorite) => ({
        favorite,
        plant: resolvePlantFromFavorite(favorite, plants),
      })),
    [favorites, plants]
  );

  const mergedApplications = useMemo(
    () =>
      applications.map((application) => ({
        application,
        plant: resolvePlantFromApplication(application, plants),
      })),
    [applications, plants]
  );

  const handleRemoveFavorite = async (favoriteId: string) => {
    await removeFavoriteById(favoriteId);
    pushToast({
      title: 'Removed from following',
      description: 'The specimen has been removed from your following list.',
    });
    await refresh();
  };

  return (
    <>
      <PageHeroSkeleton
        eyebrow="Account"
        title="Your Account"
        description="This page is a tool layer. It is not a public membership page, and it is not the old member center under a new name."
        primaryAction={<CTAButton to={ROUTES.selection}>Selection</CTAButton>}
        secondaryAction={<CTAButton to={ROUTES.membership} variant="secondary">Membership</CTAButton>}
      />

      <SectionWrapper title="Account Navigation" description="Batch C2 validates that the account surface can split into clear tool areas.">
        <SectionTabs value={tab} onChange={setTab} />
      </SectionWrapper>

      {loading ? (
        <SectionWrapper title="Loading account state">
          <InlineNotice title="Loading account state" body="Checking profile, following, and applications." />
        </SectionWrapper>
      ) : error ? (
        <SectionWrapper title="Account state error">
          <InlineNotice tone="error" title="Unable to load account" body={error} />
        </SectionWrapper>
      ) : tab === 'overview' ? (
        <>
          <SectionWrapper title="Overview">
            <div className="grid gap-5 md:grid-cols-4">
              <InfoCard title="Following" body={`${favorites.length} item(s)`} />
              <InfoCard title="Applications" body={`${applications.length} record(s)`} />
              <InfoCard title="Profile" body={isApplyGateComplete(profile) ? 'Apply gate complete' : 'Apply gate incomplete'} />
              <InfoCard title="Support" body="Batch C2 only places the account-bound support slot here. True support split remains for C3." />
            </div>
          </SectionWrapper>

          <SectionWrapper title="Entry Cards" tone="muted">
            <div className="grid gap-5 md:grid-cols-3">
              <InfoCard title="Following" body="Track the specimens you chose to keep in view." />
              <InfoCard title="Applications" body="Review every application and its current lifecycle stage." />
              <InfoCard title="Profile" body="Keep the minimum apply profile readable and editable." />
            </div>
          </SectionWrapper>

          <SectionWrapper title="Account-bound support note">
            <InlineNotice
              tone="warning"
              title="Support flow remains deferred"
              body="Batch C2 proves the account-bound support slot exists, but public support and final split rules stay deferred to C3."
            />
          </SectionWrapper>
        </>
      ) : tab === 'following' ? (
        <SectionWrapper title="Following">
          {mergedFavorites.length === 0 ? (
            <EmptyStatePanel
              title="No followed specimens yet"
              body="Following stays part of account, but it should never become the same thing as applications."
              action={<CTAButton to={ROUTES.selection}>Back to Selection</CTAButton>}
            />
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {mergedFavorites.map(({ favorite, plant }) => (
                <div key={favorite.id} className="rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-5 py-5">
                  <div className="flex flex-wrap gap-3">
                    <StatusPill tone={plant ? (plant.availability === 'archived' ? 'archived' : plant.availability === 'observation' ? 'observation' : 'current') : 'default'}>
                      {plant ? plant.availability : 'Record'}
                    </StatusPill>
                    {plant ? <StatusPill>{plant.stage}</StatusPill> : null}
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-[var(--shell-oxide)]">{favorite.specimenId || plant?.specimenId || favorite.id}</p>
                  <h3 className="mt-2 text-lg font-medium text-[var(--shell-ink)]">{plant?.title || favorite.title || 'Followed specimen'}</h3>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {plant ? <CTAButton to={`/selection/${plant.slug}`}>View Dossier</CTAButton> : null}
                    <CTAButton variant="secondary" onClick={() => { void handleRemoveFavorite(favorite.id); }}>
                      Remove from Following
                    </CTAButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      ) : tab === 'applications' ? (
        <SectionWrapper title="Applications">
          {mergedApplications.length === 0 ? (
            <EmptyStatePanel
              title="No applications yet"
              body="Applications stay separate from Following. They represent real dossier actions that entered the lifecycle."
              action={<CTAButton to={ROUTES.selection}>Back to Selection</CTAButton>}
            />
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {mergedApplications.map(({ application, plant }) => (
                <div key={application.id} className="rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-5 py-5">
                  <div className="flex flex-wrap gap-3">
                    <StatusPill tone={getDisplayStatusTone(application.displayStatus)}>{application.displayStatus}</StatusPill>
                    {plant ? <StatusPill>{plant.stage}</StatusPill> : null}
                  </div>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-[var(--shell-oxide)]">{application.specimenId || application.id}</p>
                  <h3 className="mt-2 text-lg font-medium text-[var(--shell-ink)]">{application.plantTitle || plant?.title || 'Application record'}</h3>
                  <div className="mt-6">
                    <CTAButton to={`/account/applications/${application.id}`}>
                      {getApplicationPrimaryLabel(application.displayStatus)}
                    </CTAButton>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      ) : (
        <SectionWrapper title="Profile">
          <div className="grid gap-5 md:grid-cols-2">
            <InfoCard title="Name" body={profile?.name || 'Missing'} />
            <InfoCard title="Email" body={profile?.email || 'Missing'} />
            <InfoCard title="Phone" body={profile?.phone || 'Missing'} />
            <InfoCard title="Region" body={profile?.region || 'Missing'} />
            <InfoCard title="Grow Environment" body={profile?.growEnvironment || 'Missing'} />
            <InfoCard title="Experience Level" body={profile?.experienceLevel || 'Missing'} />
          </div>
          <div className="mt-6">
            <InlineNotice
              title={isApplyGateComplete(profile) ? 'Apply gate complete' : 'Apply gate incomplete'}
              body="Batch C2 reads and displays profile readiness. Full profile editing beyond the first apply gate remains outside this batch."
            />
          </div>
        </SectionWrapper>
      )}
    </>
  );
};

export const ApplicationDetailPage: React.FC = () => {
  const { userProfile } = useAuth() as any;
  const { id = '' } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [application, setApplication] = useState<FlowApplicationRecord | null>(null);
  const [messages, setMessages] = useState<FlowInquiryRecord[]>([]);
  const [plants, setPlants] = useState<SelectionPlantRecord[]>([]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    Promise.all([getApplicationDetail(userProfile, id), listSelectionPlants()])
      .then(([detail, selectionItems]) => {
        if (!active) return;
        setApplication(detail.application);
        setMessages(detail.messages);
        setPlants(selectionItems);
      })
      .catch(() => {
        if (!active) return;
        setError('Unable to resolve application detail from the current baseline.');
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [userProfile, id]);

  const plant = useMemo(
    () => (application ? resolvePlantFromApplication(application, plants) : null),
    [application, plants]
  );

  if (loading) {
    return (
      <>
        <PageHeroSkeleton
          eyebrow="Application Detail"
          title="Loading application detail…"
          description="Checking the current lifecycle state."
          primaryAction={<CTAButton to={ROUTES.account}>Back to Account</CTAButton>}
        />
        <SectionWrapper title="Timeline">
          <InlineNotice title="Loading timeline" body="Please wait while the application detail is resolved." />
        </SectionWrapper>
      </>
    );
  }

  if (error || !application) {
    return (
      <>
        <PageHeroSkeleton
          eyebrow="Application Detail"
          title="Application detail unavailable"
          description="This application could not be resolved for the current user."
          primaryAction={<CTAButton to={ROUTES.account}>Back to Account</CTAButton>}
        />
        <SectionWrapper>
          <InlineNotice tone="error" title="Detail unavailable" body={error || 'No application matched this ID.'} />
        </SectionWrapper>
      </>
    );
  }

  const currentIndex = APPLICATION_DISPLAY_ORDER.indexOf(application.displayStatus);

  return (
    <>
      <PageHeroSkeleton
        eyebrow="Application Detail"
        title={application.plantTitle || plant?.title || 'Application detail'}
        description="This page is the core account-bound record for a single application."
        primaryAction={<CTAButton to={ROUTES.account}>Back to Account</CTAButton>}
        secondaryAction={plant ? <CTAButton to={`/selection/${plant.slug}`} variant="secondary">Back to Dossier</CTAButton> : undefined}
      />

      <SectionWrapper title="Application summary">
        <div className="grid gap-5 md:grid-cols-4">
          <InfoCard title="Application ID" body={application.id} />
          <InfoCard title="Specimen ID" body={application.specimenId || 'Pending'} />
          <InfoCard title="Status" body={application.displayStatus} />
          <InfoCard title="Plant" body={application.plantTitle || plant?.title || 'Pending'} />
        </div>
      </SectionWrapper>

      <SectionWrapper title="Timeline" tone="muted">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {APPLICATION_DISPLAY_ORDER.map((status, index) => (
            <div key={status} className="rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-4 py-4">
              <StatusPill tone={index <= currentIndex ? getDisplayStatusTone(status) : 'default'}>{status}</StatusPill>
              <p className="mt-3 text-sm leading-7 text-[var(--shell-ink-soft)]">
                {index === currentIndex ? 'Current state' : index < currentIndex ? 'Completed' : 'Upcoming'}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper title="Message / communication log">
        {messages.length === 0 ? (
          <EmptyStatePanel
            title="No communication log yet"
            body="The bound communication log exists as a section, but it may still be empty at this stage."
          />
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-5 py-5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--shell-oxide)]">{message.type || 'message'}</p>
                <h3 className="mt-2 text-base font-medium text-[var(--shell-ink)]">{message.subject || 'Message'}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--shell-ink-soft)]">{message.message || 'No message body.'}</p>
              </div>
            ))}
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper title="Payment instruction or report" tone="muted">
        <InlineNotice
          title="Payment section placeholder"
          body={
            application.displayStatus === 'Quoted'
              ? 'The next meaningful action is to review the quote. Payment integration itself stays outside C2.'
              : application.displayStatus === 'Paid' || application.displayStatus === 'Preparing'
              ? 'Payment has moved past the quote state. This section remains a readable placeholder until later operational integration.'
              : 'This section exists so the detail page can hold payment-related instruction or report once relevant.'
          }
        />
      </SectionWrapper>

      <SectionWrapper title="Shipping / aftercare note">
        <InlineNotice
          title="Shipping / aftercare placeholder"
          body={
            application.displayStatus === 'Shipped'
              ? 'Aftercare note becomes relevant here once shipment exists. C2 only proves the section is present.'
              : 'Shipping and aftercare stay visible as part of the lifecycle, but C2 does not implement final support split.'
          }
        />
      </SectionWrapper>

      <SectionWrapper title="Support escalation" tone="muted">
        <InlineNotice
          tone="warning"
          title="C3 owns the real support split"
          body="Batch C2 only proves that account-bound support belongs here. Public support and the final split remain deferred to Batch C3."
        />
      </SectionWrapper>
    </>
  );
};
