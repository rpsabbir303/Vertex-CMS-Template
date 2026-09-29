import type { Certification } from "@/templates/shared/cms/types/certifications";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";

type CorporateTrustProps = {
  certifications: Certification[];
};

function orderedCredentials(certifications: Certification[]): Certification[] {
  return certifications
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const orderA = a.item.sortOrder ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.item.sortOrder ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB || a.index - b.index;
    })
    .map(({ item }) => item);
}

/**
 * Item group width follows the count.
 * Two records stay a compact pair beside the label.
 * Three fill one balanced row. Four or more wrap without empty tracks.
 */
function credentialListClass(count: number): string {
  if (count <= 1) {
    return "grid max-w-md grid-cols-1";
  }
  if (count === 2) {
    return "grid w-full max-w-xl grid-cols-1 gap-3 md:max-w-2xl md:grid-cols-2 lg:max-w-3xl";
  }
  if (count === 3) {
    return "mt-6 grid grid-cols-1 gap-3 md:grid-cols-3";
  }
  return "mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4";
}

export function CorporateTrust({ certifications }: CorporateTrustProps) {
  const items = orderedCredentials(certifications);
  if (!items.length) {
    return null;
  }

  const compact = items.length <= 2;

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      aria-labelledby="corporate-trust-heading"
    >
      <div
        className={
          compact
            ? "vertex-container flex flex-col gap-5 py-6 md:flex-row md:items-center md:justify-between md:gap-10 md:py-7 lg:py-8"
            : "vertex-container py-6 md:py-8"
        }
      >
        <div className={compact ? "min-w-0 shrink-0 md:max-w-xs lg:max-w-sm" : "min-w-0 max-w-xl"}>
          <h2
            id="corporate-trust-heading"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]"
          >
            Credentials & compliance
          </h2>
          <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-[var(--color-text-muted)]">
            Sample records supplied by the tenant. These are not third-party certifications.
          </p>
        </div>

        <ul className={credentialListClass(items.length)}>
          {items.map((cert) => {
            const meta = [cert.issuer, cert.year?.toString()].filter(Boolean).join(" · ");
            return (
              <li
                key={cert.id}
                className="flex min-w-0 items-center gap-3 border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3.5"
              >
                {cert.asset?.url ? (
                  <CmsImageMedia
                    image={cert.asset}
                    aspect="square"
                    crop="contain"
                    className="h-10 w-10 shrink-0"
                    sizes="40px"
                  />
                ) : null}
                <div className="min-w-0">
                  <p className="text-balance break-words text-sm font-semibold leading-snug text-[var(--color-text)]">
                    {cert.name}
                  </p>
                  {meta ? (
                    <p className="mt-1 text-pretty break-words text-xs leading-relaxed text-[var(--color-text-muted)]">
                      {meta}
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
