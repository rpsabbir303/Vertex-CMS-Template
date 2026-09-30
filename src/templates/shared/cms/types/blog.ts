import type { CmsImage } from "./media";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  /** Short listing summary. */
  excerpt?: string;
  /** Plain text; paragraphs separated by blank lines. */
  body?: string;
  image?: CmsImage;
  category?: string;
  author?: string;
  /** ISO date string (YYYY-MM-DD). */
  publishedAt?: string;
  sortOrder?: number;
};

export type BlogCollection = {
  items: BlogPost[];
};
