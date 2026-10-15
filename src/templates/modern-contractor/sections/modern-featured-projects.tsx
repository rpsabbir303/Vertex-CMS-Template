import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { Reveal } from "@/templates/modern-contractor/components/ui/reveal";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { ui } from "@/templates/modern-contractor/theme/ui";
import { cn } from "@/utils/cn";

type ModernFeaturedProjectsProps = {
  projects: Project[];
  mode: TemplateRenderMode;
};

export function ModernFeaturedProjects({ projects, mode }: ModernFeaturedProjectsProps) {
  const items = projects.slice(0, 3);
  if (!items.length) return null;
  const [lead, ...rest] = items;

  return (
    <section className={cn(ui.section, "bg-[var(--color-surface)]")} aria-labelledby="modern-work-heading">
      <div className="vertex-container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={ui.eyebrow}>Selected work</p>
            <h2 id="modern-work-heading" className={cn(ui.h2, "mt-3 max-w-[12ch]")}>
              Recent buildings, told plainly.
            </h2>
          </div>
          <Link href={previewHref(mode, "/projects")} className={ui.link}>
            All projects
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          {lead ? (
            <Reveal className="lg:col-span-7">
              <ProjectCard project={lead} mode={mode} large />
            </Reveal>
          ) : null}
          <div className="grid gap-6 lg:col-span-5">
            {rest.map((project, index) => (
              <Reveal key={project.id} delay={(index + 1) as 1 | 2}>
                <ProjectCard project={project} mode={mode} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  mode,
  large,
}: {
  project: Project;
  mode: TemplateRenderMode;
  large?: boolean;
}) {
  const meta = [project.metadata?.sector, project.location, project.year ? String(project.year) : undefined]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <Link href={previewHref(mode, `/projects/${project.slug}`)} className="group block">
      <div
        className={cn(
          "mc-frame bg-[var(--color-surface-muted)]",
          large ? "aspect-[4/5] sm:aspect-[5/4]" : "aspect-[16/10]",
        )}
      >
        {project.image?.url ? (
          <CmsImageMedia
            image={project.image}
            aspect="auto"
            className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
            sizes={large ? "(min-width: 1024px) 46vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"}
          />
        ) : null}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          {meta ? <p className={cn(ui.mono, "text-[0.625rem] text-[var(--color-text-muted)]")}>{meta}</p> : null}
          <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-text)] group-hover:text-[var(--color-accent)]">
            {project.title}
          </h3>
        </div>
        <span
          aria-hidden
          className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text)] transition-colors group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]"
        >
          →
        </span>
      </div>
      {large && project.summary ? <p className={cn(ui.body, "mt-3 max-w-xl")}>{project.summary}</p> : null}
    </Link>
  );
}
