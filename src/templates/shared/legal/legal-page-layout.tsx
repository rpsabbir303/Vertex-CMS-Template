import type { OptionalPage } from "@/templates/shared/cms/types/pages";
import { LegalSectionBody } from "@/templates/shared/legal/legal-section-body";
import { LegalTableOfContents } from "@/templates/shared/legal/legal-table-of-contents";
import { planLegalPage } from "@/templates/shared/legal/plan-legal-page";

type LegalPageLayoutProps = {
  page: OptionalPage;
};

/**
 * Shared legal document layout for Privacy / Terms / Cookie pages.
 * CMS-driven; reusable across construction templates.
 */
export function LegalPageLayout({ page }: LegalPageLayoutProps) {
  const planned = planLegalPage(page);

  if (!planned.isPublished || !planned.hasContent) {
    return (
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="vertex-container py-16 md:py-20">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
            Legal
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)] md:text-4xl">
            {planned.title}
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-[var(--color-text-muted)]">
            This page has not yet been published.
          </p>
        </div>
      </section>
    );
  }

  const hasToc = planned.sections.length > 1;

  return (
    <>
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="vertex-container py-12 md:py-14 lg:py-16">
          <div className="max-w-3xl border-l-2 border-[var(--color-accent)] pl-5 md:pl-7">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
              Legal
            </p>
            <h1 className="mt-3 text-balance break-words font-[family-name:var(--font-display)] text-[2.15rem] font-semibold leading-[1.08] text-[var(--color-primary)] md:text-5xl lg:text-[2.85rem]">
              {planned.title}
            </h1>
            {planned.effectiveDate ? (
              <p className="mt-4 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                Effective {planned.effectiveDate}
              </p>
            ) : null}
            {planned.intro ? (
              <p className="mt-5 max-w-2xl text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                {planned.intro}
              </p>
            ) : null}
          </div>
        </div>
      </header>

      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="vertex-container py-12 md:py-14 lg:py-16">
          {hasToc ? (
            <div className="mb-8 lg:hidden">
              <LegalTableOfContents sections={planned.sections} variant="mobile" />
            </div>
          ) : null}

          <div
            className={
              hasToc
                ? "grid gap-10 lg:grid-cols-12 lg:gap-x-12 lg:items-start"
                : undefined
            }
          >
            {hasToc ? (
              <aside className="hidden min-w-0 lg:col-span-3 lg:block">
                <LegalTableOfContents sections={planned.sections} variant="sidebar" />
              </aside>
            ) : null}

            <div
              className={
                hasToc
                  ? "min-w-0 lg:col-span-8 lg:col-start-5"
                  : "mx-auto min-w-0 max-w-[46rem]"
              }
            >
              <div className="max-w-[46rem] space-y-12 md:space-y-14">
                {planned.sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28"
                    aria-labelledby={`${section.id}-heading`}
                  >
                    <div className="flex items-baseline gap-4 border-b border-[var(--color-border)] pb-3">
                      <span className="shrink-0 font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.16em] text-[var(--color-accent)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2
                        id={`${section.id}-heading`}
                        className="min-w-0 text-balance break-words font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-primary)] md:text-3xl"
                      >
                        {section.heading}
                      </h2>
                    </div>
                    <div className="mt-5">
                      <LegalSectionBody content={section.content} />
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
