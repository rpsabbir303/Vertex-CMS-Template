import type { TemplatePageProps } from "@/registry/template-types";
import { getSortedCollectionItems } from "@/templates/shared/cms/resolve-content";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CtaBand } from "@/templates/corporate-construction/components/ui/cta-band";
import { ProjectBeforeAfterBlock } from "@/templates/corporate-construction/components/project-before-after-block";
import { ProjectDeliveryNav } from "@/templates/corporate-construction/components/project-delivery-nav";
import { ProjectDeliveryStages } from "@/templates/corporate-construction/components/project-delivery-stages";
import { ProjectDetailGallery } from "@/templates/corporate-construction/components/project-detail-gallery";
import { ProjectDetailHero } from "@/templates/corporate-construction/components/project-detail-hero";
import { ProjectDetailIntro } from "@/templates/corporate-construction/components/project-detail-intro";
import { ProjectDetailOutcome } from "@/templates/corporate-construction/components/project-detail-outcome";
import { ProjectDetailOverview } from "@/templates/corporate-construction/components/project-detail-overview";
import { ProjectDetailRelated } from "@/templates/corporate-construction/components/project-detail-related";
import {
  projectHeroMeta,
  projectOverviewFacts,
  resolveDeliveryStages,
  resolveProjectIntroduction,
  resolveRelatedProjects,
} from "@/templates/corporate-construction/utils/project-delivery";
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

  const deliveryStages = resolveDeliveryStages(project);
  const introduction = resolveProjectIntroduction(project);
  const facts = projectOverviewFacts(project);
  const heroMeta = projectHeroMeta(project);
  const gallery = project.gallery?.images.filter((img) => img.url) ?? [];
  const related = resolveRelatedProjects(project, projects, 3);
  const projectsHref = previewHref(props.mode, "/projects");
  const indexLabel = `${pad(index + 1)} / ${pad(projects.length)}`;
  const showLegacyBeforeAfter = !deliveryStages.length && projectHasBeforeAfter(project);

  return (
    <CorporatePageFrame {...props}>
      <ProjectDetailHero
        title={project.title}
        summary={project.summary}
        meta={heroMeta}
        indexLabel={indexLabel}
        projectsHref={projectsHref}
        image={project.image}
      />

      <ProjectDetailOverview facts={facts} />

      {introduction ? <ProjectDetailIntro introduction={introduction} /> : null}

      {deliveryStages.length ? (
        <>
          <ProjectDeliveryNav stages={deliveryStages} />
          <ProjectDeliveryStages
            stages={deliveryStages}
            projectTitle={project.title}
            deliverBeforeAfter={{ before: project.beforeImage, after: project.afterImage }}
          />
        </>
      ) : null}

      {showLegacyBeforeAfter ? (
        <section className="bg-[var(--color-surface-muted)]" aria-labelledby="project-before-after-heading">
          <div className="vertex-container py-20 md:py-28">
            <ProjectBeforeAfterBlock project={project} headingId="project-before-after-heading" />
          </div>
        </section>
      ) : null}

      <ProjectDetailOutcome project={project} outcome={project.outcome} />

      {gallery.length ? <ProjectDetailGallery title={project.title} images={gallery} /> : null}

      <ProjectDetailRelated projects={related} hrefForSlug={(slug) => previewHref(props.mode, `/projects/${slug}`)} />

      <CtaBand
        mode={props.mode}
        title="Talk to the people who will build it."
        body="Start a conversation about your project, constraints and delivery requirements."
        secondary={{ label: "See all projects", href: "/projects" }}
      />
    </CorporatePageFrame>
  );
}
