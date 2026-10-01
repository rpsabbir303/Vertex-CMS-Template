import type { CmsImage } from "@/templates/shared/cms/types/media";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { ArchitecturalGrid } from "@/templates/corporate-construction/components/ui/architectural-grid";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { projectHeroTitleLines } from "@/templates/corporate-construction/utils/project-delivery";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectDetailHeroProps = {
  title: string;
  summary?: string;
  meta: Array<{ label: string; value: string }>;
  indexLabel: string;
  projectsHref: string;
  image?: CmsImage | null;
};

export function ProjectDetailHero({
  title,
  summary,
  meta,
  indexLabel,
  projectsHref,
  image,
}: ProjectDetailHeroProps) {
  const lines = projectHeroTitleLines(title);

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)]">
      <ArchitecturalGrid className="absolute inset-x-0 top-0 h-[40rem]" />
      <div className="vertex-container relative pt-36 pb-6 md:pt-44 md:pb-8">
        <p className={cn(ui.mono, "cc-rise flex flex-wrap items-center gap-x-4 gap-y-2 text-[var(--color-text-muted)]")}>
          <a href={projectsHref} className="transition-colors hover:text-[var(--color-text)]">
            Projects
          </a>
          <span aria-hidden>/</span>
          <span className="text-[var(--color-accent)]">{indexLabel}</span>
        </p>

        <h1
          className={cn(
            "cc-rise mt-8 max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(2.75rem,7.5vw,7.25rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-[var(--color-text)]",
          )}
          data-delay="1"
        >
          {lines.primary}
          {lines.secondary ? (
            <>
              <br />
              <span>{lines.secondary}</span>
            </>
          ) : null}
        </h1>

        <div className="cc-rise mt-12 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end md:gap-12" data-delay="2">
          {summary ? <p className={cn(ui.lead, "max-w-xl text-pretty md:col-span-7 lg:col-span-6")}>{summary}</p> : null}
          {meta.length ? (
            <dl
              className={cn(
                "grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:col-span-5 md:justify-items-end lg:col-span-6",
                !summary && "md:col-span-12 md:max-w-3xl md:justify-items-start",
              )}
            >
              {meta.map(({ label, value }) => (
                <div key={label} className="min-w-0 border-t border-[var(--color-border)] pt-3 md:text-right md:last:odd:col-span-1">
                  <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{label}</dt>
                  <dd className="mt-1.5 text-sm font-medium text-[var(--color-text)]">{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>

      {image?.url ? (
        <div className="vertex-container pb-6 md:pb-10">
          <Reveal plate className={cn(ui.plate, "h-[52vh] min-h-[18rem] max-h-[42rem] md:h-[54vh]")}>
            <CmsImageMedia image={image} aspect="auto" className="h-full w-full object-cover" sizes="100vw" priority />
          </Reveal>
        </div>
      ) : null}
    </section>
  );
}
