"use client";

import { useState } from "react";
import type { CompanyHistoryMilestone } from "@/templates/shared/cms/types/company";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { ArchitecturalGrid } from "@/templates/corporate-construction/components/ui/architectural-grid";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateAboutHistoryProps = {
  eyebrow?: string;
  headline: string;
  milestones: CompanyHistoryMilestone[];
  image?: CmsImage | null;
};

const STAGGER = ["lg:translate-y-0", "lg:translate-y-10", "lg:translate-y-20", "lg:translate-y-6"];

export function CorporateAboutHistory({
  eyebrow = "Our history",
  headline,
  milestones,
  image,
}: CorporateAboutHistoryProps) {
  const [active, setActive] = useState(0);

  if (!milestones.length) return null;

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface-muted)]" aria-labelledby="about-history-heading">
      <ArchitecturalGrid className="pointer-events-none absolute inset-x-0 top-0 h-full max-h-[36rem] opacity-[0.28]" />

      <div className="vertex-container relative py-28 md:py-36 lg:py-40">
        <p className={ui.eyebrow}>{eyebrow}</p>
        <h2 id="about-history-heading" className={cn(ui.h2, "mt-5 max-w-[18ch]")}>
          {headline}
        </h2>

        <div className={cn("mt-16 lg:mt-20", image?.url ? "grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-14" : "")}>
          <ol
            className={cn(
              "flex flex-col gap-14 sm:gap-16",
              image?.url ? "lg:col-span-7" : "max-w-5xl",
              "lg:flex-row lg:items-end lg:justify-between lg:gap-8",
            )}
            role="list"
          >
            {milestones.map((milestone, index) => {
              const isActive = index === active;
              return (
                <li
                  key={`${milestone.year}-${milestone.title}`}
                  className={cn(
                    "group min-w-0 flex-1 border-t border-[var(--color-border)] pt-6 transition-colors motion-reduce:transition-none lg:max-w-[14rem]",
                    STAGGER[index] ?? "",
                    isActive && "border-[var(--color-accent)]/40",
                  )}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <button
                    type="button"
                    className="w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]"
                    onClick={() => setActive(index)}
                    aria-pressed={isActive}
                  >
                    <p
                      className={cn(
                        "font-[family-name:var(--font-display)] text-[clamp(2.5rem,4vw,4rem)] font-semibold leading-none tracking-[-0.05em] transition-colors motion-reduce:transition-none",
                        isActive ? "text-[var(--color-text)]" : "text-[var(--color-text)]/35 group-hover:text-[var(--color-text)]/70",
                      )}
                    >
                      {milestone.year ?? "—"}
                    </p>
                    <div
                      className={cn(
                        "mt-5 h-px w-full max-w-[8rem] bg-[var(--color-border)] transition-[width,background-color] duration-500 motion-reduce:transition-none",
                        isActive ? "w-full max-w-none bg-[var(--color-accent)]" : "group-hover:w-full group-hover:max-w-none",
                      )}
                      aria-hidden
                    />
                    <p
                      className={cn(
                        ui.mono,
                        "mt-5 transition-colors motion-reduce:transition-none",
                        isActive ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]",
                      )}
                    >
                      {milestone.title}
                    </p>
                    {milestone.description ? (
                      <p className={cn(ui.small, "mt-3 max-w-xs", isActive ? "text-[var(--color-text-muted)]" : "text-[var(--color-text-muted)]/80")}>
                        {milestone.description}
                      </p>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ol>

          {image?.url ? (
            <div className="relative lg:col-span-5">
              <div className={cn(ui.plate, "aspect-[4/5] max-h-[28rem] w-full overflow-hidden lg:max-h-none lg:min-h-[22rem]")}>
                <CmsImageMedia image={image} aspect="auto" className="h-full w-full object-cover" sizes="(min-width: 1024px) 36vw, 100vw" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
