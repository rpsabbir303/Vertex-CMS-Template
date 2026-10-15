import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Company } from "@/templates/shared/cms/types/company";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { ui } from "@/templates/modern-contractor/theme/ui";
import { cn } from "@/utils/cn";

type ModernHeroProps = {
  company: Company;
  mode: TemplateRenderMode;
  meta?: string[];
  marquee?: string[];
  place?: string;
};

/**
 * Full-bleed photograph. Copy sits on the image, not in a type column beside it.
 */
export function ModernHero({ company, mode, meta, marquee, place }: ModernHeroProps) {
  const description = company.description?.split(/\n\n+/)[0]?.trim();
  const headline = company.headline?.trim() || company.tagline?.trim() || company.name;
  const facts = [
    company.foundedYear ? `Est. ${company.foundedYear}` : undefined,
    place,
    ...(meta ?? []),
  ].filter((item): item is string => Boolean(item));

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[var(--mc-ink)] text-white">
      {company.heroImage?.url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={company.heroImage.url}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,46,43,0.15)_0%,rgba(26,46,43,0.05)_28%,rgba(26,46,43,0.55)_62%,rgba(26,46,43,0.92)_100%)]"
        aria-hidden
      />

      <div className="relative flex min-h-[100svh] flex-col justify-end pt-28">
        <div className="vertex-container pb-10 md:pb-14">
          <p className={cn(ui.mono, "text-white/75")}>
            {company.tagline?.trim() || company.name}
          </p>
          <h1 className="mt-4 max-w-[16ch] text-balance font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,6.25rem)] font-medium leading-[0.96] tracking-[-0.04em] text-white">
            {headline}
          </h1>

          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            {description ? (
              <p className="max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">{description}</p>
            ) : (
              <span />
            )}
            <div className="flex flex-wrap gap-3">
              <Link
                href={previewHref(mode, "/contact")}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[var(--mc-ink)] transition-colors hover:bg-[var(--color-accent-muted)]"
              >
                Start a project
              </Link>
              <Link
                href={previewHref(mode, "/projects")}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/40 px-6 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                See the work
              </Link>
            </div>
          </div>

          {facts.length ? (
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/20 pt-6">
              {facts.map((item) => (
                <li key={item} className={cn(ui.mono, "text-[0.6875rem] text-white/70")}>
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {marquee?.length ? (
          <div className="border-t border-white/15 bg-[var(--mc-ink)]/80 py-4 backdrop-blur-sm">
            <div className="mc-marquee">
              <div className="mc-marquee-track items-center gap-8 px-6">
                {[...marquee, ...marquee].map((label, index) => (
                  <span key={`${label}-${index}`} className="flex shrink-0 items-center gap-8">
                    <span className="text-sm font-medium text-white/80">{label}</span>
                    <span className="h-1 w-1 rounded-full bg-white/50" aria-hidden />
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
