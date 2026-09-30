"use client";

import { useMemo, useState } from "react";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Project } from "@/templates/shared/cms/types/projects";
import { ProjectBeforeAfterBlock } from "@/templates/corporate-construction/components/project-before-after-block";
import { projectsWithBeforeAfter } from "@/templates/corporate-construction/utils/project-filters";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectsBeforeAfterSectionProps = {
  projects: Project[];
  mode: TemplateRenderMode;
};

export function ProjectsBeforeAfterSection({ projects, mode }: ProjectsBeforeAfterSectionProps) {
  const comparisons = useMemo(() => projectsWithBeforeAfter(projects), [projects]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!comparisons.length) return null;

  const active = comparisons[activeIndex] ?? comparisons[0];
  if (!active) return null;

  const detailHref = previewHref(mode, `/projects/${active.slug}`);

  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby="before-after-heading">
      <div className="vertex-container py-20 md:py-28">
        {comparisons.length > 1 ? (
          <nav
            className="mb-10 flex flex-col gap-2 border-b border-[var(--color-border)] pb-6"
            aria-label="Select comparison project"
          >
            {comparisons.map((project, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "flex min-h-11 items-baseline gap-4 py-2 text-left transition-colors",
                    selected ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
                  )}
                >
                  <span className={cn(ui.mono, selected && "text-[var(--color-accent)]")}>{pad(index + 1)}</span>
                  <span className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.02em]">
                    {project.title}
                  </span>
                </button>
              );
            })}
          </nav>
        ) : null}

        <ProjectBeforeAfterBlock
          key={active.id}
          project={active}
          detailHref={detailHref}
          headingId="before-after-heading"
        />
      </div>
    </section>
  );
}
