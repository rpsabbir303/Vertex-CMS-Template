import type { CmsImage } from "./media";

export type PageSlug =
  | "home"
  | "about"
  | "services"
  | "projects"
  | "project-detail"
  | "team"
  | "blog"
  | "blog-post"
  | "contact";

/** Repeatable practice/process items for structured optional pages (e.g. Safety). */
export type OptionalPagePractice = {
  id: string;
  title: string;
  description?: string;
  image?: CmsImage;
  sortOrder?: number;
};

/** Presentation hint for Safety topic sections (template maps to layout components). */
export type SafetySectionLayoutType =
  | "editorialSplit"
  | "immersiveDark"
  | "peopleFeature"
  | "technicalList"
  | "timeline"
  | "evidence";

export type SafetyTimelineStep = {
  label: string;
  title?: string;
};

/** CMS-driven safety topic with separate content from presentation `layoutType`. */
export type SafetySection = {
  number?: number;
  slug: string;
  title: string;
  description?: string;
  /** Optional section headline distinct from title. */
  headline?: string;
  /** Extra paragraphs (blank-line separated). */
  content?: string;
  image?: CmsImage;
  supportingItems?: string[];
  timelineSteps?: SafetyTimelineStep[];
  evidenceFlow?: string[];
  layoutType: SafetySectionLayoutType;
};

/** Structured section for legal / long-form optional pages. */
export type LegalSection = {
  id: string;
  heading: string;
  /** Plain text; paragraphs separated by blank lines. Lists use "- " or "1. " prefixes. */
  content: string;
  sortOrder?: number;
};

export type OptionalPage = {
  id: string;
  title: string;
  slug: string;
  /** Optional hero headline when distinct from the navigation title. */
  headline?: string;
  /** Long-form page copy. First paragraph typically feeds the hero summary. */
  body?: string;
  heroImage?: CmsImage;
  /** Approach section headline when provided by the tenant. */
  approachHeading?: string;
  /** Commitment statement (large editorial pause). */
  commitmentHeading?: string;
  commitmentBody?: string;
  /** Repeatable practice items when the tenant supplies them. */
  practices?: OptionalPagePractice[];
  /** Structured safety topics with layout types (preferred over practice grid). */
  safetySections?: SafetySection[];
  /**
   * Legal-page fields (privacy / terms / cookie).
   * When `sections` is present, the LegalPage layout is used.
   */
  effectiveDate?: string;
  intro?: string;
  sections?: LegalSection[];
  /** When false, treat as unpublished empty state. Defaults to published when present. */
  enabled?: boolean;
  showInNavigation: boolean;
  sortOrder?: number;
};

export type HomeSectionsConfig = {
  hero: boolean;
  services: boolean;
  featuredProjects: boolean;
  aboutStory: boolean;
  trustCredentials: boolean;
  team: boolean;
  testimonials: boolean;
  contactCta: boolean;
};

export type SiteNavigationItem = {
  label: string;
  href: string;
  pageSlug?: PageSlug | string;
  children?: SiteNavigationItem[];
};

/** Approved legal optional-page slugs shared across templates. */
export const LEGAL_PAGE_SLUGS = ["privacy", "terms", "cookie"] as const;
export type LegalPageSlug = (typeof LEGAL_PAGE_SLUGS)[number];

export const LEGAL_PAGE_TITLES: Record<LegalPageSlug, string> = {
  privacy: "Privacy Policy",
  terms: "Terms & Conditions",
  cookie: "Cookie Policy",
};

export function isLegalPageSlug(slug: string): slug is LegalPageSlug {
  return (LEGAL_PAGE_SLUGS as readonly string[]).includes(slug);
}
