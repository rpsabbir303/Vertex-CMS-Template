export type SeoMetadata = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageUrl?: string;
  noIndex?: boolean;
};

export type PageSeo = SeoMetadata & {
  pageSlug: string;
};
