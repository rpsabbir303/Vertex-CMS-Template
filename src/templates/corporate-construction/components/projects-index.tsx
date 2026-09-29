import Link from "next/link";
import type { Project } from "@/templates/shared/cms/types/projects";
import { projectIndexLabel, projectMetaLine } from "./projects-listing-plan";

type ProjectsIndexProps = {
  projects: Project[];
  /** Absolute index in the full portfolio for numbering */
  indexOffset: number;
  detailHref: (slug: string) => string;
  dense?: boolean;
};

export function ProjectsIndex({
  projects,
  indexOffset,
  detailHref,
  dense = false,
}: ProjectsIndexProps) {
  if (!projects.length) {
    return null;
  }

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      aria-labelledby="projects-index-heading"
    >
      <div className="vertex-container py-10 md:py-12 lg:py-14">
        <div className="mb-6 flex flex-col gap-2 border-b border-[var(--color-border)] pb-6 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
              Register
            </p>
            <h2
              id="projects-index-heading"
              className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-primary)] md:text-3xl"
            >
              Project index
            </h2>
          </div>
          <p className="text-sm tabular-nums text-[var(--color-text-muted)]">
            {String(projects.length).padStart(2, "0")} listed
          </p>
        </div>

        <ol className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)] bg-[var(--color-surface)]">
          {projects.map((project, offset) => {
            const meta = projectMetaLine(project);
            const copy = dense ? undefined : project.summary;
            const absoluteIndex = indexOffset + offset;

            return (
              <li key={project.id} className="min-w-0">
                <article
                  className={
                    dense
                      ? "grid gap-3 px-4 py-5 md:grid-cols-[3.5rem_1fr_auto] md:items-baseline md:gap-6 md:px-6 md:py-5"
                      : "grid gap-3 px-5 py-6 md:grid-cols-[3.5rem_minmax(0,1.2fr)_minmax(0,1fr)_auto] md:items-start md:gap-8 md:px-6 md:py-7"
                  }
                >
                  <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.16em] text-[var(--color-accent)]">
                    {projectIndexLabel(absoluteIndex)}
                  </p>
                  <div className="min-w-0">
                    <h3 className="text-balance break-words font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-[var(--color-primary)] md:text-2xl">
                      <Link
                        href={detailHref(project.slug)}
                        className="transition-colors hover:text-[var(--color-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                      >
                        {project.title}
                      </Link>
                    </h3>
                    {meta ? (
                      <p className="mt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                        {meta}
                      </p>
                    ) : null}
                  </div>
                  {copy ? (
                    <p className="min-w-0 text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)] md:pt-1">
                      {copy}
                    </p>
                  ) : (
                    <span className="hidden md:block" aria-hidden />
                  )}
                  <Link
                    href={detailHref(project.slug)}
                    className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] md:justify-self-end"
                  >
                    View project
                    <span aria-hidden>→</span>
                  </Link>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
