import type { CmsImage } from "@/templates/shared/cms/types/media";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { ArchitecturalGrid } from "@/templates/corporate-construction/components/ui/architectural-grid";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { aboutHeroTitleLines } from "@/templates/corporate-construction/utils/about-content";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateAboutHeroProps = {
  eyebrow?: string;
  tagline: string;
  fallbackTitle: string;
  lead?: string;
  meta: string[];
  image?: CmsImage | null;
};

export function CorporateAboutHero({
  eyebrow = "About",
  tagline,
  fallbackTitle,
  lead,
  meta,
  image,
}: CorporateAboutHeroProps) {
  const title = aboutHeroTitleLines(tagline, fallbackTitle);

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)]">
      <ArchitecturalGrid className="absolute inset-x-0 top-0 h-[40rem]" />
      <div className="vertex-container relative pt-36 pb-6 md:pt-44 md:pb-8">
        <p className={cn(ui.eyebrow, "cc-rise")}>{eyebrow}</p>
        <h1
          className={cn(
            "cc-rise mt-8 max-w-[12ch] font-[family-name:var(--font-display)] text-[clamp(2.75rem,7.5vw,7.25rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-[var(--color-text)]",
          )}
          data-delay="1"
        >
          {title.primary}
          {title.secondary ? (
            <>
              <br />
              <span className="text-[var(--color-text)]">{title.secondary}</span>
            </>
          ) : null}
        </h1>

        <div className="cc-rise mt-12 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end md:gap-12" data-delay="2">
          {lead ? (
            <p className={cn(ui.lead, "max-w-xl text-pretty md:col-span-7 lg:col-span-6")}>{lead}</p>
          ) : null}
          {meta.length ? (
            <ul
              className={cn(
                ui.mono,
                "flex flex-wrap gap-x-8 gap-y-3 text-[var(--color-text-muted)] md:col-span-5 md:justify-end md:text-right lg:col-span-6",
              )}
            >
              {meta.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
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
