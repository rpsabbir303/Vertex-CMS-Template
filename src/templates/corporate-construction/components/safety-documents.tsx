import type { Certification } from "@/templates/shared/cms/types/certifications";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";

type SafetyDocumentsProps = {
  records: Certification[];
};

/**
 * Tenant-provided safety/quality records from the certifications CMS collection.
 * Does not invent certifications, awards, or compliance claims.
 */
export function SafetyDocuments({ records }: SafetyDocumentsProps) {
  if (!records.length) {
    return null;
  }

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="safety-documents-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
            Records
          </p>
          <h2
            id="safety-documents-heading"
            className="mt-3 text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)] md:text-4xl"
          >
            Safety documents
          </h2>
          <p className="mt-4 text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
            Tenant-supplied records and procedures. These are not third-party certifications
            or awards.
          </p>
        </div>

        <ul className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
          {records.map((record, index) => {
            const category = record.issuer?.trim();
            const year = record.year?.toString();
            const href = record.asset?.url;
            const meta = [category, year].filter(Boolean).join(" · ");

            const content = (
              <>
                <div className="flex min-w-0 items-start gap-4 md:gap-6">
                  <span className="mt-1 w-8 shrink-0 font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.14em] text-[var(--color-accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {record.asset?.url ? (
                    <CmsImageMedia
                      image={record.asset}
                      aspect="square"
                      crop="contain"
                      className="h-12 w-12 shrink-0 border border-[var(--color-border)] bg-[var(--color-surface-muted)]"
                      sizes="48px"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <h3 className="text-balance break-words font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-primary)] md:text-xl">
                      {record.name}
                    </h3>
                    {meta ? (
                      <p className="mt-1.5 text-pretty break-words text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                        {meta}
                      </p>
                    ) : null}
                  </div>
                </div>
                {href ? (
                  <span className="mt-3 inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-[var(--color-secondary)] md:mt-0">
                    View record
                    <span aria-hidden className="ml-2">
                      →
                    </span>
                  </span>
                ) : null}
              </>
            );

            return (
              <li key={record.id} className="min-w-0">
                {href ? (
                  <a
                    href={href}
                    className="flex flex-col gap-2 py-5 no-underline transition-colors hover:bg-[var(--color-surface-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] md:flex-row md:items-center md:justify-between md:gap-8 md:px-2 md:py-6"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex flex-col gap-2 py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:px-2 md:py-6">
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
