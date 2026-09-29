import type { Company } from "@/templates/shared/cms/types/company";

type CorporateAboutProps = {
  company: Company;
};

export function CorporateAbout({ company }: CorporateAboutProps) {
  const hasBody = Boolean(company.description);
  if (!hasBody && !company.foundedYear) {
    return null;
  }

  return (
    <section
      className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      aria-labelledby="corporate-about-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="min-w-0 border-l-2 border-[var(--color-accent)] pl-5 md:pl-7 lg:col-span-7">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
              Company
            </p>
            <h2
              id="corporate-about-heading"
              className="mt-3 text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.05] text-[var(--color-primary)] md:text-4xl lg:text-[2.75rem]"
            >
              Built for complex delivery
            </h2>
          </div>
          <p className="min-w-0 text-pretty font-[family-name:var(--font-display)] text-xl font-medium leading-snug text-[var(--color-primary)] md:text-2xl lg:col-span-5">
            Designed for clear decisions.
          </p>
        </div>

        <div className="mt-8 grid gap-6 border-t border-[var(--color-border)] pt-8 lg:grid-cols-12 lg:gap-10">
          {company.foundedYear ? (
            <p className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-none text-[var(--color-primary)] md:text-5xl lg:col-span-3">
              {company.foundedYear}
              <span className="mt-2 block text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                Established
              </span>
            </p>
          ) : null}
          {company.description ? (
            <div
              className={`min-w-0 space-y-4 text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg ${company.foundedYear ? "lg:col-span-9" : "lg:col-span-8 lg:col-start-5"}`}
            >
              {company.description.split(/\n\n+/).map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
