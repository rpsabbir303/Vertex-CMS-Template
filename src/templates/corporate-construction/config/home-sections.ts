import type { TemplateSectionId } from "@/registry/template-types";

/**
 * Corporate Construction homepage — full editorial sequence.
 * 01 header and 14 footer are rendered by the page frame.
 */
export const corporateHomeSectionOrder: TemplateSectionId[] = [
  "hero", // 02
  "trust-credentials", // 03 proof
  "inside-the-work", // 04
  "services", // 05 capabilities
  "featured-projects", // 06 featured work introduction
  "project-stories", // 07 project storytelling
  "delivery-approach", // 08 process
  "home-craftsmanship", // 09 field execution
  "home-metrics", // 10 proof / metrics
  "testimonials", // 11 client perspective
  "contact-cta", // 13 final cta
];
