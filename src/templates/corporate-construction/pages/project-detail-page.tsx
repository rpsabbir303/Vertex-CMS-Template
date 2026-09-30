import type { TemplatePageProps } from "@/registry/template-types";
import { getSortedCollectionItems } from "@/templates/shared/cms/resolve-content";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { ArchitecturalGrid } from "@/templates/corporate-construction/components/ui/architectural-grid";
import { CtaBand } from "@/templates/corporate-construction/components/ui/cta-band";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { ProjectBeforeAfterBlock } from "@/templates/corporate-construction/components/project-before-after-block";
import { splitParagraphs } from "@/templates/corporate-construction/utils/page-seo";
import { projectHasBeforeAfter } from "@/templates/corporate-construction/utils/project-filters";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

export function CorporateConstructionProjectDetailPage(props: TemplatePageProps) {
  const projects = getSortedCollectionItems(props.payload.projects);
  const index = projects.findIndex((item) => item.slug === props.entitySlug);
  const project = index >= 0 ? projects[index] : undefined;

  if (!project) {
    return (
      <CorporatePageFrame {...props}>
        <section className="vertex-container pt-40 pb-24">
          <p className={ui.eyebrow}>Projects</p>
          <h1 className={cn(ui.h2, "mt-5")}>Project not found</h1>
          <a href={previewHref(props.mode, "/projects")} className={cn(ui.btnGhost, "mt-8")}>
            Back to projects
          </a>
        </section>
      </CorporatePageFrame>
    );
  }

  const next = projects[(index + 1) % projects.length];
  const hasNext = projects.length > 1 && next && next.id !== project.id;

  const facts = [
    ["Client", project.metadata?.client],
    ["Sector", project.metadata?.sector],
    ["Location", project.location],
    ["Year", project.year ? String(project.year) : undefined],
    ["Scope", project.metadata?.scope],
    ["Duration", project.metadata?.duration],
  ].filter((f): f is [string, string] => Boolean(f[1]));

  const narrative = splitParagraphs(project.description);
  const gallery = project.gallery?.images.filter((img) => img.url) ?? [];
  const nextHref = hasNext ? previewHref(props.mode, `/projects/${next.slug}`) : undefined;

  return (
    <CorporatePageFrame {...props}>
      <section className="relative overflow-hidden bg-[var(--color-surface)]">
        <ArchitecturalGrid className="absolute inset-x-0 top-0 h-[36rem]" />
        <div className="vertex-container relative pt-36 md:pt-44">
          <p className={cn(ui.mono, "cc-rise flex flex-wrap items-center gap-x-4 gap-y-2 text-[var(--color-text-muted)]")}>
            <a href={previewHref(props.mode, "/projects")} className="hover:text-[var(--color-text)]">
              Projects
            </a>
            <span aria-hidden>/</span>
            <span className="text-[var(--color-accent)]">
              {pad(index + 1)} / {pad(projects.length)}
            </span>
          </p>
          <h1 className={cn(ui.h1, "cc-rise mt-6 max-w-[14ch] text-balance")} data-delay="1">
            {project.title}
          </h1>
          <div className="cc-rise mt-10 grid gap-8 md:grid-cols-12" data-delay="2">
            {project.summary ? <p className={cn(ui.lead, "max-w-xl md:col-span-7")}>{project.summary}</p> : null}
            {facts.length ? (
              <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-5 md:col-span-5", !project.summary && "md:col-span-12 md:grid-cols-6")}>
                {facts.map(([label, value]) => (
                  <div key={label} className={cn("border-t pt-3", ui.rule)}>
                    <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{label}</dt>
                    <dd className="mt-1.5 text-sm font-medium text-[var(--color-text)]">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>

        {project.image?.url ? (
          <div className="vertex-container mt-14 pb-4 md:mt-20">
            <Reveal plate className={cn(ui.plate, "h-[64vh] min-h-[18rem] max-h-[52rem]")}>
              <CmsImageMedia image={project.image} aspect="auto" className="h-full" sizes="100vw" priority />
            </Reveal>
          </div>
        ) : null}
      </section>

      {narrative.length ? (
        <section className="bg-[var(--color-surface)]" aria-labelledby="narrative-heading">
          <div className="vertex-container grid gap-10 py-24 md:py-32 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p id="narrative-heading" className={ui.eyebrow}>
                The project
              </p>
            </div>
            <Reveal className="lg:col-span-7">
              <p className="max-w-3xl text-balance font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--color-text)]">
                {narrative[0]}
              </p>
              {narrative.length > 1 ? (
                <div className="mt-8 max-w-2xl space-y-5">
                  {narrative.slice(1).map((p) => (
                    <p key={p.slice(0, 32)} className={cn(ui.body, "text-lg")}>
                      {p}
                    </p>
                  ))}
                </div>
              ) : null}
            </Reveal>
          </div>
        </section>
      ) : null}

      {projectHasBeforeAfter(project) ? (
        <section className="bg-[var(--color-surface-muted)]" aria-labelledby="project-before-after-heading">
          <div className="vertex-container py-20 md:py-28">
            <ProjectBeforeAfterBlock project={project} headingId="project-before-after-heading" />
          </div>
        </section>
      ) : null}

      {gallery.length ? (
        <section className="bg-[var(--color-surface-muted)]" aria-labelledby="gallery-heading">
          <div className="vertex-container py-24 md:py-32">
            <div className="flex items-end justify-between gap-6">
              <h2 id="gallery-heading" className={cn(ui.h3)}>
                On site
              </h2>
              <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>
                {gallery.length} {gallery.length === 1 ? "frame" : "frames"}
              </p>
            </div>
            <ul className="mt-10 grid grid-cols-12 gap-4 md:gap-6">
              {gallery.map((img, i) => {
                const span = i % 3 === 0 ? "col-span-12 md:col-span-7" : i % 3 === 1 ? "col-span-12 md:col-span-5" : "col-span-12";
                const height = i % 3 === 2 ? "h-[56vw] md:h-[36rem]" : "h-[56vw] md:h-[26rem]";
                return (
                  <Reveal as="li" plate key={img.id} className={span}>
                    <figure>
                      <div className={cn(ui.plate, height)}>
                        <CmsImageMedia image={img} aspect="auto" className="h-full" sizes="(min-width: 1024px) 60vw, 100vw" />
                      </div>
                      {img.caption ? <figcaption className={cn(ui.mono, "mt-3 text-[var(--color-text-muted)]")}>{img.caption}</figcaption> : null}
                    </figure>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {hasNext && nextHref ? (
        <section className="bg-[var(--color-surface)]" aria-label="Next project">
          <a href={nextHref} className="group block">
            <div className="vertex-container grid gap-8 py-20 md:grid-cols-12 md:items-center md:py-28">
              <div className="md:col-span-7">
                <p className={ui.eyebrow}>Next project</p>
                <p className={cn(ui.h2, "mt-5 max-w-[14ch] transition-colors group-hover:text-[var(--color-accent)]")}>
                  {next.title}
                </p>
                <p className={cn(ui.mono, "mt-6 text-[var(--color-text-muted)]")}>
                  {[next.metadata?.sector, next.location, next.year].filter(Boolean).join(" · ")}
                </p>
              </div>
              {next.image?.url ? (
                <div className={cn(ui.plate, "h-56 md:col-span-5 md:h-72")}>
                  <div className="h-full transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none">
                    <CmsImageMedia image={next.image} aspect="auto" className="h-full" sizes="(min-width: 1024px) 40vw, 100vw" />
                  </div>
                </div>
              ) : null}
            </div>
          </a>
        </section>
      ) : null}

      <CtaBand
        mode={props.mode}
        title="Planning something similar?"
        body="Bring the site and the schedule. We will bring the plan."
        secondary={{ label: "All projects", href: "/projects" }}
      />
    </CorporatePageFrame>
  );
}
