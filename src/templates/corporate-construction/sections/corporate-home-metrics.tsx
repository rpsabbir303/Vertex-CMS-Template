import type { Certification } from "@/templates/shared/cms/types/certifications";
import type { Project } from "@/templates/shared/cms/types/projects";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateCredentialsProps = {
  certifications: Certification[];
  projects: Project[];
};

export function uniqueSectors(projects: Project[]): string[] {
  const seen = new Set<string>();
  for (const p of projects) {
    const s = p.metadata?.sector?.trim();
    if (s) seen.add(s);
  }
  return [...seen];
}

/**
 * 09 — Credentials and sectors. Two spec lists on white.
 */
export function CorporateCredentials({ certifications, projects }: CorporateCredentialsProps) {
  const sectors = uniqueSectors(projects);
  if (!certifications.length && !sectors.length) return null;

  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby="credentials-heading">
      <div className="vertex-container grid gap-12 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className={ui.eyebrow}>On file</p>
          <h2 id="credentials-heading" className={cn(ui.h3, "mt-4 max-w-[14ch]")}>
            Where we work, and what backs it.
          </h2>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8">
          {sectors.length ? (
            <Reveal>
              <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>Sectors served</p>
              <ul className={cn("mt-4 divide-y", ui.rule)}>
                {sectors.map((s) => (
                  <li key={s} className="py-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                    {s}
                  </li>
                ))}
              </ul>
              <p className={cn(ui.small, "mt-4")}>Taken from the projects published on this site.</p>
            </Reveal>
          ) : null}
          {certifications.length ? (
            <Reveal delay={1}>
              <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>Credentials</p>
              <ul className={cn("mt-4 divide-y", ui.rule)}>
                {certifications.map((c) => (
                  <li key={c.id} className="py-3">
                    <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                      {c.name}
                    </p>
                    {c.issuer || c.year ? (
                      <p className={cn(ui.mono, "mt-1 text-[var(--color-text-muted)]")}>
                        {[c.issuer, c.year].filter(Boolean).join(" · ")}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
