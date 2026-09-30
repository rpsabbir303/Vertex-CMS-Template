import type { TemplateRenderMode } from "@/registry/template-types";
import type { Company } from "@/templates/shared/cms/types/company";
import type { TeamMember } from "@/templates/shared/cms/types/team";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateLeadershipProps = {
  company: Company;
  mode: TemplateRenderMode;
  team: TeamMember[];
};

/**
 * 10 — Leadership. team[0] featured; the rest as a roster. Team page owns the directory.
 */
export function CorporateLeadership({ company, mode, team }: CorporateLeadershipProps) {
  const [featured, ...rest] = team;
  if (!featured) return null;
  const roster = rest.slice(0, 4);

  return (
    <section className="bg-[var(--color-surface-muted)]" aria-labelledby="leadership-heading">
      <div className="vertex-container grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:gap-16">
        <Reveal plate as="figure" className="lg:col-span-5">
          <div className={cn(ui.plate, "h-[100vw] max-h-[34rem] md:h-[36rem] lg:h-[40rem] lg:max-h-none")}>
            <CmsImageMedia image={featured.image} aspect="auto" className="h-full" sizes="(min-width: 1440px) 40vw, 100vw" />
          </div>
          <figcaption className="mt-3 flex items-baseline justify-between gap-4">
            <span className="text-sm font-medium text-[var(--color-primary)]">{featured.name}</span>
            <span className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{featured.role}</span>
          </figcaption>
        </Reveal>

        <div className="lg:col-span-7">
          <p className={ui.eyebrow}>Leadership</p>
          <h2 id="leadership-heading" className={cn(ui.h2, "mt-5 max-w-[12ch]")}>
            Accountable people, on the job.
          </h2>
          {featured.bio ? (
            <blockquote className="mt-10">
              <p className="max-w-2xl text-pretty font-[family-name:var(--font-display)] text-[clamp(1.375rem,2.2vw,2rem)] font-medium leading-[1.25] tracking-[-0.02em] text-[var(--color-primary)]">
                {featured.bio}
              </p>
              <footer className={cn(ui.mono, "mt-5 text-[var(--color-text-muted)]")}>
                {featured.name} · {featured.role}, {company.name}
              </footer>
            </blockquote>
          ) : null}

          {roster.length ? (
            <ul className={cn("mt-12 grid gap-px overflow-hidden rounded-[1rem] bg-[var(--color-primary)]/10 sm:grid-cols-2")}>
              {roster.map((member, index) => (
                <Reveal as="li" key={member.id} delay={(index % 4) as 0 | 1 | 2 | 3} className="flex items-center gap-4 bg-[var(--color-surface-muted)] p-4">
                  <div className={cn(ui.plateSm, "h-14 w-14 shrink-0 !rounded-full")}>
                    <CmsImageMedia image={member.image} aspect="auto" className="h-full" sizes="56px" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--color-primary)]">{member.name}</p>
                    <p className={cn(ui.mono, "truncate text-[var(--color-text-muted)]")}>{member.role}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          ) : null}

          <a href={previewHref(mode, "/team")} className={cn(ui.link, "mt-10")}>
            Meet the full team <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
