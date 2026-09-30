import type {
  Project,
  ProjectBuildStatus,
  ProjectBuildingType,
} from "@/templates/shared/cms/types/projects";

export type ProjectStatusFilter = "all" | ProjectBuildStatus;
export type ProjectTypeFilter = "all" | ProjectBuildingType;

export const PROJECT_STATUS_FILTER_OPTIONS: { value: ProjectStatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "ongoing", label: "Ongoing" },
];

export const PROJECT_TYPE_FILTER_OPTIONS: { value: ProjectTypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
];

export function getProjectBuildStatus(project: Project): ProjectBuildStatus | undefined {
  return project.metadata?.status;
}

export function getProjectBuildingType(project: Project): ProjectBuildingType | undefined {
  return project.metadata?.buildingType;
}

export function filterProjectsByStatusAndType(
  projects: Project[],
  status: ProjectStatusFilter,
  buildingType: ProjectTypeFilter,
): Project[] {
  return projects.filter((project) => {
    if (status !== "all") {
      const value = getProjectBuildStatus(project);
      if (value !== status) return false;
    }
    if (buildingType !== "all") {
      const value = getProjectBuildingType(project);
      if (value !== buildingType) return false;
    }
    return true;
  });
}

export function projectHasBeforeAfter(project: Project): boolean {
  return Boolean(project.beforeImage?.url && project.afterImage?.url);
}

export function projectsWithBeforeAfter(projects: Project[]): Project[] {
  return projects.filter(projectHasBeforeAfter);
}

export function formatProjectStatusLabel(status: ProjectBuildStatus | undefined): string | undefined {
  if (!status) return undefined;
  return status === "completed" ? "Completed" : "Ongoing";
}

export function formatBuildingTypeLabel(type: ProjectBuildingType | undefined): string | undefined {
  if (!type) return undefined;
  return type === "residential" ? "Residential" : "Commercial";
}
