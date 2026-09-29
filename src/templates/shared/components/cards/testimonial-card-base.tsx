import type { Testimonial } from "@/templates/shared/cms/types/testimonials";
import { cn } from "@/utils/cn";

export type TestimonialCardBaseProps = {
  testimonial: Testimonial;
  className?: string;
  variant?: "default" | "featured" | "supporting";
};

export function TestimonialCardBase({
  testimonial,
  className,
  variant = "default",
}: TestimonialCardBaseProps) {
  const attribution = [testimonial.personName, testimonial.personRole, testimonial.companyName]
    .filter(Boolean)
    .join(" · ");

  const quoteClass =
    variant === "featured"
      ? "text-pretty font-[family-name:var(--font-display)] text-2xl font-medium leading-snug text-[var(--color-primary)] md:text-3xl lg:leading-snug"
      : variant === "supporting"
        ? "text-pretty text-base leading-relaxed text-[var(--color-text)] md:text-lg"
        : "text-pretty text-lg leading-relaxed text-[var(--color-text)]";

  return (
    <figure className={cn("min-w-0", className)}>
      {variant === "featured" ? (
        <span
          aria-hidden
          className="mb-4 block font-[family-name:var(--font-display)] text-5xl leading-none text-[var(--color-accent)] md:text-6xl"
        >
          “
        </span>
      ) : null}
      <blockquote className={quoteClass}>
        {variant === "featured" ? testimonial.quote : `“${testimonial.quote}”`}
      </blockquote>
      {attribution ? (
        <figcaption
          className={cn(
            "mt-5 text-sm font-medium text-[var(--color-text-muted)]",
            variant === "featured" && "md:text-base",
          )}
        >
          {attribution}
        </figcaption>
      ) : null}
    </figure>
  );
}
