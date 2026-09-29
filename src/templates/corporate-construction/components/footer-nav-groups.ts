import type { SocialLink } from "@/templates/shared/cms/types/company";
import type { OptionalPage, SiteNavigationItem } from "@/templates/shared/cms/types/pages";

export type FooterNavGroup = {
  id: string;
  label: string;
  items: SiteNavigationItem[];
};

export type FooterLegalItem = {
  id: string;
  href: string;
  label: string;
};

const COMPANY_SLUGS = new Set(["about", "team", "contact"]);
const WORK_SLUGS = new Set(["projects", "services"]);

/** Approved legal optional-page slugs — only rendered when present in CMS. */
const LEGAL_ROUTE_ORDER = ["privacy", "terms"] as const;

const LEGAL_LABELS: Record<(typeof LEGAL_ROUTE_ORDER)[number], string> = {
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
};

/** Preferred social platforms for the footer (max five). */
const SOCIAL_PRIORITY: SocialLink["platform"][] = [
  "linkedin",
  "instagram",
  "facebook",
  "youtube",
  "x",
  "other",
];

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

/**
 * Legal utility links from approved optional-page slugs only.
 * Missing or unpublished (enabled: false) pages are omitted.
 */
export function footerLegalItems(optionalPages: OptionalPage[]): FooterLegalItem[] {
  const bySlug = new Map(
    optionalPages
      .filter((page) => page.slug && page.title && page.enabled !== false)
      .map((page) => [page.slug.toLowerCase(), page] as const),
  );

  return LEGAL_ROUTE_ORDER.flatMap((slug) => {
    const page = bySlug.get(slug);
    if (!page) {
      return [];
    }
    return [
      {
        id: page.id,
        href: `/${page.slug}`,
        label: LEGAL_LABELS[slug] ?? page.title,
      },
    ];
  });
}

/**
 * CMS social links for the footer — prefer LinkedIn / Instagram / Facebook / YouTube / X, max 5.
 */
export function footerSocialLinks(
  links: SocialLink[] | undefined,
  max = 5,
): SocialLink[] {
  const configured = (links ?? []).filter((link) => link.url?.trim() && link.label?.trim());
  if (!configured.length) {
    return [];
  }

  const ranked = [...configured].sort((a, b) => {
    const rankA = SOCIAL_PRIORITY.indexOf(a.platform);
    const rankB = SOCIAL_PRIORITY.indexOf(b.platform);
    return (rankA === -1 ? 99 : rankA) - (rankB === -1 ? 99 : rankB);
  });

  return ranked.slice(0, max);
}

/** First paragraph of company description for the footer blurb. */
export function companyFooterDescription(description?: string): string | undefined {
  if (!description?.trim()) {
    return undefined;
  }
  return description.split(/\n\n+/)[0]?.trim();
}
