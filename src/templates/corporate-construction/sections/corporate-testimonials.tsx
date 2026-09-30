import type { Testimonial } from "@/templates/shared/cms/types/testimonials";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateTestimonialsProps = {
  testimonials: Testimonial[];
};

function attribution(t: Testimonial): string {
  return [t.personName, [t.personRole, t.companyName].filter(Boolean).join(", ")]
    .filter(Boolean)
    .join(" · ");
}

/**
 * 11 — Client perspective. One quote at display size; the rest as a list.
 */
export function CorporateTestimonials({ testimonials }: CorporateTestimonialsProps) {
  const [primary, ...rest] = testimonials.filter((t) => t.quote?.trim());
  if (!primary) return null;

  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby="perspective-heading">
      <div className="vertex-container py-24 md:py-32">
        <p id="perspective-heading" className={ui.eyebrow}>
          Client perspective
        </p>
        <Reveal as="blockquote" className="mt-8">
          <p className="max-w-5xl text-balance font-[family-name:var(--font-display)] text-[clamp(1.875rem,4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[var(--color-primary)]">
            <span className="text-[var(--color-accent)]">“</span>
            {primary.quote.trim()}
            <span className="text-[var(--color-accent)]">”</span>
          </p>
          <footer className={cn(ui.mono, "mt-8 text-[var(--color-text-muted)]")}>{attribution(primary)}</footer>
        </Reveal>

        {rest.length ? (
          <ul className={cn("mt-20 grid gap-10 border-t pt-10 md:grid-cols-3", ui.rule)}>
            {rest.slice(0, 3).map((t, index) => (
              <Reveal as="li" key={t.id} delay={(index % 4) as 0 | 1 | 2 | 3}>
                <blockquote>
                  <p className={cn(ui.lead, "!text-lg")}>“{t.quote.trim()}”</p>
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
