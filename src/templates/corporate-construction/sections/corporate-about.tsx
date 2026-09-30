import Link from "next/link";
import type { Company } from "@/templates/shared/cms/types/company";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";

type CorporateAboutProps = {
  company: Company;
  aboutHref?: string;
  /** Editorial image for this block—must not duplicate the cinematic hero asset */
  supportingImage?: Company["heroImage"];
};

function principleParagraphs(description?: string): string[] {
  if (!description?.trim()) {
    return [];
  }
  return description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .slice(0, 4);
}

export function CorporateAbout({ company, aboutHref, supportingImage }: CorporateAboutProps) {
  const principles = principleParagraphs(company.description);
  const visual = supportingImage?.url ? supportingImage : null;

  if (!principles.length && !company.foundedYear && !visual) {
    return null;
  }

  const leadStatement =
    company.headline?.trim() ||
    company.tagline?.trim() ||
    (company.name ? `${company.name} delivers with discipline.` : undefined);

  return (
    <section
      className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      aria-labelledby="corporate-about-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-5">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
              Why this company
            </p>
            <h2
              id="corporate-about-heading"
              className="mt-3 text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.05] text-[var(--color-primary)] md:text-4xl lg:text-[2.75rem]"
            >
              {leadStatement ?? "Built for accountable delivery"}
            </h2>
            {company.foundedYear ? (
              <p className="mt-6 font-[family-name:var(--font-display)] text-5xl font-semibold leading-none text-[var(--color-accent)]">
                {company.foundedYear}
                <span className="mt-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                  Year established
                </span>
              </p>
            ) : null}
            {aboutHref ? (
              <Link
                href={aboutHref}
                className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
              >
                Company profile
                <span aria-hidden>→</span>
              </Link>
            ) : null}
          </div>

          <div className="min-w-0 lg:col-span-7">
            {principles.length ? (
              <ol className="space-y-8 border-t border-[var(--color-border)] pt-8">
                {principles.map((paragraph, index) => (
                  <li key={paragraph.slice(0, 48)} className="grid gap-4 md:grid-cols-[3.5rem_1fr]">
                    <span className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.16em] text-[var(--color-accent)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                      {paragraph}
                    </p>
                  </li>
                ))}
              </ol>
            ) : null}

            {visual ? (
              <div
                className={`overflow-hidden border border-[var(--color-border)] ${principles.length ? "mt-10" : ""}`}
              >
                <CmsImageMedia
                  image={visual}
                  aspect="wide"
                  className="w-full"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
