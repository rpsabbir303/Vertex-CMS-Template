import Link from "next/link";
import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { cn } from "@/utils/cn";

export type ProjectCardBaseProps = {
  project: Project;
  className?: string;
  mediaClassName?: string;
  bodyClassName?: string;
  showImage?: boolean;
  detailHref?: string;
  priorityImage?: boolean;
};

export function ProjectCardBase({
  project,
  className,
  mediaClassName,
  bodyClassName,
  showImage = true,
  detailHref,
  priorityImage = false,
}: ProjectCardBaseProps) {
  const href = detailHref ?? `/projects/${project.slug}`;
  const metaLine = [
    project.metadata?.sector,
    project.location,
    project.year?.toString(),
  ]
    .filter(Boolean)
    .join(" · ");

  const hasImage = Boolean(project.image?.url);

  return (
    <article className={cn("min-w-0", className)}>
      {showImage && hasImage ? (
        <Link href={href} className="block min-w-0">
          <CmsImageMedia
            image={project.image}
            aspect="card"
            className={cn("w-full", mediaClassName)}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={priorityImage}
          />
        </Link>
      ) : null}
      <div className={cn("min-w-0", bodyClassName, hasImage && showImage ? "mt-5" : undefined)}>
        <h3 className="text-balance text-xl font-semibold text-[var(--color-text)]">
          <Link href={href} className="hover:text-[var(--color-secondary)]">
            {project.title}
          </Link>
        </h3>
        {project.summary ? (
          <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
            {project.summary}
          </p>
        ) : null}
        {metaLine ? (
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-[var(--color-text-muted)]">
            {metaLine}
          </p>
        ) : null}
      </div>
    </article>
  );
}
