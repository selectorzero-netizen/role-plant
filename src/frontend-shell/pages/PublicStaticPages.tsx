import React from 'react';
import { useAuth } from '../../AuthContext';
import { ROUTES } from '../config/siteRoutes';
import { STATIC_PUBLIC_COPY, type AssetSpec } from '../content/publicStaticCopy';
import { CTAButton, InlineNotice } from '../primitives/FeedbackPrimitives';
import { PageContainer, PageHeroSkeleton, PlaceholderFrame, SectionWrapper } from '../primitives/LayoutPrimitives';
import { cx } from '../primitives/cx';

const assetKindLabel: Record<AssetSpec['kind'], string> = {
  gemini: 'Gemini tempAI',
  placeholder: 'Placeholder only',
  real: 'Real asset required',
};

const AssetSlotCard: React.FC<{
  asset: AssetSpec;
  title?: string;
  body?: string;
}> = ({ asset, title, body }) => (
  <div className="space-y-4">
    <PlaceholderFrame label={asset.label} ratio={asset.ratio || '16/9'} note={asset.note} />
    <div className="rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-4 py-4">
      <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--shell-oxide)]">
        {assetKindLabel[asset.kind]}
      </p>
      {title ? <h3 className="mt-2 text-base font-medium text-[var(--shell-ink)]">{title}</h3> : null}
      {body ? <p className="mt-2 text-sm leading-7 text-[var(--shell-ink-soft)]">{body}</p> : null}
      <p className="mt-3 break-all rounded-xl bg-[var(--shell-paper-strong)] px-3 py-2 text-[11px] leading-6 text-[var(--shell-ink-soft)]">
        {asset.path}
      </p>
    </div>
  </div>
);

const CopyCard: React.FC<{
  title: string;
  body: string;
  className?: string;
}> = ({ title, body, className }) => (
  <div className={cx('rounded-2xl border border-[var(--shell-border)] bg-[var(--shell-panel)] px-5 py-5', className)}>
    <h3 className="text-lg font-medium text-[var(--shell-ink)]">{title}</h3>
    <p className="mt-3 text-sm leading-7 text-[var(--shell-ink-soft)]">{body}</p>
  </div>
);

const SectionCtaRow: React.FC<{
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
}> = ({ primary, secondary }) =>
  primary || secondary ? <div className="mt-8 flex flex-col sm:flex-row gap-4">{primary}{secondary}</div> : null;

const SplitNarrativeSection: React.FC<{
  tone?: 'light' | 'muted' | 'dark';
  title: string;
  body: string;
  asset: AssetSpec;
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
  reverse?: boolean;
}> = ({ tone = 'light', title, body, asset, primaryAction, secondaryAction, reverse = false }) => (
  <SectionWrapper tone={tone}>
    <div className={cx('grid gap-8 lg:grid-cols-[1fr_0.95fr] items-center', reverse && 'lg:[&>*:first-child]:order-2')}>
      <div className="max-w-[640px]">
        <h2 className="text-2xl md:text-4xl font-light tracking-tight">{title}</h2>
        <p className="mt-4 text-sm md:text-base leading-8 text-[var(--shell-ink-soft)]">{body}</p>
        <SectionCtaRow primary={primaryAction} secondary={secondaryAction} />
      </div>
      <AssetSlotCard asset={asset} />
    </div>
  </SectionWrapper>
);

const ClosingBand: React.FC<{
  title: string;
  body: string;
  primary: React.ReactNode;
  secondary?: React.ReactNode;
}> = ({ title, body, primary, secondary }) => (
  <SectionWrapper tone="dark">
    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
      <div className="max-w-[700px]">
        <h2 className="text-2xl md:text-4xl font-light tracking-tight text-[var(--shell-chalk)]">{title}</h2>
        <p className="mt-4 text-sm md:text-base leading-8 text-[var(--shell-chalk-soft)]">{body}</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
        {primary}
        {secondary}
      </div>
    </div>
  </SectionWrapper>
);

