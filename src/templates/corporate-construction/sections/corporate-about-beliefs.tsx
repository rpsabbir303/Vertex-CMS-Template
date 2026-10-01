import type { CompanyAboutBeliefs } from "@/templates/shared/cms/types/company";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { hasIndexedItems } from "@/templates/corporate-construction/utils/about-content";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateAboutBeliefsProps = {
  content: CompanyAboutBeliefs;
};

export function CorporateAboutBeliefsSection({ content }: CorporateAboutBeliefsProps) {
  const headline = content.headline?.trim();
  const principles = content.principles?.filter((p) => p.title?.trim()) ?? [];

  if (!headline && !hasIndexedItems(principles)) return null;

  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby="about-beliefs-heading">
      <div className="vertex-container py-28 md:py-36 lg:py-40">
        <div className="max-w-3xl">
          <p className={ui.eyebrow}>{content.eyebrow?.trim() || "What we believe"}</p>
          {headline ? (
            <h2 id="about-beliefs-heading" className={cn(ui.h2, "mt-5 max-w-[16ch]")}>
              {headline}
            </h2>
          ) : (
            <h2 id="about-beliefs-heading" className="sr-only">
              What we believe
            </h2>
          )}
        </div>

        <Reveal className="mt-16 md:mt-20">
          <ul className="grid gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-14 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <li key={principle.title} className="border-t border-[var(--color-border)] pt-6">
                <span className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{pad(index + 1)}</span>
                <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[var(--color-text)]">
                  {principle.title}
                </p>
                {principle.body?.trim() ? (
                  <p className="mt-4 max-w-sm text-pretty text-base leading-relaxed text-[var(--color-text-muted)] whitespace-pre-line">
                    {principle.body}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
