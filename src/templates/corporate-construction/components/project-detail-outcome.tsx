import type { Project, ProjectOutcome } from "@/templates/shared/cms/types/projects";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { projectOverviewFacts } from "@/templates/corporate-construction/utils/project-delivery";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectDetailOutcomeProps = {
  project: Project;
  outcome?: ProjectOutcome;
};

export function ProjectDetailOutcome({ project, outcome }: ProjectDetailOutcomeProps) {
  const facts = projectOverviewFacts(project).filter((f) =>
    ["Year", "Duration", "Sector", "Location"].includes(f.label),
  );
  const eyebrow = outcome?.eyebrow?.trim() || "Project outcome";
  const headline = outcome?.headline?.trim();
  const summary = outcome?.summary?.trim() || outcome?.statement?.trim();

  if (!facts.length && !summary && !headline) return null;

  return (
    <section className="bg-[var(--color-surface-muted)]" aria-labelledby="project-outcome-heading">
      <div className="vertex-container grid gap-12 py-28 md:grid-cols-12 md:gap-16 md:py-36 lg:py-40">
        <div className="md:col-span-4">
          <p className={ui.eyebrow}>{eyebrow}</p>
          {headline ? (
            <h2 id="project-outcome-heading" className={cn(ui.h3, "mt-5 max-w-[16ch]")}>
              {headline}
            </h2>
          ) : (
            <h2 id="project-outcome-heading" className="sr-only">
              {eyebrow}
            </h2>
          )}
        </div>
        <Reveal className="md:col-span-8">
          {facts.length ? (
            <dl className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
              {facts.map(({ label, value }) => (
                <div key={label} className="border-t border-[var(--color-border)] pt-4">
                  <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{label}</dt>
                  <dd className="mt-2 text-lg font-semibold text-[var(--color-text)]">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {summary ? (
            <p className={cn(ui.body, "mt-10 max-w-2xl text-lg md:mt-12", facts.length ? "border-t border-[var(--color-border)] pt-10" : "")}>
              {summary}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
