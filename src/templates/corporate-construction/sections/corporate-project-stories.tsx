import type { TemplateRenderMode } from "@/registry/template-types";
import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateProjectStoriesProps = {
  projects: Project[];
  startIndex?: number;
  total: number;
  mode: TemplateRenderMode;
};

/** Home Selected Work — up to four editorial project rows. */
export const HOME_PROJECT_STORIES_MAX = 4;

/**
 * 06 — Project stories. Alternating plate / text rows on bone.
 */
export function CorporateProjectStories({
  projects,
  startIndex = 1,
  total,
  mode,
}: CorporateProjectStoriesProps) {
  const stories = projects.slice(0, HOME_PROJECT_STORIES_MAX);
  if (!stories.length) return null;

  const indexTotal = total > 0 ? total : stories.length;

  return (
    <section className="bg-[var(--color-surface-muted)]" aria-labelledby="stories-heading">
      <div className="vertex-container py-24 md:py-32">
        <p className={ui.eyebrow}>Selected work</p>
        <h2 id="stories-heading" className="sr-only">
          Selected work
        </h2>
        <ol className="space-y-20 md:space-y-28">
          {stories.map((project, index) => {
            const flip = index % 2 === 1;
            const href = previewHref(mode, `/projects/${project.slug}`);
            const meta = [project.metadata?.sector, project.location, project.year]
              .filter(Boolean)
              .join(" · ");
            const first = project.description?.split(/\n\n+/)[0]?.trim();
            return (
              <li key={project.id} className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
                <Reveal
                  plate
                  className={cn(ui.plate, "h-[56vw] min-h-[16rem] lg:col-span-7 lg:h-[34rem]", flip && "lg:order-2")}
                >
                  <a href={href} className="block h-full" aria-label={`View ${project.title}`}>
                    <CmsImageMedia image={project.image} aspect="auto" className="h-full" sizes="(min-width: 1440px) 58vw, 100vw" />
                  </a>
                </Reveal>
                <Reveal className={cn("lg:col-span-5", flip && "lg:order-1")}>
                  <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>
                    {pad(startIndex + index)} / {pad(indexTotal)}
                    {meta ? <span className="ml-4 normal-case tracking-normal">{meta}</span> : null}
                  </p>
                  <h3 className={cn(ui.h3, "mt-4 max-w-[16ch]")}>
                    <a href={href} className="transition-colors hover:text-[var(--color-accent)]">
                      {project.title}
                    </a>
                  </h3>
                  {project.summary ? <p className={cn(ui.lead, "mt-5 max-w-md !text-lg")}>{project.summary}</p> : null}
                  {first && first !== project.summary ? <p className={cn(ui.body, "mt-4 max-w-md")}>{first}</p> : null}
                  {project.metadata?.scope || project.metadata?.duration ? (
                    <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                      {project.metadata?.scope ? (
                        <div>
                          <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>Scope</dt>
                          <dd className="mt-1 text-sm font-medium text-[var(--color-text)]">{project.metadata.scope}</dd>
                        </div>
                      ) : null}
                      {project.metadata?.duration ? (
                        <div>
                          <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>Duration</dt>
                          <dd className="mt-1 text-sm font-medium text-[var(--color-text)]">{project.metadata.duration}</dd>
                        </div>
                      ) : null}
                    </dl>
                  ) : null}
                  <a href={href} className={cn(ui.link, "mt-8")}>
                    Read the project <span aria-hidden>→</span>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
