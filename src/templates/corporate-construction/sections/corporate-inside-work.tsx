import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateInsideWorkProps = {
  projects: Project[];
  narrative?: string;
};

function Figure({
  project,
  className,
  sizes,
  delay = 0,
}: {
  project: Project;
  className?: string;
  sizes: string;
  delay?: 0 | 1 | 2 | 3;
}) {
  const meta = [project.metadata?.sector, project.location].filter(Boolean).join(" · ");
  return (
    <Reveal as="figure" delay={delay} className={cn("min-w-0", className)}>
      <div className={cn(ui.plate, "h-full")}>
        <CmsImageMedia image={project.image} aspect="auto" className="h-full" sizes={sizes} />
      </div>
      <figcaption className="mt-3 flex flex-col gap-1">
        <span className="text-sm font-medium text-[var(--color-text)]">{project.title}</span>
        {meta ? <span className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{meta}</span> : null}
      </figcaption>
    </Reveal>
  );
}

/**
 * 03 — Inside the work. Company narrative beside an offset trio of site plates.
 */
export function CorporateInsideWork({ projects, narrative }: CorporateInsideWorkProps) {
  const withImages = projects.filter((p) => p.image?.url).slice(0, 3);
  if (!narrative && !withImages.length) return null;
  const [lead, second, third] = withImages;

  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby="inside-heading">
      <div className="vertex-container grid gap-12 py-24 md:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <p className={ui.eyebrow}>Inside the work</p>
            <h2 id="inside-heading" className={cn(ui.h2, "mt-5 max-w-[12ch]")}>
              What it looks like on site.
            </h2>
            {narrative ? <p className={cn(ui.body, "mt-6 max-w-md")}>{narrative}</p> : null}
          </div>
        </div>

        {withImages.length ? (
          <div className="grid grid-cols-12 gap-4 lg:col-span-8 lg:gap-6">
            {lead ? (
              <Figure
                project={lead}
                className="col-span-12 [&>div]:h-[60vw] [&>div]:md:h-[36rem]"
                sizes="(min-width: 1440px) 60vw, 100vw"
              />
            ) : null}
            {second ? (
              <Figure
                project={second}
                className="col-span-7 [&>div]:h-[48vw] [&>div]:md:h-[24rem]"
                sizes="(min-width: 1440px) 34vw, 58vw"
                delay={1}
              />
            ) : null}
            {third ? (
              <Figure
                project={third}
                className="col-span-5 mt-16 [&>div]:h-[40vw] [&>div]:md:h-[20rem]"
                sizes="(min-width: 1440px) 24vw, 42vw"
                delay={2}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
