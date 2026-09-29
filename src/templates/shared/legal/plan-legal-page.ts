import type { LegalSection, OptionalPage } from "@/templates/shared/cms/types/pages";
import {
  LEGAL_PAGE_TITLES,
  isLegalPageSlug,
} from "@/templates/shared/cms/types/pages";

export type PlannedLegalPage = {
  title: string;
  effectiveDate?: string;
  intro?: string;
  sections: LegalSection[];
  isPublished: boolean;
  hasContent: boolean;
};

function orderedSections(sections: LegalSection[]): LegalSection[] {
  return sections
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const orderA = a.item.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.item.sortOrder ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB || a.index - b.index;
    })
    .map(({ item }) => item)
    .filter((item) => item.heading?.trim() && item.content?.trim())
    .map((item) => ({
      ...item,
      id: item.id || slugifyHeading(item.heading),
      heading: item.heading.trim(),
      content: item.content.trim(),
    }));
}

export function slugifyHeading(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
}

/**
 * Normalize optional-page CMS fields into a legal document model.
 * Falls back to body paragraphs when structured sections are absent.
 */
export function planLegalPage(page: OptionalPage): PlannedLegalPage {
  const slug = page.slug.toLowerCase();
  const defaultTitle = isLegalPageSlug(slug) ? LEGAL_PAGE_TITLES[slug] : page.title;
  const title = page.headline?.trim() || page.title?.trim() || defaultTitle;

  const sections = orderedSections(page.sections ?? []);
  const intro =
    page.intro?.trim() ||
    (sections.length
      ? undefined
      : page.body
          ?.split(/\n\n+/)
          .map((p) => p.trim())
          .filter(Boolean)[0]);

  // Body-only fallback: remaining paragraphs become a single untitled section if no sections.
  let resolvedSections = sections;
  if (!resolvedSections.length && page.body?.trim()) {
    const paragraphs = page.body
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
    const bodyAfterIntro = intro && paragraphs[0] === intro ? paragraphs.slice(1) : paragraphs;
    if (bodyAfterIntro.length) {
      resolvedSections = [
        {
          id: "content",
          heading: "Overview",
          content: bodyAfterIntro.join("\n\n"),
          sortOrder: 1,
        },
      ];
    }
  }

  const isPublished = page.enabled !== false;
  const hasContent = Boolean(intro || resolvedSections.length);

  return {
    title,
    effectiveDate: page.effectiveDate?.trim() || undefined,
    intro,
    sections: resolvedSections,
    isPublished,
    hasContent: isPublished && hasContent,
  };
}
