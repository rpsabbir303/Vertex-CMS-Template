import type { CmsImage } from "./media";

export type PageSlug =
  | "home"
  | "about"
  | "services"
  | "projects"
  | "project-detail"
  | "team"
  | "contact";

export type OptionalPage = {
  id: string;
  title: string;
  slug: string;
  body?: string;
  heroImage?: CmsImage;
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
