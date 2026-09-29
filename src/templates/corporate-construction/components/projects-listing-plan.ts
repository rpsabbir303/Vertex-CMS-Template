import type { Project } from "@/templates/shared/cms/types/projects";

export function projectMetaLine(project: Project): string | undefined {
  const line = [project.metadata?.sector, project.location, project.year?.toString()]
    .filter(Boolean)
    .join(" · ");
  return line || undefined;
}

export function projectIndexLabel(index: number): string {
  return String(index + 1).padStart(2, "0");
}

/**
 * Select primary project: first featured in display order, else first sorted item.
 */
export function selectPrimaryProject(projects: Project[]): {
  primary: Project | null;
  rest: Project[];
  all: Project[];
} {
  if (!projects.length) {
    return { primary: null, rest: [], all: [] };
  }
  const featured = projects.find((project) => project.featured);
  const primary = featured ?? projects[0];
  const rest = projects.filter((project) => project.id !== primary.id);
  return { primary, rest, all: projects };
}

export type ProjectsPagePlan = {
  showIndex: boolean;
  editorial: Project[];
  indexProjects: Project[];
  denseIndex: boolean;
};

/**
 * Adaptive listing plan — image-led without an endlessly tall page.
 */
export function planProjectsListing(rest: Project[], totalCount: number): ProjectsPagePlan {
  if (totalCount <= 1) {
    return { showIndex: false, editorial: [], indexProjects: [], denseIndex: false };
  }

  // 2–3: featured + editorial stories for the remaining projects
  if (totalCount <= 3) {
    return {
      showIndex: false,
      editorial: rest,
      indexProjects: [],
      denseIndex: false,
    };
  }

  // 4–6: featured + visual stories for up to two remaining + register for the rest
  if (totalCount <= 6) {
    const withImage = rest.filter((p) => p.image?.url);
    const editorial = (withImage.length >= 2 ? withImage : rest).slice(0, 2);
    const editorialIds = new Set(editorial.map((p) => p.id));
    const indexProjects = rest.filter((p) => !editorialIds.has(p.id));
    return {
      showIndex: indexProjects.length > 0,
      editorial,
      indexProjects,
      denseIndex: false,
    };
  }

  // 7–9: structured register of remaining projects
  if (totalCount < 10) {
    return {
      showIndex: true,
      editorial: [],
      indexProjects: rest,
      denseIndex: false,
    };
  }

  // 10+: dense register of remaining projects (avoids duplicating visual highlights)
  return {
    showIndex: true,
    editorial: [],
    indexProjects: rest,
    denseIndex: true,
  };
}
