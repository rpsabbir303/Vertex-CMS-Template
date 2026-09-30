import type { Testimonial } from "@/templates/shared/cms/types/testimonials";
import { PerspectiveShowcase } from "@/templates/corporate-construction/components/perspective-showcase";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { attribution } from "@/templates/corporate-construction/utils/testimonial-attribution";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateTestimonialsProps = {
  testimonials: Testimonial[];
};

/**
 * 11 — Client perspective. Rotating display quote with ticker, then every
 * perspective on record as a numbered grid.
 */
export function CorporateTestimonials({ testimonials }: CorporateTestimonialsProps) {
  const quotes = testimonials.filter((t) => t.quote?.trim());
  if (!quotes.length) return null;

  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby="perspective-heading">
      <div className="vertex-container py-24 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={ui.eyebrow}>Client perspective</p>
            <h2 id="perspective-heading" className={cn(ui.h2, "mt-5 max-w-[14ch]")}>
              What owners say after turnover.
            </h2>
          </div>
          <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>
            {quotes.length} {quotes.length === 1 ? "perspective" : "perspectives"} on record
          </p>
        </div>

        <Reveal className="mt-16">
          <PerspectiveShowcase testimonials={quotes} />
        </Reveal>

        {quotes.length > 1 ? (
          <ul className={cn("mt-20 grid gap-10 border-t pt-10 md:grid-cols-3", ui.rule)} aria-label="All client perspectives">
            {quotes.map((t, index) => (
              <Reveal as="li" key={t.id} delay={(index % 4) as 0 | 1 | 2 | 3}>
                <blockquote>
                  <p className={cn(ui.mono, "text-[var(--color-accent)]")}>{pad(index + 1)}</p>
                  <p className={cn(ui.lead, "mt-4 !text-lg")}>“{t.quote.trim()}”</p>
                  <footer className={cn(ui.mono, "mt-4 text-[var(--color-text-muted)]")}>{attribution(t)}</footer>
                </blockquote>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
