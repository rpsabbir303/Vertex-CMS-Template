import type { OptionalPage, SpecialtySection } from "@/templates/shared/cms/types/pages";

function splitParagraphs(body?: string): string[] {
  if (!body?.trim()) return [];
  return body
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function orderedSections(sections: SpecialtySection[]): SpecialtySection[] {
  return sections
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const orderA = a.item.number ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.item.number ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB || a.index - b.index;
    })
    .map(({ item }) => item)
    .filter((item) => item.title?.trim());
}

export type SpecialtyPageContent = {
  title: string;
  headline: string;
  heroDescription?: string;
  heroImage?: OptionalPage["heroImage"];
  approachHeading?: string;
  approachParagraphs: string[];
  specialtySections: SpecialtySection[];
  commitmentHeading?: string;
  commitmentBody?: string;
};

export function planSpecialtyPageContent(page: OptionalPage): SpecialtyPageContent {
  const paragraphs = splitParagraphs(page.body);
  const heroDescription = paragraphs[0];
  const approachFromBody = paragraphs.slice(1);
  const specialtySections = page.specialtySections?.length
    ? orderedSections(page.specialtySections)
    : [];

  const commitmentHeading = page.commitmentHeading?.trim() || undefined;
  const commitmentBody =
    page.commitmentBody?.trim() ||
    (approachFromBody.length > 1 ? approachFromBody[approachFromBody.length - 1] : undefined);

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
    heroImage: page.heroImage?.url ? page.heroImage : undefined,
    approachHeading: page.approachHeading?.trim() || undefined,
    approachParagraphs,
    specialtySections,
    commitmentHeading,
    commitmentBody,
  };
}
