import type { TemplateRenderMode } from "@/registry/template-types";
import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import {
  formatBuildingTypeLabel,
  formatProjectStatusLabel,
  getProjectBuildStatus,
  getProjectBuildingType,
} from "@/templates/corporate-construction/utils/project-filters";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectsFeaturedMomentProps = {
  project: Project;
  mode: TemplateRenderMode;
};

export function ProjectsFeaturedMoment({ project, mode }: ProjectsFeaturedMomentProps) {
  const href = previewHref(mode, `/projects/${project.slug}`);
  const status = formatProjectStatusLabel(getProjectBuildStatus(project));
  const buildingType = formatBuildingTypeLabel(getProjectBuildingType(project));
  const meta = [buildingType, project.metadata?.sector, project.location, project.year ? String(project.year) : undefined]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="bg-[var(--color-surface-muted)]" aria-labelledby="featured-moment-heading">
      <div className="vertex-container py-16 md:py-24">
        <p className={cn(ui.eyebrow)}>Project moment</p>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-5">
            <h2 id="featured-moment-heading" className={cn(ui.h2, "max-w-[14ch]")}>
              <a href={href} className="transition-colors hover:text-[var(--color-accent)]">
                {project.title}
              </a>
            </h2>
            {meta ? <p className={cn(ui.mono, "mt-4 text-[var(--color-text-muted)]")}>{meta}</p> : null}
            {status ? <p className={cn(ui.small, "mt-2 font-semibold text-[var(--color-text)]")}>{status}</p> : null}
            {project.summary ? <p className={cn(ui.lead, "mt-6 max-w-md !text-lg")}>{project.summary}</p> : null}
            <a href={href} className={cn(ui.link, "mt-8")}>
              Read the full record <span aria-hidden>→</span>
            </a>
          </div>
          <a
            href={href}
            className={cn(ui.plate, "group relative block h-[50vh] min-h-[16rem] max-h-[36rem] lg:col-span-7 lg:h-[32rem]")}
            aria-label={`View ${project.title}`}
          >
            <CmsImageMedia
              image={project.image}
              aspect="auto"
              className="h-full transition-[transform] duration-700 motion-reduce:transition-none motion-safe:group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 55vw, 100vw"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
