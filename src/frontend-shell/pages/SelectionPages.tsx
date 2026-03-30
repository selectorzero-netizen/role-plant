import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import {
  addFavoriteForSpecimen,
  createApplicationForSpecimen,
  createGateInitialValues,
  findActiveApplicationForSpecimen,
  findFavoriteForSpecimen,
  getUserProfileSnapshot,
  isApplyGateComplete,
  removeFavoriteForSpecimen,
  saveApplyGateProfile,
  type ApplyGateValues,
  type FlowApplicationRecord,
  type FlowFavoriteRecord,
  type FlowProfile,
} from '../data/accountReadModel';
import {
  CTAButton,
  EmptyStatePanel,
  InlineNotice,
  StatusPill,
} from '../primitives/FeedbackPrimitives';
import { useToast } from '../providers/ToastProvider';
import {
  PageContainer,
  PageHeroSkeleton,
  PlaceholderFrame,
  SectionWrapper,
} from '../primitives/LayoutPrimitives';
import { SegmentedNav } from '../primitives/NavigationPrimitives';
import { ROUTES } from '../config/siteRoutes';
import { createLoginReturnContext, readLoginReturnContext } from '../auth/returnPath';
import {
  type SelectionAvailability,
  type SelectionPlantRecord,
  getSelectionPlantBySlug,
  listSelectionPlants,
} from '../data/selectionReadModel';
import { FirstApplyGate } from '../flows/FirstApplyGate';

// BATCH_C1_SELECTION_LIST
// BATCH_C1_DOSSIER
// BATCH_C2_DOSSIER_FLOW
export const CARD_PRIMARY_CTA = 'View Dossier';

const availabilityToneMap: Record<SelectionAvailability, 'current' | 'observation' | 'archived'> = {
  current: 'current',
  observation: 'observation',
  archived: 'archived',
};

const availabilityLabelMap: Record<SelectionAvailability, string> = {
  current: 'Current',
  observation: 'Observation',
  archived: 'Archived',
};

const availabilityBodyMap: Record<SelectionAvailability, string> = {
  current: 'This specimen is part of the current viewing batch.',
  observation: 'This specimen is readable and follow-worthy, but not opened as a full current item.',
  archived: 'This specimen now lives as record, not as an active current batch item.',
};

function cardHref(slug: string) {
  return `/selection/${slug}`;
}

const ShotFrame: React.FC<{
  title: string;
  src?: string;
  ratio?: string;
  pendingLabel: string;
}> = ({ title, src, ratio = '4/5', pendingLabel }) => {
  const [broken, setBroken] = useState(false);

  if (src && !broken) {
    return (
      <div className="space-y-3">
        <div className="overflow-hidden rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)]" style={{ aspectRatio: ratio }}>
          <img
            src={src}
            alt={title}
            className="h-full w-full object-cover"
            onError={() => setBroken(true)}
          />
        </div>
        <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--shell-oxide)]">{title}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <PlaceholderFrame label={pendingLabel} ratio={ratio} note="This batch stays honest about missing shots." />
      <p className="text-[11px] uppercase tracking-[0.22em] text-[var(--shell-oxide)]">{title}</p>
    </div>
  );
};

const LegendCard: React.FC<{
  title: string;
  body: string;
  tone: 'current' | 'observation' | 'archived';
}> = ({ title, body, tone }) => (
  <div className="rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-5 py-5">
    <StatusPill tone={tone}>{title}</StatusPill>
    <p className="mt-4 text-sm leading-7 text-[var(--shell-ink-soft)]">{body}</p>
  </div>
);

const CopyCard: React.FC<{
  title: string;
  body: string;
}> = ({ title, body }) => (
  <div className="rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-5 py-5">
    <h3 className="text-lg font-medium text-[var(--shell-ink)]">{title}</h3>
    <p className="mt-3 text-sm leading-7 text-[var(--shell-ink-soft)]">{body}</p>
  </div>
);

