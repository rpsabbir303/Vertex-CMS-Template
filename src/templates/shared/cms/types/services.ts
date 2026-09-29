import type { CmsImage } from "./media";

export type Service = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  description?: string;
  image?: CmsImage;
  /** Optional link override; defaults to the Services page anchor for this slug */
  href?: string;
  /** Set to false to hide a service from public pages without deleting it */
  visible?: boolean;
  sortOrder?: number;
};

/** Section-level copy the tenant edits for the services block */
export type ServicesSectionCopy = {
  eyebrow?: string;
  title?: string;
  description?: string;
  cta?: { label: string; href: string };
};

export type ServicesCollection = {
  items: Service[];
  section?: ServicesSectionCopy;
};
