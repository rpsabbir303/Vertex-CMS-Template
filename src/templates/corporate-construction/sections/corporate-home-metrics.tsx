type MetricItem = {
  id: string;
  value: string;
  label: string;
};

type CorporateHomeMetricsProps = {
  items: MetricItem[];
};

export function CorporateHomeMetrics({ items }: CorporateHomeMetricsProps) {
  if (items.length < 2) {
    return null;
  }

  return (
    <section
      className="border-y border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-surface)]"
      aria-labelledby="corporate-metrics-heading"
    >
      <div className="vertex-container py-16 md:py-20 lg:py-24">
        <div className="max-w-xl">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-white/50">
            Proof
          </p>
          <h2
            id="corporate-metrics-heading"
            className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] md:text-4xl lg:text-[2.65rem]"
          >
            Scope you can measure
          </h2>
          <p className="mt-5 text-pretty text-sm leading-relaxed text-white/55 md:text-base">
            Figures drawn from published company records in the CMS—not marketing estimates.
          </p>
        </div>

        <ul className="mt-14 grid gap-12 border-t border-white/12 pt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/12">
          {items.map((item) => (
            <li key={item.id} className="min-w-0 lg:px-8 lg:first:pl-0 lg:last:pr-0">
              <p className="font-[family-name:var(--font-display)] text-5xl font-semibold leading-none tabular-nums tracking-[-0.03em] md:text-6xl lg:text-[4.5rem]">
                {item.value}
              </p>
              <p className="mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white/50">
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function buildHomeMetrics(input: {
  foundedYear?: number;
  projectCount: number;
  serviceCount: number;
  teamCount: number;
  nowYear?: number;
}): MetricItem[] {
  const now = input.nowYear ?? new Date().getFullYear();
  const items: MetricItem[] = [];

  if (input.projectCount > 0) {
    items.push({
      id: "projects",
      value: String(input.projectCount),
      label: input.projectCount === 1 ? "Published project" : "Published projects",
    });
  }

  if (input.foundedYear && input.foundedYear <= now) {
    const years = now - input.foundedYear;
    if (years > 0) {
      items.push({
        id: "years",
        value: String(years),
        label: years === 1 ? "Year operating" : "Years operating",
      });
    }
  }

  if (input.serviceCount > 0) {
    items.push({
      id: "services",
      value: String(input.serviceCount),
      label: input.serviceCount === 1 ? "Core capability" : "Core capabilities",
    });
  }

  if (input.teamCount > 0) {
    items.push({
      id: "team",
      value: String(input.teamCount),
      label: input.teamCount === 1 ? "Leadership profile" : "Leadership profiles",
    });
  }

  return items;
}
