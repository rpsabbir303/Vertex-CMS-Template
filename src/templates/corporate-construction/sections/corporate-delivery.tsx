const phases = [
  {
    label: "Discover",
    copy: "Goals, site constraints, and budget parameters that shape a realistic delivery path.",
  },
  {
    label: "Plan",
    copy: "Estimating, scheduling, and constructability aligned before mobilization.",
  },
  {
    label: "Build",
    copy: "Field leadership, trade sequencing, and documented progress through construction.",
  },
  {
    label: "Control",
    copy: "Quality checks, safety routines, and cost/schedule transparency at every phase.",
  },
  {
    label: "Deliver",
    copy: "Inspections, punch completion, and a clean handover to operations.",
  },
];

export function CorporateDelivery() {
  return (
    <section
      className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      aria-labelledby="corporate-delivery-heading"
    >
      <div className="vertex-container py-16 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="min-w-0 lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-secondary)]">
              How we build
            </p>
            <h2
              id="corporate-delivery-heading"
              className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] text-[var(--color-primary)] md:text-4xl lg:text-[2.65rem]"
            >
              A disciplined sequence
            </h2>
            <p className="mt-5 text-pretty text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
              From early scoping through turnover—structured communication, field accountability,
              and clear owner reporting.
            </p>
          </div>

          <ol className="min-w-0 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)] bg-[var(--color-surface)] lg:col-span-8">
            {phases.map((phase, index) => (
              <li
                key={phase.label}
                className="group grid gap-4 px-5 py-8 md:grid-cols-[5.5rem_1fr] md:gap-8 md:px-8 md:py-10"
              >
                <p className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-none tabular-nums tracking-[-0.03em] text-[var(--color-accent)] transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 md:text-5xl lg:text-[3.25rem]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="min-w-0 md:pt-1">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-primary)] md:text-2xl">
                    {phase.label}
                  </h3>
                  <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
                    {phase.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
