import type { Certification } from "@/templates/shared/cms/types/certifications";
import type {
  OptionalPage,
  OptionalPagePractice,
} from "@/templates/shared/cms/types/pages";
import type { CmsImage } from "@/templates/shared/cms/types/media";

function splitParagraphs(body?: string): string[] {
  if (!body?.trim()) {
    return [];
  }
  return body
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function orderedPractices(practices: OptionalPagePractice[]): OptionalPagePractice[] {
  return practices
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const orderA = a.item.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.item.sortOrder ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB || a.index - b.index;
    })
    .map(({ item }) => item)
    .filter((item) => item.title?.trim());
}

function orderedRecords(records: Certification[]): Certification[] {
  return records
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const orderA = a.item.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.item.sortOrder ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB || a.index - b.index;
    })
    .map(({ item }) => item)
    .filter((item) => item.name?.trim());
}

export type SafetyPageContent = {
  title: string;
  headline: string;
  heroDescription?: string;
  heroImage?: CmsImage | null;
  approachHeading?: string;
  approachParagraphs: string[];
  practices: OptionalPagePractice[];
  records: Certification[];
  commitmentHeading?: string;
  commitmentBody?: string;
};

/**
 * Normalize Safety optional-page CMS fields into section-ready content.
 * Documents reuse the existing certifications/records collection.
 */
export function planSafetyPageContent(
  page: OptionalPage,
  certifications: Certification[] = [],
): SafetyPageContent {
  const paragraphs = splitParagraphs(page.body);
  const heroDescription = paragraphs[0];
  const approachFromBody = paragraphs.slice(1);
  const practices = orderedPractices(page.practices ?? []);
  const records = orderedRecords(certifications);

  const approachHeading = page.approachHeading?.trim() || undefined;
  const commitmentHeading = page.commitmentHeading?.trim() || undefined;
  const commitmentBody =
    page.commitmentBody?.trim() ||
    (approachFromBody.length > 1 ? approachFromBody[approachFromBody.length - 1] : undefined);

  // When commitment reuses the last body paragraph, keep approach paragraphs distinct.
  const approachParagraphs =
    commitmentBody &&
    !page.commitmentBody?.trim() &&
    approachFromBody.length > 1 &&
    approachFromBody[approachFromBody.length - 1] === commitmentBody
      ? approachFromBody.slice(0, -1)
      : approachFromBody;

  return {
    title: page.title,
    headline: page.headline?.trim() || page.title,
    heroDescription,
    heroImage: page.heroImage?.url ? page.heroImage : null,
    approachHeading,
    approachParagraphs,
    practices,
    records,
    commitmentHeading,
    commitmentBody,
  };
}
