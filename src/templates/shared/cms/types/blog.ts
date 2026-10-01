import type { CmsImage } from "./media";
import type { SeoMetadata } from "./seo";

/** Documented blog lifecycle — public templates show `published` only. */
export type BlogPostStatus = "draft" | "published" | "archived";

export type BlogArticleHeadingBlock = {
  type: "heading";
  level?: 2 | 3;
  /** Stable anchor id for TOC / in-page links. */
  id?: string;
  title: string;
};

export type BlogArticleParagraphBlock = {
  type: "paragraph";
  body: string;
};

export type BlogArticleListBlock = {
  type: "list";
  ordered?: boolean;
  items: string[];
};

export type BlogArticleImageBlock = {
  type: "image";
  image: CmsImage;
  caption?: string;
  credit?: string;
  layout?: "full" | "inline";
};

export type BlogArticleQuoteBlock = {
  type: "quote";
  text: string;
  attribution?: string;
};

export type BlogArticleCalloutBlock = {
  type: "callout";
  title?: string;
  body: string;
};

export type BlogArticleHighlightBlock = {
  type: "highlight";
  body: string;
};

export type BlogArticleBlock =
  | BlogArticleHeadingBlock
  | BlogArticleParagraphBlock
  | BlogArticleListBlock
  | BlogArticleImageBlock
  | BlogArticleQuoteBlock
  | BlogArticleCalloutBlock
  | BlogArticleHighlightBlock;

export type BlogPostAuthor = {
  name: string;
  role?: string;
  bio?: string;
  image?: CmsImage;
  teamMemberId?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  /** Short listing summary. */
  excerpt?: string;
  /** Legacy plain text; used when `sections` is empty. Paragraphs separated by blank lines. */
  body?: string;
  image?: CmsImage;
  imageCaption?: string;
  imageCredit?: string;
  category?: string;
  author?: string;
  authorProfile?: BlogPostAuthor;
  /** ISO date string (YYYY-MM-DD). */
  publishedAt?: string;
  sortOrder?: number;
  status?: BlogPostStatus;
  /** Minutes to read — supply from CMS when available. */
  readingTimeMinutes?: number;
  featured?: boolean;
  locale?: string;
  tags?: string[];
  relatedSlugs?: string[];
  sections?: BlogArticleBlock[];
  seo?: SeoMetadata;
};

export type BlogCollection = {
  items: BlogPost[];
};
