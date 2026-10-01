import type { BlogPost } from "@/templates/shared/cms/types/blog";
import { articleTextForReadingTime, resolveArticleSections } from "@/templates/corporate-construction/utils/blog-article";

/** Preferred category order for editorial nav (CMS categories not in this list append at end). */
export const BLOG_CATEGORY_ORDER = [
  "Project Delivery",
  "Construction Management",
  "Field Operations",
  "Safety",
  "Technology",
  "Leadership",
] as const;

export function isPublishedBlogPost(post: BlogPost): boolean {
  return (post.status ?? "published") === "published";
}

export function getPublishedBlogPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter(isPublishedBlogPost);
}

export function resolveFeaturedBlogPost(posts: BlogPost[]): BlogPost | undefined {
  const published = getPublishedBlogPosts(posts);
  return published.find((p) => p.featured) ?? published[0];
}

export function blogCategoryNavLabels(posts: BlogPost[]): string[] {
  const published = getPublishedBlogPosts(posts);
  const fromPosts = new Set(published.map((p) => p.category?.trim()).filter(Boolean) as string[]);
  const ordered = BLOG_CATEGORY_ORDER.filter((c) => fromPosts.has(c));
  const remainder = [...fromPosts].filter((c) => !BLOG_CATEGORY_ORDER.includes(c as (typeof BLOG_CATEGORY_ORDER)[number])).sort();
  return ["All", ...ordered, ...remainder];
}

export function filterBlogPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
  if (category === "All") return posts;
  return posts.filter((p) => p.category?.trim() === category);
}

export function estimateReadingTimeMinutes(post: BlogPost): number | undefined {
  if (typeof post.readingTimeMinutes === "number" && post.readingTimeMinutes > 0) {
    return post.readingTimeMinutes;
  }
  const sections = resolveArticleSections(post);
  const text = articleTextForReadingTime(post, sections);
  if (!text.trim()) return undefined;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatReadingTime(post: BlogPost): string | undefined {
  const minutes = estimateReadingTimeMinutes(post);
  if (!minutes) return undefined;
  return `${minutes} min read`;
}
