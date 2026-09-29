import type { Company, CompanyAddress } from "@/templates/shared/cms/types/company";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { formatAddressInline } from "@/utils/format-address";

type CorporateAboutOverviewProps = {
  company: Company;
  /** Full company description paragraphs (CMS-driven) */
  paragraphs: string[];
  /** Prefer a secondary visual when hero already used the primary image */
  showImage?: boolean;
};

function locationLabel(address?: CompanyAddress): string | undefined {
  if (!address) {
    return undefined;
  }
  const cityRegion = [address.city, address.region].filter(Boolean).join(", ");
  return cityRegion || formatAddressInline(address);
}

export function CorporateAboutOverview({
  company,
  paragraphs,
  showImage = false,
}: CorporateAboutOverviewProps) {
  const location = locationLabel(company.address);
  const hasFacts = Boolean(company.foundedYear || location || company.name);
  const hasCopy = paragraphs.length > 0;
  const image = showImage && company.heroImage?.url ? company.heroImage : null;

  if (!hasCopy && !hasFacts && !image) {
    return null;
  }

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="about-overview-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12">
          <div className="min-w-0 lg:col-span-4">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
              Company
            </p>
            <h2
              id="about-overview-heading"
              className="mt-3 text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)] md:text-4xl"
            >
              Who we are
            </h2>
            {hasFacts ? (
              <dl className="mt-8 space-y-5 border-t border-[var(--color-border)] pt-6">
                {company.name ? (
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                      Firm
                    </dt>
                    <dd className="mt-1 text-pretty break-words text-sm font-medium text-[var(--color-text)] md:text-base">
                      {company.name}
                    </dd>
                  </div>
                ) : null}
                {company.foundedYear ? (
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                      Established
                    </dt>
                    <dd className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-primary)]">
                      {company.foundedYear}
                    </dd>
                  </div>
                ) : null}
                {location ? (
                  <div>
                    <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                      Location
                    </dt>
                    <dd className="mt-1 text-pretty break-words text-sm text-[var(--color-text)] md:text-base">
                      {location}
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
          </div>

          <div className="min-w-0 lg:col-span-8">
            {hasCopy ? (
              <div className="max-w-3xl space-y-5 text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            ) : null}
            {image ? (
              <div className={`min-w-0 ${hasCopy ? "mt-10" : ""}`}>
                <CmsImageMedia
                  image={image}
                  aspect="wide"
                  className="w-full border border-[var(--color-border)]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
