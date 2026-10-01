import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectDetailOverviewProps = {
  facts: Array<{ label: string; value: string }>;
};

export function ProjectDetailOverview({ facts }: ProjectDetailOverviewProps) {
  if (!facts.length) return null;

  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]" aria-labelledby="project-overview-heading">
      <div className="vertex-container py-14 md:py-16">
        <p id="project-overview-heading" className={ui.eyebrow}>
          Project overview
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {facts.map(({ label, value }) => (
            <div key={label} className="min-w-0 border-t border-[var(--color-border)] pt-4">
              <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{label}</dt>
              <dd className="mt-2 text-base font-medium text-[var(--color-text)]">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
