import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectDetailRelatedProps = {
  projects: Project[];
  hrefForSlug: (slug: string) => string;
};

export function ProjectDetailRelated({ projects, hrefForSlug }: ProjectDetailRelatedProps) {
  if (!projects.length) return null;

  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]" aria-labelledby="related-projects-heading">
      <div className="vertex-container py-24 md:py-32">
        <p className={ui.eyebrow}>Selected projects</p>
        <h2 id="related-projects-heading" className={cn(ui.h3, "mt-5 max-w-[16ch]")}>
          More work in similar sectors
        </h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {projects.map((project) => {
            const href = hrefForSlug(project.slug);
            const meta = [project.metadata?.sector, project.location].filter(Boolean).join(" · ");
            return (
              <li key={project.id}>
                <a href={href} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]">
                  {project.image?.url ? (
                    <div className={cn(ui.plate, "aspect-[4/3] overflow-hidden transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none")}>
                      <CmsImageMedia image={project.image} aspect="auto" className="h-full w-full object-cover" sizes="(min-width: 768px) 30vw, 100vw" />
                    </div>
                  ) : null}
                  <p className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
                    {project.title}
                  </p>
                  {meta ? <p className={cn(ui.mono, "mt-2 text-[var(--color-text-muted)]")}>{meta}</p> : null}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
