import type { CmsImage } from "@/templates/shared/cms/types/media";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";

type CorporateTeamHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: CmsImage | null;
};

export function CorporateTeamHero({
  eyebrow = "People",
  title,
  description,
  image,
}: CorporateTeamHeroProps) {
  const hasImage = Boolean(image?.url);

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="team-page-hero-heading"
    >
      <div className="vertex-container grid items-start gap-8 py-12 md:gap-10 md:py-14 lg:grid-cols-12 lg:gap-x-10 lg:py-16">
        <div className="min-w-0 border-l-2 border-[var(--color-accent)] pl-5 md:pl-7 lg:col-span-5 lg:self-center">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
            {eyebrow}
          </p>
          <h1
            id="team-page-hero-heading"
            className="mt-3 max-w-xl text-balance break-words font-[family-name:var(--font-display)] text-[2.15rem] font-semibold leading-[1.08] text-[var(--color-primary)] md:text-5xl lg:text-[2.85rem]"
          >
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-md text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)]">
              {description}
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
    </section>
  );
}
