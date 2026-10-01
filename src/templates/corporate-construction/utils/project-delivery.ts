import type {
  Project,
  ProjectDeliveryStage,
  ProjectDeliveryStageSlug,
} from "@/templates/shared/cms/types/projects";
import { formatBuildingTypeLabel, getProjectBuildingType } from "@/templates/corporate-construction/utils/project-filters";

/** Shared delivery framework — titles only; project copy lives in CMS. */
export const DELIVERY_STAGE_FRAMEWORK: ReadonlyArray<{
  number: number;
  slug: ProjectDeliveryStageSlug;
  title: string;
}> = [
  { number: 1, slug: "discover", title: "Discover" },
  { number: 2, slug: "plan", title: "Plan" },
  { number: 3, slug: "build", title: "Build" },
  { number: 4, slug: "control", title: "Control" },
  { number: 5, slug: "deliver", title: "Deliver" },
];

export type ResolvedProjectDeliveryStage = (typeof DELIVERY_STAGE_FRAMEWORK)[number] & ProjectDeliveryStage;

export function projectHeroTitleLines(title: string): { primary: string; secondary?: string } {
  const parts = title.trim().split(/\s+/);
  if (parts.length <= 1) return { primary: title };
  return { primary: parts[0], secondary: parts.slice(1).join(" ") };
}

export function splitNarrative(text: string | undefined): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function projectOverviewFacts(project: Project): Array<{ label: string; value: string }> {
  const buildingType = formatBuildingTypeLabel(getProjectBuildingType(project));
  const entries: Array<{ label: string; value: string | undefined }> = [
    { label: "Sector", value: project.metadata?.sector },
    { label: "Location", value: project.location },
    { label: "Year", value: project.year ? String(project.year) : undefined },
    { label: "Duration", value: project.metadata?.duration },
    { label: "Project type", value: project.metadata?.projectType ?? buildingType },
    { label: "Scope", value: project.metadata?.scope },
    { label: "Size", value: project.metadata?.size },
    { label: "Delivery method", value: project.metadata?.deliveryMethod },
    { label: "Client", value: project.metadata?.client },
  ];
  return entries.filter((e): e is { label: string; value: string } => Boolean(e.value?.trim()));
}

export function projectHeroMeta(project: Project): Array<{ label: string; value: string }> {
  const facts = projectOverviewFacts(project);
  const pick = (label: string) => facts.find((f) => f.label.toLowerCase() === label.toLowerCase());
  const ordered = ["Sector", "Location", "Year", "Scope", "Duration"]
    .map((label) => pick(label))
    .filter((f): f is { label: string; value: string } => Boolean(f));
  return ordered.length ? ordered : facts.slice(0, 5);
}

export function stageHasContent(stage: ProjectDeliveryStage): boolean {
  if (stage.narrative?.trim()) return true;
  if (stage.insight?.body?.trim()) return true;
  if (stage.images?.some((img) => img.url)) return true;
  if (stage.milestones?.length) return true;
  if (stage.controlPillars?.length) return true;
  if (stage.buildPhases?.length) return true;
  if (stage.metrics?.length) return true;
  if (stage.progress?.currentPhaseLabel?.trim()) return true;
  if (stage.progress?.milestoneLabels?.length) return true;
  if (typeof stage.progress?.progressPercent === "number") return true;
  return false;
}

export function resolveDeliveryStages(project: Project): ResolvedProjectDeliveryStage[] {
  const fromCms = project.deliveryStages ?? [];
  const bySlug = new Map(fromCms.map((s) => [s.slug, s]));

  return DELIVERY_STAGE_FRAMEWORK.flatMap((frame) => {
    const cms = bySlug.get(frame.slug);
    if (!cms || !stageHasContent(cms)) return [];
    return [{ ...frame, ...cms, slug: frame.slug }];
  });
}

export function resolveProjectIntroduction(project: Project): string | undefined {
  const intro = project.introduction?.trim() || project.description?.trim();
  return intro || undefined;
}

export function resolveRelatedProjects(project: Project, all: Project[], limit = 3): Project[] {
  const slugs = project.relatedProjectSlugs?.filter(Boolean) ?? [];
  const picked: Project[] = [];
  for (const slug of slugs) {
    const match = all.find((p) => p.slug === slug && p.id !== project.id);
    if (match) picked.push(match);
    if (picked.length >= limit) return picked;
  }

  const sector = project.metadata?.sector;
  const sameSector = all.filter(
    (p) => p.id !== project.id && sector && p.metadata?.sector === sector && !picked.some((x) => x.id === p.id),
  );
  for (const p of sameSector) {
    picked.push(p);
    if (picked.length >= limit) return picked;
  }

  for (const p of all) {
    if (p.id === project.id || picked.some((x) => x.id === p.id)) continue;
    picked.push(p);
    if (picked.length >= limit) break;
  }
  return picked.slice(0, limit);
}

export function deliveryStageDomId(slug: ProjectDeliveryStageSlug): string {
  return `project-stage-${slug}`;
}
