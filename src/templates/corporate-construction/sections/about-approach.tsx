const principles = [
  {
    label: "Clear communication",
    copy: "Owners receive direct reporting on schedule, cost exposure, and field decisions that affect occupancy.",
  },
  {
    label: "Disciplined planning",
    copy: "Estimating, logistics, and trade coordination stay aligned before the site is mobilized.",
  },
  {
    label: "Accountable delivery",
    copy: "Project teams stay with the work from early pricing through closeout under one point of contact.",
  },
];

/**
 * Template-controlled operating philosophy for the About page.
 * Distinct from the homepage delivery sequence (preconstruction → closeout).
 */
export function CorporateAboutApproach() {
  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="about-approach-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div className="max-w-2xl">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
            Approach
          </p>
          <h2
            id="about-approach-heading"
            className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)] md:text-4xl"
          >
            How we work
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
            Clear communication. Disciplined planning. Accountable delivery.
          </p>
        </div>

        <ol className="mt-10 grid gap-0 border-t border-[var(--color-border)] md:grid-cols-3">
          {principles.map((item, index) => (
            <li
              key={item.label}
              className="min-w-0 border-b border-[var(--color-border)] py-8 md:border-b-0 md:border-r md:px-8 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <p className="text-[0.6875rem] font-semibold tracking-[0.18em] text-[var(--color-accent)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-primary)]">
                {item.label}
              </h3>
              <p className="mt-3 text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)]">
                {item.copy}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
