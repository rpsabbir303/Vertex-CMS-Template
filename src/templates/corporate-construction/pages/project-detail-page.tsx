import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapCollectionItems } from "@/templates/shared/cms/resolve-content";
import { ProjectCardBase } from "@/templates/shared/components/cards/project-card-base";
import { ButtonLink } from "@/templates/shared/components/ui/button-link";
import { CmsGalleryGrid } from "@/templates/shared/media/cms-gallery";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";

export function CorporateConstructionProjectDetailPage(props: TemplatePageProps) {
  const projects = unwrapCollectionItems(props.payload.projects);
  const project = projects.find((item) => item.slug === props.entitySlug);
  const related = projects.filter((item) => item.slug !== props.entitySlug).slice(0, 2);

  if (!project) {
    return (
      <CorporatePageFrame {...props}>
        <section className="vertex-container py-24">
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--color-primary)]">
            Project not found
          </h1>
          <ButtonLink href={previewHref(props.mode, "/projects")} variant="ghost" className="mt-6">
            Back to projects
          </ButtonLink>
        </section>
      </CorporatePageFrame>
    );
  }

  const facts = [
    project.location ? { label: "Location", value: project.location } : null,
    project.metadata?.sector ? { label: "Sector", value: project.metadata.sector } : null,
    project.metadata?.scope ? { label: "Scope", value: project.metadata.scope } : null,
    project.year ? { label: "Year", value: String(project.year) } : null,
    project.metadata?.duration ? { label: "Duration", value: project.metadata.duration } : null,
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));

  const narrative = project.description?.split(/\n\n+/).map((p) => p.trim()).filter(Boolean) ?? [];

  return (
    <CorporatePageFrame {...props}>
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="vertex-container grid gap-8 py-14 lg:grid-cols-12 lg:py-20">
          <div className="min-w-0 lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
              Project
            </p>
            <h1 className="mt-4 text-balance font-[family-name:var(--font-display)] text-4xl font-semibold leading-tight text-[var(--color-primary)] md:text-5xl">
              {project.title}
            </h1>
            {project.summary ? (
              <p className="mt-5 text-pretty text-lg leading-relaxed text-[var(--color-text-muted)]">
                {project.summary}
              </p>
            ) : null}
          </div>
          {project.image?.url ? (
            <div className="min-w-0 lg:col-span-7">
              <CmsImageMedia
                image={project.image}
                aspect="hero"
                className="w-full"
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
            </div>
          ) : null}
        </div>
      </section>

      {facts.length ? (
        <section className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]" aria-label="Project facts">
          <dl className="vertex-container grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label} className="min-w-0">
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-pretty text-base font-medium text-[var(--color-text)]">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {narrative.length ? (
        <section aria-labelledby="project-narrative-heading">
          <div className="vertex-container grid gap-8 py-[var(--spacing-section-y-lg)] lg:grid-cols-12">
            <h2
              id="project-narrative-heading"
              className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)] lg:col-span-4"
            >
              Project narrative
            </h2>
            <div className="space-y-5 text-pretty text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg lg:col-span-7">
              {narrative.map((paragraph) => (
                <p key={paragraph.slice(0, 36)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {project.gallery?.images.length ? (
        <section className="bg-[var(--color-surface-muted)]" aria-labelledby="project-gallery-heading">
          <div className="vertex-container py-[var(--spacing-section-y-lg)]">
            <h2
              id="project-gallery-heading"
              className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)]"
            >
              Site photographs
            </h2>
            <CmsGalleryGrid gallery={project.gallery} className="mt-10" columns={2} />
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section aria-labelledby="related-projects-heading">
          <div className="vertex-container py-[var(--spacing-section-y-lg)]">
            <h2
              id="related-projects-heading"
              className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--color-primary)]"
            >
              Other projects
            </h2>
            <ul className="mt-10 grid gap-10 md:grid-cols-2">
              {related.map((item) => (
                <li key={item.id}>
                  <ProjectCardBase
                    project={item}
                    detailHref={previewHref(props.mode, `/projects/${item.slug}`)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="bg-[var(--color-primary)] text-[var(--color-text-inverse)]">
        <div className="vertex-container flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold">
            Planning a project with similar constraints?
          </h2>
          <ButtonLink href={previewHref(props.mode, "/contact")}>Start a conversation</ButtonLink>
        </div>
      </section>
    </CorporatePageFrame>
  );
}
