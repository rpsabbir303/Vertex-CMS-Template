import type { CmsEnvelope, CmsContentState } from "./types/cms-state";
import { isRenderable, shouldOmitOptional } from "./types/cms-state";
import type { Service, ServicesCollection } from "./types/services";

export function unwrapEnvelope<T>(envelope: CmsEnvelope<T>): T | null {
  if (!isRenderable(envelope.meta)) {
    return envelope.meta.state === "stale" || envelope.meta.state === "failed"
      ? envelope.data
      : null;
  }
  return envelope.data;
}

export function unwrapCollectionItems<T extends { id: string }>(
  envelope: CmsEnvelope<{ items: T[] } | null>,
): T[] {
  const collection = unwrapEnvelope(envelope);
  if (!collection?.items?.length) {
    return [];
  }
  return collection.items;
}

/** Visible services in tenant display order (sortOrder, then CMS order) */
/** Collection items in tenant display order (sortOrder, then CMS order) */
export function getSortedCollectionItems<T extends { id: string; sortOrder?: number }>(
  envelope: CmsEnvelope<{ items: T[] } | null>,
): T[] {
  const items = unwrapCollectionItems(envelope);
  return items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const orderA = a.item.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.item.sortOrder ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB || a.index - b.index;
    })
    .map(({ item }) => item);
}

export function getVisibleServices(
  envelope: CmsEnvelope<ServicesCollection | null>,
): Service[] {
  const items = unwrapCollectionItems(envelope).filter(
    (service) => service.visible !== false && service.title?.trim(),
  );
  return items
    .map((service, index) => ({ service, index }))
    .sort((a, b) => {
      const orderA = a.service.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.service.sortOrder ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB || a.index - b.index;
    })
    .map(({ service }) => service);
}

export function hasOptionalSection(envelope: CmsEnvelope<unknown>): boolean {
  if (shouldOmitOptional(envelope.meta)) {
    return false;
  }
  const data = envelope.data;
  if (data === null || data === undefined) {
    return false;
  }
  if (Array.isArray(data)) {
    return data.length > 0;
  }
  if (typeof data === "object" && "items" in data) {
    const items = (data as { items: unknown[] }).items;
    return Array.isArray(items) && items.length > 0;
  }
  return true;
}

export function mergePartialState(
  current: CmsContentState,
  hasMissingOptionalFields: boolean,
): CmsContentState {
  if (current === "no-data" || current === "failed") {
    return current;
  }
  if (hasMissingOptionalFields) {
    return "partial";
  }
  return current;
}
