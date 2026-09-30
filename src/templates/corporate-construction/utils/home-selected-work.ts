import type { Project } from "@/templates/shared/cms/types/projects";

/** Home page Selected Work — exactly four published projects when available. */
export const HOME_SELECTED_WORK_COUNT = 4;

/**
 * Featured projects first (CMS sort order), then other projects with images until four are selected.
 */
export function selectHomeSelectedWorkProjects(projects: Project[]): Project[] {
  const picked: Project[] = [];
  const seen = new Set<string>();

  const add = (project: Project) => {
    if (picked.length >= HOME_SELECTED_WORK_COUNT || seen.has(project.id)) return;
    if (!project.image?.url) return;
    picked.push(project);
    seen.add(project.id);
  };

  for (const project of projects) {
    if (project.featured) add(project);
  }
  for (const project of projects) {
    add(project);
  }

  return picked;
}
