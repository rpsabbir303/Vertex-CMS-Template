import type { CmsSitePayload } from "@/templates/shared/cms/types";
import { unwrapEnvelope } from "@/templates/shared/cms/resolve-content";

/** Tenant-authored SEO description for a page, when provided. */
export function pageSeoDescription(payload: CmsSitePayload, slug: string): string | undefined {
  return unwrapEnvelope(payload.pageSeo)
    ?.find((entry) => entry.pageSlug === slug)
    ?.description?.trim() || undefined;
}

export function splitParagraphs(text?: string): string[] {
  return (
    text
      ?.split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean) ?? []
  );
}
