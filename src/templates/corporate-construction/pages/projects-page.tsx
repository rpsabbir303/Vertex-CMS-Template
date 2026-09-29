import type { TemplatePageProps } from "@/registry/template-types";
import {
  getSortedCollectionItems,
  unwrapEnvelope,
} from "@/templates/shared/cms/resolve-content";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CorporateProjectsHero } from "@/templates/corporate-construction/components/corporate-projects-hero";
import { ProjectsEditorialStories } from "@/templates/corporate-construction/components/projects-editorial-stories";
import { ProjectsFeaturedStory } from "@/templates/corporate-construction/components/projects-featured-story";
import { ProjectsIndex } from "@/templates/corporate-construction/components/projects-index";
import {
  planProjectsListing,
  selectPrimaryProject,
} from "@/templates/corporate-construction/components/projects-listing-plan";
import { CorporateProjectsCta } from "@/templates/corporate-construction/sections/projects-cta";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";

const HERO_TITLE = "Selected work";
const HERO_DESCRIPTION =
  "Selected work across commercial, institutional, and complex occupied environments.";

export function CorporateConstructionProjectsPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const projects = getSortedCollectionItems(props.payload.projects);
  const { primary, rest, all } = selectPrimaryProject(projects);
  const plan = planProjectsListing(rest, all.length);
  const detailHref = (slug: string) => previewHref(props.mode, `/projects/${slug}`);

  const heroImage = primary?.image ?? rest.find((p) => p.image?.url)?.image ?? null;

  /** Absolute index map for consistent numbering across sections */
  const indexById = new Map(all.map((project, index) => [project.id, index]));

  const editorialOffset =
    plan.editorial[0] && indexById.has(plan.editorial[0].id)
      ? (indexById.get(plan.editorial[0].id) as number)
      : primary
        ? 1
        : 0;

  const indexOffset =
    plan.indexProjects[0] && indexById.has(plan.indexProjects[0].id)
      ? (indexById.get(plan.indexProjects[0].id) as number)
      : 1;

  return (
    <CorporatePageFrame {...props}>
      <CorporateProjectsHero
        title={HERO_TITLE}
        description={HERO_DESCRIPTION}
        image={heroImage}
        projectCount={all.length || undefined}
      />

      {!all.length ? (
        <section className="vertex-container py-16 md:py-20">
          <p className="text-[var(--color-text-muted)]">No projects have been published yet.</p>
        </section>
      ) : null}

      {primary ? (
        <ProjectsFeaturedStory
          project={primary}
          index={indexById.get(primary.id) ?? 0}
          detailHref={detailHref(primary.slug)}
        />
      ) : null}

      {plan.editorial.length ? (
        <ProjectsEditorialStories
          projects={plan.editorial}
          indexOffset={editorialOffset}
          detailHref={detailHref}
        />
      ) : null}

      {plan.showIndex && plan.indexProjects.length ? (
        <ProjectsIndex
          projects={plan.indexProjects}
          indexOffset={indexOffset}
          detailHref={detailHref}
          dense={plan.denseIndex}
        />
      ) : null}

      {all.length ? (
        <CorporateProjectsCta mode={props.mode} companyName={company?.name} />
      ) : null}
    </CorporatePageFrame>
  );
}
