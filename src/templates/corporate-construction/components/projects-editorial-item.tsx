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
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectsEditorialItemProps = {
  project: Project;
  index: number;
  mode: TemplateRenderMode;
};

export function ProjectsEditorialItem({ project, index, mode }: ProjectsEditorialItemProps) {
  const href = previewHref(mode, `/projects/${project.slug}`);
  const variant = index % 3;
  const flip = variant === 1;
  const wide = variant === 2;

  const status = formatProjectStatusLabel(getProjectBuildStatus(project));
  const buildingType = formatBuildingTypeLabel(getProjectBuildingType(project));
  const typeLine = [buildingType, project.metadata?.sector].filter(Boolean).join(" · ");

  const imageHeights = wide
    ? "h-[52vw] min-h-[14rem] max-h-[28rem] md:h-[22rem] lg:h-[26rem]"
    : flip
      ? "h-[62vw] min-h-[16rem] max-h-[32rem] lg:h-[36rem]"
      : "h-[58vw] min-h-[15rem] max-h-[30rem] lg:h-[34rem]";

  return (
    <article className={cn("group grid gap-8 lg:items-center lg:gap-12", wide ? "lg:grid-cols-1" : "lg:grid-cols-12")}>
      <a
        href={href}
        className={cn(
          ui.plate,
          "group relative block overflow-hidden",
          imageHeights,
          wide ? "lg:col-span-12" : flip ? "lg:order-2 lg:col-span-7" : "lg:col-span-7",
        )}
      >
        <CmsImageMedia
          image={project.image}
          aspect="auto"
          className="h-full transition-[transform] duration-700 motion-reduce:transition-none motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]"
          sizes="(min-width: 1024px) 58vw, 100vw"
        />
      </a>

      <div className={cn("min-w-0", wide ? "max-w-2xl" : flip ? "lg:order-1 lg:col-span-5" : "lg:col-span-5")}>
        <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>
          {pad(index + 1)}
          {project.year ? <span className="ml-4">{project.year}</span> : null}
          {status ? (
            <span className="ml-4 text-[var(--color-text)]">{status}</span>
          ) : null}
        </p>
        <h2 className={cn(ui.h3, "mt-4 max-w-[18ch] text-balance")}>
          <a href={href} className="transition-colors hover:text-[var(--color-accent)]">
            {project.title}
          </a>
        </h2>
        {project.location ? (
          <p className={cn(ui.mono, "mt-3 text-[var(--color-text-muted)]")}>{project.location}</p>
        ) : null}
        {typeLine ? <p className={cn(ui.small, "mt-2 font-medium text-[var(--color-text)]")}>{typeLine}</p> : null}
        {project.summary ? <p className={cn(ui.lead, "mt-5 max-w-md !text-base md:!text-lg")}>{project.summary}</p> : null}
        {project.metadata?.scope ? (
          <p className={cn(ui.body, "mt-4 max-w-md")}>
            <span className={cn(ui.mono, "text-[var(--color-text-muted)]")}>Scope · </span>
            {project.metadata.scope}
          </p>
        ) : null}
        <a
          href={href}
          className={cn(
            ui.link,
            "mt-6 inline-flex transition-transform motion-safe:group-hover:translate-x-0.5 motion-reduce:transition-none",
          )}
        >
          View project <span aria-hidden className="transition-transform motion-safe:group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </article>
  );
}
