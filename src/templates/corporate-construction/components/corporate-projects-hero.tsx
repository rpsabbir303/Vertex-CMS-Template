import type { CmsImage } from "@/templates/shared/cms/types/media";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";

type CorporateProjectsHeroProps = {
  title: string;
  description?: string;
  image?: CmsImage | null;
  projectCount?: number;
};

export function CorporateProjectsHero({
  title,
  description,
  image,
  projectCount,
}: CorporateProjectsHeroProps) {
  const hasImage = Boolean(image?.url);

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="projects-page-hero-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div
          className={
            hasImage
              ? "grid min-w-0 gap-8 lg:grid-cols-12 lg:items-end lg:gap-x-10"
              : "max-w-3xl"
          }
        >
          <div className={`min-w-0 ${hasImage ? "lg:col-span-5" : ""}`}>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
              Portfolio
            </p>
            <h1
              id="projects-page-hero-heading"
              className="mt-3 text-balance break-words font-[family-name:var(--font-display)] text-[2.15rem] font-semibold leading-[1.08] text-[var(--color-primary)] md:text-5xl lg:text-[3rem]"
            >
              {title}
            </h1>
            {description ? (
              <p className="mt-5 max-w-md text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)]">
                {description}
              </p>
            ) : null}
            {typeof projectCount === "number" && projectCount > 0 ? (
              <p className="mt-6 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                {String(projectCount).padStart(2, "0")}{" "}
                {projectCount === 1 ? "project" : "projects"}
              </p>
            ) : null}
          </div>

          {hasImage ? (
            <div className="relative min-w-0 lg:col-span-7">
              <span
                aria-hidden
                className="pointer-events-none absolute -left-2 -top-2 hidden h-10 w-10 border-l border-t border-[var(--color-primary)] lg:block"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-2 -right-2 hidden h-10 w-10 border-b border-r border-[var(--color-accent)] lg:block"
              />
              <CmsImageMedia
                image={image}
                aspect="hero"
                className="w-full"
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
