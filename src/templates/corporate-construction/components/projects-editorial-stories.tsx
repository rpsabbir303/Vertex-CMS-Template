import Link from "next/link";
import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { cn } from "@/utils/cn";
import { projectIndexLabel, projectMetaLine } from "./projects-listing-plan";

type ProjectsEditorialStoriesProps = {
  projects: Project[];
  /** Absolute start index in the full portfolio */
  indexOffset: number;
  detailHref: (slug: string) => string;
};

function StoryBlock({
  project,
  index,
  detailHref,
  layout,
}: {
  project: Project;
  index: number;
  detailHref: string;
  layout: "lead" | "supporting";
}) {
  const meta = projectMetaLine(project);
  const copy = project.summary;
  const hasImage = Boolean(project.image?.url);

  return (
    <article className="group min-w-0">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.16em] text-[var(--color-accent)]">
          {projectIndexLabel(index)}
        </p>
        {meta ? (
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
            {meta}
          </p>
        ) : null}
      </div>
      <h3
        className={cn(
          "mt-2 text-balance break-words font-[family-name:var(--font-display)] font-semibold leading-snug text-[var(--color-primary)]",
          layout === "lead" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl",
        )}
      >
        <Link
          href={detailHref}
          className="transition-colors hover:text-[var(--color-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
        >
          {project.title}
        </Link>
      </h3>
      {hasImage ? (
        <Link
          href={detailHref}
          className="mt-4 block overflow-hidden border border-[var(--color-border)] [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.02] motion-reduce:[&_img]:transition-none motion-reduce:group-hover:[&_img]:scale-100"
        >
          <CmsImageMedia
            image={project.image}
            aspect={layout === "lead" ? "wide" : "card"}
            className={cn("w-full", layout === "lead" && "max-h-[20rem] md:max-h-[24rem]")}
            sizes={layout === "lead" ? "(max-width: 1024px) 100vw, 70vw" : "(max-width: 1024px) 100vw, 40vw"}
          />
        </Link>
      ) : null}
      {copy ? (
        <p className="mt-4 text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
          {copy}
        </p>
      ) : null}
      <Link
        href={detailHref}
        className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
      >
        View project
        <span aria-hidden>→</span>
      </Link>
    </article>
  );
}

export function ProjectsEditorialStories({
  projects,
  indexOffset,
  detailHref,
}: ProjectsEditorialStoriesProps) {
  if (!projects.length) {
    return null;
  }

  const [lead, ...supporting] = projects;

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="projects-editorial-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
          Selected work
        </p>
        <h2
          id="projects-editorial-heading"
          className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-primary)] md:text-3xl"
        >
          Project stories
        </h2>

        {projects.length === 1 && lead ? (
          <div className="mt-8 md:mt-10">
            <StoryBlock
              project={lead}
              index={indexOffset}
              detailHref={detailHref(lead.slug)}
              layout="lead"
            />
          </div>
        ) : null}

        {projects.length === 2 ? (
          <ul className="mt-8 grid gap-10 border-t border-[var(--color-border)] pt-8 md:mt-10 md:grid-cols-2 md:gap-10 md:divide-x md:divide-[var(--color-border)] md:pt-10">
            {projects.map((project, offset) => (
              <li key={project.id} className="min-w-0 md:px-8 md:first:pl-0 md:last:pr-0">
                <StoryBlock
                  project={project}
                  index={indexOffset + offset}
                  detailHref={detailHref(project.slug)}
                  layout="supporting"
                />
              </li>
            ))}
          </ul>
        ) : null}

        {projects.length >= 3 && lead ? (
          <div className="mt-8 grid gap-10 border-t border-[var(--color-border)] pt-8 md:mt-10 md:pt-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <StoryBlock
                project={lead}
                index={indexOffset}
                detailHref={detailHref(lead.slug)}
                layout="lead"
              />
            </div>
            <ul className="grid min-w-0 content-start gap-10 lg:col-span-5">
              {supporting.map((project, offset) => (
                <li
                  key={project.id}
                  className="min-w-0 border-t border-[var(--color-border)] pt-8 first:border-0 first:pt-0"
                >
                  <StoryBlock
                    project={project}
                    index={indexOffset + 1 + offset}
                    detailHref={detailHref(project.slug)}
                    layout="supporting"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
