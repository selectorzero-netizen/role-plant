export type SelectionAvailability = 'current' | 'observation' | 'archived';

export interface SelectionShotMap {
  fullBody?: string;
  crack?: string;
  bud?: string;
  scale?: string;
}

export interface SelectionPlantRecord {
  id: string;
  slug: string;
  specimenId: string;
  title: string;
  availability: SelectionAvailability;
  stage: string;
  batch: string;
  sizeBand: string;
  summaryShort: string;
  coverImage?: string;
  shotMap: SelectionShotMap;
  readingFocus: {
    geometry: string;
    surface: string;
    vitality: string;
  };
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function pickString(raw: Record<string, unknown>, keys: string[]): string | undefined {
  for (const key of keys) {
    const value = asString(raw[key]);
    if (value) return value;
  }
  return undefined;
}

function normalizeAvailability(input: unknown): SelectionAvailability {
  const value = String(input || '').trim().toLowerCase();
  if (value === 'archived' || value === 'archive') return 'archived';
  if (value === 'observation') return 'observation';
  if (value === 'available' || value === 'current') return 'current';
  return 'current';
}

function normalizeShotMap(raw: Record<string, unknown>, coverImage?: string): SelectionShotMap {
  const shotMap = asRecord(raw.shotMap);
  return {
    fullBody:
      asString(shotMap.fullBody) ||
      pickString(raw, ['fullBodyImage', 'fullBodyImageUrl', 'coverImage', 'coverImageUrl', 'heroImage', 'heroImageUrl']) ||
      coverImage,
    crack:
      asString(shotMap.crack) ||
      pickString(raw, ['crackImage', 'crackImageUrl', 'detailCrackImage', 'detailCrackImageUrl']),
    bud:
      asString(shotMap.bud) ||
      pickString(raw, ['budImage', 'budImageUrl', 'detailBudImage', 'detailBudImageUrl']),
    scale:
      asString(shotMap.scale) ||
      pickString(raw, ['scaleImage', 'scaleImageUrl', 'referenceImage', 'referenceImageUrl']),
  };
}

function unwrapPlantArray(result: unknown): unknown[] {
  if (Array.isArray(result)) return result;
  const raw = asRecord(result);
  if (Array.isArray(raw.items)) return raw.items as unknown[];
  if (Array.isArray(raw.plants)) return raw.plants as unknown[];
  if (Array.isArray(raw.data)) return raw.data as unknown[];
  return [];
}

function toPlantRecord(source: unknown, fallbackId: string): SelectionPlantRecord {
  const raw = (() => {
    if (source && typeof source === 'object' && typeof (source as any).data === 'function') {
      return { ...(source as any).data(), id: (source as any).id };
    }
    return asRecord(source);
  })();

  const id = pickString(raw, ['id', 'docId', 'uid']) || fallbackId;
  const slug = pickString(raw, ['slug', 'pathSlug']) || id;
  const specimenId = pickString(raw, ['specimenId', 'serialNumber', 'serial', 'code']) || id;
  const title = pickString(raw, ['title', 'name', 'displayName']) || `Specimen ${specimenId}`;
  const availability = normalizeAvailability(raw.availability ?? raw.status ?? raw.state);
  const stage = pickString(raw, ['stage', 'phase', 'growthStage']) || 'seedling';
  const batch = pickString(raw, ['batch', 'batchCode']) || 'Batch Pending';
  const sizeBand = pickString(raw, ['sizeBand', 'size', 'sizeLabel']) || 'Size Pending';
  const summaryShort = pickString(raw, ['summaryShort', 'summary', 'shortNote', 'note']) || 'Summary Pending';
  const coverImage = pickString(raw, ['coverImage', 'coverImageUrl', 'heroImage', 'heroImageUrl']);
  const shotMap = normalizeShotMap(raw, coverImage);

  return {
    id,
    slug,
    specimenId,
    title,
    availability,
    stage,
    batch,
    sizeBand,
    summaryShort,
    coverImage,
    shotMap,
    readingFocus: {
      geometry: pickString(raw, ['geometry', 'geometryNote']) || 'Geometry reading pending.',
      surface: pickString(raw, ['surface', 'surfaceNote']) || 'Surface reading pending.',
      vitality: pickString(raw, ['vitality', 'vitalityNote']) || 'Vitality reading pending.',
    },
  };
}

async function loadViaPlantService(): Promise<SelectionPlantRecord[]> {
  const serviceModule: any = await import('../../services/plantService');
  const candidateNames = ['listPlants', 'getPlants', 'getAllPlants', 'fetchPlants'];

  for (const name of candidateNames) {
    const fn = serviceModule?.[name];
    if (typeof fn === 'function') {
      const result = await fn();
      const items = unwrapPlantArray(result);
      return items.map((item, index) => toPlantRecord(item, `plant-${index + 1}`));
    }
  }

  return [];
}

export async function listSelectionPlants(): Promise<SelectionPlantRecord[]> {
  try {
    const items = await loadViaPlantService();
    return items.sort((a, b) => {
      const availabilityOrder: Record<SelectionAvailability, number> = {
        current: 0,
        observation: 1,
        archived: 2,
      };
      if (availabilityOrder[a.availability] !== availabilityOrder[b.availability]) {
        return availabilityOrder[a.availability] - availabilityOrder[b.availability];
      }
      return a.specimenId.localeCompare(b.specimenId);
    });
  } catch {
    return [];
  }
}

export async function getSelectionPlantBySlug(slug: string): Promise<SelectionPlantRecord | null> {
  const items = await listSelectionPlants();
  return items.find((item) => item.slug === slug || item.id === slug) || null;
}
