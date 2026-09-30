import type { Testimonial } from "@/templates/shared/cms/types/testimonials";

export function attribution(t: Testimonial): string {
  return [t.personName, [t.personRole, t.companyName].filter(Boolean).join(", ")]
    .filter(Boolean)
    .join(" · ");
}
