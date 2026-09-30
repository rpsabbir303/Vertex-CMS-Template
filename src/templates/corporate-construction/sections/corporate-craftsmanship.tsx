import type { Company } from "@/templates/shared/cms/types/company";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import type { Project } from "@/templates/shared/cms/types/projects";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { ArchitecturalGrid } from "@/templates/corporate-construction/components/ui/architectural-grid";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateCraftsmanshipProps = {
  company: Company;
  projects: Project[];
};

const PRINCIPLES = [
  { title: "Supervision", body: "A superintendent on site every working day, accountable for the plan." },
  { title: "Quality", body: "Work is checked against the drawings before the next trade starts." },
  { title: "Coordination", body: "Trades, deliveries, and access sequenced in a weekly look-ahead." },
  { title: "Safety", body: "Temporary protection and site controls reviewed before each phase." },
];

function resolveSiteVisual(company: Company, projects: Project[]): { image: CmsImage; caption?: string } | null {
  for (const project of projects) {
    const frame = project.gallery?.images?.find((img) => img.url);
    if (frame) {
      return { image: frame, caption: frame.caption ?? project.title };
    }
  }
  const second = projects.filter((p) => p.image?.url)[1];
  if (second?.image) return { image: second.image, caption: second.title };
  if (company.heroImage?.url) return { image: company.heroImage };
  return null;
}

/**
 * 08 — Field execution. Dark, one big plate, four principles.
 */
export function CorporateCraftsmanship({ company, projects }: CorporateCraftsmanshipProps) {
  const visual = resolveSiteVisual(company, projects);

  return (
    <section className="relative overflow-hidden bg-[#070c16] text-white" aria-labelledby="field-heading">
      <ArchitecturalGrid tone="dark" className="absolute inset-0" />
      <div className="vertex-container relative grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className={ui.eyebrow}>Field execution</p>
          <h2 id="field-heading" className={cn(ui.h2, "mt-5 max-w-[12ch] !text-white")}>
            The work is in the details.
          </h2>
          <ol className="mt-12 divide-y divide-white/10">
            {PRINCIPLES.map((p, index) => (
              <Reveal as="li" key={p.title} delay={(index % 4) as 0 | 1 | 2 | 3} className="grid grid-cols-[3rem_1fr] gap-4 py-5">
                <span className={cn(ui.mono, "text-[var(--color-accent)]")}>{pad(index + 1)}</span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em]">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        {visual ? (
          <Reveal plate as="figure" className="lg:col-span-7">
            <div className={cn(ui.plate, "relative h-[70vw] min-h-[18rem] bg-white/5 md:h-[36rem] lg:h-[44rem]")}>
              <CmsImageMedia image={visual.image} aspect="auto" className="h-full" sizes="(min-width: 1440px) 58vw, 100vw" />
            </div>
            {visual.caption ? (
              <figcaption className={cn(ui.mono, "mt-3 text-white/50")}>{visual.caption}</figcaption>
            ) : null}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
