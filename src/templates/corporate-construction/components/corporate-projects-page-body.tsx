"use client";

import { useMemo, useState } from "react";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Project } from "@/templates/shared/cms/types/projects";
import { ProjectsBeforeAfterSection } from "@/templates/corporate-construction/components/projects-before-after-section";
import { ProjectsDualFilter } from "@/templates/corporate-construction/components/projects-dual-filter";
import { ProjectsEditorialItem } from "@/templates/corporate-construction/components/projects-editorial-item";
import { ProjectsFeaturedMoment } from "@/templates/corporate-construction/components/projects-featured-moment";
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

function pickFeaturedMoment(projects: Project[]): Project | undefined {
  return projects.find((p) => p.featured) ?? projects[0];
}

export function CorporateProjectsPageBody({ projects, mode }: CorporateProjectsPageBodyProps) {
  const [status, setStatus] = useState<ProjectStatusFilter>("all");
  const [buildingType, setBuildingType] = useState<ProjectTypeFilter>("all");

  const filtered = useMemo(
    () => filterProjectsByStatusAndType(projects, status, buildingType),
    [projects, status, buildingType],
  );

  const featured = useMemo(() => pickFeaturedMoment(filtered), [filtered]);
  const firstChunk = filtered.slice(0, 2);
  const restChunk = filtered.slice(2);
  const insertMomentAfterFirst = filtered.length > 2 && featured;

  const resetFilters = () => {
    setStatus("all");
    setBuildingType("all");
  };

  return (
    <>
      <section className="bg-[var(--color-surface)]" aria-label="Project exploration">
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
            className="vertex-container space-y-20 pb-20 transition-opacity duration-300 motion-reduce:transition-none md:space-y-28 md:pb-28"
          >
            {firstChunk.map((project, index) => (
              <ProjectsEditorialItem key={project.id} project={project} index={index} mode={mode} />
            ))}
          </div>
        )}
      </section>

      {insertMomentAfterFirst && featured ? <ProjectsFeaturedMoment project={featured} mode={mode} /> : null}

      <ProjectsBeforeAfterSection projects={projects} mode={mode} />

      {restChunk.length > 0 ? (
        <section className="bg-[var(--color-surface-muted)]" aria-label="More projects">
          <div className="vertex-container space-y-20 py-20 md:space-y-28 md:py-28">
            {restChunk.map((project, index) => (
              <ProjectsEditorialItem
                key={project.id}
                project={project}
                index={index + firstChunk.length}
                mode={mode}
              />
            ))}
          </div>
        </section>
      ) : null}

      {filtered.length > 0 && filtered.length <= 2 && featured && !insertMomentAfterFirst ? (
        <ProjectsFeaturedMoment project={featured} mode={mode} />
      ) : null}
    </>
  );
}
