import type { TemplateRenderMode } from "@/registry/template-types";

export function previewHref(mode: TemplateRenderMode, href: string): string {
  if (mode !== "preview") {
    return href;
  }
  if (href === "/") {
    return "/preview/corporate-construction";
  }
  return `/preview/corporate-construction${href}`;
}
