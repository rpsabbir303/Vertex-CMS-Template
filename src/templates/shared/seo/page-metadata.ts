import type { Metadata } from "next";
import type { CmsSitePayload } from "@/templates/shared/cms/types";
import { unwrapEnvelope } from "@/templates/shared/cms/resolve-content";

export function buildPageMetadata(
  payload: CmsSitePayload,
  pageSlug: string,
): Metadata {
  const siteSeo = unwrapEnvelope(payload.siteSeo);
  const pageSeoList = unwrapEnvelope(payload.pageSeo) ?? [];
  const pageSeo = pageSeoList.find((p) => p.pageSlug === pageSlug);

  const title = pageSeo?.title ?? siteSeo?.title;
  const description = pageSeo?.description ?? siteSeo?.description;

  return {
    title,
    description,
    robots: pageSeo?.noIndex || siteSeo?.noIndex ? { index: false } : undefined,
    openGraph: {
      title: pageSeo?.ogTitle ?? siteSeo?.ogTitle ?? title ?? undefined,
      description:
        pageSeo?.ogDescription ?? siteSeo?.ogDescription ?? description ?? undefined,
      images: siteSeo?.ogImageUrl ? [{ url: siteSeo.ogImageUrl }] : undefined,
    },
    alternates: siteSeo?.canonicalPath
      ? { canonical: siteSeo.canonicalPath }
      : undefined,
  };
}
