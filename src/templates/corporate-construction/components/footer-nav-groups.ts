import type { SiteNavigationItem } from "@/templates/shared/cms/types/pages";

export type FooterNavGroup = {
  id: string;
  label: string;
  items: SiteNavigationItem[];
};

const COMPANY_SLUGS = new Set(["about", "team", "contact"]);
const WORK_SLUGS = new Set(["projects", "services"]);

/** Flat Explore list for the footer (home omitted). Empty when nothing is published. */
export function footerExploreItems(navItems: SiteNavigationItem[]): SiteNavigationItem[] {
  return navItems.filter((item) => item.pageSlug !== "home" && item.href && item.label);
}

/** Groups CMS navigation into footer columns; omits empty groups. */
export function buildFooterNavGroups(navItems: SiteNavigationItem[]): FooterNavGroup[] {
  const items = navItems.filter((item) => item.pageSlug !== "home" && item.href && item.label);

  const company = items.filter((item) => COMPANY_SLUGS.has(String(item.pageSlug)));
  const work = items.filter((item) => WORK_SLUGS.has(String(item.pageSlug)));
  const resources = items.filter(
    (item) => !COMPANY_SLUGS.has(String(item.pageSlug)) && !WORK_SLUGS.has(String(item.pageSlug)),
  );

  const groups: FooterNavGroup[] = [];
  if (company.length) {
    groups.push({ id: "company", label: "Company", items: company });
  }
  if (work.length) {
    groups.push({ id: "work", label: "Work", items: work });
  }
  if (resources.length) {
    groups.push({ id: "resources", label: "Resources", items: resources });
  }
  return groups;
}

/** First paragraph of company description for the footer blurb. */
export function companyFooterDescription(description?: string): string | undefined {
  if (!description?.trim()) {
    return undefined;
  }
  return description.split(/\n\n+/)[0]?.trim();
}
