import type { TemplateRenderMode } from "@/registry/template-types";
import { previewHref as sharedPreviewHref } from "@/templates/shared/routing/preview-href";
import { MODERN_CONTRACTOR_SLUG } from "@/templates/modern-contractor/config/template-slug";

export function previewHref(mode: TemplateRenderMode, href: string): string {
  return sharedPreviewHref(mode, href, MODERN_CONTRACTOR_SLUG);
}
