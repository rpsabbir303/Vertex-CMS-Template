import type { TemplateRenderMode } from "@/registry/template-types";

export function previewHref(
  mode: TemplateRenderMode,
  href: string,
  templateSlug = "corporate-construction",
): string {
  if (mode !== "preview") {
    return href;
  }
  const base = `/preview/${templateSlug}`;
  if (href === "/") {
    return base;
  }
  return `${base}${href}`;
}
