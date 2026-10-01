import type { CompanyAboutHowWeWork } from "@/templates/shared/cms/types/company";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { hasIndexedItems, splitAboutParagraphs } from "@/templates/corporate-construction/utils/about-content";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateAboutHowWeWorkProps = {
  content: CompanyAboutHowWeWork;
};

export function CorporateAboutHowWeWorkSection({ content }: CorporateAboutHowWeWorkProps) {
  const intro = splitAboutParagraphs(content.intro);
  const principles = content.principles?.filter((p) => p.title?.trim()) ?? [];
  const headline = content.headline?.trim();

  if (!headline && !intro.length && !hasIndexedItems(principles)) return null;

  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby="about-how-we-work-heading">
      <div className="vertex-container py-28 md:py-36 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className={ui.eyebrow}>{content.eyebrow?.trim() || "How we work"}</p>
            {headline ? (
              <h2 id="about-how-we-work-heading" className={cn(ui.h2, "mt-5 max-w-[14ch] text-balance")}>
                {headline}
              </h2>
            ) : (
              <h2 id="about-how-we-work-heading" className="sr-only">
                How we work
              </h2>
            )}
          </div>
          <Reveal className="lg:col-span-8">
            {intro.length ? (
              <div className="max-w-2xl space-y-5">
                {intro.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className={cn(ui.body, "text-lg leading-relaxed")}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </Reveal>
        </div>

        {principles.length ? (
          <ol className="mt-20 border-t border-[var(--color-border)] md:mt-24">
            {principles.map((principle, index) => (
              <li
                key={principle.title}
                className="grid gap-6 border-b border-[var(--color-border)] py-10 md:grid-cols-12 md:items-baseline md:gap-10 md:py-12"
              >
                <span
                  className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,4vw,4rem)] font-semibold leading-none tracking-[-0.05em] text-[var(--color-text)]/20 md:col-span-2"
                  aria-hidden
                >
                  {pad(index + 1)}
                </span>
                <div className="md:col-span-10">
                  <p className="font-[family-name:var(--font-display)] text-[clamp(1.375rem,2.2vw,2rem)] font-semibold tracking-[-0.03em] text-[var(--color-text)]">
                    {principle.title}
                  </p>
                  {principle.body?.trim() ? (
                    <p className={cn(ui.body, "mt-3 max-w-xl text-base md:text-lg")}>{principle.body}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}
