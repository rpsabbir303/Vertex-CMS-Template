"use client";

import type { Project } from "@/templates/shared/cms/types/projects";
import { ProjectImageCompare } from "@/templates/corporate-construction/components/project-image-compare";
import {
  formatBuildingTypeLabel,
  formatProjectStatusLabel,
  getProjectBuildStatus,
  getProjectBuildingType,
  projectHasBeforeAfter,
} from "@/templates/corporate-construction/utils/project-filters";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectBeforeAfterBlockProps = {
  project: Project;
  /** When set, title and CTA link to project detail. Omit on the detail page itself. */
  detailHref?: string;
  headingId?: string;
  className?: string;
};

export function ProjectBeforeAfterBlock({
  project,
  detailHref,
  headingId = "before-after-heading",
  className,
}: ProjectBeforeAfterBlockProps) {
  if (!projectHasBeforeAfter(project) || !project.beforeImage?.url || !project.afterImage?.url) {
    return null;
  }

  const status = formatProjectStatusLabel(getProjectBuildStatus(project));
  const buildingType = formatBuildingTypeLabel(getProjectBuildingType(project));
  const sectorLine = [buildingType, project.metadata?.sector].filter(Boolean).join(" / ");

  const titleClass = cn(ui.h3, "max-w-[20ch]");

  return (
    <div className={className}>
      <p className={cn(ui.eyebrow)}>Before / After</p>
      <h2 id={headingId} className={cn(ui.h2, "mt-5 max-w-[18ch]")}>
        From existing conditions to finished environments.
      </h2>
      <p className={cn(ui.lead, "mt-6 max-w-2xl")}>
        Show the transformation behind selected projects — from the starting condition through completed delivery.
      </p>

      <div className="mt-10">
        <ProjectImageCompare beforeImage={project.beforeImage} afterImage={project.afterImage} />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-start">
        <div className="md:col-span-7">
          {detailHref ? (
            <h3 className={titleClass}>
              <a href={detailHref} className="transition-colors hover:text-[var(--color-accent)]">
                {project.title}
              </a>
            </h3>
          ) : (
            <h3 className={titleClass}>{project.title}</h3>
          )}
          {project.location ? (
            <p className={cn(ui.mono, "mt-2 text-[var(--color-text-muted)]")}>{project.location}</p>
          ) : null}
          {sectorLine ? <p className={cn(ui.small, "mt-3 font-medium text-[var(--color-text)]")}>{sectorLine}</p> : null}
          {status ? <p className={cn(ui.mono, "mt-2 text-[var(--color-text-muted)]")}>{status}</p> : null}
        </div>
        <div className="md:col-span-5">
          {project.summary ? <p className={cn(ui.body, "max-w-md")}>{project.summary}</p> : null}
          {detailHref ? (
            <a href={detailHref} className={cn(ui.link, "mt-6")}>
              Project detail <span aria-hidden>→</span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
