/** CMS fetch / sync state for builder and public rendering */
export type CmsContentState =
  | "available"
  | "partial"
  | "stale"
  | "failed"
  | "no-data";

export type CmsContentSource = "manual" | "imported" | "none";

export type CmsFieldMeta = {
  state: CmsContentState;
  source: CmsContentSource;
  /** ISO timestamp when content was last successfully synced */
  lastSyncedAt?: string;
  /** Present in builder/admin when state is failed */
  errorMessage?: string;
};

/** Wraps CMS entities with optional sync metadata (builder context) */
export type CmsEnvelope<T> = {
  data: T | null;
  meta: CmsFieldMeta;
};

export function createEnvelope<T>(
  data: T | null,
  overrides?: Partial<CmsFieldMeta>,
): CmsEnvelope<T> {
  const state: CmsContentState = data === null ? "no-data" : "available";
  return {
    data,
    meta: {
      state,
      source: data === null ? "none" : "manual",
      ...overrides,
    },
  };
}

export function isRenderable(meta: CmsFieldMeta): boolean {
  return meta.state === "available" || meta.state === "partial" || meta.state === "stale";
}

export function shouldOmitOptional(meta: CmsFieldMeta): boolean {
  return meta.state === "no-data" || meta.state === "failed";
}
