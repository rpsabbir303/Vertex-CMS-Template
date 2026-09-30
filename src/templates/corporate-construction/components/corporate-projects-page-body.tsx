"use client";

import { useMemo, useState } from "react";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Project } from "@/templates/shared/cms/types/projects";
import { ProjectsBeforeAfterSection } from "@/templates/corporate-construction/components/projects-before-after-section";
import { ProjectsDualFilter } from "@/templates/corporate-construction/components/projects-dual-filter";
import { ProjectsSelectedShowcase } from "@/templates/corporate-construction/components/projects-selected-showcase";
import {
  filterProjectsByStatusAndType,
  type ProjectStatusFilter,
  type ProjectTypeFilter,
} from "@/templates/corporate-construction/utils/project-filters";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateProjectsPageBodyProps = {
  projects: Project[];
  mode: TemplateRenderMode;
};

export function CorporateProjectsPageBody({ projects, mode }: CorporateProjectsPageBodyProps) {
  const [status, setStatus] = useState<ProjectStatusFilter>("all");
  const [buildingType, setBuildingType] = useState<ProjectTypeFilter>("all");

  const filtered = useMemo(
    () => filterProjectsByStatusAndType(projects, status, buildingType),
    [projects, status, buildingType],
  );

  const resetFilters = () => {
    setStatus("all");
    setBuildingType("all");
  };

  return (
    <>
      <section className="bg-[var(--color-surface)]" aria-label="Selected project showcase">
        <div className="vertex-container pb-8 pt-4 md:pb-10">
          <ProjectsDualFilter
            status={status}
            buildingType={buildingType}
            onStatusChange={setStatus}
            onBuildingTypeChange={setBuildingType}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="vertex-container pb-20 md:pb-28">
            <p className={cn(ui.lead, "max-w-md")}>No projects match these filters.</p>
            <button type="button" onClick={resetFilters} className={cn(ui.link, "mt-6")}>
              View all projects
            </button>
          </div>
        ) : (
          <div
            key={`${status}-${buildingType}`}
            className="vertex-container pb-20 transition-opacity duration-300 motion-reduce:transition-none md:pb-28"
          >
            <ProjectsSelectedShowcase projects={filtered} mode={mode} />
          </div>
        )}
      </section>

      <ProjectsBeforeAfterSection projects={projects} mode={mode} />
    </>
  );
}
