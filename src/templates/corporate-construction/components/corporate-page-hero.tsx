import type { CmsImage } from "@/templates/shared/cms/types/media";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";

type CorporatePageHeroProps = {
  eyebrow?: string;
  title: string;
  summary?: string;
  image?: CmsImage | null;
};

export function CorporatePageHero({
  eyebrow,
  title,
  summary,
  image,
}: CorporatePageHeroProps) {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="vertex-container grid items-end gap-10 py-14 md:py-20 lg:grid-cols-12 lg:py-24">
        <div className="min-w-0 lg:col-span-6">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-4 text-balance font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] text-[var(--color-primary)] md:text-5xl">
            {title}
          </h1>
          {summary ? (
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
              {summary}
            </p>
          ) : null}
        </div>
        {image?.url ? (
          <div className="min-w-0 lg:col-span-6">
            <CmsImageMedia
              image={image}
              aspect="card"
              className="w-full"
              sizes="(max-width: 1024px) 100vw, 46vw"
              priority
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
