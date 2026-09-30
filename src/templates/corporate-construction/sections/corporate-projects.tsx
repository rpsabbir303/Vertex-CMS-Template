import type { TemplateRenderMode } from "@/registry/template-types";
import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateProjectsProps = {
  projects: Project[];
  mode: TemplateRenderMode;
};

export function selectLeadProject(projects: Project[]): Project | undefined {
  return projects.find((p) => p.image?.url) ?? projects[0];
}

/**
 * 05 — Selected work. One project, full width, with its facts.
 */
export function CorporateProjects({ projects, mode }: CorporateProjectsProps) {
  const lead = selectLeadProject(projects);
  if (!lead) return null;

  const facts = [
    ["Sector", lead.metadata?.sector],
    ["Location", lead.location],
    ["Year", lead.year ? String(lead.year) : undefined],
    ["Scope", lead.metadata?.scope],
  ].filter((f): f is [string, string] => Boolean(f[1]));

  const href = previewHref(mode, `/projects/${lead.slug}`);

  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby="selected-heading">
      <div className="vertex-container py-24 md:py-32">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className={ui.eyebrow}>Selected work</p>
            <h2 id="selected-heading" className={cn(ui.h2, "mt-5 max-w-[14ch]")}>
              <a href={href} className="transition-colors hover:text-[var(--color-accent)]">
                {lead.title}
              </a>
            </h2>
          </div>
          <p className={cn(ui.mono, "text-[var(--color-text-muted)] md:col-span-4 md:text-right")}>
            {pad(1)} / {pad(projects.length)}
          </p>
        </div>

        {lead.image?.url ? (
          <Reveal plate className={cn(ui.plate, "mt-12 h-[70vh] min-h-[20rem] max-h-[56rem]")}>
            <a href={href} className="block h-full" aria-label={`View ${lead.title}`}>
              <CmsImageMedia image={lead.image} aspect="auto" className="h-full" sizes="100vw" />
            </a>
          </Reveal>
        ) : null}

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          {lead.summary ? <p className={cn(ui.lead, "max-w-xl lg:col-span-6")}>{lead.summary}</p> : null}
          <div className={cn("lg:col-span-6", !lead.summary && "lg:col-span-12")}>
            {facts.length ? (
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
                {facts.map(([label, value]) => (
                  <div key={label} className={cn("border-t pt-4", ui.rule)}>
                    <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{label}</dt>
                    <dd className="mt-2 text-sm font-medium text-[var(--color-primary)]">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={href} className={ui.btn}>
                View the project
              </a>
              <a href={previewHref(mode, "/projects")} className={ui.btnGhost}>
                All projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
