import type { CmsGallery, CmsImage } from "./media";

export type ProjectMetadata = {
  client?: string;
  sector?: string;
  scope?: string;
  duration?: string;
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
};

export type ProjectsCollection = {
  items: Project[];
};
