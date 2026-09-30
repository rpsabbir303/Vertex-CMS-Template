import type { CmsImage } from "@/templates/shared/cms/types/media";
import type { Testimonial } from "@/templates/shared/cms/types/testimonials";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";

type CorporateTestimonialsProps = {
  testimonials: Testimonial[];
  projectImage?: CmsImage;
};

export function CorporateTestimonials({
  testimonials,
  projectImage,
}: CorporateTestimonialsProps) {
  if (!testimonials.length) {
    return null;
  }

  const primary = testimonials[0];
  const hasImage = Boolean(projectImage?.url);
  const context = [primary.personRole, primary.companyName].filter(Boolean).join(" · ");

  return (
    <section
      className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      aria-labelledby="corporate-testimonials-heading"
    >
      <div className="vertex-container py-16 md:py-20 lg:py-24">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-secondary)]">
          Client perspective
        </p>
        <h2
          id="corporate-testimonials-heading"
          className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-[-0.02em] text-[var(--color-primary)] md:text-4xl lg:text-[2.65rem]"
        >
          What owners remember
        </h2>

        <div
          className={`mt-12 grid gap-12 lg:mt-14 lg:items-center lg:gap-16 ${hasImage ? "lg:grid-cols-12" : ""}`}
        >
          <figure
            className={`min-w-0 border-l-2 border-[var(--color-accent)] pl-5 md:pl-8 ${hasImage ? "lg:col-span-7" : "max-w-4xl"}`}
          >
            <blockquote className="text-pretty break-words font-[family-name:var(--font-display)] text-2xl font-medium leading-[1.25] text-[var(--color-primary)] md:text-3xl lg:text-[2.5rem] lg:leading-[1.2]">
              “{primary.quote}”
            </blockquote>
            <figcaption className="mt-10 flex flex-col gap-1 border-t border-[var(--color-border)] pt-7">
              <span className="text-base font-semibold text-[var(--color-text)]">
                {primary.personName}
              </span>
              {context ? (
                <span className="text-pretty break-words text-sm text-[var(--color-text-muted)]">
                  {context}
                </span>
              ) : null}
            </figcaption>
          </figure>

          {hasImage && projectImage ? (
            <div className="min-w-0 overflow-hidden border border-[var(--color-border)] lg:col-span-5">
              <CmsImageMedia
                image={projectImage}
                aspect="card"
                className="min-h-[16rem] w-full md:min-h-[20rem] [&_img]:transition-transform [&_img]:duration-700 hover:[&_img]:scale-[1.02] motion-reduce:hover:[&_img]:scale-100"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
