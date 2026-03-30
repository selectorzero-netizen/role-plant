import { ROUTES } from '../config/siteRoutes';

export type LoginIntent =
  | 'membership-start'
  | 'follow'
  | 'apply'
  | 'account-access'
  | 'application-access'
  | 'support-account-bound'
  | 'admin-access';

export interface LoginReturnContext {
  originRoute: string;
  intent: LoginIntent;
  specimenSlug?: string;
  applicationId?: string;
  postLoginTarget: string;
}

export interface LoginLocationState {
  returnContext?: LoginReturnContext;
}

export function createLoginReturnContext(
  input: Pick<LoginReturnContext, 'originRoute' | 'intent' | 'postLoginTarget'> &
    Partial<Omit<LoginReturnContext, 'originRoute' | 'intent' | 'postLoginTarget'>>
): LoginReturnContext {
  return {
    originRoute: input.originRoute,
    intent: input.intent,
    specimenSlug: input.specimenSlug,
    applicationId: input.applicationId,
    postLoginTarget: input.postLoginTarget,
  };
}

export function readLoginReturnContext(state: unknown): LoginReturnContext | null {
  if (!state || typeof state !== 'object') return null;
  const maybeWrapped = state as LoginLocationState;
  const raw = maybeWrapped.returnContext ?? state;
  if (!raw || typeof raw !== 'object') return null;
  const ctx = raw as Partial<LoginReturnContext>;

  if (typeof ctx.originRoute !== 'string') return null;
  if (typeof ctx.intent !== 'string') return null;
  if (typeof ctx.postLoginTarget !== 'string') return null;

  return {
    originRoute: ctx.originRoute,
    intent: ctx.intent as LoginIntent,
    specimenSlug: typeof ctx.specimenSlug === 'string' ? ctx.specimenSlug : undefined,
    applicationId: typeof ctx.applicationId === 'string' ? ctx.applicationId : undefined,
    postLoginTarget: ctx.postLoginTarget,
  };
}

export function resolvePostLoginTarget(
  context: LoginReturnContext | null,
  fallback: string = ROUTES.account
) {
  return context?.postLoginTarget || fallback;
}
