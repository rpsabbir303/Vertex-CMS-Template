import Link from "next/link";
import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { cn } from "@/utils/cn";

/** Homepage preview: one lead project plus up to three supporting (template-controlled). */
export const HOMEPAGE_FEATURED_PROJECT_LIMIT = 4;

function projectMetaParts(project: Project): { label: string; value: string }[] {
  const parts: { label: string; value: string }[] = [];
  if (project.metadata?.sector) {
    parts.push({ label: "Type", value: project.metadata.sector });
  }
  if (project.location) {
    parts.push({ label: "Location", value: project.location });
  }
  if (project.year) {
    parts.push({ label: "Year", value: String(project.year) });
  }
  return parts;
}

function projectMeta(project: Project): string | undefined {
  const line = [project.metadata?.sector, project.location, project.year?.toString()]
    .filter(Boolean)
    .join(" · ");
  return line || undefined;
}

const imageFrame =
  "overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-muted)] [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.02] motion-reduce:[&_img]:transition-none motion-reduce:group-hover:[&_img]:scale-100";

function ProjectCta({ href, className }: { href: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] motion-reduce:transition-none",
        className,
      )}
    >
      View project
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      >
        →
      </span>
    </Link>
  );
}

type FeaturedProjectLeadProps = {
  project: Project;
  detailHref: string;
  priorityImage?: boolean;
  compact?: boolean;
  indexLabel?: string;
};

export function FeaturedProjectLead({
  project,
  detailHref,
  priorityImage = false,
  compact = false,
  indexLabel = "01",
}: FeaturedProjectLeadProps) {
  const metaParts = projectMetaParts(project);
  const hasImage = Boolean(project.image?.url);

  return (
    <article className="group min-w-0">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.16em] text-[var(--color-accent)]">
          {indexLabel}
        </p>
        <h3
          className={cn(
            "min-w-0 text-balance break-words font-[family-name:var(--font-display)] font-semibold leading-tight tracking-[-0.02em] text-[var(--color-primary)]",
            compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl lg:text-[2.65rem]",
          )}
        >
          <Link
            href={detailHref}
            className="transition-colors hover:text-[var(--color-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          >
            {project.title}
          </Link>
        </h3>
      </div>

      {hasImage ? (
        <Link href={detailHref} className={cn("mt-6 block min-w-0 md:mt-7", imageFrame)}>
          <CmsImageMedia
            image={project.image}
            aspect="wide"
            className={cn(
              "w-full",
              compact
                ? "max-h-[20rem] md:max-h-[24rem]"
                : "max-h-[24rem] md:max-h-[30rem] lg:max-h-[34rem]",
            )}
            sizes="(max-width: 1024px) 100vw, 70vw"
            priority={priorityImage}
          />
        </Link>
      ) : null}

      <div className={cn("min-w-0", hasImage ? "mt-6" : "mt-4")}>
        {metaParts.length ? (
          <dl className="flex flex-wrap gap-x-6 gap-y-2">
            {metaParts.map((part) => (
              <div key={part.label} className="min-w-0">
                <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  {part.label}
                </dt>
                <dd className="mt-1 text-sm font-medium text-[var(--color-text)]">{part.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        {project.summary ? (
          <p
            className={cn(
              "max-w-2xl text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base",
              metaParts.length ? "mt-4" : undefined,
            )}
          >
            {project.summary}
          </p>
        ) : null}
        <ProjectCta href={detailHref} />
      </div>
    </article>
  );
}

type FeaturedProjectSecondaryProps = {
  project: Project;
  detailHref: string;
  indexLabel: string;
  layout?: "stack" | "rail";
};

export function FeaturedProjectSecondary({
  project,
  detailHref,
  indexLabel,
  layout = "rail",
}: FeaturedProjectSecondaryProps) {
  const meta = projectMeta(project);
  const hasImage = Boolean(project.image?.url);

  return (
    <article
      className={cn(
        "group min-w-0",
        layout === "rail" && hasImage && "grid gap-4 sm:grid-cols-[8rem_1fr] sm:items-start",
        layout === "stack" && "flex min-w-0 flex-col",
      )}
    >
      {layout === "stack" ? (
        <>
          <p className="font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.16em] text-[var(--color-accent)]">
            {indexLabel}
          </p>
          <h3 className="mt-2 text-balance break-words font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-[var(--color-primary)]">
            <Link
              href={detailHref}
              className="transition-colors hover:text-[var(--color-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
            >
              {project.title}
            </Link>
          </h3>
          {hasImage ? (
            <Link href={detailHref} className={cn("mt-4 block min-w-0 self-start", imageFrame)}>
              <CmsImageMedia
                image={project.image}
                aspect="wide"
                className="w-full"
                sizes="(max-width: 1024px) 100vw, 30vw"
              />
            </Link>
          ) : null}
          {meta ? (
            <p className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
              {meta}
            </p>
          ) : null}
          {project.summary ? (
            <p className="mt-2 text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)]">
              {project.summary}
            </p>
          ) : null}
          <ProjectCta href={detailHref} className="mt-2" />
        </>
      ) : (
        <>
          {hasImage ? (
            <Link href={detailHref} className={cn("block min-w-0 self-start", imageFrame)}>
              <CmsImageMedia
                image={project.image}
                aspect="card"
                className="w-full"
                sizes="(max-width: 768px) 40vw, 160px"
              />
            </Link>
          ) : null}
          <div className="min-w-0">
            <p className="font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.16em] text-[var(--color-accent)]">
              {indexLabel}
            </p>
            <h3 className="mt-2 text-balance break-words font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-[var(--color-primary)]">
              <Link
                href={detailHref}
                className="transition-colors hover:text-[var(--color-secondary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
              >
                {project.title}
              </Link>
            </h3>
            {meta ? (
              <p className="mt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
                {meta}
              </p>
            ) : null}
            {project.summary ? (
              <p className="mt-2 text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)]">
                {project.summary}
              </p>
            ) : null}
            <ProjectCta href={detailHref} className="mt-2" />
          </div>
        </>
      )}
    </article>
  );
}

/** Slice featured CMS projects to the homepage preview cap. */
export function homepageFeaturedProjects(projects: Project[]): Project[] {
  return projects.slice(0, HOMEPAGE_FEATURED_PROJECT_LIMIT);
}

export function projectDetailHref(previewBase: string, slug: string): string {
  return `${previewBase}/projects/${slug}`;
}

export function projectIndexLabel(index: number): string {
  return String(index + 1).padStart(2, "0");
}
