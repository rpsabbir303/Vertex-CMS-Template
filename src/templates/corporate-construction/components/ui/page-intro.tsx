import type { ReactNode } from "react";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { ArchitecturalGrid } from "@/templates/corporate-construction/components/ui/architectural-grid";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  meta?: string[];
  image?: CmsImage | null;
  actions?: ReactNode;
  /** Compact variant for utility pages */
  compact?: boolean;
};

/**
 * Inner-page opener: mono eyebrow, oversized title, lead, spec rail, optional plate.
 */
export function PageIntro({ eyebrow, title, lead, meta = [], image, actions, compact }: PageIntroProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)]">
      <ArchitecturalGrid className="absolute inset-x-0 top-0 h-[36rem]" />
      <div className={cn("vertex-container relative pt-36 md:pt-44", compact ? "pb-12" : "pb-16 md:pb-20")}>
        <p className={cn(ui.eyebrow, "cc-rise")}>{eyebrow}</p>
        <h1
          className={cn(
            "cc-rise mt-6 max-w-[14ch] text-balance",
            compact ? ui.h2 : ui.h1,
          )}
          data-delay="1"
        >
          {title}
        </h1>
        <div className="cc-rise mt-10 grid gap-8 md:grid-cols-12" data-delay="2">
          {lead ? <p className={cn(ui.lead, "max-w-xl md:col-span-7")}>{lead}</p> : null}
          <div className={cn("flex flex-col gap-6 md:col-span-5", lead ? "" : "md:col-span-12")}>
            {meta.length ? (
              <ul className={cn(ui.mono, "flex flex-wrap gap-x-6 gap-y-2 text-[var(--color-text-muted)]")}>
                {meta.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
        </div>
      </div>

      {image?.url ? (
        <div className="vertex-container pb-4">
          <Reveal plate className={cn(ui.plate, "h-[48vh] min-h-[18rem] max-h-[40rem]")}>
            <CmsImageMedia image={image} aspect="auto" className="h-full" sizes="100vw" priority />
          </Reveal>
        </div>
      ) : null}
    </section>
  );
}
