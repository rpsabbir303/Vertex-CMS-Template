import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateAboutWhoWeAreProps = {
  statement: string;
  supporting: string[];
};

export function CorporateAboutWhoWeAre({ statement, supporting }: CorporateAboutWhoWeAreProps) {
  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby="about-statement">
      <div className="vertex-container grid gap-12 py-28 md:grid-cols-12 md:gap-16 md:py-36 lg:py-40">
        <div className="md:col-span-3 lg:col-span-3">
          <p className={ui.eyebrow}>Who we are</p>
        </div>
        <Reveal className="md:col-span-9 lg:col-span-8 lg:col-start-5">
          <h2
            id="about-statement"
            className="max-w-[22ch] text-balance font-[family-name:var(--font-display)] text-[clamp(1.875rem,3.6vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.04em] text-[var(--color-text)]"
          >
            {statement}
          </h2>
          {supporting.length ? (
            <div className="mt-12 max-w-3xl space-y-6 border-t border-[var(--color-border)] pt-10 md:mt-14 md:space-y-7">
              {supporting.map((paragraph) => (
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
