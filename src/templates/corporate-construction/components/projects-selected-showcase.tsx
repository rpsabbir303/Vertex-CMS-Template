import type { TemplateRenderMode } from "@/registry/template-types";
import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import {
  formatBuildingTypeLabel,
  formatProjectStatusLabel,
  getProjectBuildStatus,
  getProjectBuildingType,
  PROJECTS_SHOWCASE_SIZE,
  selectShowcaseProjects,
} from "@/templates/corporate-construction/utils/project-filters";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectsSelectedShowcaseProps = {
  projects: Project[];
  mode: TemplateRenderMode;
};

type MetaRow = { label: string; value: string };

function projectMetaRows(project: Project): MetaRow[] {
  const buildingType = formatBuildingTypeLabel(getProjectBuildingType(project));
  const status = formatProjectStatusLabel(getProjectBuildStatus(project));
  const typeValue = [buildingType, project.metadata?.sector].filter(Boolean).join(" · ");

  const rows: MetaRow[] = [];
  if (typeValue) rows.push({ label: "Type", value: typeValue });
  if (status) rows.push({ label: "Status", value: status });
  if (project.location) rows.push({ label: "Location", value: project.location });
  if (project.year) rows.push({ label: "Year", value: String(project.year) });
  if (project.metadata?.scope) rows.push({ label: "Scope", value: project.metadata.scope });
  if (project.metadata?.duration) rows.push({ label: "Duration", value: project.metadata.duration });
  return rows;
}

function ShowcaseItem({
  project,
  index,
  total,
  mode,
}: {
  project: Project;
  index: number;
  total: number;
  mode: TemplateRenderMode;
}) {
  const href = previewHref(mode, `/projects/${project.slug}`);
  const flip = index % 2 === 1;
  const metaRows = projectMetaRows(project);
  const indexLabel = `${pad(index + 1)}/${pad(total)}`;

  return (
    <article className="group">
      <header className="max-w-3xl">
        <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>
          <span className="text-[var(--color-accent)]">{indexLabel}</span>
        </p>
        <h2 className={cn(ui.h3, "mt-4 max-w-[18ch] text-balance")}>
          <a href={href} className="transition-colors hover:text-[var(--color-accent)]">
            {project.title}
          </a>
        </h2>
      </header>

      <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:items-start lg:gap-12">
        <a
          href={href}
          className={cn(
            ui.plate,
            "relative block h-[58vw] min-h-[15rem] max-h-[36rem] overflow-hidden lg:col-span-7 lg:h-[34rem] lg:max-h-none",
            flip ? "lg:order-2" : "lg:order-1",
          )}
          aria-label={`View ${project.title}`}
        >
          <CmsImageMedia
            image={project.image}
            aspect="auto"
            className="h-full w-full object-cover transition-[transform] duration-700 motion-reduce:transition-none motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-within:scale-[1.03]"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
        </a>

        <div className={cn("min-w-0 lg:col-span-5", flip ? "lg:order-1" : "lg:order-2")}>
          {project.summary ? (
            <p className={cn(ui.lead, "max-w-md !text-base leading-relaxed md:!text-lg")}>{project.summary}</p>
          ) : null}

          {metaRows.length ? (
            <dl className={cn("space-y-3 border-t border-[var(--color-border)] pt-6", project.summary ? "mt-8" : "mt-0")}>
              {metaRows.map((row) => (
                <div key={row.label} className="grid grid-cols-[5.5rem_1fr] gap-3 text-sm">
                  <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{row.label}</dt>
                  <dd className="font-medium text-[var(--color-text)]">{row.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <a
            href={href}
            className={cn(
              ui.link,
              "mt-8 inline-flex transition-transform motion-reduce:transition-none motion-safe:group-hover:translate-x-0.5",
            )}
          >
            Read the project{" "}
            <span aria-hidden className="transition-transform motion-safe:group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

/**
 * Curated editorial showcase — up to four projects from filtered CMS data.
 */
export function ProjectsSelectedShowcase({ projects, mode }: ProjectsSelectedShowcaseProps) {
  const showcase = selectShowcaseProjects(projects);
  if (!showcase.length) return null;

  const total = showcase.length;

  return (
    <div>
      <p className={cn(ui.eyebrow, "mb-12 md:mb-16")}>Selected work</p>
      <ol className="space-y-20 md:space-y-28" aria-label="Selected projects">
        {showcase.map((project, index) => (
          <li key={project.id}>
            <ShowcaseItem project={project} index={index} total={total} mode={mode} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export { PROJECTS_SHOWCASE_SIZE };
