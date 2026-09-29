import type { CmsSitePayload } from "@/templates/shared/cms/types";
import type { SiteNavigationItem } from "@/templates/shared/cms/types/pages";
import { unwrapEnvelope } from "@/templates/shared/cms/resolve-content";

export function resolvePublicNavigation(payload: CmsSitePayload): SiteNavigationItem[] {
  const items = unwrapEnvelope(payload.navigation) ?? [];
  const optionalPages = unwrapEnvelope(payload.optionalPages) ?? [];

  return items.filter((item) => {
    if (!item.pageSlug || item.pageSlug === "home") {
      return true;
    }
    const optional = optionalPages.find((p) => p.slug === item.pageSlug);
    if (optional && !optional.showInNavigation) {
      return false;
    }
    return true;
  });
}

export function isNavItemActive(href: string, currentPath?: string): boolean {
  if (!currentPath) {
    return href === "/";
  }
  if (href === "/") {
    return currentPath === "/";
  }
  return currentPath === href || currentPath.startsWith(`${href}/`);
}
