"use client";

import { useCallback, useId, useState } from "react";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { ArchitecturalGrid } from "@/templates/corporate-construction/components/ui/architectural-grid";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type HomeSelectedWorkShowcaseProps = {
  projects: Project[];
  mode: TemplateRenderMode;
};

function atlasFacts(project: Project): { sector?: string; location?: string; year?: string } {
  return {
    sector: project.metadata?.sector?.toUpperCase(),
    location: project.location?.toUpperCase(),
    year: project.year ? String(project.year) : undefined,
  };
}

export function HomeSelectedWorkShowcase({ projects, mode }: HomeSelectedWorkShowcaseProps) {
  const tiles = projects.slice(0, 4);
  const [active, setActive] = useState(0);
  const stageId = useId();
  const tabPrefix = `${stageId}-atlas-tab`;

  const setActiveSafe = useCallback(
    (index: number) => {
      if (index >= 0 && index < tiles.length) setActive(index);
    },
    [tiles.length],
  );

  if (tiles.length < 4) return null;

  const current = tiles[active] ?? tiles[0];
  const href = previewHref(mode, `/projects/${current.slug}`);
  const facts = atlasFacts(current);
  const inactive = tiles.filter((_, index) => index !== active);

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface-muted)]" aria-labelledby="home-selected-work-heading">
      <ArchitecturalGrid className="pointer-events-none absolute inset-x-0 top-0 h-[min(100%,52rem)] opacity-[0.35]" />

      <div className="vertex-container relative py-24 md:py-32 lg:py-36">
        <p className={ui.eyebrow}>Selected work</p>
        <h2 id="home-selected-work-heading" className={cn(ui.h2, "mt-5 max-w-[16ch]")}>
          The work, in scale and detail.
        </h2>
        <p className={cn(ui.lead, "mt-6 max-w-2xl text-[var(--color-text-muted)] !text-base md:!text-lg")}>
          Four published builds — scale, sequence, and finish — from complex commercial environments to highly
          coordinated institutional work.
        </p>

        <div className="relative mt-14 lg:mt-20">
          {/* Vertical archive index — desktop only */}
          <div
            className="absolute -left-2 top-0 hidden h-full flex-col items-center gap-0 lg:flex xl:-left-6"
            aria-hidden
          >
            {tiles.map((_, index) => (
              <div key={index} className="flex flex-1 flex-col items-center">
                <span
                  className={cn(
                    ui.mono,
                    "text-[0.625rem]",
                    index === active ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]/50",
                  )}
                >
                  {pad(index + 1)}
                </span>
                {index < tiles.length - 1 ? (
                  <span className="my-2 w-px flex-1 min-h-[2rem] bg-[var(--color-border)]" />
                ) : null}
              </div>
            ))}
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12 xl:gap-16">
            {/* Project stage — copy */}
            <div className="order-2 lg:order-1 lg:col-span-4 xl:col-span-4">
              <div
                key={current.id}
                className="cc-fade border-l-2 border-[var(--color-accent)] pl-6 md:pl-8"
                role="tabpanel"
                id={`${stageId}-panel`}
                aria-labelledby={`${tabPrefix}-${active}`}
              >
                <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>
                  Project <span className="text-[var(--color-accent)]">{pad(active + 1)}</span>
                </p>
                <h3 className="mt-4 max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--color-text)]">
                  {current.title}
                </h3>

                <ul className="mt-8 space-y-2 border-t border-[var(--color-border)] pt-6">
                  {facts.sector ? (
                    <li className={cn(ui.mono, "text-[var(--color-text)]")}>{facts.sector}</li>
                  ) : null}
                  {facts.location ? (
                    <li className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{facts.location}</li>
                  ) : null}
                  {facts.year ? (
                    <li className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{facts.year}</li>
                  ) : null}
                </ul>

                <a href={href} className={cn(ui.link, "mt-10 inline-flex transition-transform motion-safe:hover:translate-x-0.5")}>
                  View project <span aria-hidden>→</span>
                </a>
              </div>
            </div>

            {/* Project stage — cinematic image */}
            <div className="order-1 min-w-0 lg:order-2 lg:col-span-8 xl:col-span-8">
              <div className="relative aspect-[16/10] w-full min-h-[16rem] overflow-hidden bg-[var(--color-surface)] sm:min-h-[20rem] lg:aspect-auto lg:h-[min(52vh,34rem)]">
                {tiles.map((project, index) => (
                  <div
                    key={project.id}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-700 ease-out motion-reduce:transition-none",
                      index === active ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden={index !== active}
                  >
                    <CmsImageMedia
                      image={project.image}
                      aspect="auto"
                      className={cn(
                        "h-full w-full object-cover transition-transform duration-[1.25s] ease-out motion-reduce:transition-none",
                        index === active ? "scale-100" : "scale-[1.03]",
                      )}
                      sizes="(min-width: 1280px) 62vw, 100vw"
                      priority={index === 0}
                    />
                  </div>
                ))}
                <a href={href} className="absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]">
                  <span className="sr-only">View {current.title}</span>
                </a>
              </div>

              {/* Archive previews — inactive projects only */}
              <div className="mt-3 hidden gap-2 sm:grid sm:grid-cols-3 md:mt-4">
                {inactive.map((project) => {
                  const index = tiles.findIndex((p) => p.id === project.id);
                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setActiveSafe(index)}
                      className="group relative h-16 overflow-hidden bg-[var(--color-surface)] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] md:h-20"
                      aria-label={`Show ${project.title}`}
                    >
                      <CmsImageMedia
                        image={project.image}
                        aspect="auto"
                        className="h-full w-full object-cover opacity-55 transition-[opacity,transform] duration-500 motion-reduce:transition-none group-hover:scale-[1.04] group-hover:opacity-80"
                        sizes="180px"
                      />
                      <span className={cn(ui.mono, "absolute left-2 top-2 bg-[var(--color-surface-muted)]/90 px-1.5 py-0.5 text-[0.625rem] text-[var(--color-text)]")}>
                        {pad(index + 1)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Horizontal project archive index */}
          <nav className="mt-12 border-t border-[var(--color-border)] pt-6 md:mt-14" aria-label="Project archive index">
            <div className="flex flex-col gap-0 sm:flex-row sm:divide-x sm:divide-[var(--color-border)]" role="tablist">
              {tiles.map((project, index) => {
                const isActive = index === active;
                const meta = [project.metadata?.sector, project.location, project.year].filter(Boolean).join(" · ");
                return (
                  <button
                    key={project.id}
                    type="button"
                    role="tab"
                    id={`${tabPrefix}-${index}`}
                    aria-selected={isActive}
                    aria-controls={`${stageId}-panel`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveSafe(index)}
                    onMouseEnter={() => setActiveSafe(index)}
                    onFocus={() => setActiveSafe(index)}
                    className={cn(
                      "group min-h-11 flex-1 px-0 py-4 text-left transition-colors motion-reduce:transition-none sm:px-5 sm:py-5 sm:first:pl-0",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
                      isActive ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                    )}
                  >
                    <span className={cn(ui.mono, "block", isActive ? "text-[var(--color-accent)]" : "")}>
                      {pad(index + 1)}
                    </span>
                    <span className="mt-2 block font-[family-name:var(--font-display)] text-sm font-semibold leading-snug tracking-[-0.02em] md:text-base">
                      {project.title}
                    </span>
                    {meta ? (
                      <span className={cn(ui.mono, "mt-1.5 block text-[0.625rem] normal-case tracking-normal opacity-80")}>
                        {meta}
                      </span>
                    ) : null}
                    <span
                      className={cn(
                        "mt-3 block h-px w-full max-w-[4rem] bg-[var(--color-accent)] transition-transform origin-left motion-reduce:transition-none",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
                      )}
                      aria-hidden
                    />
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