const SelectionCard: React.FC<{
  item: SelectionPlantRecord;
}> = ({ item }) => (
  <article className="overflow-hidden rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)]">
    <div className="p-5">
      <ShotFrame
        title={`${item.title} cover`}
        src={item.coverImage}
        ratio="3/4"
        pendingLabel="SHOT PENDING / FULL BODY"
      />
    </div>

    <div className="border-t border-[var(--shell-border)] px-5 py-5">
      <div className="flex flex-wrap items-center gap-3">
        <StatusPill tone={availabilityToneMap[item.availability]}>
          {availabilityLabelMap[item.availability]}
        </StatusPill>
        <StatusPill>{item.stage}</StatusPill>
      </div>

      <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-[var(--shell-oxide)]">{item.specimenId}</p>
      <h3 className="mt-2 text-lg font-medium text-[var(--shell-ink)]">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[var(--shell-ink-soft)]">{item.summaryShort}</p>

      <div className="mt-6">
        <CTAButton to={cardHref(item.slug)}>{CARD_PRIMARY_CTA}</CTAButton>
      </div>
    </div>
  </article>
);

const SelectionLegend: React.FC = () => (
  <div className="grid gap-5 md:grid-cols-3">
    <LegendCard tone="current" title="Current" body={availabilityBodyMap.current} />
    <LegendCard tone="observation" title="Observation" body={availabilityBodyMap.observation} />
    <LegendCard tone="archived" title="Archived" body={availabilityBodyMap.archived} />
  </div>
);

type SelectionMode = 'current' | 'archive';
type CurrentStateFilter = 'all' | 'current' | 'observation';

