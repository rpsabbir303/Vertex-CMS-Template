const phases = [
  {
    label: "Preconstruction",
    copy: "Estimating, scheduling, and constructability review before the site is mobilized.",
  },
  {
    label: "Planning",
    copy: "Phasing, logistics, and trade coordination aligned to owner milestones.",
  },
  {
    label: "Construction",
    copy: "Field leadership, safety routines, and documented progress through the build.",
  },
  {
    label: "Closeout",
    copy: "Commissioning support, punch completion, and turnover documentation.",
  },
];

export function CorporateDelivery() {
  return (
    <section
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="corporate-delivery-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
            Sequence
          </p>
          <h2
            id="corporate-delivery-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)] md:text-4xl"
          >
            How work is delivered
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
            A structured sequence from early pricing through turnover. Scope and staffing follow
            the project, not a fixed package.
          </p>
        </div>

        <ol className="relative mt-8 border-l border-[var(--color-border)] lg:mt-10 lg:grid lg:grid-cols-4 lg:gap-8 lg:border-l-0">
          <span
            aria-hidden
            className="absolute left-0 right-0 top-[0.3rem] hidden h-px bg-[var(--color-primary)]/25 lg:block"
          />
          {phases.map((phase, index) => (
            <li
              key={phase.label}
              className="relative min-w-0 py-6 pl-6 first:pt-1 last:pb-0 lg:py-0 lg:pl-0 lg:pt-8 lg:first:pt-8"
            >
              <span
                aria-hidden
                className={`absolute size-2.5 bg-[var(--color-accent)] ${
                  index === 0
                    ? "-left-[0.32rem] top-2 lg:left-0 lg:top-0"
                    : "-left-[0.32rem] top-7 lg:left-0 lg:top-0"
                }`}
              />
              <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-[var(--color-accent)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-primary)] lg:mt-3">
                {phase.label}
              </h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-[var(--color-text-muted)] lg:mt-3">
                {phase.copy}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
