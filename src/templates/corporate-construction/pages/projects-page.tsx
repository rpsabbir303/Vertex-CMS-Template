import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapCollectionItems } from "@/templates/shared/cms/resolve-content";
import { ProjectCardBase } from "@/templates/shared/components/cards/project-card-base";
import { ButtonLink } from "@/templates/shared/components/ui/button-link";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CorporatePageHero } from "@/templates/corporate-construction/components/corporate-page-hero";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";

export function CorporateConstructionProjectsPage(props: TemplatePageProps) {
  const projects = unwrapCollectionItems(props.payload.projects);
  const featured = projects.find((project) => project.featured) ?? projects[0];
  const rest = projects.filter((project) => project.id !== featured?.id);

  return (
    <CorporatePageFrame {...props}>
      <CorporatePageHero
        eyebrow="Projects"
        title="Selected commercial and institutional work"
        summary="A sample of buildings where phasing, occupancy, or site constraints shaped the delivery plan."
        image={featured?.image}
      />
      {!projects.length ? (
        <section className="vertex-container py-20">
          <p className="text-[var(--color-text-muted)]">No projects have been published yet.</p>
        </section>
      ) : (
        <section className="bg-[var(--color-surface-muted)]" aria-labelledby="project-index-heading">
          <div className="vertex-container py-[var(--spacing-section-y-lg)]">
            <h2 id="project-index-heading" className="sr-only">
              Project index
            </h2>
            {featured ? (
              <article className="grid gap-8 border-b border-[var(--color-border)] pb-14 lg:grid-cols-12">
                <div className="min-w-0 lg:col-span-7">
                  <ProjectCardBase
                    project={featured}
                    detailHref={previewHref(props.mode, `/projects/${featured.slug}`)}
                    priorityImage
                  />
                </div>
                <div className="flex min-w-0 flex-col justify-end lg:col-span-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]">
                    Featured
                  </p>
                  {featured.description ? (
                    <p className="mt-4 text-pretty leading-relaxed text-[var(--color-text-muted)]">
                      {featured.description.split(/\n\n+/)[0]}
                    </p>
                  ) : null}
                  <ButtonLink
                    href={previewHref(props.mode, `/projects/${featured.slug}`)}
                    className="mt-6 self-start"
                  >
                    View project
                  </ButtonLink>
                </div>
              </article>
            ) : null}
            {rest.length ? (
              <ul className="mt-14 grid gap-12 md:grid-cols-2">
                {rest.map((project) => (
                  <li key={project.id}>
                    <ProjectCardBase
                      project={project}
                      detailHref={previewHref(props.mode, `/projects/${project.slug}`)}
                    />
                    <ButtonLink
                      href={previewHref(props.mode, `/projects/${project.slug}`)}
                      variant="ghost"
                      className="mt-4"
                    >
                      View project
                    </ButtonLink>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      )}
    </CorporatePageFrame>
  );
}
