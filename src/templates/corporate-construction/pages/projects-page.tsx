import type { TemplatePageProps } from "@/registry/template-types";
import { getSortedCollectionItems, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { ProjectsLedger } from "@/templates/corporate-construction/components/projects-ledger";
import { CtaBand } from "@/templates/corporate-construction/components/ui/cta-band";
import { PageIntro } from "@/templates/corporate-construction/components/ui/page-intro";
import { uniqueSectors } from "@/templates/corporate-construction/sections/corporate-home-metrics";
import { CorporateProjectStories } from "@/templates/corporate-construction/sections/corporate-project-stories";
import { pageSeoDescription } from "@/templates/corporate-construction/utils/page-seo";

export function CorporateConstructionProjectsPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const projects = getSortedCollectionItems(props.payload.projects);
  const featured = projects.filter((p) => p.featured);
  const sectors = uniqueSectors(projects);

  const meta = [
    projects.length ? `${projects.length} ${projects.length === 1 ? "project" : "projects"} published` : undefined,
    ...sectors,
  ].filter((v): v is string => Boolean(v));

  return (
    <CorporatePageFrame {...props}>
      <PageIntro
        eyebrow="Projects"
        title="The work, on record."
        lead={pageSeoDescription(props.payload, "projects")}
        meta={meta}
      />

      {!projects.length ? (
        <section className="vertex-container py-16 md:py-20">
          <p className="text-[var(--color-text-muted)]">No projects have been published yet.</p>
        </section>
      ) : null}

      {projects.length ? <ProjectsLedger projects={projects} mode={props.mode} /> : null}

      {featured.length ? (
        <CorporateProjectStories projects={featured} startIndex={1} total={featured.length} mode={props.mode} />
      ) : null}

      {projects.length ? (
        <CtaBand
          mode={props.mode}
          title="Add yours to the record."
          body={company?.name ? `Tell ${company.name} about the building you need to deliver.` : undefined}
          secondary={{ label: "Capabilities", href: "/services" }}
        />
      ) : null}
    </CorporatePageFrame>
  );
}
