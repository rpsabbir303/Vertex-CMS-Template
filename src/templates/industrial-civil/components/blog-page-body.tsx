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
  resolveFeaturedBlogPost,
} from "@/templates/corporate-construction/utils/blog-content";
import { formatPostDateListing } from "@/templates/corporate-construction/utils/format-date";
import { ArrowIcon, Eyebrow, PillLink } from "@/templates/industrial-civil/components/pill-link";
import { bodyCopy, pageContainer, sectionTitle } from "@/templates/industrial-civil/components/record-heading";
import { previewHref } from "@/templates/industrial-civil/utils/preview-href";

export function BlogPageBody({
  posts,
  mode,
  image,
}: {
  posts: BlogPost[];
  mode: TemplateRenderMode;
  image?: CmsImage;
}) {
  const categories = useMemo(() => blogCategoryNavLabels(posts), [posts]);
  const [activeCategory, setActiveCategory] = useState("All");
  const featured = resolveFeaturedBlogPost(posts);
  const listPosts = useMemo(() => {
    const filtered = filterBlogPostsByCategory(posts, activeCategory);
    return featured ? filtered.filter((post) => post.id !== featured.id) : filtered;
  }, [posts, activeCategory, featured]);
  const latest = listPosts.slice(0, 6);
  const more = listPosts.slice(6, 10);
  const href = (slug: string) => previewHref(mode, `/blog/${slug}`);

  if (!posts.length) {
    return (
      <section className="bg-white py-[100px]">
        <p className={`${pageContainer} ${bodyCopy}`}>No articles have been published yet.</p>
      </section>
    );
  }

  return (
    <>
      {featured ? (
        <section className="bg-white py-[100px]" aria-labelledby="blog-featured-heading">
          <div className={`${pageContainer} grid items-center gap-12 min-[960px]:grid-cols-2`}>
            {featured.image?.url ? (
              <Link href={href(featured.slug)} className="block overflow-hidden rounded-[12px]">
                <img src={featured.image.url} alt={featured.image.alt} className="h-[320px] w-full object-cover min-[960px]:h-[480px]" />
              </Link>
            ) : null}
            <div>
              <Eyebrow>Featured article</Eyebrow>
              {featured.category ? <p className="mt-4 text-sm font-bold text-[#FF6610]">{featured.category}</p> : null}
              <h2 id="blog-featured-heading" className={sectionTitle}>
                <Link href={href(featured.slug)} className="hover:text-[#FF6610]">
                  {featured.title}
                </Link>
              </h2>
              {featured.excerpt ? <p className={`mt-5 ${bodyCopy}`}>{featured.excerpt}</p> : null}
              <p className="mt-4 text-sm text-[#5c6570]">{postMeta(featured)}</p>
              <Link href={href(featured.slug)} className="mt-6 inline-flex items-center gap-1.5 font-bold text-[#03071E] hover:text-[#FF6610]">
                Read the article <ArrowIcon />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[#F6F8FA] py-[72px]" aria-labelledby="blog-filter-heading">
        <div className={pageContainer}>
          <h2 id="blog-filter-heading" className="text-sm font-bold tracking-[0.08em] text-[#5c6570] uppercase">
            Blog category
          </h2>
          <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Filter articles by category">
            {categories.map((category) => {
              const selected = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setActiveCategory(category)}
                  className={`min-h-10 rounded-full px-4 text-sm font-bold ${selected ? "bg-[#FF6610] text-white" : "bg-white text-[#03071E]"}`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-[100px]" aria-labelledby="blog-latest-heading">
        <div className={pageContainer}>
          <Eyebrow>Journal</Eyebrow>
          <h2 id="blog-latest-heading" className={`max-w-[16ch] ${sectionTitle}`}>
            Latest insights
          </h2>
          <p className={`mt-5 max-w-xl ${bodyCopy}`}>
            Practical knowledge from the people who plan, coordinate, and deliver complex work.
          </p>
          {!latest.length ? <p className={`mt-12 ${bodyCopy}`}>No articles in this category yet.</p> : null}
          {latest[0] ? (
            <article className="mt-12 grid items-center gap-8 overflow-hidden rounded-[12px] bg-[#F6F8FA] p-4 min-[960px]:grid-cols-2 min-[960px]:p-6">
              {latest[0].image?.url ? (
                <Link href={href(latest[0].slug)} className="block overflow-hidden rounded-[12px]">
                  <img src={latest[0].image.url} alt={latest[0].image.alt} className="h-[280px] w-full object-cover min-[960px]:h-[380px]" />
                </Link>
              ) : null}
              <div className="px-2 py-4">
                <p className="text-sm font-bold text-[#FF6610]">Featured article</p>
                {latest[0].category ? <p className="mt-3 text-sm font-bold text-[#03071E]">{latest[0].category}</p> : null}
                <h3 className="mt-3 text-[clamp(1.5rem,2.4vw,2.25rem)] leading-snug font-bold text-[#03071E]">
                  <Link href={href(latest[0].slug)} className="hover:text-[#FF6610]">
                    {latest[0].title}
                  </Link>
                </h3>
                {latest[0].excerpt ? <p className={`mt-4 ${bodyCopy}`}>{latest[0].excerpt}</p> : null}
                <p className="mt-4 text-sm text-[#5c6570]">{postMeta(latest[0])}</p>
                <Link href={href(latest[0].slug)} className="mt-5 inline-flex items-center gap-1.5 font-bold text-[#03071E] hover:text-[#FF6610]">
                  Read More <ArrowIcon />
                </Link>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className="bg-[#F6F8FA] py-[100px]" aria-labelledby="blog-grid-heading">
        <div className={pageContainer}>
          <h2 id="blog-grid-heading" className="sr-only">
            Article grid
          </h2>
          {latest.length > 1 ? (
            <ul className="grid gap-6 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-3">
              {latest.slice(1).map((post) => (
                <li key={post.id}>
                  <ArticleCard post={post} href={href(post.slug)} />
                </li>
              ))}
            </ul>
          ) : (
            <p className={bodyCopy}>No other articles in this category yet.</p>
          )}
        </div>
      </section>

      <section className="bg-[#03071E]" aria-labelledby="blog-field-heading">
        <div className={`${pageContainer} grid items-center gap-12 py-20 min-[960px]:grid-cols-2`}>
          <div>
            <Eyebrow light>Field knowledge</Eyebrow>
            <h2 id="blog-field-heading" className="mt-4 max-w-[16ch] text-[clamp(2rem,3.4vw,3rem)] leading-[1.15] font-bold text-white">
              What we learn in the field shapes how we build.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/70">
              Every project creates lessons about coordination, sequencing, safety, communication, and delivery. We bring those lessons into the next job.
            </p>
            <PillLink href={previewHref(mode, "/about")} className="mt-8">
              Explore our approach
            </PillLink>
          </div>
          {image?.url ? <img src={image.url} alt={image.alt} className="h-[280px] w-full rounded-[12px] object-cover min-[960px]:h-[420px]" /> : null}
        </div>
      </section>

      <section className="bg-white py-[100px]" aria-labelledby="blog-more-heading">
        <div className={pageContainer}>
          <Eyebrow>Journal</Eyebrow>
          <h2 id="blog-more-heading" className={sectionTitle}>
            More from the journal
          </h2>
          {more.length ? (
            <ul className="mt-10 divide-y divide-[#e6e8ec] border-y border-[#e6e8ec]">
              {more.map((post) => (
                <li key={post.id}>
                  <Link href={href(post.slug)} className="grid gap-2 py-5 hover:text-[#FF6610] min-[720px]:grid-cols-[minmax(0,1fr)_auto] min-[720px]:items-center">
                    <span>
                      {post.category ? <span className="block text-sm font-bold text-[#FF6610]">{post.category}</span> : null}
                      <span className="mt-1 block text-[22px] leading-snug font-bold text-[#03071E]">{post.title}</span>
                    </span>
                    <span className="text-sm text-[#5c6570]">{postMeta(post)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className={`mt-8 ${bodyCopy}`}>No further articles in this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
}

function postMeta(post: BlogPost) {
  return [formatPostDateListing(post.publishedAt), post.author, formatReadingTime(post)].filter(Boolean).join(" · ");
}

function ArticleCard({ post, href }: { post: BlogPost; href: string }) {
  return (
    <article className="group h-full overflow-hidden rounded-[8px] bg-white">
      {post.image?.url ? (
        <Link href={href} className="block h-[220px] overflow-hidden">
          <img src={post.image.url} alt={post.image.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </Link>
      ) : null}
      <div className="p-6">
        {post.category ? <p className="text-sm font-bold text-[#FF6610]">{post.category}</p> : null}
        <h3 className="mt-2 line-clamp-2 text-[20px] leading-7 font-bold text-[#03071E]">
          <Link href={href} className="hover:text-[#FF6610]">
            {post.title}
          </Link>
        </h3>
        {post.excerpt ? <p className={`mt-3 line-clamp-3 ${bodyCopy}`}>{post.excerpt}</p> : null}
        <p className="mt-3 text-sm text-[#5c6570]">{postMeta(post)}</p>
        <Link href={href} className="mt-5 inline-flex items-center gap-1.5 font-bold text-[#03071E] hover:text-[#FF6610]">
          Read More <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}
