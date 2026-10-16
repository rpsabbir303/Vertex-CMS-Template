import type { CompanyAddress } from "@/templates/shared/cms/types/company";
import type { CmsSitePayload } from "@/templates/shared/cms/types";
import {
  getSortedCollectionItems,
  getVisibleServices,
  unwrapCollectionItems,
  unwrapEnvelope,
} from "@/templates/shared/cms/resolve-content";
import { getPublishedBlogPosts } from "@/templates/corporate-construction/utils/blog-content";

/** Optional pages this template does not publish. Shared CMS data stays unchanged. */
const OMITTED_OPTIONAL_SLUGS = new Set(["specialty-contractor"]);

export function readIndustrialSite(payload: CmsSitePayload) {
  const blogItems = payload.blog ? unwrapCollectionItems(payload.blog) : [];
  const optionalPages = (unwrapEnvelope(payload.optionalPages) ?? []).filter(
    (page) => page.enabled !== false && !OMITTED_OPTIONAL_SLUGS.has(page.slug),
  );
  return {
    company: unwrapEnvelope(payload.company),
    servicesSection: unwrapEnvelope(payload.services)?.section,
    services: getVisibleServices(payload.services),
    projects: getSortedCollectionItems(payload.projects),
    team: getSortedCollectionItems(payload.team),
    testimonials: getSortedCollectionItems(payload.testimonials),
    certifications: unwrapCollectionItems(payload.certifications),
    posts: getPublishedBlogPosts(blogItems),
    contact: unwrapEnvelope(payload.contact),
    optionalPages,
    navigation: (unwrapEnvelope(payload.navigation) ?? []).filter(
      (item) => !OMITTED_OPTIONAL_SLUGS.has(String(item.pageSlug)) && !OMITTED_OPTIONAL_SLUGS.has(item.href.replace(/^\//, "")),
    ),
  };
}

export function formatAddressLines(address?: CompanyAddress): string[] {
  if (!address) return [];
  const cityLine = [address.city, address.region, address.postalCode].filter(Boolean).join(", ");
  return [address.line1, address.line2, cityLine, address.country].filter((line): line is string => Boolean(line));
}

export function splitParagraphs(value?: string): string[] {
  if (!value?.trim()) return [];
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
