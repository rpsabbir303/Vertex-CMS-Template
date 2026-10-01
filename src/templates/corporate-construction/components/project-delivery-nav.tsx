"use client";

import { useEffect, useState } from "react";
import type { ResolvedProjectDeliveryStage } from "@/templates/corporate-construction/utils/project-delivery";
import { deliveryStageDomId } from "@/templates/corporate-construction/utils/project-delivery";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectDeliveryNavProps = {
  stages: ResolvedProjectDeliveryStage[];
};

export function ProjectDeliveryNav({ stages }: ProjectDeliveryNavProps) {
  const [active, setActive] = useState(stages[0]?.slug);

  useEffect(() => {
    if (!stages.length) return;

    const ids = stages.map((s) => deliveryStageDomId(s.slug));
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0]?.target.id;
        if (top) {
          const slug = top.replace("project-stage-", "");
          setActive(slug as typeof active);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [stages]);

  if (stages.length < 2) return null;

  return (
    <nav
      className="sticky top-[4.5rem] z-30 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-sm"
      aria-label="How we delivered this project"
    >
      <div className="vertex-container">
        <p className={cn(ui.mono, "hidden pt-4 text-[var(--color-text-muted)] lg:block")}>How we delivered this project</p>
        <ul className="flex gap-1 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] lg:gap-2 lg:pb-4 [&::-webkit-scrollbar]:hidden">
          {stages.map((stage) => {
            const isActive = active === stage.slug;
            const href = `#${deliveryStageDomId(stage.slug)}`;
            return (
              <li key={stage.slug} className="shrink-0">
                <a
                  href={href}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
                    isActive
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]",
                  )}
                  aria-current={isActive ? "location" : undefined}
                >
                  <span className={cn(ui.mono, "text-[0.625rem]", isActive ? "text-white/70" : "")}>{pad(stage.number)}</span>
                  {stage.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
