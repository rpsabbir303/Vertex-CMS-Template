import type { Certification } from "@/templates/shared/cms/types/certifications";
import type { Company } from "@/templates/shared/cms/types/company";

type CorporateProofStripProps = {
  company: Company;
  certifications: Certification[];
  serviceCount?: number;
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

function serviceArea(company: Company): string | undefined {
  const { address } = company;
  if (!address) return undefined;
  const parts = [address.city, address.region].filter(Boolean);
  return parts.length ? parts.join(", ") : undefined;
}

/**
 * Quiet credibility transition — typography + dividers only.
 */
export function CorporateProofStrip({
  company,
  certifications,
  serviceCount = 0,
}: CorporateProofStripProps) {
  const certs = orderedCredentials(certifications);
  const area = serviceArea(company);

  const labels: string[] = [];
  if (company.foundedYear) {
    labels.push(`Established ${company.foundedYear}`);
  }
  if (area) {
    labels.push(area);
  }
  if (serviceCount > 0) {
    labels.push(serviceCount === 1 ? "Commercial capability" : "Commercial construction");
  }
  certs.slice(0, 4).forEach((cert) => {
    if (cert.name?.trim()) labels.push(cert.name.trim());
  });

  const unique = labels.filter(
    (label, index) =>
      labels.findIndex((l) => l.toLowerCase() === label.toLowerCase()) === index,
  );

  if (!unique.length) {
    return null;
  }

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      aria-labelledby="corporate-proof-heading"
    >
      <div className="vertex-container py-6 md:py-7">
        <h2 id="corporate-proof-heading" className="sr-only">
          Credentials
        </h2>
        <ul className="flex min-w-0 flex-wrap items-center justify-start gap-y-3 md:justify-between md:gap-y-2">
          {unique.map((label, index) => (
            <li
              key={`${label}-${index}`}
              className="flex min-w-0 items-center text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]"
            >
              {index > 0 ? (
                <span
                  aria-hidden
                  className="mx-3 hidden h-3 w-px shrink-0 bg-[var(--color-border)] sm:mx-4 sm:block lg:mx-5"
                />
              ) : null}
              <span className="text-pretty break-words">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