const SelectionListScaffold: React.FC<{
  mode: SelectionMode;
}> = ({ mode }) => {
  const [items, setItems] = useState<SelectionPlantRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stateFilter, setStateFilter] = useState<CurrentStateFilter>('all');
  const [sortMode, setSortMode] = useState<'manual' | 'alpha'>('manual');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    listSelectionPlants()
      .then((rows) => {
        if (!active) return;
        setItems(rows);
      })
      .catch(() => {
        if (!active) return;
        setError('Unable to load plants from the accepted C1 baseline.');
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const visibleItems = useMemo(() => {
    const filteredByMode =
      mode === 'archive'
        ? items.filter((item) => item.availability === 'archived')
        : items.filter((item) => item.availability !== 'archived');

    const filteredByState =
      mode === 'archive' || stateFilter === 'all'
        ? filteredByMode
        : filteredByMode.filter((item) => item.availability === stateFilter);

    const sorted = [...filteredByState];

    if (sortMode === 'alpha') {
      sorted.sort((a, b) => a.specimenId.localeCompare(b.specimenId));
    }

    return sorted;
  }, [items, mode, stateFilter, sortMode]);

  const title = mode === 'archive' ? 'Selection Archive' : 'Selection';
  const description =
    mode === 'archive'
      ? 'Archive remains a real route. It keeps older specimens readable as record, not as active cards.'
      : 'The list only needs to help people read the batch and decide which specimen deserves a dossier view.';

  return (
    <>
      <PageHeroSkeleton
        eyebrow="Batch C1"
        title={title}
        description={description}
        primaryAction={
          mode === 'archive' ? (
            <CTAButton to={ROUTES.selection}>Back to Current Selection</CTAButton>
          ) : (
            <CTAButton to={ROUTES.selectionArchive}>View Archive</CTAButton>
          )
        }
        secondaryAction={<CTAButton to={ROUTES.home} variant="secondary">Home</CTAButton>}
      />

      <SectionWrapper title="Batch Intro" description="This section proves the route can carry a readable batch surface before any Follow / Apply flow is wired.">
        <div className="max-w-[720px]">
          <p className="text-sm md:text-base leading-8 text-[var(--shell-ink-soft)]">
            {mode === 'archive'
              ? 'Archive is a distinct route, not a fake tab. It keeps dossier reading intact while staying out of current interaction space.'
              : 'Current Selection holds Current and Observation items together, but the card layer still stays strictly dossier-first.'}
          </p>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Legend" description="Availability must be readable at the list layer before any deeper interaction exists.">
        <SelectionLegend />
      </SectionWrapper>

      <SectionWrapper title="Filter / Sort Row" tone="muted">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            {mode === 'archive' ? (
              <SegmentedNav items={[{ label: 'Archive', value: 'archive' }]} activeValue="archive" />
            ) : (
              <SegmentedNav
                items={[
                  { label: 'All', value: 'all' },
                  { label: 'Current', value: 'current' },
                  { label: 'Observation', value: 'observation' },
                ]}
                activeValue={stateFilter}
                onSelect={(value) => setStateFilter(value as CurrentStateFilter)}
              />
            )}
          </div>

          <label className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--shell-ink-soft)]">
            Sort
            <select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as 'manual' | 'alpha')}
              className="rounded-full border border-[var(--shell-border)] bg-[var(--shell-panel)] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-[var(--shell-ink)]"
            >
              <option value="manual">Manual</option>
              <option value="alpha">A–Z</option>
            </select>
          </label>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Card Grid">
        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <PlaceholderFrame label="Selection Card Pending" ratio="3/4" note="Loading plants…" />
            <PlaceholderFrame label="Selection Card Pending" ratio="3/4" note="Loading plants…" />
            <PlaceholderFrame label="Selection Card Pending" ratio="3/4" note="Loading plants…" />
          </div>
        ) : error ? (
          <InlineNotice tone="error" title="Selection load failed" body={error} />
        ) : visibleItems.length === 0 ? (
          <EmptyStatePanel
            title="No specimens available in this view"
            body="Batch C1 only needs the route and dossier line to stand up safely. Empty is acceptable if the plants collection is currently sparse."
            action={<CTAButton to={mode === 'archive' ? ROUTES.selection : ROUTES.selectionArchive} variant="secondary">{mode === 'archive' ? 'Back to Current Selection' : 'View Archive'}</CTAButton>}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleItems.map((item) => (
              <SelectionCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </SectionWrapper>

      <SectionWrapper title="Archive Switch / CTA" tone="muted">
        <div className="flex flex-col gap-4 sm:flex-row">
          {mode === 'archive' ? (
            <CTAButton to={ROUTES.selection}>Back to Current Selection</CTAButton>
          ) : (
            <CTAButton to={ROUTES.selectionArchive}>View Archive</CTAButton>
          )}
          <CTAButton to={ROUTES.home} variant="secondary">Back to Home</CTAButton>
        </div>
      </SectionWrapper>
    </>
  );
};

export const SelectionListPage: React.FC = () => <SelectionListScaffold mode="current" />;

export const SelectionArchivePage: React.FC = () => <SelectionListScaffold mode="archive" />;

const DossierSection: React.FC<{
  title: string;
  children: React.ReactNode;
  tone?: 'light' | 'muted' | 'dark';
}> = ({ title, children, tone = 'light' }) => (
  <SectionWrapper title={title} tone={tone}>
    {children}
  </SectionWrapper>
);

function dossierBackTarget(item: SelectionPlantRecord) {
  return item.availability === 'archived' ? ROUTES.selectionArchive : ROUTES.selection;
}

function dossierBackLabel(item: SelectionPlantRecord) {
  return item.availability === 'archived' ? 'Back to Archive' : 'Back to Selection';
}

function applicationHref(id: string) {
  return `/account/applications/${id}`;
}

function actionNoticeText(availability: SelectionAvailability) {
  switch (availability) {
    case 'current':
      return 'Current specimens can show Apply / Follow here. C2 wires login, gate, and application entry, while public support still stays deferred.';
    case 'observation':
      return 'Observation specimens only allow Follow. Apply stays hidden until they become true Current.';
    case 'archived':
      return 'Archived specimens stay readable as record. They do not reopen as fresh applications.';
    default:
      return '';
  }
}

export const SelectionDossierPage: React.FC = () => {
  const { userProfile } = useAuth() as any;
  const location = useLocation();
  const navigate = useNavigate();
  const { pushToast } = useToast();
  const { slug = '' } = useParams();

  const [item, setItem] = useState<SelectionPlantRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [profile, setProfile] = useState<FlowProfile | null>(null);
  const [favorite, setFavorite] = useState<FlowFavoriteRecord | null>(null);
  const [activeApplication, setActiveApplication] = useState<FlowApplicationRecord | null>(null);
  const [userLayerLoading, setUserLayerLoading] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [gateSubmitting, setGateSubmitting] = useState(false);
  const [actionBusy, setActionBusy] = useState<'follow' | 'apply' | 'remove' | null>(null);

  const returnContext = readLoginReturnContext(location.state);

  const refreshUserLayer = async (specimen: SelectionPlantRecord | null) => {
    if (!userProfile || !specimen) {
      setProfile(null);
      setFavorite(null);
      setActiveApplication(null);
      return;
    }

    setUserLayerLoading(true);
    try {
      const [profileSnapshot, favoriteSnapshot, applicationSnapshot] = await Promise.all([
        getUserProfileSnapshot(userProfile),
        findFavoriteForSpecimen(userProfile, specimen),
        findActiveApplicationForSpecimen(userProfile, specimen),
      ]);
      setProfile(profileSnapshot);
      setFavorite(favoriteSnapshot);
      setActiveApplication(applicationSnapshot);
    } finally {
      setUserLayerLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    getSelectionPlantBySlug(slug)
      .then((record) => {
        if (!active) return;
        setItem(record);
      })
      .catch(() => {
        if (!active) return;
        setError('Unable to load specimen dossier from the accepted C1 baseline.');
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    void refreshUserLayer(item);
  }, [item, userProfile]);

  useEffect(() => {
    if (!item || !userProfile || !returnContext) return;
    if (returnContext.specimenSlug && returnContext.specimenSlug !== item.slug) return;

    if (returnContext.intent === 'follow') {
      pushToast({
        title: 'Returned to dossier',
        description: 'You are back at the right specimen. Follow is ready and does not require the first apply gate.',
      });
      navigate(location.pathname, { replace: true, state: null });
      return;
    }

    if (returnContext.intent === 'apply') {
      if (!activeApplication) {
        if (!isApplyGateComplete(profile)) {
          setGateOpen(true);
        } else {
          pushToast({
            title: 'Apply unlocked',
            description: 'Your profile is complete. You can submit the application from this dossier now.',
          });
        }
      } else {
        pushToast({
          title: 'Application already exists',
          description: 'This specimen already has an active application under your account.',
        });
      }
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [returnContext, item, userProfile, profile, activeApplication, navigate, location.pathname, pushToast]);

  const goToLogin = (intent: 'follow' | 'apply') => {
    if (!item) return;
    navigate(ROUTES.login, {
      state: {
        returnContext: createLoginReturnContext({
          originRoute: location.pathname,
          intent,
          specimenSlug: item.slug,
          postLoginTarget: `/selection/${item.slug}`,
        }),
      },
    });
  };

  const handleFollow = async () => {
    if (!item) return;
    if (!userProfile) {
      goToLogin('follow');
      return;
    }

    setActionBusy(favorite ? 'remove' : 'follow');
    try {
      if (favorite) {
        await removeFavoriteForSpecimen(userProfile, item);
        setFavorite(null);
        pushToast({
          title: 'Removed from following',
          description: 'This specimen has been removed from your following list.',
        });
      } else {
        const created = await addFavoriteForSpecimen(userProfile, item);
        setFavorite(created);
        pushToast({
          title: 'Added to following',
          description: 'This specimen now appears inside your account following list.',
        });
      }
    } finally {
      setActionBusy(null);
    }
  };

  const handleApply = async () => {
    if (!item) return;
    if (activeApplication) {
      navigate(applicationHref(activeApplication.id));
      return;
    }
    if (!userProfile) {
      goToLogin('apply');
      return;
    }
    if (!isApplyGateComplete(profile)) {
      setGateOpen(true);
      return;
    }

    setActionBusy('apply');
    try {
      const created = await createApplicationForSpecimen(userProfile, item);
      setActiveApplication(created);
      pushToast({
        title: 'Application submitted',
        description: 'You can now open the application detail from this dossier or from your account.',
      });
    } finally {
      setActionBusy(null);
    }
  };

  const handleGateSave = async (values: ApplyGateValues) => {
    setGateSubmitting(true);
    try {
      const saved = await saveApplyGateProfile(userProfile, values);
      setProfile(saved);
      setGateOpen(false);
      pushToast({
        title: 'Profile saved',
        description: 'You are back at the dossier. Apply is now unlocked for this specimen.',
      });
    } finally {
      setGateSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <PageHeroSkeleton
          eyebrow="Batch C2"
          title="Specimen Dossier"
          description="Loading dossier shell…"
          primaryAction={<CTAButton to={ROUTES.selection}>Back to Selection</CTAButton>}
        />
        <DossierSection title="Hero Gallery">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <PlaceholderFrame label="SHOT PENDING / FULL BODY" ratio="4/5" />
            <PlaceholderFrame label="SHOT PENDING / CRACK" ratio="4/5" />
            <PlaceholderFrame label="SHOT PENDING / BUD" ratio="4/5" />
            <PlaceholderFrame label="SHOT PENDING / SCALE" ratio="4/5" />
          </div>
        </DossierSection>
      </>
    );
  }

  if (error || !item) {
    return (
      <>
        <PageHeroSkeleton
          eyebrow="Batch C2"
          title="Specimen Dossier"
          description="The dossier could not be resolved from the current plants source."
          primaryAction={<CTAButton to={ROUTES.selection}>Back to Selection</CTAButton>}
        />
        <SectionWrapper>
          <InlineNotice tone="error" title="Dossier unavailable" body={error || 'No specimen matched this slug.'} />
        </SectionWrapper>
      </>
    );
  }

  const applyGateInitial = createGateInitialValues(userProfile, profile);
  const applyUnlocked = Boolean(userProfile && isApplyGateComplete(profile) && !activeApplication);

  return (
    <>
      <PageContainer className="py-10 md:py-14">
        <div className="flex flex-wrap items-center gap-3">
          <CTAButton to={dossierBackTarget(item)} variant="ghost">{dossierBackLabel(item)}</CTAButton>
          <StatusPill tone={availabilityToneMap[item.availability]}>{availabilityLabelMap[item.availability]}</StatusPill>
          <StatusPill>{item.stage}</StatusPill>
        </div>

        <div className="mt-6 max-w-[760px]">
          <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--shell-oxide)]">{item.specimenId}</p>
          <h1 className="mt-2 text-4xl md:text-6xl font-light tracking-tight text-[var(--shell-ink)]">Specimen Dossier</h1>
          <p className="mt-4 text-lg leading-8 text-[var(--shell-ink-soft)]">{item.title}</p>
        </div>
      </PageContainer>

      <DossierSection title="Top Meta + Return">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <CopyCard title="Specimen ID" body={item.specimenId} />
          <CopyCard title="Batch" body={item.batch} />
          <CopyCard title="Stage" body={item.stage} />
          <CopyCard title="Size Band" body={item.sizeBand} />
        </div>
      </DossierSection>

      <DossierSection title="Hero Gallery">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <ShotFrame title="Full Body" src={item.shotMap.fullBody} pendingLabel="SHOT PENDING / FULL BODY" />
          <ShotFrame title="Crack" src={item.shotMap.crack} pendingLabel="SHOT PENDING / CRACK" />
          <ShotFrame title="Bud" src={item.shotMap.bud} pendingLabel="SHOT PENDING / BUD" />
          <ShotFrame title="Scale" src={item.shotMap.scale} pendingLabel="SHOT PENDING / SCALE" />
        </div>
      </DossierSection>

      <DossierSection title="Specimen Summary" tone="muted">
        <div className="max-w-[780px]">
          <p className="text-sm md:text-base leading-8 text-[var(--shell-ink-soft)]">{item.summaryShort}</p>
        </div>
      </DossierSection>

      <DossierSection title="Reading Focus">
        <div className="grid gap-5 md:grid-cols-3">
          <CopyCard title="Geometry" body={item.readingFocus.geometry} />
          <CopyCard title="Surface" body={item.readingFocus.surface} />
          <CopyCard title="Vitality" body={item.readingFocus.vitality} />
        </div>
      </DossierSection>

      <DossierSection title="State Record" tone="muted">
        <div className="max-w-[760px] space-y-4">
          <StatusPill tone={availabilityToneMap[item.availability]}>{availabilityLabelMap[item.availability]}</StatusPill>
          <p className="text-sm md:text-base leading-8 text-[var(--shell-ink-soft)]">
            {availabilityBodyMap[item.availability]}
          </p>
        </div>
      </DossierSection>

      <DossierSection title="Action Module">
        <div className="max-w-[860px] space-y-5">
          {userLayerLoading ? (
            <InlineNotice title="Loading account state" body="Checking profile, favorites, and application state for this dossier." />
          ) : null}

          <div className="flex flex-wrap gap-4">
            {activeApplication ? (
              <CTAButton to={applicationHref(activeApplication.id)}>View Application</CTAButton>
            ) : item.availability === 'current' ? (
              <>
                <CTAButton onClick={handleApply} disabled={actionBusy === 'apply' || gateSubmitting}>
                  {applyUnlocked ? 'Submit Application' : 'Apply'}
                </CTAButton>
                <CTAButton
                  variant="secondary"
                  onClick={handleFollow}
                  disabled={actionBusy === 'follow' || actionBusy === 'remove'}
                >
                  {favorite ? 'Remove from Following' : 'Follow'}
                </CTAButton>
              </>
            ) : item.availability === 'observation' ? (
              <CTAButton
                onClick={handleFollow}
                disabled={actionBusy === 'follow' || actionBusy === 'remove'}
              >
                {favorite ? 'Remove from Following' : 'Follow'}
              </CTAButton>
            ) : (
              <>
                <CTAButton disabled>Archived for Record</CTAButton>
                {favorite ? (
                  <CTAButton
                    variant="secondary"
                    onClick={handleFollow}
                    disabled={actionBusy === 'follow' || actionBusy === 'remove'}
                  >
                    Remove from Following
                  </CTAButton>
                ) : null}
              </>
            )}
          </div>

          <InlineNotice
            tone={item.availability === 'archived' ? 'warning' : 'info'}
            title="Action skeleton is now C2-aware"
            body={actionNoticeText(item.availability)}
          />

          {userProfile ? (
            <InlineNotice
              title={isApplyGateComplete(profile) ? 'Apply gate complete' : 'Apply gate still required'}
              body={
                isApplyGateComplete(profile)
                  ? 'Your minimal apply profile is complete. Apply can proceed for Current items.'
                  : 'Your minimal apply profile is not complete yet. Apply will open the First Apply Gate, but Follow remains available.'
              }
            />
          ) : (
            <InlineNotice
              title="Login required for dossier actions"
              body="If you start from Membership, you return to /account. If you start from this dossier, you return here with the correct intent."
            />
          )}
        </div>
      </DossierSection>

      <DossierSection title="Care / Transaction Note" tone="muted">
        <div className="grid gap-5 md:grid-cols-2">
          <InlineNotice
            title="Public support stays public"
            body="General support and FAQ stay deferred to /support in C3. This dossier does not implement public support flow in C2."
          />
          <InlineNotice
            title="Bound support stays attached to the application detail"
            body={activeApplication ? 'This specimen already has an active application, so the next account-bound step belongs in its application detail.' : 'Once an application exists, account-bound support belongs in /account/applications/:id and not in public support.'}
          >
            {activeApplication ? (
              <div className="mt-4">
                <CTAButton to={applicationHref(activeApplication.id)}>View Application</CTAButton>
              </div>
            ) : null}
          </InlineNotice>
        </div>
      </DossierSection>

      <FirstApplyGate
        open={gateOpen}
        specimenTitle={item.title}
        initialValues={applyGateInitial}
        submitting={gateSubmitting}
        onClose={() => setGateOpen(false)}
        onSubmit={handleGateSave}
      />
    </>
  );
};
