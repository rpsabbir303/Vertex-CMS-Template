"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { BlogPost } from "@/templates/shared/cms/types/blog";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import {
  blogCategoryNavLabels,
  filterBlogPostsByCategory,
  formatReadingTime,
  getPublishedBlogPosts,
  resolveFeaturedBlogPost,
} from "@/templates/corporate-construction/utils/blog-content";
import { formatPostDateListing } from "@/templates/corporate-construction/utils/format-date";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";
const heading = `${display} text-[clamp(2.2rem,3.6vw,3.35rem)] leading-[1.32] font-semibold tracking-[-0.04em]`;

type ModernBlogBodyProps = {
  mode: TemplateRenderMode;
  posts: BlogPost[];
  knowledgeImage?: CmsImage | null;
};

export function ModernBlogBody({ mode, posts, knowledgeImage }: ModernBlogBodyProps) {
  const published = useMemo(() => getPublishedBlogPosts(posts), [posts]);
  const categories = useMemo(() => blogCategoryNavLabels(posts), [posts]);
  const [activeCategory, setActiveCategory] = useState("All");
  const featured = activeCategory === "All" ? resolveFeaturedBlogPost(published) : undefined;

  const listPosts = useMemo(() => {
    const filtered = filterBlogPostsByCategory(published, activeCategory);
    if (activeCategory === "All" && featured) return filtered.filter((post) => post.id !== featured.id);
    return filtered;
  }, [published, activeCategory, featured]);

  const latest = listPosts.slice(0, 6);
  const more = listPosts.slice(6, 10);
  const lead = latest[0];
  const grid = latest.slice(1);
  const aboutHref = previewHref(mode, "/about");

  if (!published.length) {
    return (
      <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8">
        <p className="mx-auto max-w-[1360px] text-[#3e4438]">No articles have been published yet.</p>
      </section>
    );
  }

  return (
    <>
      {featured ? (
        <section id="featured-article" className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="blog-featured-heading">
          <div className="mx-auto grid max-w-[1360px] items-center gap-10 min-[960px]:grid-cols-2 min-[960px]:gap-16">
            {featured.image?.url ? (
              <Link href={previewHref(mode, `/blog/${featured.slug}`)} className="block overflow-hidden rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.image.url} alt={featured.image.alt || ""} className="aspect-[4/3] w-full object-cover" />
              </Link>
            ) : null}
            <div className="min-w-0">
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
                <span className="h-px w-8 bg-[#0a0c0b]" />
                Featured
              </p>
              {featured.category ? <p className="mt-5 text-[12px] font-extrabold tracking-[0.14em] text-[#667067] uppercase">{featured.category}</p> : null}
              <h2 id="blog-featured-heading" className={`${heading} mt-4`}>
                <Link href={previewHref(mode, `/blog/${featured.slug}`)}>{featured.title}</Link>
              </h2>
              {featured.excerpt ? <p className="mt-5 text-[17px] leading-relaxed text-[#3e4438]">{featured.excerpt}</p> : null}
              <p className="mt-5 text-[13px] tracking-[0.06em] text-[#667067] uppercase">{postMeta(featured)}</p>
              <Link
                href={previewHref(mode, `/blog/${featured.slug}`)}
                className="mt-6 inline-flex rounded-full bg-[#0a0c0b] px-5 py-3 text-sm font-semibold text-white"
              >
                Read article
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section id="blog-categories" className="bg-[#f3f1e9] px-5 text-[#0a0c0b] min-[960px]:px-8" aria-labelledby="blog-categories-heading">
        <div className="mx-auto max-w-[1360px] border-y border-black/15 py-10">
          <h2 id="blog-categories-heading" className="text-[12px] font-extrabold tracking-[0.18em] uppercase">
            Categories
          </h2>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">
            {categories.map((category) => {
              const selected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveCategory(category)}
                  className={
                    selected
                      ? "rounded-full bg-[#0a0c0b] px-4 py-2.5 text-sm font-semibold text-white"
                      : "rounded-full border border-black/15 px-4 py-2.5 text-sm text-[#0a0c0b]"
                  }
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="latest-insights" className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="blog-latest-heading">
        <div className="mx-auto max-w-[1360px]">
          <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
            <span className="h-px w-8 bg-[#0a0c0b]" />
            Journal
          </p>
          <h2 id="blog-latest-heading" className={`${heading} mt-5 max-w-3xl`}>
            Latest insights
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#3e4438]">
            Practical knowledge from the people who plan, coordinate, and deliver complex work.
          </p>
          {!listPosts.length ? (
            <p className="mt-12 text-[#3e4438]">No articles in this category yet.</p>
          ) : (
            <>
              {lead ? <LeadArticle post={lead} mode={mode} /> : null}
              {grid.length ? (
                <ul className="mt-12 grid gap-x-6 gap-y-12 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-3">
                  {grid.map((post) => (
                    <li key={post.id}>
                      <GridArticle post={post} mode={mode} />
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          )}
        </div>
      </section>

      <section id="field-insights" className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="blog-knowledge-heading">
        <div className="mx-auto grid max-w-[1360px] items-center gap-10 min-[960px]:grid-cols-2 min-[960px]:gap-16">
          <div className="min-w-0">
            <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
              <span className="h-px w-8 bg-[#C8FF2E]" />
              Field knowledge
            </p>
            <h2 id="blog-knowledge-heading" className={`${heading} mt-5`}>
              What we learn in the field shapes how we build.
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
              Every project creates lessons about coordination, sequencing, safety, communication, and delivery. We bring those lessons into the next job.
            </p>
            <Link href={aboutHref} className="mt-8 inline-flex rounded-full bg-[#C8FF2E] px-6 py-3.5 text-sm font-semibold text-[#0a0c0b]">
              Explore our approach
            </Link>
          </div>
          {knowledgeImage?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={knowledgeImage.url}
              alt={knowledgeImage.alt || ""}
              className="aspect-[16/11] w-full rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] object-cover"
            />
          ) : null}
        </div>
      </section>

      {more.length ? (
        <section id="more-from-journal" className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="blog-more-heading">
          <div className="mx-auto max-w-[1360px]">
            <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
              <span className="h-px w-8 bg-[#0a0c0b]" />
              Continue reading
            </p>
            <h2 id="blog-more-heading" className={`${heading} mt-5 max-w-3xl`}>
              More from the journal
            </h2>
            <ol className="mt-10 border-t border-black/15">
              {more.map((post) => (
                <li key={post.id} className="border-b border-black/15">
                  <Link
                    href={previewHref(mode, `/blog/${post.slug}`)}
                    className="grid items-center gap-3 py-6 min-[960px]:grid-cols-[minmax(0,1fr)_auto]"
                  >
                    <span className="min-w-0">
                      {post.category ? (
                        <span className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067] uppercase">{post.category}</span>
                      ) : null}
                      <span className={`${display} mt-2 block text-[clamp(1.25rem,2vw,1.7rem)] leading-tight font-semibold tracking-[-0.03em]`}>
                        {post.title}
                      </span>
                      {post.excerpt ? <span className="mt-2 block max-w-3xl text-[15px] leading-relaxed text-[#3e4438]">{post.excerpt}</span> : null}
                    </span>
                    <span className="text-[13px] tracking-[0.06em] text-[#667067] uppercase">{postMeta(post, false)}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}
    </>
  );
}

function postMeta(post: BlogPost, includeAuthor = true) {
  return [formatPostDateListing(post.publishedAt), formatReadingTime(post), includeAuthor ? post.author : undefined].filter(Boolean).join(" · ");
}

function LeadArticle({ post, mode }: { post: BlogPost; mode: TemplateRenderMode }) {
  const href = previewHref(mode, `/blog/${post.slug}`);
  return (
    <article className="mt-12 border-t border-black/15 pt-10">
      <div className="grid items-center gap-8 min-[960px]:grid-cols-2 min-[960px]:gap-16">
        {post.image?.url ? (
          <Link href={href} className="block overflow-hidden rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image.url} alt={post.image.alt || ""} className="aspect-[16/10] w-full object-cover" />
          </Link>
        ) : null}
        <div className="min-w-0">
          {post.category ? <p className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067] uppercase">{post.category}</p> : null}
          <h3 className={`${display} mt-3 text-[clamp(1.7rem,2.4vw,2.2rem)] leading-[1.32] font-semibold tracking-[-0.03em]`}>
            <Link href={href}>{post.title}</Link>
          </h3>
          {post.excerpt ? <p className="mt-4 text-[17px] leading-relaxed text-[#3e4438]">{post.excerpt}</p> : null}
          <p className="mt-4 text-[13px] tracking-[0.06em] text-[#667067] uppercase">{postMeta(post)}</p>
          <Link href={href} className="mt-6 inline-flex text-sm font-semibold underline decoration-[#0a0c0b]/30 underline-offset-4">
            Read article
          </Link>
        </div>
      </div>
    </article>
  );
}

function GridArticle({ post, mode }: { post: BlogPost; mode: TemplateRenderMode }) {
  const href = previewHref(mode, `/blog/${post.slug}`);
  return (
    <article>
      <Link href={href} className="block overflow-hidden rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] bg-[#e7e3d6]">
        {post.image?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.image.url} alt={post.image.alt || ""} className="aspect-[16/10] w-full object-cover" />
        ) : (
          <div className="aspect-[16/10] w-full" />
        )}
      </Link>
      {post.category ? <p className="mt-4 text-[12px] font-extrabold tracking-[0.14em] text-[#667067] uppercase">{post.category}</p> : null}
      <h3 className={`${display} mt-2 text-[1.35rem] leading-tight font-semibold tracking-[-0.03em]`}>
        <Link href={href}>{post.title}</Link>
      </h3>
      {post.excerpt ? <p className="mt-3 text-[15px] leading-relaxed text-[#3e4438]">{post.excerpt}</p> : null}
      <p className="mt-3 text-[12px] tracking-[0.06em] text-[#667067] uppercase">{postMeta(post)}</p>
    </article>
  );
}
