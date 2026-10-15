"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Project } from "@/templates/shared/cms/types/projects";
import { splitNarrative } from "@/templates/corporate-construction/utils/project-delivery";
import {
  filterProjectsByStatusAndType,
  formatBuildingTypeLabel,
  formatProjectStatusLabel,
  getProjectBuildStatus,
  getProjectBuildingType,
  PROJECT_STATUS_FILTER_OPTIONS,
  PROJECT_TYPE_FILTER_OPTIONS,
  projectsWithBeforeAfter,
  type ProjectStatusFilter,
  type ProjectTypeFilter,
} from "@/templates/corporate-construction/utils/project-filters";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { pad } from "@/templates/modern-contractor/theme/ui";

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";
const heading = `${display} text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.2] font-semibold tracking-[-0.04em]`;

type ModernProjectsBodyProps = {
  projects: Project[];
  mode: TemplateRenderMode;
};

export function ModernProjectsBody({ projects, mode }: ModernProjectsBodyProps) {
  const [status, setStatus] = useState<ProjectStatusFilter>("all");
  const [buildingType, setBuildingType] = useState<ProjectTypeFilter>("all");
  const filtered = useMemo(
    () => filterProjectsByStatusAndType(projects, status, buildingType),
    [projects, status, buildingType],
  );
  const comparisons = useMemo(() => projectsWithBeforeAfter(projects), [projects]);
  const [compareIndex, setCompareIndex] = useState(0);
  const activeCompare = comparisons[compareIndex] ?? comparisons[0];
  const visibleIds = new Set(filtered.map((project) => project.id));

  return (
    <>
      <section id="project-filters" className="bg-[#f3f1e9] px-5 pt-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:pt-24" aria-labelledby="project-filters-heading">
        <div className="mx-auto max-w-[1360px] border-b border-black/15 pb-10">
          <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
            <span className="h-px w-8 bg-[#0a0c0b]" />
            Filter the record
          </p>
          <h2 id="project-filters-heading" className={`${heading} mt-5 max-w-3xl`}>
            Project status and project type.
          </h2>
          <div className="mt-10 grid gap-8 min-[960px]:grid-cols-2">
            <FilterGroup
              label="Project status"
              options={PROJECT_STATUS_FILTER_OPTIONS}
              value={status}
              onChange={setStatus}
            />
            <FilterGroup
              label="Project type"
              options={PROJECT_TYPE_FILTER_OPTIONS}
              value={buildingType}
              onChange={setBuildingType}
            />
          </div>
          <p className="mt-8 text-[14px] tracking-[0.08em] text-[#667067] uppercase">
            Showing {pad(filtered.length)} of {pad(projects.length)}
          </p>
        </div>
      </section>

      {filtered.length ? (
        filtered.map((project) => (
          <ProjectListing
            key={project.id}
            project={project}
            number={projects.findIndex((item) => item.id === project.id) + 1}
            mode={mode}
          />
        ))
      ) : (
        <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8">
          <div className="mx-auto max-w-[1360px]">
            <p className="text-[17px] text-[#3e4438]">No projects match these filters.</p>
            <button
              type="button"
              onClick={() => {
                setStatus("all");
                setBuildingType("all");
              }}
              className="mt-6 text-sm font-semibold underline decoration-[#0a0c0b]/30 underline-offset-4"
            >
              View all projects
            </button>
          </div>
        </section>
      )}

      <section id="project-index" className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="project-index-heading">
        <div className="mx-auto max-w-[1360px]">
          <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
            <span className="h-px w-8 bg-[#0a0c0b]" />
            Index
          </p>
          <h2 id="project-index-heading" className={`${heading} mt-5 max-w-3xl`}>
            Project index.
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#3e4438]">
            Jump to a published project, the before-and-after record, or the featured case.
          </p>
          <nav aria-label="Quick navigation" className="mt-8 flex flex-wrap gap-2">
            <a href="#before-after" className="rounded-full border border-black/15 px-4 py-2.5 text-sm font-semibold">
              Before / after
            </a>
            <a href="#featured-project" className="rounded-full border border-black/15 px-4 py-2.5 text-sm font-semibold">
              Featured project
            </a>
          </nav>
          <ol className="mt-10 border-t border-black/15">
            {projects.map((project, index) => {
              const listed = visibleIds.has(project.id);
              const meta = [project.metadata?.sector, project.location, formatProjectStatusLabel(getProjectBuildStatus(project))]
                .filter(Boolean)
                .join(" · ");
              return (
                <li key={project.id} className="border-b border-black/15">
                  <a
                    href={listed ? `#${project.slug}` : previewHref(mode, `/projects/${project.slug}`)}
                    className="grid items-center gap-3 py-6 min-[960px]:grid-cols-[4rem_minmax(0,1fr)_auto] min-[960px]:gap-6"
                  >
                    <span className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067]">{pad(index + 1)}</span>
                    <span className="min-w-0">
                      <span className={`${display} block text-[clamp(1.35rem,2.2vw,2rem)] leading-tight font-semibold tracking-[-0.03em]`}>
                        {project.title}
                      </span>
                      {meta ? <span className="mt-2 block text-[13px] tracking-[0.06em] text-[#667067] uppercase">{meta}</span> : null}
                    </span>
                    <span className="text-sm font-semibold">{listed ? "On this page" : "View project"}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {activeCompare?.beforeImage?.url && activeCompare.afterImage?.url ? (
        <section id="before-after" className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="before-after-heading">
          <div className="mx-auto max-w-[1360px]">
            <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
              <span className="h-px w-8 bg-[#C8FF2E]" />
              Before / after
            </p>
            <h2 id="before-after-heading" className={`${heading} mt-5 max-w-3xl`}>
              From existing conditions to finished environments.
            </h2>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/72">
              Show the transformation behind selected projects — from the starting condition through completed delivery.
            </p>
            {comparisons.length > 1 ? (
              <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Select comparison project">
                {comparisons.map((project, index) => {
                  const selected = project.id === activeCompare.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setCompareIndex(index)}
                      className={
                        selected
                          ? "rounded-full bg-[#C8FF2E] px-4 py-2.5 text-sm font-semibold text-[#0a0c0b]"
                          : "rounded-full border border-white/25 px-4 py-2.5 text-sm text-white"
                      }
                    >
                      {project.title}
                    </button>
                  );
                })}
              </div>
            ) : null}
            <div className="mt-10 grid gap-4 min-[960px]:grid-cols-2">
              <CompareFrame label="Before" src={activeCompare.beforeImage.url} alt={activeCompare.beforeImage.alt || ""} />
              <CompareFrame label="After" src={activeCompare.afterImage.url} alt={activeCompare.afterImage.alt || ""} />
            </div>
            <div className="mt-8 grid gap-6 min-[960px]:grid-cols-[minmax(0,1fr)_auto] min-[960px]:items-end">
              <div>
                <h3 className={`${display} text-[clamp(1.6rem,2.4vw,2.4rem)] leading-tight font-semibold tracking-[-0.03em]`}>
                  {activeCompare.title}
                </h3>
                <p className="mt-3 text-[14px] tracking-[0.08em] text-white/70 uppercase">
                  {[
                    formatBuildingTypeLabel(getProjectBuildingType(activeCompare)),
                    activeCompare.metadata?.sector,
                    activeCompare.location,
                    formatProjectStatusLabel(getProjectBuildStatus(activeCompare)),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {activeCompare.summary ? <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/75">{activeCompare.summary}</p> : null}
              </div>
              <Link
                href={previewHref(mode, `/projects/${activeCompare.slug}`)}
                className="inline-flex rounded-full bg-[#C8FF2E] px-5 py-3 text-sm font-semibold text-[#0a0c0b]"
              >
                View project
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067] uppercase">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={
                selected
                  ? "rounded-full bg-[#0a0c0b] px-4 py-2.5 text-sm font-semibold text-white"
                  : "rounded-full border border-black/15 px-4 py-2.5 text-sm text-[#0a0c0b]"
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProjectListing({ project, number, mode }: { project: Project; number: number; mode: TemplateRenderMode }) {
  const imageFirst = number % 2 === 0;
  const paragraphs = splitNarrative(project.description);
  const facts = [
    project.metadata?.sector ? { label: "Sector", value: project.metadata.sector } : undefined,
    formatBuildingTypeLabel(getProjectBuildingType(project))
      ? { label: "Type", value: formatBuildingTypeLabel(getProjectBuildingType(project))! }
      : undefined,
    formatProjectStatusLabel(getProjectBuildStatus(project))
      ? { label: "Status", value: formatProjectStatusLabel(getProjectBuildStatus(project))! }
      : undefined,
    project.location ? { label: "Location", value: project.location } : undefined,
    project.year ? { label: "Year", value: String(project.year) } : undefined,
    project.metadata?.duration ? { label: "Duration", value: project.metadata.duration } : undefined,
    project.metadata?.scope ? { label: "Scope", value: project.metadata.scope } : undefined,
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));

  return (
    <section id={project.slug} className="bg-[#f3f1e9] px-5 text-[#0a0c0b] min-[960px]:px-8" aria-labelledby={`${project.slug}-heading`}>
      <article className="mx-auto grid max-w-[1360px] items-center gap-8 border-b border-black/15 py-14 min-[960px]:grid-cols-2 min-[960px]:gap-16 min-[960px]:py-20">
        <div className={imageFirst ? "min-[960px]:order-2" : undefined}>
          <p className="text-[12px] font-extrabold tracking-[0.16em] text-[#667067]">{pad(number)}</p>
          <h2 id={`${project.slug}-heading`} className={`${heading} mt-3`}>
            {project.title}
          </h2>
          {project.summary ? <p className="mt-4 text-[17px] leading-relaxed text-[#3e4438]">{project.summary}</p> : null}
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-[17px] leading-relaxed text-[#3e4438]">
              {paragraph}
            </p>
          ))}
          {facts.length ? (
            <dl className="mt-6 grid gap-3 border-t border-black/15 pt-6">
              {facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3 text-sm">
                  <dt className="tracking-[0.08em] text-[#667067] uppercase">{fact.label}</dt>
                  <dd className="font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          <Link
            href={previewHref(mode, `/projects/${project.slug}`)}
            className="mt-6 inline-flex rounded-full bg-[#0a0c0b] px-5 py-3 text-sm font-semibold text-white"
          >
            View project
          </Link>
        </div>
        {project.image?.url ? (
          <div className={imageFirst ? "min-[960px]:order-1" : undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image.url}
              alt={project.image.alt || ""}
              className="aspect-[4/3] w-full rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] object-cover"
            />
          </div>
        ) : null}
      </article>
    </section>
  );
}

function CompareFrame({ label, src, alt }: { label: string; src: string; alt: string }) {
  return (
    <figure className="overflow-hidden rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="aspect-[4/3] w-full object-cover" />
      <figcaption className="bg-white/10 px-4 py-3 text-[12px] font-extrabold tracking-[0.16em] uppercase">{label}</figcaption>
    </figure>
  );
}
