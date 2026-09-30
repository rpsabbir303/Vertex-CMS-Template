import type { TemplateRenderMode } from "@/registry/template-types";
import type { Company } from "@/templates/shared/cms/types/company";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { Marquee } from "@/templates/corporate-construction/components/ui/marquee";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateHeroProps = {
  company: Company;
  mode: TemplateRenderMode;
  meta?: string[];
  marquee?: string[];
};

function serviceAreaLine(company: Company): string | undefined {
  const parts = [company.address?.city, company.address?.region].filter(Boolean);
  return parts.length ? parts.join(", ") : undefined;
}

/**
 * 01 — Opener. Type first, then one large plate, then a live spec strip.
 */
export function CorporateHero({ company, mode, meta = [], marquee = [] }: CorporateHeroProps) {
  const headline = company.headline?.trim() || company.name;
  const support = company.description?.trim();
  const area = serviceAreaLine(company);
  const rail = [
    company.foundedYear ? `Est. ${company.foundedYear}` : undefined,
    area,
    ...meta,
  ].filter((v): v is string => Boolean(v));

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)]">
      <div className="cc-grid pointer-events-none absolute inset-x-0 top-0 h-[44rem]" aria-hidden />

      <div className="vertex-container relative pt-40 md:pt-48">
        {rail.length ? (
          <ul className={cn(ui.mono, "cc-rise flex flex-wrap gap-x-6 gap-y-2 text-[var(--color-text-muted)]")}>
            {rail.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        <h1
          className="cc-rise mt-8 max-w-[15ch] text-balance font-[family-name:var(--font-display)] text-[clamp(2.875rem,6.6vw,7rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-[var(--color-primary)]"
          data-delay="1"
        >
          {headline}
        </h1>

        <div className="cc-rise mt-12 grid gap-8 md:grid-cols-12 md:items-end" data-delay="2">
          {support ? <p className={cn(ui.lead, "max-w-xl md:col-span-7")}>{support}</p> : null}
          <div className={cn("flex flex-wrap gap-3 md:col-span-5 md:justify-end", !support && "md:col-span-12 md:justify-start")}>
            <a href={previewHref(mode, "/contact")} className={ui.btn}>
              Start a project
            </a>
            <a href={previewHref(mode, "/projects")} className={ui.btnGhost}>
              See the work
            </a>
          </div>
        </div>
      </div>

      {company.heroImage?.url ? (
        <div className="vertex-container relative mt-16 md:mt-20">
          <Reveal plate className={cn(ui.plate, "relative h-[62vh] min-h-[20rem] max-h-[52rem]")}>
            <CmsImageMedia
              image={company.heroImage}
              aspect="auto"
              className="h-full"
              sizes="100vw"
              priority
            />
            {company.tagline ? (
              <p
                className={cn(
                  ui.mono,
                  "absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1.5 text-[var(--color-primary)] backdrop-blur md:bottom-6 md:left-6",
                )}
              >
                {company.tagline}
              </p>
            ) : null}
          </Reveal>
        </div>
      ) : null}

      {marquee.length ? (
        <div className="mt-10 border-y border-[var(--color-primary)]/10 py-4">
          <Marquee items={marquee} />
        </div>
      ) : null}
    </section>
  );
}
