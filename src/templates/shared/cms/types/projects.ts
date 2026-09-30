import type { CmsGallery, CmsImage } from "./media";

/** Construction lifecycle — map from CMS when published. */
export type ProjectBuildStatus = "completed" | "ongoing";

/** Residential vs commercial market — map from CMS when published. */
export type ProjectBuildingType = "residential" | "commercial";

export type ProjectMetadata = {
  client?: string;
  sector?: string;
  scope?: string;
  duration?: string;
  status?: ProjectBuildStatus;
  buildingType?: ProjectBuildingType;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  description?: string;
  image?: CmsImage;
  gallery?: CmsGallery;
  location?: string;
  year?: number;
  featured?: boolean;
  metadata?: ProjectMetadata;
  sortOrder?: number;
  /** Before/after comparison — optional until CMS supplies assets. */
  beforeImage?: CmsImage;
  afterImage?: CmsImage;
};

export type ProjectsCollection = {
  items: Project[];
};
