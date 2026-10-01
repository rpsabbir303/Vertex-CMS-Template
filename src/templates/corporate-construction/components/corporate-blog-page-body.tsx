"use client";

import { useMemo, useState } from "react";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { BlogPost } from "@/templates/shared/cms/types/blog";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import { BlogArticleItem } from "@/templates/corporate-construction/components/blog-article-item";
import { BlogCategoryNav } from "@/templates/corporate-construction/components/blog-category-nav";
import { BlogFeaturedArticle } from "@/templates/corporate-construction/components/blog-featured-article";
import { BlogKnowledgeMoment } from "@/templates/corporate-construction/components/blog-knowledge-moment";
import {
  blogCategoryNavLabels,
  filterBlogPostsByCategory,
  getPublishedBlogPosts,
  resolveFeaturedBlogPost,
} from "@/templates/corporate-construction/utils/blog-content";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateBlogPageBodyProps = {
  mode: TemplateRenderMode;
  posts: BlogPost[];
  knowledgeImage?: CmsImage | null;
};

export function CorporateBlogPageBody({ mode, posts, knowledgeImage }: CorporateBlogPageBodyProps) {
  const published = useMemo(() => getPublishedBlogPosts(posts), [posts]);
  const categories = useMemo(() => blogCategoryNavLabels(posts), [posts]);
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = activeCategory === "All" ? resolveFeaturedBlogPost(published) : undefined;

  const listPosts = useMemo(() => {
    const filtered = filterBlogPostsByCategory(published, activeCategory);
    if (activeCategory === "All" && featured) {
      return filtered.filter((p) => p.id !== featured.id);
    }
    return filtered;
  }, [published, activeCategory, featured]);

  const latest = listPosts.slice(0, 6);
  const more = listPosts.slice(6, 10);

  if (!published.length) {
    return (
      <section className="vertex-container py-20 md:py-28">
        <p className="text-[var(--color-text-muted)]">No articles have been published yet.</p>
      </section>
    );
  }

  return (
    <>
      {featured ? <BlogFeaturedArticle mode={mode} post={featured} /> : null}

      <BlogCategoryNav categories={categories} active={activeCategory} onChange={setActiveCategory} />

      <section className="bg-[var(--color-surface)]" aria-labelledby="blog-latest-heading">
        <div className="vertex-container py-24 md:py-32">
          <h2 id="blog-latest-heading" className={cn(ui.h2, "max-w-[16ch]")}>
            Latest insights
          </h2>
          <p className={cn(ui.body, "mt-5 max-w-xl text-lg")}>
            Practical knowledge from the people who plan, coordinate, and deliver complex work.
          </p>

          {!listPosts.length ? (
            <p className="mt-12 text-[var(--color-text-muted)]">No articles in this category yet.</p>
          ) : (
            <div className="mt-14">
              {latest[0] ? <BlogArticleItem mode={mode} post={latest[0]} variant="lead" /> : null}
              {latest.length > 1 ? (
                <ul className="mt-6 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                  {latest.slice(1).map((post) => (
                    <li key={post.id}>
                      <BlogArticleItem mode={mode} post={post} variant="standard" />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )}
        </div>
      </section>

      <BlogKnowledgeMoment mode={mode} image={knowledgeImage} />

      {more.length ? (
        <section className="bg-[var(--color-surface)]" aria-labelledby="blog-more-heading">
          <div className="vertex-container py-20 md:py-28">
            <h2 id="blog-more-heading" className={cn(ui.h3, "max-w-[16ch]")}>
              More from the journal
            </h2>
            <div className="mt-10 max-w-3xl">
              {more.map((post) => (
                <BlogArticleItem key={post.id} mode={mode} post={post} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
