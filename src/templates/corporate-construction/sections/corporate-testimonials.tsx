import type { Testimonial } from "@/templates/shared/cms/types/testimonials";

type CorporateTestimonialsProps = {
  testimonials: Testimonial[];
};

function attribution(item: Testimonial): string | undefined {
  const line = [item.personName, item.personRole, item.companyName].filter(Boolean).join(" · ");
  return line || undefined;
}

export function CorporateTestimonials({ testimonials }: CorporateTestimonialsProps) {
  if (!testimonials.length) {
    return null;
  }

  const [primary, ...others] = testimonials;

  return (
    <section
      className="border-t border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="corporate-testimonials-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
          Client perspective
        </p>
        <h2 id="corporate-testimonials-heading" className="sr-only">
          Client perspective
        </h2>

        <div className="mt-6 grid gap-10 md:mt-8 lg:grid-cols-12 lg:gap-12">
          <figure className="min-w-0 border-l-2 border-[var(--color-accent)] pl-5 md:pl-8 lg:col-span-7">
            <blockquote className="text-pretty break-words font-[family-name:var(--font-display)] text-2xl font-medium leading-snug text-[var(--color-primary)] md:text-3xl lg:text-[2.15rem] lg:leading-snug">
              {primary.quote}
            </blockquote>
            {attribution(primary) ? (
              <figcaption className="mt-6 text-pretty break-words text-sm font-medium text-[var(--color-text-muted)]">
                {attribution(primary)}
              </figcaption>
            ) : null}
          </figure>

          {others.length ? (
            <ul className="min-w-0 space-y-8 lg:col-span-5 lg:border-l lg:border-[var(--color-border)] lg:pl-10">
              {others.map((item) => (
                <li key={item.id} className="min-w-0">
                  <figure>
                    <blockquote className="text-pretty break-words text-base leading-relaxed text-[var(--color-text)] md:text-lg">
                      {item.quote}
                    </blockquote>
                    {attribution(item) ? (
                      <figcaption className="mt-3 text-pretty break-words text-sm text-[var(--color-text-muted)]">
                        {attribution(item)}
                      </figcaption>
                    ) : null}
                  </figure>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
