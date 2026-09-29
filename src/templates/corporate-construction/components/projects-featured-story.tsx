import Link from "next/link";
import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { cn } from "@/utils/cn";
import { projectIndexLabel, projectMetaLine } from "./projects-listing-plan";

type ProjectsFeaturedStoryProps = {
  project: Project;
  index: number;
  detailHref: string;
};

export function ProjectsFeaturedStory({
  project,
  index,
  detailHref,
}: ProjectsFeaturedStoryProps) {
  const meta = projectMetaLine(project);
  const copy = project.summary ?? project.description?.split(/\n\n+/)[0];
  const hasImage = Boolean(project.image?.url);

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby={`project-featured-${project.id}`}
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.16em] text-[var(--color-accent)]">
            {projectIndexLabel(index)}
          </p>
          {meta ? (
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
              {meta}
            </p>
          ) : null}
        </div>

        <h2
          id={`project-featured-${project.id}`}
          className="mt-3 max-w-4xl text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[var(--color-primary)] md:text-4xl lg:text-[2.75rem]"
        >
          <Link
            href={detailHref}
            className="transition-colors hover:text-[var(--color-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          >
            {project.title}
          </Link>
        </h2>

        {hasImage ? (
          <Link
            href={detailHref}
            className="group mt-8 block overflow-hidden border border-[var(--color-border)] [&_img]:transition-transform [&_img]:duration-500 hover:[&_img]:scale-[1.02] motion-reduce:[&_img]:transition-none motion-reduce:hover:[&_img]:scale-100"
          >
            <CmsImageMedia
              image={project.image}
              aspect="wide"
              className="w-full max-h-[22rem] md:max-h-[28rem] lg:max-h-[34rem]"
              sizes="100vw"
              priority
            />
          </Link>
        ) : null}

        <div
          className={cn(
            "grid min-w-0 gap-6 lg:grid-cols-12 lg:items-end",
            hasImage ? "mt-8" : "mt-6",
          )}
        >
          {copy ? (
            <p className="max-w-2xl text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg lg:col-span-8">
              {copy}
            </p>
          ) : null}
          <div className={cn(copy ? "lg:col-span-4 lg:justify-self-end" : undefined)}>
            <Link
              href={detailHref}
              className="inline-flex min-h-11 items-center gap-2 border border-[var(--color-primary)] px-5 text-sm font-semibold text-[var(--color-primary)] no-underline transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
            >
              View project
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
