"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Project } from "@/templates/shared/cms/types/projects";
import {
  filterProjectsByStatusAndType,
  formatBuildingTypeLabel,
  formatProjectStatusLabel,
  getProjectBuildStatus,
  getProjectBuildingType,
  projectHasBeforeAfter,
  PROJECT_STATUS_FILTER_OPTIONS,
  PROJECT_TYPE_FILTER_OPTIONS,
  type ProjectStatusFilter,
  type ProjectTypeFilter,
} from "@/templates/corporate-construction/utils/project-filters";
import { ArrowIcon, Eyebrow } from "@/templates/industrial-civil/components/pill-link";
import { bodyCopy, pageContainer, sectionTitle } from "@/templates/industrial-civil/components/record-heading";
import { previewHref } from "@/templates/industrial-civil/utils/preview-href";

export function ProjectsPageBody({ projects, mode }: { projects: Project[]; mode: TemplateRenderMode }) {
  const hrefFor = (slug: string) => previewHref(mode, `/projects/${slug}`);
  const [status, setStatus] = useState<ProjectStatusFilter>("all");
  const [buildingType, setBuildingType] = useState<ProjectTypeFilter>("all");
  const filtered = useMemo(
    () => filterProjectsByStatusAndType(projects, status, buildingType),
    [projects, status, buildingType],
  );
  const visible = new Set(filtered.map((project) => project.id));
  const comparisons = projects.filter(projectHasBeforeAfter);
  const [comparisonId, setComparisonId] = useState(comparisons[0]?.id);
  const comparison = comparisons.find((project) => project.id === comparisonId) ?? comparisons[0];

  return (
    <>
      <section id="project-listings" className="scroll-mt-[140px] bg-white py-[100px]" aria-labelledby="project-filters-heading">
        <div className={pageContainer}>
          <Eyebrow>Find a project</Eyebrow>
          <h2 id="project-filters-heading" className={sectionTitle}>
            Project status and project type
          </h2>
          <div className="mt-10 grid gap-8 min-[960px]:grid-cols-2">
            <FilterRow legend="Project status" value={status} options={PROJECT_STATUS_FILTER_OPTIONS} onChange={setStatus} />
            <FilterRow legend="Project type" value={buildingType} options={PROJECT_TYPE_FILTER_OPTIONS} onChange={setBuildingType} />
          </div>
        </div>
      </section>

      {filtered.length ? (
        filtered.map((project, index) => (
          <ProjectListing key={project.id} project={project} index={index} total={filtered.length} href={hrefFor(project.slug)} />
        ))
      ) : (
        <section className="bg-[#F6F8FA] py-[80px]">
          <div className={pageContainer}>
            <p className={bodyCopy}>No projects match these filters.</p>
            <button
              type="button"
              onClick={() => {
                setStatus("all");
                setBuildingType("all");
              }}
              className="mt-6 font-bold text-[#03071E] hover:text-[#FF6610]"
            >
              View all projects
            </button>
          </div>
        </section>
      )}

      <section className="bg-[#F6F6F6] py-[100px]" aria-labelledby="project-index-heading">
        <div className={pageContainer}>
          <Eyebrow>Quick navigation</Eyebrow>
          <h2 id="project-index-heading" className={sectionTitle}>
            Project index
          </h2>
          <ol className="mt-10 divide-y divide-[#e6e8ec] border-y border-[#e6e8ec]">
            {projects.map((project, index) => {
              const onPage = visible.has(project.id);
              const meta = [project.metadata?.sector, project.location, project.year].filter(Boolean).join(" · ");
              return (
                <li key={project.id}>
                  <Link
                    href={onPage ? `#listing-${project.slug}` : hrefFor(project.slug)}
                    className="grid grid-cols-[3rem_minmax(0,1fr)] items-center gap-4 py-5 hover:text-[#FF6610] min-[720px]:grid-cols-[3rem_minmax(0,1fr)_auto]"
                  >
                    <span className="font-bold text-[#FF6610]">{String(index + 1).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <span className="block truncate text-[clamp(1.25rem,2vw,1.75rem)] font-bold text-[#03071E]">{project.title}</span>
                      {meta ? <span className="mt-1 block text-sm text-[#5c6570]">{meta}</span> : null}
                    </span>
                    <span className="hidden items-center gap-1.5 font-bold text-[#03071E] min-[720px]:inline-flex">
                      {onPage ? "Jump to listing" : "View project"} <ArrowIcon />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {comparison?.beforeImage?.url && comparison.afterImage?.url ? (
        <section className="bg-white py-[100px]" aria-labelledby="before-after-heading">
          <div className={pageContainer}>
            <Eyebrow>Before / after</Eyebrow>
            <h2 id="before-after-heading" className={`max-w-[18ch] ${sectionTitle}`}>
              From existing conditions to finished environments.
            </h2>
            <p className={`mt-5 max-w-2xl ${bodyCopy}`}>
              Show the transformation behind selected projects — from the starting condition through completed delivery.
            </p>
            {comparisons.length > 1 ? (
              <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Select comparison project">
                {comparisons.map((project) => {
                  const selected = project.id === comparison.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setComparisonId(project.id)}
                      className={`min-h-10 rounded-full px-4 text-sm font-bold ${selected ? "bg-[#FF6610] text-white" : "bg-[#F6F8FA] text-[#03071E]"}`}
                    >
                      {project.title}
                    </button>
                  );
                })}
              </div>
            ) : null}
            <div className="mt-10 grid gap-4 min-[720px]:grid-cols-2">
              <figure>
                <img src={comparison.beforeImage.url} alt={comparison.beforeImage.alt} className="h-[280px] w-full rounded-[12px] object-cover min-[960px]:h-[420px]" />
                <figcaption className="mt-3 text-sm font-bold tracking-[0.08em] text-[#03071E] uppercase">Before</figcaption>
              </figure>
              <figure>
                <img src={comparison.afterImage.url} alt={comparison.afterImage.alt} className="h-[280px] w-full rounded-[12px] object-cover min-[960px]:h-[420px]" />
                <figcaption className="mt-3 text-sm font-bold tracking-[0.08em] text-[#03071E] uppercase">After</figcaption>
              </figure>
            </div>
            <Link href={hrefFor(comparison.slug)} className="mt-6 inline-flex items-center gap-1.5 font-bold text-[#03071E] hover:text-[#FF6610]">
              View {comparison.title} <ArrowIcon />
            </Link>
          </div>
        </section>
      ) : null}
    </>
  );
}

function FilterRow<T extends string>({
  legend,
  options,
  value,
  onChange,
}: {
  legend: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="min-w-0 border-0 p-0">
      <legend className="mb-3 text-sm font-bold tracking-[0.08em] text-[#5c6570] uppercase">{legend}</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={legend}>
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={`min-h-10 rounded-full px-4 text-sm font-bold ${selected ? "bg-[#FF6610] text-white" : "bg-[#F6F8FA] text-[#03071E]"}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function projectFacts(project: Project) {
  const status = formatProjectStatusLabel(getProjectBuildStatus(project));
  const buildingType = formatBuildingTypeLabel(getProjectBuildingType(project));
  return [
    project.metadata?.sector ? { label: "Sector", value: project.metadata.sector } : null,
    buildingType ? { label: "Type", value: buildingType } : null,
    status ? { label: "Status", value: status } : null,
    project.location ? { label: "Location", value: project.location } : null,
    project.year ? { label: "Year", value: String(project.year) } : null,
    project.metadata?.scope ? { label: "Scope", value: project.metadata.scope } : null,
    project.metadata?.duration ? { label: "Duration", value: project.metadata.duration } : null,
  ].filter((fact): fact is { label: string; value: string } => fact != null);
}

function ProjectListing({ project, index, total, href }: { project: Project; index: number; total: number; href: string }) {
  const facts = projectFacts(project);
  return (
    <section
      id={`listing-${project.slug}`}
      className={`scroll-mt-[140px] py-[100px] ${index % 2 === 0 ? "bg-[#F6F8FA]" : "bg-white"}`}
      aria-labelledby={`listing-${project.slug}-heading`}
    >
      <div className={`${pageContainer} grid items-center gap-12 min-[960px]:grid-cols-2`}>
        {project.image?.url ? (
          <Link href={href} className={`block overflow-hidden rounded-[12px] ${index % 2 ? "min-[960px]:order-2" : ""}`}>
            <img src={project.image.url} alt={project.image.alt} className="h-[320px] w-full object-cover min-[960px]:h-[460px]" />
          </Link>
        ) : null}
        <div>
          <p className="text-sm font-bold tracking-[0.14em] text-[#FF6610]">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <h2 id={`listing-${project.slug}-heading`} className={sectionTitle}>
            <Link href={href} className="hover:text-[#FF6610]">
              {project.title}
            </Link>
          </h2>
          {project.summary ? <p className={`mt-5 ${bodyCopy}`}>{project.summary}</p> : null}
          {facts.length ? (
            <dl className="mt-6 divide-y divide-[#e6e8ec] border-y border-[#e6e8ec]">
              {facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4 py-3">
                  <dt className="text-sm font-semibold text-[#5c6570]">{fact.label}</dt>
                  <dd className="text-base font-bold text-[#03071E]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <Link href={href} className="mt-6 inline-flex items-center gap-1.5 font-bold text-[#03071E] hover:text-[#FF6610]">
            View Project <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}
