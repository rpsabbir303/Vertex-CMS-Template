"use client";

import { useState } from "react";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectsLedgerProps = {
  projects: Project[];
  mode: TemplateRenderMode;
};

/**
 * Every project as a ledger row. Hovering a row swaps the sticky plate.
 */
export function ProjectsLedger({ projects, mode }: ProjectsLedgerProps) {
  const [active, setActive] = useState(0);
  const current = projects[active];
  const detailHref = (slug: string) => previewHref(mode, `/projects/${slug}`);

  return (
    <section className="bg-[var(--color-surface)]" aria-label="Project index">
      <div className="vertex-container grid gap-10 pb-24 md:pb-32 lg:grid-cols-12 lg:gap-14">
        <ol className={cn("border-t lg:col-span-7", ui.rule)} role="list">
          {projects.map((project, index) => {
            const isActive = index === active;
            const meta = [project.metadata?.sector, project.location].filter(Boolean).join(" · ");
            return (
              <li key={project.id} className={cn("border-b", ui.rule)}>
                <a
                  href={detailHref(project.slug)}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 md:grid-cols-[3rem_1fr_auto_4rem] md:py-7"
                >
                  <span className={cn(ui.mono, isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]")}>
                    {pad(index + 1)}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block truncate font-[family-name:var(--font-display)] text-[clamp(1.375rem,2.4vw,2.5rem)] font-semibold leading-none tracking-[-0.03em] transition-colors motion-reduce:transition-none",
                        isActive ? "text-[var(--color-primary)]" : "text-[var(--color-primary)]/60 group-hover:text-[var(--color-primary)]",
                      )}
                    >
                      {project.title}
                    </span>
                    {meta ? <span className={cn(ui.mono, "mt-2 block truncate text-[var(--color-text-muted)]")}>{meta}</span> : null}
                  </span>
                  <span className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{project.year ?? ""}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "hidden h-10 w-10 items-center justify-center justify-self-end rounded-full border transition-colors motion-reduce:transition-none md:flex",
                      isActive ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white" : "border-[var(--color-primary)]/15 text-[var(--color-primary)]/50",
                    )}
                  >
                    →
                  </span>
                </a>
                {/* Thumbnail on small screens */}
                {project.image?.url ? (
                  <div className={cn(ui.plateSm, "mb-6 h-48 lg:hidden")}>
                    <CmsImageMedia image={project.image} aspect="auto" className="h-full" sizes="100vw" />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28">
            <div className={cn(ui.plate, "relative h-[34rem]")}>
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none",
                    index === active ? "opacity-100" : "opacity-0",
                  )}
                  aria-hidden={index !== active}
                >
                  <CmsImageMedia image={project.image} aspect="auto" className="h-full" sizes="40vw" />
                </div>
              ))}
            </div>
            {current ? (
              <div className="mt-5 flex items-start justify-between gap-6">
                <p className={cn(ui.body, "max-w-sm")}>{current.summary}</p>
                <p className={cn(ui.mono, "shrink-0 text-[var(--color-text-muted)]")}>
                  {pad(active + 1)} / {pad(projects.length)}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
