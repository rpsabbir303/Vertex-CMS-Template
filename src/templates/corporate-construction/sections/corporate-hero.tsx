import type { TemplateRenderMode } from "@/registry/template-types";
import type { Company } from "@/templates/shared/cms/types/company";
import { ButtonLink } from "@/templates/shared/components/ui/button-link";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";

type CorporateHeroProps = {
  company: Company;
  mode: TemplateRenderMode;
  capabilityMeta?: string;
};

function serviceAreaLine(company: Company): string | undefined {
  const { address } = company;
  if (!address) return undefined;
  const parts = [address.city, address.region].filter(Boolean);
  return parts.length ? parts.join(", ") : undefined;
}

function conciseSupport(description?: string): string | undefined {
  if (!description?.trim()) return undefined;
  const first = description.split(/\n\n+/)[0]?.trim();
  if (!first) return undefined;
  if (first.length <= 168) return first;
  const cut = first.slice(0, 168);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 90 ? cut.slice(0, lastSpace) : cut).trim()}…`;
}

export function CorporateHero({ company, mode, capabilityMeta }: CorporateHeroProps) {
  const headline = company.headline ?? company.tagline ?? company.name;
  const showCompanyName =
    Boolean(company.name) &&
    headline !== company.name &&
    Boolean(company.headline || company.tagline);
  const heroImage = company.heroImage?.url ? company.heroImage : null;
  const eyebrow = company.tagline ?? (company.headline ? company.name : undefined);
  const support = conciseSupport(company.description);
  const area = serviceAreaLine(company);

  const metaItems = [
    company.foundedYear ? `Est. ${company.foundedYear}` : null,
    area,
    capabilityMeta,
  ].filter(Boolean) as string[];

  if (heroImage) {
    return (
      <section
        className="relative min-h-[min(88vh,48rem)] border-b border-[var(--color-border)] bg-[var(--color-primary)]"
        aria-labelledby="corporate-hero-heading"
      >
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <CmsImageMedia
            image={heroImage}
            aspect="hero"
            className="h-full w-full min-h-[28rem] [&_img]:h-full [&_img]:min-h-full [&_img]:object-cover"
            sizes="100vw"
            priority
          />
          {/* Lighter overlay — keep construction photography readable */}
          <div className="absolute inset-0 bg-[var(--color-primary)]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-primary)]/95 via-[var(--color-primary)]/45 to-[var(--color-primary)]/15" />
        </div>

        <div className="vertex-container relative flex min-h-[min(88vh,48rem)] flex-col justify-end pb-12 pt-28 md:pb-16 md:pt-32 lg:pb-20">
          <div className="max-w-3xl text-[var(--color-surface)]">
            {eyebrow ? (
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-white/65">
                {eyebrow}
              </p>
            ) : null}
            <h1
              id="corporate-hero-heading"
              className="mt-5 max-w-[16ch] text-balance break-words border-l-2 border-[var(--color-accent)] pl-5 font-[family-name:var(--font-display)] text-[2.65rem] font-semibold leading-[1.02] tracking-[-0.02em] md:pl-7 md:text-5xl lg:text-[3.85rem] lg:leading-[1.0]"
            >
              {headline}
            </h1>
            {showCompanyName ? (
              <p className="mt-5 pl-5 text-pretty break-words text-base font-medium text-white/80 md:pl-7 md:text-lg">
                {company.name}
              </p>
            ) : null}
            {support ? (
              <p className="mt-5 max-w-lg pl-5 text-pretty break-words text-[0.9375rem] leading-relaxed text-white/70 md:pl-7 md:text-base">
                {support}
              </p>
            ) : null}
            <div className="mt-9 flex flex-wrap gap-3 pl-5 md:pl-7">
              <ButtonLink
                href={previewHref(mode, "/contact")}
                className="rounded-none border-transparent bg-[var(--color-accent)] px-6 text-white hover:bg-[var(--color-accent-hover)]"
              >
                Start a project
              </ButtonLink>
              <ButtonLink
                href={previewHref(mode, "/projects")}
                variant="outline"
                className="rounded-none border-white/60 bg-transparent text-white hover:bg-white hover:text-[var(--color-primary)]"
              >
                Explore our work
              </ButtonLink>
            </div>
            {metaItems.length ? (
              <ul className="mt-12 flex flex-wrap items-center gap-y-2 border-t border-white/15 pt-6 pl-5 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-white/55 md:pl-7">
                {metaItems.map((item, index) => (
                  <li key={item} className="flex items-center">
                    {index > 0 ? (
                      <span aria-hidden className="mx-4 hidden h-3 w-px bg-white/25 sm:mx-5 sm:block" />
                    ) : null}
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="corporate-hero-heading"
    >
      <div className="vertex-container py-16 md:py-20 lg:py-24">
        <div className="max-w-3xl border-l-2 border-[var(--color-accent)] pl-5 md:pl-7">
          {eyebrow ? (
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-[var(--color-secondary)]">
              {eyebrow}
            </p>
          ) : null}
          <h1
            id="corporate-hero-heading"
            className="mt-5 max-w-[16ch] text-balance break-words font-[family-name:var(--font-display)] text-[2.65rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--color-primary)] md:text-5xl lg:text-[3.5rem]"
          >
            {headline}
          </h1>
          {showCompanyName ? (
            <p className="mt-5 text-pretty break-words text-base font-medium text-[var(--color-text)] md:text-lg">
              {company.name}
            </p>
          ) : null}
          {support ? (
            <p className="mt-5 max-w-lg text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)]">
              {support}
            </p>
          ) : null}
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={previewHref(mode, "/contact")} className="rounded-none px-6">
              Start a project
            </ButtonLink>
            <ButtonLink
              href={previewHref(mode, "/projects")}
              variant="outline"
              className="rounded-none border-[var(--color-primary)] text-[var(--color-primary)]"
            >
              Explore our work
            </ButtonLink>
          </div>
          {metaItems.length ? (
            <ul className="mt-12 flex flex-wrap items-center gap-y-2 border-t border-[var(--color-border)] pt-6 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              {metaItems.map((item, index) => (
                <li key={item} className="flex items-center">
                  {index > 0 ? (
                    <span
                      aria-hidden
                      className="mx-4 hidden h-3 w-px bg-[var(--color-border)] sm:mx-5 sm:block"
                    />
                  ) : null}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
