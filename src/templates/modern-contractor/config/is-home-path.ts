import type { TemplateRenderMode } from "@/registry/template-types";
import { MODERN_CONTRACTOR_SLUG } from "./template-slug";

export function isModernHomePath(currentPath: string | undefined, mode: TemplateRenderMode): boolean {
  const path = currentPath || "/";
  if (path === "/") return true;
  const base = `/preview/${MODERN_CONTRACTOR_SLUG}`;
  return mode === "preview" && (path === base || path === `${base}/`);
}
