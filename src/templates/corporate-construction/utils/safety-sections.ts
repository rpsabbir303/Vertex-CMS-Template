import type { OptionalPage, SafetySection, SafetySectionLayoutType } from "@/templates/shared/cms/types/pages";

const DEFAULT_LAYOUTS: SafetySectionLayoutType[] = [
  "editorialSplit",
  "immersiveDark",
  "peopleFeature",
  "technicalList",
  "timeline",
  "evidence",
];

function orderedSafetySections(sections: SafetySection[]): SafetySection[] {
  return sections
    .filter((s) => s.title?.trim())
    .map((item, index) => ({ item, index }))
    .sort((a, b) => (a.item.number ?? a.index + 1) - (b.item.number ?? b.index + 1))
    .map(({ item }) => item);
}

function practicesToSections(page: OptionalPage): SafetySection[] {
  const practices = (page.practices ?? [])
    .filter((p) => p.title?.trim())
    .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));

  return practices.map((practice, index) => ({
    number: index + 1,
    slug: practice.id,
    title: practice.title,
    description: practice.description,
    image: practice.image,
    layoutType: DEFAULT_LAYOUTS[index] ?? "editorialSplit",
  }));
}

export function resolveSafetySections(page: OptionalPage): SafetySection[] {
  if (page.safetySections?.length) {
    return orderedSafetySections(page.safetySections);
  }
  return practicesToSections(page);
}

export function splitSafetyContent(text?: string): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}
