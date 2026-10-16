import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import {
  formatBuildingTypeLabel,
  formatProjectStatusLabel,
  getProjectBuildStatus,
  getProjectBuildingType,
} from "@/templates/corporate-construction/utils/project-filters";
import { ProjectsPageBody } from "@/templates/industrial-civil/components/projects-page-body";
import { ArrowIcon, Eyebrow, PillLink } from "@/templates/industrial-civil/components/pill-link";
import { IndustrialFrame } from "@/templates/industrial-civil/components/industrial-frame";
import { RecordHeading, bodyCopy, pageContainer, sectionTitle } from "@/templates/industrial-civil/components/record-heading";
import { readIndustrialSite, splitParagraphs } from "@/templates/industrial-civil/utils/site-content";
import { previewHref } from "@/templates/industrial-civil/utils/preview-href";

export function IndustrialCivilProjectsPage(props: TemplatePageProps) {
  const { company, projects } = readIndustrialSite(props.payload);
  const href = (path: string) => previewHref(props.mode, path);
  const featured =
    projects.find((project) => project.slug === "lakeshore-outpatient-pavilion") ??
    projects.find((project) => project.featured) ??
    projects[0];
  const featuredFacts = featured
    ? [
        featured.metadata?.sector ? { label: "Sector", value: featured.metadata.sector } : null,
        formatBuildingTypeLabel(getProjectBuildingType(featured))
          ? { label: "Type", value: formatBuildingTypeLabel(getProjectBuildingType(featured)) as string }
          : null,
        formatProjectStatusLabel(getProjectBuildStatus(featured))
          ? { label: "Status", value: formatProjectStatusLabel(getProjectBuildStatus(featured)) as string }
          : null,
        featured.location ? { label: "Location", value: featured.location } : null,
        featured.year ? { label: "Year", value: String(featured.year) } : null,
        featured.metadata?.duration ? { label: "Duration", value: featured.metadata.duration } : null,
        featured.metadata?.scope ? { label: "Scope", value: featured.metadata.scope } : null,
      ].filter((fact): fact is { label: string; value: string } => fact != null)
    : [];
  const featuredCopy = featured ? splitParagraphs(featured.introduction || featured.description || featured.summary) : [];

  return (
    <IndustrialFrame {...props}>
      <RecordHeading
        eyebrow="Selected work"
        title="Projects built to perform."
        lead="A collection of commercial and residential work delivered through careful planning, coordination and execution."
        image={company?.heroImage ?? projects.find((project) => project.image?.url)?.image}
        primaryHref={href("/contact")}
        secondaryHref="#project-listings"
        secondaryLabel="View Projects"
      />

      {projects.length ? (
        <ProjectsPageBody projects={projects} mode={props.mode} />
      ) : (
        <section className="bg-white py-[100px]">
          <p className={`${pageContainer} ${bodyCopy}`}>No projects have been published yet.</p>
        </section>
      )}

      {featured ? (
        <section className="bg-[#F6F8FA] py-[100px]" aria-labelledby="featured-project-heading">
          <div className={`${pageContainer} grid items-center gap-12 min-[960px]:grid-cols-2`}>
            <div>
              <Eyebrow>Featured project details</Eyebrow>
              <h2 id="featured-project-heading" className={sectionTitle}>
                <Link href={href(`/projects/${featured.slug}`)} className="hover:text-[#FF6610]">
                  {featured.title}
                </Link>
              </h2>
              {featuredCopy.map((paragraph) => (
                <p key={paragraph} className={`mt-5 ${bodyCopy}`}>
                  {paragraph}
                </p>
              ))}
              {featuredFacts.length ? (
                <dl className="mt-6 divide-y divide-[#e6e8ec] border-y border-[#e6e8ec]">
                  {featuredFacts.map((fact) => (
                    <div key={fact.label} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 py-3">
                      <dt className="text-sm font-semibold text-[#5c6570]">{fact.label}</dt>
                      <dd className="text-base font-bold text-[#03071E]">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <Link href={href(`/projects/${featured.slug}`)} className="mt-6 inline-flex items-center gap-1.5 font-bold text-[#03071E] hover:text-[#FF6610]">
                Read the full record <ArrowIcon />
              </Link>
            </div>
            {featured.image?.url ? (
              <img src={featured.image.url} alt={featured.image.alt} className="h-[360px] w-full rounded-[12px] object-cover min-[960px]:h-[520px]" />
            ) : null}
          </div>
        </section>
      ) : null}

      {projects.length ? (
        <section className="bg-[#03071E]" aria-labelledby="projects-cta-heading">
          <div className={`${pageContainer} flex flex-wrap items-end justify-between gap-8 py-20`}>
            <div>
              <Eyebrow light>Next project</Eyebrow>
              <h2 id="projects-cta-heading" className="mt-4 max-w-[12ch] text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.05] font-bold text-white">
                Add yours to the record.
              </h2>
              {company?.name ? (
                <p className="mt-5 max-w-md text-base leading-7 text-white/70">
                  Tell {company.name} about the building you need to deliver.
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-4">
              <PillLink href={href("/contact")}>Start a project</PillLink>
              <PillLink href={href("/services")} variant="outline-light">
                Capabilities
              </PillLink>
            </div>
          </div>
        </section>
      ) : null}
    </IndustrialFrame>
  );
}
