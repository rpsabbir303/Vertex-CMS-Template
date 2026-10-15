import type { Testimonial } from "@/templates/shared/cms/types/testimonials";
import { Reveal } from "@/templates/modern-contractor/components/ui/reveal";
import { ui } from "@/templates/modern-contractor/theme/ui";
import { cn } from "@/utils/cn";

type ModernTestimonialsProps = {
  testimonials: Testimonial[];
};

export function ModernTestimonials({ testimonials }: ModernTestimonialsProps) {
  const items = testimonials.slice(0, 3);
  if (!items.length) return null;
  const [featured, ...rest] = items;

  return (
    <section className={cn(ui.section, "bg-[var(--color-surface-muted)]")} aria-labelledby="modern-testimonials-heading">
      <div className="vertex-container">
        <p className={ui.eyebrow}>From owners</p>
        <h2 id="modern-testimonials-heading" className="sr-only">
          Client notes
        </h2>

        <Reveal>
          <figure className="mx-auto max-w-4xl text-center">
            <blockquote className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,3.2vw,2.6rem)] font-medium leading-[1.25] tracking-[-0.03em] text-[var(--color-text)]">
              “{featured.quote}”
            </blockquote>
            <figcaption className="mt-8">
              <p className="font-semibold text-[var(--color-text)]">{featured.personName}</p>
              <p className={cn(ui.small, "mt-1")}>
                {[featured.personRole, featured.companyName].filter(Boolean).join(" · ")}
              </p>
            </figcaption>
          </figure>
        </Reveal>

        {rest.length ? (
          <ul className="mt-14 grid gap-4 md:grid-cols-2">
            {rest.map((item, index) => (
              <Reveal key={item.id} delay={(index + 1) as 1 | 2}>
                <li className="rounded-[1.5rem] bg-[var(--color-surface-elevated)] p-6 md:p-8">
                  <p className={cn(ui.body, "text-[var(--color-text)]")}>&ldquo;{item.quote}&rdquo;</p>
                  <p className="mt-5 text-sm font-semibold text-[var(--color-text)]">{item.personName}</p>
                  <p className={cn(ui.small, "mt-1")}>
                    {[item.personRole, item.companyName].filter(Boolean).join(" · ")}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
