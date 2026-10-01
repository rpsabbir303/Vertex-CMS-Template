import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { splitNarrative } from "@/templates/corporate-construction/utils/project-delivery";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectDetailIntroProps = {
  introduction: string;
};

export function ProjectDetailIntro({ introduction }: ProjectDetailIntroProps) {
  const paragraphs = splitNarrative(introduction);
  if (!paragraphs.length) return null;

  const [lead, ...rest] = paragraphs;

  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby="project-intro-heading">
      <div className="vertex-container grid gap-12 py-28 md:grid-cols-12 md:gap-16 md:py-36 lg:py-40">
        <div className="md:col-span-3">
          <p id="project-intro-heading" className={ui.eyebrow}>
            The project
          </p>
        </div>
        <Reveal className="md:col-span-9 lg:col-span-8 lg:col-start-5">
          <p className="max-w-[22ch] text-balance font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--color-text)]">
            {lead}
          </p>
          {rest.length ? (
            <div className="mt-12 max-w-3xl space-y-6 border-t border-[var(--color-border)] pt-10 md:mt-14 md:space-y-7">
              {rest.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className={cn(ui.body, "text-[1.0625rem] leading-relaxed md:text-lg")}>
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