export const HomePage: React.FC = () => {
  const { userProfile } = useAuth();
  const copy = STATIC_PUBLIC_COPY.home;
  const accountEntry = userProfile ? (
    <CTAButton to={ROUTES.account}>Continue to Account</CTAButton>
  ) : (
    <CTAButton to={ROUTES.login}>Start with Google</CTAButton>
  );

  return (
    <>
      <PageHeroSkeleton
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        description={copy.hero.description}
        primaryAction={<CTAButton to={ROUTES.selection}>{copy.hero.primaryCta}</CTAButton>}
        secondaryAction={<CTAButton to={ROUTES.standards} variant="secondary">{copy.hero.secondaryCta}</CTAButton>}
      />

      <SectionWrapper title={copy.whatWeFrame.title} description={copy.whatWeFrame.description}>
        <div className="grid gap-6 lg:grid-cols-3">
          {copy.whatWeFrame.items.map((item) => (
            <AssetSlotCard key={item.title} asset={item.asset} title={item.title} body={item.body} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper title={copy.currentBatch.title} description={copy.currentBatch.description} tone="muted">
        <div className="grid gap-8 xl:grid-cols-[1fr_0.95fr]">
          <div className="max-w-[620px]">
            <p className="text-sm leading-8 text-[var(--shell-ink-soft)]">
              這一區只負責告訴你現在有東西可看，真正的個體閱讀會在 Selection 裡完成。
            </p>
            <SectionCtaRow
              primary={<CTAButton to={ROUTES.selection}>{copy.currentBatch.primaryCta}</CTAButton>}
              secondary={<CTAButton to={ROUTES.selectionArchive} variant="secondary">{copy.currentBatch.secondaryCta}</CTAButton>}
            />
          </div>
          <AssetSlotCard asset={copy.currentBatch.asset} />
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {copy.currentBatch.previewCards.map((card) => (
            <AssetSlotCard key={card.label} asset={card} />
          ))}
        </div>
      </SectionWrapper>

      <SplitNarrativeSection
        title={copy.standardsPreview.title}
        body={copy.standardsPreview.description}
        asset={copy.standardsPreview.asset}
        primaryAction={<CTAButton to={ROUTES.standards}>{copy.standardsPreview.cta}</CTAButton>}
      />

      <SplitNarrativeSection
        tone="muted"
        title={copy.cultivationPreview.title}
        body={copy.cultivationPreview.description}
        asset={copy.cultivationPreview.asset}
        primaryAction={<CTAButton to={ROUTES.cultivation}>{copy.cultivationPreview.cta}</CTAButton>}
        reverse
      />

      <SectionWrapper title={copy.membershipPreview.title} description={copy.membershipPreview.description}>
        <div className="grid gap-8 xl:grid-cols-[1fr_0.95fr] items-center">
          <div className="max-w-[640px]">
            <InlineNotice
              title="帳號入口"
              body="帳號用來承接追蹤、申請與後續紀錄；詳細互動會在登入後進入對應頁面。"
            />
            <SectionCtaRow
              primary={<CTAButton to={ROUTES.membership}>{copy.membershipPreview.ctaLearnMore}</CTAButton>}
              secondary={accountEntry}
            />
          </div>
          <AssetSlotCard asset={copy.membershipPreview.asset} />
        </div>
      </SectionWrapper>

      <SplitNarrativeSection
        tone="muted"
        title={copy.supportPreview.title}
        body={copy.supportPreview.description}
        asset={copy.supportPreview.asset}
        primaryAction={<CTAButton to={ROUTES.support}>{copy.supportPreview.cta}</CTAButton>}
      />
    </>
  );
};

export const StandardsPage: React.FC = () => {
  const copy = STATIC_PUBLIC_COPY.standards;

  return (
    <>
      <PageHeroSkeleton
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        description={copy.hero.description}
        primaryAction={<CTAButton to={ROUTES.cultivation}>{copy.hero.primaryCta}</CTAButton>}
        secondaryAction={<CTAButton to={ROUTES.selection} variant="secondary">{copy.hero.secondaryCta}</CTAButton>}
      />

      <SectionWrapper title={copy.whatWeSee.title} description={copy.whatWeSee.description}>
        <div className="grid gap-5 md:grid-cols-3">
          {copy.whatWeSee.items.map((item) => (
            <CopyCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper title={copy.keepReject.title} tone="muted">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--shell-oxide)]">We keep</p>
            <div className="mt-4 space-y-4">
              {copy.keepReject.keep.map((item) => (
                <CopyCard key={item} title={item} body="This belongs in the brand’s long-term viewing frame." />
              ))}
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--shell-oxide)]">We reject</p>
            <div className="mt-4 space-y-4">
              {copy.keepReject.reject.map((item) => (
                <CopyCard key={item} title={item} body="This does not define value for this brand." />
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SplitNarrativeSection
        title={copy.readingExample.title}
        body={copy.readingExample.description}
        asset={copy.readingExample.asset}
      />

      <SectionWrapper title={copy.whyItMatters.title}>
        <div className="max-w-[720px]">
          <p className="text-sm md:text-base leading-8 text-[var(--shell-ink-soft)]">{copy.whyItMatters.body}</p>
        </div>
      </SectionWrapper>

      <ClosingBand
        title="Take these standards back to the living pages."
        body="This mother page only works if it sends people back into Selection and onward into Cultivation."
        primary={<CTAButton to={ROUTES.cultivation}>{copy.ctas.primary}</CTAButton>}
        secondary={<CTAButton to={ROUTES.selection} variant="secondary">{copy.ctas.secondary}</CTAButton>}
      />
    </>
  );
};

export const CultivationPage: React.FC = () => {
  const copy = STATIC_PUBLIC_COPY.cultivation;

  return (
    <>
      <PageHeroSkeleton
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        description={copy.hero.description}
        primaryAction={<CTAButton to={ROUTES.selection}>{copy.hero.primaryCta}</CTAButton>}
        secondaryAction={<CTAButton to={ROUTES.support} variant="secondary">{copy.hero.secondaryCta}</CTAButton>}
      />

      <SplitNarrativeSection
        title={copy.seasonalRhythm.title}
        body={copy.seasonalRhythm.description}
        asset={copy.seasonalRhythm.asset}
      />

      <SectionWrapper title={copy.waterTemperature.title}>
        <div className="grid gap-5 md:grid-cols-2">
          {copy.waterTemperature.items.map((item) => (
            <CopyCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </SectionWrapper>

      <SplitNarrativeSection
        tone="muted"
        title={copy.rootSpace.title}
        body={copy.rootSpace.description}
        asset={copy.rootSpace.asset}
        reverse
      />

      <SectionWrapper title={copy.mistakes.title}>
        <div className="space-y-4">
          {copy.mistakes.items.map((item) => (
            <CopyCard key={item} title={item} body="這些是最常見、也最容易打亂節奏的做法。" />
          ))}
        </div>
      </SectionWrapper>

      <ClosingBand
        title="Method should return people to the living route."
        body="Cultivation should still point back to Selection and to the public Support entry, not become a self-contained article silo."
        primary={<CTAButton to={ROUTES.selection}>{copy.ctas.primary}</CTAButton>}
        secondary={<CTAButton to={ROUTES.support} variant="secondary">{copy.ctas.secondary}</CTAButton>}
      />
    </>
  );
};

export const MembershipPage: React.FC = () => {
  const { userProfile } = useAuth();
  const copy = STATIC_PUBLIC_COPY.membership;
  const accountEntry = userProfile ? (
    <CTAButton to={ROUTES.account}>{copy.ctas.continue}</CTAButton>
  ) : (
    <CTAButton to={ROUTES.login}>{copy.ctas.start}</CTAButton>
  );

  return (
    <>
      <PageHeroSkeleton
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        description={copy.hero.description}
        primaryAction={accountEntry}
        secondaryAction={<CTAButton to={ROUTES.selection} variant="secondary">{copy.hero.selectionCta}</CTAButton>}
      />

      <SectionWrapper title={copy.whyAccountExists.title}>
        <div className="grid gap-5 md:grid-cols-3">
          {copy.whyAccountExists.items.map((item) => (
            <CopyCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </SectionWrapper>

      <SplitNarrativeSection
        tone="muted"
        title={copy.firstTime.title}
        body={copy.firstTime.description}
        asset={copy.firstTime.asset}
      />

      <SectionWrapper title={copy.whatNot.title}>
        <div className="grid gap-5 md:grid-cols-3">
          {copy.whatNot.items.map((item) => (
            <CopyCard key={item} title={item} body="This expectation is explicitly ruled out in the public membership shell." />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper title={copy.timeline.title} description={copy.timeline.description}>
        <InlineNotice
          tone="warning"
          title="首次使用流程"
          body="第一次真正申請前，系統會先確認必要資料，再進入後續流程。"
        />
      </SectionWrapper>

      <ClosingBand
        title="先理解帳號角色，再決定要不要進場。"
        body="帳號不是門票，而是追蹤、申請、紀錄與售後的入口。"
        primary={accountEntry}
        secondary={<CTAButton to={ROUTES.selection} variant="secondary">{copy.ctas.selection}</CTAButton>}
      />
    </>
  );
};

export const StoryPage: React.FC = () => {
  const copy = STATIC_PUBLIC_COPY.story;

  return (
    <>
      <PageHeroSkeleton
        eyebrow={copy.hero.eyebrow}
        title={copy.hero.title}
        description={copy.hero.description}
        primaryAction={<CTAButton to={ROUTES.standards}>{copy.hero.primaryCta}</CTAButton>}
        secondaryAction={<CTAButton to={ROUTES.selection} variant="secondary">{copy.hero.secondaryCta}</CTAButton>}
      />

      <SplitNarrativeSection
        title={copy.whyThisPlant.title}
        body={copy.whyThisPlant.body}
        asset={copy.whyThisPlant.asset}
      />

      <SplitNarrativeSection
        tone="muted"
        title={copy.whatWeFrame.title}
        body={copy.whatWeFrame.body}
        asset={copy.whatWeFrame.asset}
        reverse
      />

      <SplitNarrativeSection
        title={copy.transition.title}
        body={copy.transition.body}
        asset={copy.transition.asset}
      />

      <SplitNarrativeSection
        tone="muted"
        title={copy.future.title}
        body={copy.future.body}
        asset={copy.future.asset}
        reverse
      />

      <ClosingBand
        title="Story returns to the working routes."
        body="This page only supports the main routes. It should send people back to Standards and Selection, not try to become a journal."
        primary={<CTAButton to={ROUTES.standards}>{copy.ctas.primary}</CTAButton>}
        secondary={<CTAButton to={ROUTES.selection} variant="secondary">{copy.ctas.secondary}</CTAButton>}
      />
    </>
  );
};
