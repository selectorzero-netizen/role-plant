import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  type Firestore,
} from 'firebase/firestore';

export type FlowDisplayStatus =
  | 'Submitted'
  | 'Reviewing'
  | 'Quoted'
  | 'Paid'
  | 'Preparing'
  | 'Shipped'
  | 'Closed';

export const APPLICATION_DISPLAY_ORDER: FlowDisplayStatus[] = [
  'Submitted',
  'Reviewing',
  'Quoted',
  'Paid',
  'Preparing',
  'Shipped',
  'Closed',
];

export interface FlowProfile {
  uid: string;
  name: string;
  email: string;
  phone: string;
  region: string;
  growEnvironment: string;
  experienceLevel: string;
  applyGateCompleted: boolean;
}

export interface ApplyGateValues {
  name: string;
  email: string;
  phone: string;
  region: string;
  growEnvironment: string;
  experienceLevel: string;
  consentAccepted: boolean;
}

export interface FlowFavoriteRecord {
  id: string;
  userId: string;
  plantId?: string;
  specimenSlug?: string;
  specimenId?: string;
  title?: string;
  createdAt?: unknown;
}

export interface FlowApplicationRecord {
  id: string;
  userId: string;
  plantId?: string;
  specimenSlug?: string;
  specimenId?: string;
  plantTitle?: string;
  rawStatus: string;
  displayStatus: FlowDisplayStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface FlowInquiryRecord {
  id: string;
  applicationId?: string;
  userId?: string;
  type?: string;
  subject?: string;
  message?: string;
  createdAt?: unknown;
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function pickString(raw: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = asString(raw[key]);
    if (value) return value;
  }
  return undefined;
}

function toMillis(value: unknown): number {
  if (!value) return 0;
  if (typeof value === 'number') return value;
  if (value instanceof Date) return value.getTime();
  if (typeof (value as any)?.toMillis === 'function') return (value as any).toMillis();
  if (typeof (value as any)?.seconds === 'number') return (value as any).seconds * 1000;
  const parsed = Date.parse(String(value));
  return Number.isNaN(parsed) ? 0 : parsed;
}

async function getDb(): Promise<Firestore | null> {
  try {
    const firebaseModule: any = await import('../../firebase');
    return firebaseModule.db || firebaseModule.firestore || firebaseModule.default?.db || null;
  } catch {
    return null;
  }
}

export function resolveUserKey(userProfile: any): string | null {
  return (
    asString(userProfile?.uid) ||
    asString(userProfile?.userId) ||
    asString(userProfile?.id) ||
    asString(userProfile?.authUid) ||
    null
  );
}

function rowBelongsToUser(row: Record<string, unknown>, userKey: string) {
  const candidates = [
    pickString(row, ['uid']),
    pickString(row, ['userId']),
    pickString(row, ['ownerId']),
    pickString(row, ['profileId']),
  ].filter(Boolean);
  return candidates.includes(userKey);
}

function rowMatchesSpecimen(row: Record<string, unknown>, specimen: any) {
  const keys = [
    pickString(row, ['plantId']),
    pickString(row, ['specimenSlug', 'plantSlug', 'slug']),
    pickString(row, ['specimenId']),
  ].filter(Boolean);

  const specimenKeys = [
    asString(specimen?.id),
    asString(specimen?.slug),
    asString(specimen?.specimenId),
  ].filter(Boolean);

  return keys.some((key) => specimenKeys.includes(key));
}

async function listCollectionRows(collectionName: string): Promise<Array<Record<string, unknown>>> {
  const db = await getDb();
  if (!db) return [];
  const snap = await getDocs(collection(db, collectionName));
  return snap.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

function normalizeDisplayStatus(raw: unknown): FlowDisplayStatus {
  const value = String(raw || '').trim().toLowerCase();

  switch (value) {
    case 'pending':
    case 'submitted':
      return 'Submitted';
    case 'reviewing':
    case 'under_review':
      return 'Reviewing';
    case 'quoted':
    case 'quote_sent':
      return 'Quoted';
    case 'paid':
      return 'Paid';
    case 'preparing':
    case 'packing':
      return 'Preparing';
    case 'shipped':
      return 'Shipped';
    case 'closed':
    case 'rejected':
    case 'archived':
    case 'cancelled':
      return 'Closed';
    case 'approved':
      return 'Reviewing';
    default:
      return 'Submitted';
  }
}

function isOpenRawStatus(raw: unknown): boolean {
  const value = String(raw || '').trim().toLowerCase();
  return !['closed', 'rejected', 'archived', 'cancelled'].includes(value);
}

export function getDisplayStatusTone(
  status: FlowDisplayStatus
): 'warning' | 'default' | 'success' | 'error' {
  switch (status) {
    case 'Submitted':
    case 'Reviewing':
      return 'warning';
    case 'Quoted':
    case 'Paid':
    case 'Preparing':
      return 'default';
    case 'Shipped':
      return 'success';
    case 'Closed':
      return 'error';
    default:
      return 'default';
  }
}

export function getApplicationPrimaryLabel(status: FlowDisplayStatus): string {
  switch (status) {
    case 'Quoted':
      return 'Review Quote';
    case 'Shipped':
      return 'Track Aftercare';
    case 'Paid':
    case 'Preparing':
      return 'View Order Status';
    case 'Closed':
      return 'View Record';
    default:
      return 'View Application';
  }
}

export function isApplyGateComplete(profile: FlowProfile | null): boolean {
  if (!profile) return false;
  return Boolean(
    profile.applyGateCompleted &&
      profile.name &&
      profile.email &&
      profile.phone &&
      profile.region &&
      profile.growEnvironment &&
      profile.experienceLevel
  );
}

export function createGateInitialValues(userProfile: any, profile: FlowProfile | null): ApplyGateValues {
  return {
    name: profile?.name || asString(userProfile?.displayName) || '',
    email: profile?.email || asString(userProfile?.email) || '',
    phone: profile?.phone || '',
    region: profile?.region || '',
    growEnvironment: profile?.growEnvironment || '',
    experienceLevel: profile?.experienceLevel || '',
    consentAccepted: false,
  };
}

export async function getUserProfileSnapshot(userProfile: any): Promise<FlowProfile | null> {
  const userKey = resolveUserKey(userProfile);
  if (!userKey) return null;

  const db = await getDb();
  if (!db) return null;

  const snap = await getDoc(doc(db, 'profiles', userKey));
  const raw = snap.exists() ? ({ id: snap.id, ...snap.data() } as Record<string, unknown>) : {};

  const profile: FlowProfile = {
    uid: userKey,
    name: pickString(raw, ['name', 'displayName']) || asString(userProfile?.displayName) || '',
    email: pickString(raw, ['email']) || asString(userProfile?.email) || '',
    phone: pickString(raw, ['phone', 'mobile']) || '',
    region: pickString(raw, ['region', 'city', 'location']) || '',
    growEnvironment: pickString(raw, ['growEnvironment', 'environmentType']) || '',
    experienceLevel: pickString(raw, ['experienceLevel', 'experience']) || '',
    applyGateCompleted: raw.applyGateCompleted === true,
  };

  if (!profile.applyGateCompleted) {
    profile.applyGateCompleted =
      Boolean(profile.name && profile.email && profile.phone && profile.region && profile.growEnvironment && profile.experienceLevel);
  }

  return profile;
}

export async function saveApplyGateProfile(
  userProfile: any,
  values: ApplyGateValues
): Promise<FlowProfile | null> {
  const userKey = resolveUserKey(userProfile);
  if (!userKey) return null;

  const db = await getDb();
  if (!db) return null;

  await setDoc(
    doc(db, 'profiles', userKey),
    {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      region: values.region.trim(),
      growEnvironment: values.growEnvironment.trim(),
      experienceLevel: values.experienceLevel.trim(),
      applyGateCompleted: true,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  return getUserProfileSnapshot(userProfile);
}

export async function listUserFavorites(userProfile: any): Promise<FlowFavoriteRecord[]> {
  const userKey = resolveUserKey(userProfile);
  if (!userKey) return [];

  const rows = await listCollectionRows('favorites');

  return rows
    .filter((row) => rowBelongsToUser(row, userKey))
    .map((row) => ({
      id: pickString(row, ['id']) || '',
      userId: userKey,
      plantId: pickString(row, ['plantId']),
      specimenSlug: pickString(row, ['specimenSlug', 'plantSlug', 'slug']),
      specimenId: pickString(row, ['specimenId']),
      title: pickString(row, ['title', 'plantTitle']),
      createdAt: row.createdAt,
    }))
    .sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));
}

export async function findFavoriteForSpecimen(userProfile: any, specimen: any): Promise<FlowFavoriteRecord | null> {
  const rows = await listCollectionRows('favorites');
  const userKey = resolveUserKey(userProfile);
  if (!userKey) return null;

  const match = rows.find((row) => rowBelongsToUser(row, userKey) && rowMatchesSpecimen(row, specimen));
  if (!match) return null;

  return {
    id: pickString(match, ['id']) || '',
    userId: userKey,
    plantId: pickString(match, ['plantId']),
    specimenSlug: pickString(match, ['specimenSlug', 'plantSlug', 'slug']),
    specimenId: pickString(match, ['specimenId']),
    title: pickString(match, ['title', 'plantTitle']),
    createdAt: match.createdAt,
  };
}

export async function addFavoriteForSpecimen(userProfile: any, specimen: any): Promise<FlowFavoriteRecord | null> {
  const existing = await findFavoriteForSpecimen(userProfile, specimen);
  if (existing) return existing;

  const userKey = resolveUserKey(userProfile);
  if (!userKey) return null;

  const db = await getDb();
  if (!db) return null;

  await addDoc(collection(db, 'favorites'), {
    uid: userKey,
    userId: userKey,
    plantId: specimen?.id || null,
    specimenSlug: specimen?.slug || null,
    specimenId: specimen?.specimenId || null,
    title: specimen?.title || null,
    createdAt: serverTimestamp(),
  });

  return findFavoriteForSpecimen(userProfile, specimen);
}

export async function removeFavoriteById(favoriteId: string): Promise<void> {
  if (!favoriteId) return;
  const db = await getDb();
  if (!db) return;
  await deleteDoc(doc(db, 'favorites', favoriteId));
}

export async function removeFavoriteForSpecimen(userProfile: any, specimen: any): Promise<void> {
  const existing = await findFavoriteForSpecimen(userProfile, specimen);
  if (!existing) return;
  await removeFavoriteById(existing.id);
}

export async function listUserApplications(userProfile: any): Promise<FlowApplicationRecord[]> {
  const userKey = resolveUserKey(userProfile);
  if (!userKey) return [];

  const rows = await listCollectionRows('applications');

  return rows
    .filter((row) => rowBelongsToUser(row, userKey))
    .map((row) => {
      const rawStatus = pickString(row, ['status']) || 'pending';
      return {
        id: pickString(row, ['id']) || '',
        userId: userKey,
        plantId: pickString(row, ['plantId']),
        specimenSlug: pickString(row, ['specimenSlug', 'plantSlug', 'slug']),
        specimenId: pickString(row, ['specimenId']),
        plantTitle: pickString(row, ['plantTitle', 'title']),
        rawStatus,
        displayStatus: normalizeDisplayStatus(rawStatus),
        createdAt: row.createdAt,
        updatedAt: row.updatedAt ?? row.createdAt,
      };
    })
    .sort((a, b) => toMillis(b.updatedAt || b.createdAt) - toMillis(a.updatedAt || a.createdAt));
}

export async function findActiveApplicationForSpecimen(
  userProfile: any,
  specimen: any
): Promise<FlowApplicationRecord | null> {
  const applications = await listUserApplications(userProfile);
  return (
    applications.find(
      (app) =>
        isOpenRawStatus(app.rawStatus) &&
        [app.plantId, app.specimenSlug, app.specimenId].filter(Boolean).some((key) =>
          [specimen?.id, specimen?.slug, specimen?.specimenId].filter(Boolean).includes(key)
        )
    ) || null
  );
}

export async function createApplicationForSpecimen(
  userProfile: any,
  specimen: any
): Promise<FlowApplicationRecord | null> {
  const existing = await findActiveApplicationForSpecimen(userProfile, specimen);
  if (existing) return existing;

  const userKey = resolveUserKey(userProfile);
  if (!userKey) return null;

  const db = await getDb();
  if (!db) return null;

  const ref = await addDoc(collection(db, 'applications'), {
    uid: userKey,
    userId: userKey,
    plantId: specimen?.id || null,
    specimenSlug: specimen?.slug || null,
    specimenId: specimen?.specimenId || null,
    plantTitle: specimen?.title || null,
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const created = await getDoc(doc(db, 'applications', ref.id));
  if (!created.exists()) return null;

  const raw = { id: created.id, ...created.data() } as Record<string, unknown>;
  const rawStatus = pickString(raw, ['status']) || 'pending';

  return {
    id: created.id,
    userId: userKey,
    plantId: pickString(raw, ['plantId']),
    specimenSlug: pickString(raw, ['specimenSlug', 'plantSlug', 'slug']),
    specimenId: pickString(raw, ['specimenId']),
    plantTitle: pickString(raw, ['plantTitle', 'title']),
    rawStatus,
    displayStatus: normalizeDisplayStatus(rawStatus),
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt ?? raw.createdAt,
  };
}

export async function getApplicationDetail(userProfile: any, applicationId: string): Promise<{
  application: FlowApplicationRecord | null;
  messages: FlowInquiryRecord[];
}> {
  const userKey = resolveUserKey(userProfile);
  if (!userKey) {
    return { application: null, messages: [] };
  }

  const db = await getDb();
  if (!db) {
    return { application: null, messages: [] };
  }

  const appSnap = await getDoc(doc(db, 'applications', applicationId));
  if (!appSnap.exists()) {
    return { application: null, messages: [] };
  }

  const raw = { id: appSnap.id, ...appSnap.data() } as Record<string, unknown>;
  if (!rowBelongsToUser(raw, userKey)) {
    return { application: null, messages: [] };
  }

  const rawStatus = pickString(raw, ['status']) || 'pending';
  const application: FlowApplicationRecord = {
    id: pickString(raw, ['id']) || applicationId,
    userId: userKey,
    plantId: pickString(raw, ['plantId']),
    specimenSlug: pickString(raw, ['specimenSlug', 'plantSlug', 'slug']),
    specimenId: pickString(raw, ['specimenId']),
    plantTitle: pickString(raw, ['plantTitle', 'title']),
    rawStatus,
    displayStatus: normalizeDisplayStatus(rawStatus),
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt ?? raw.createdAt,
  };

  const messageRows = await listCollectionRows('inquiries');
  const messages = messageRows
    .filter((row) => rowBelongsToUser(row, userKey) && pickString(row, ['applicationId']) === applicationId)
    .map((row) => ({
      id: pickString(row, ['id']) || '',
      applicationId,
      userId: userKey,
      type: pickString(row, ['type']),
      subject: pickString(row, ['subject', 'title']),
      message: pickString(row, ['message', 'body', 'content']),
      createdAt: row.createdAt,
    }))
    .sort((a, b) => toMillis(a.createdAt) - toMillis(b.createdAt));

  return { application, messages };
}
