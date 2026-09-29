import type { TemplateRenderMode } from "@/registry/template-types";
import type { Company } from "@/templates/shared/cms/types/company";
import { ButtonLink } from "@/templates/shared/components/ui/button-link";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";

type CorporateHeroProps = {
  company: Company;
  mode: TemplateRenderMode;
};

export function CorporateHero({ company, mode }: CorporateHeroProps) {
  const headline = company.headline ?? company.tagline ?? company.name;
  const showCompanyName =
    Boolean(company.name) &&
    headline !== company.name &&
    (company.headline || company.tagline);
  const heroImage = company.heroImage?.url ? company.heroImage : null;
  const eyebrow = company.tagline ?? (company.headline ? company.name : undefined);

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="corporate-hero-heading"
    >
      <div className="vertex-container grid items-start gap-8 py-12 md:gap-10 md:py-14 lg:grid-cols-12 lg:gap-x-10 lg:py-16">
        <div className="min-w-0 border-l-2 border-[var(--color-accent)] pl-5 md:pl-7 lg:col-span-5 lg:self-center">
          {eyebrow ? (
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
              {eyebrow}
            </p>
          ) : null}
          <h1
            id="corporate-hero-heading"
            className="mt-4 max-w-xl text-balance break-words font-[family-name:var(--font-display)] text-[2.35rem] font-semibold leading-[1.05] text-[var(--color-primary)] md:text-5xl lg:text-[3.35rem]"
          >
            {headline}
          </h1>
          {showCompanyName ? (
            <p className="mt-4 text-pretty break-words text-base font-medium text-[var(--color-text)]">
              {company.name}
            </p>
          ) : null}
          {company.description ? (
            <p className="mt-5 max-w-md text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)]">
              {company.description}
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={previewHref(mode, "/contact")} className="rounded-none">
              Discuss your project
            </ButtonLink>
            <ButtonLink
              href={previewHref(mode, "/projects")}
              variant="outline"
              className="rounded-none border-[var(--color-primary)] text-[var(--color-primary)]"
            >
              View projects
            </ButtonLink>
          </div>
          {company.foundedYear ? (
            <p className="mt-10 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
              Established {company.foundedYear}
            </p>
          ) : null}
        </div>

        {heroImage ? (
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
              image={heroImage}
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
