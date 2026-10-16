import type { TemplateRenderMode } from "@/registry/template-types";
import { previewHref as sharedPreviewHref } from "@/templates/shared/routing/preview-href";
import { INDUSTRIAL_TEMPLATE_SLUG } from "@/templates/industrial-civil/config/template-slug";

export function previewHref(mode: TemplateRenderMode, href: string): string {
  return sharedPreviewHref(mode, href, INDUSTRIAL_TEMPLATE_SLUG);
}
