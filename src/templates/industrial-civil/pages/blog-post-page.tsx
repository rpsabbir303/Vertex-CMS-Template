import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import type { BlogArticleBlock, BlogArticleHeadingBlock, BlogPost } from "@/templates/shared/cms/types/blog";
import {
  ensureHeadingIds,
  extractArticleToc,
  resolveArticleSections,
  resolveBlogAuthor,
  resolveRelatedBlogPosts,
} from "@/templates/corporate-construction/utils/blog-article";
import { formatReadingTime } from "@/templates/corporate-construction/utils/blog-content";
import { formatPostDateListing } from "@/templates/corporate-construction/utils/format-date";
import { ArticleBlocks } from "@/templates/industrial-civil/components/article-blocks";
import { Eyebrow, PillLink } from "@/templates/industrial-civil/components/pill-link";
import { IndustrialFrame } from "@/templates/industrial-civil/components/industrial-frame";
import { bodyCopy, pageContainer, sectionTitle } from "@/templates/industrial-civil/components/record-heading";
import { readIndustrialSite } from "@/templates/industrial-civil/utils/site-content";
import { previewHref } from "@/templates/industrial-civil/utils/preview-href";

type ArticleGroup = {
  heading: BlogArticleHeadingBlock;
  blocks: BlogArticleBlock[];
};

function groupArticleSections(sections: BlogArticleBlock[]): { intro: BlogArticleBlock[]; groups: ArticleGroup[] } {
  const intro: BlogArticleBlock[] = [];
  const groups: ArticleGroup[] = [];

  for (const block of sections) {
    if (block.type === "heading" && (block.level ?? 2) <= 2) {
      groups.push({ heading: block, blocks: [] });
      continue;
    }
    if (!groups.length) intro.push(block);
    else groups[groups.length - 1].blocks.push(block);
  }

  return { intro, groups };
}

export function IndustrialCivilBlogPostPage(props: TemplatePageProps) {
  const { company, posts, team } = readIndustrialSite(props.payload);
  const index = posts.findIndex((item) => item.slug === props.entitySlug);
  const post = index >= 0 ? posts[index] : undefined;
  const href = (path: string) => previewHref(props.mode, path);

  if (!post) {
    return (
      <IndustrialFrame {...props}>
        <section className="bg-white pt-[150px] pb-24 min-[1180px]:pt-[250px]">
          <div className={pageContainer}>
            <h1 className="text-[clamp(2.4rem,3.9vw,3.5rem)] leading-[1.3] font-bold text-[#03071E]">Article unavailable</h1>
            <div className="mt-8">
              <PillLink href={href("/blog")}>All posts</PillLink>
            </div>
          </div>
        </section>
      </IndustrialFrame>
    );
  }

  const sections = ensureHeadingIds(resolveArticleSections(post));
  const { intro, groups } = groupArticleSections(sections);
  const toc = extractArticleToc(sections);
  const author = resolveBlogAuthor(post, team);
  const related = resolveRelatedBlogPosts(post, posts, 3);
  const previous = index > 0 ? posts[index - 1] : undefined;
  const next = index < posts.length - 1 ? posts[index + 1] : undefined;
  const published = formatPostDateListing(post.publishedAt);
  const readingTime = formatReadingTime(post);
  const meta = [
    post.category ? { label: "Category", value: post.category } : null,
    author?.name ? { label: "Author", value: author.name } : null,
    published ? { label: "Date", value: published } : null,
    readingTime ? { label: "Reading time", value: readingTime } : null,
  ].filter((item): item is { label: string; value: string } => item != null);

  return (
    <IndustrialFrame {...props}>
      <article>
        <section className="relative overflow-hidden bg-white pt-[150px] pb-16 min-[1180px]:pt-[250px] min-[1180px]:pb-20" aria-labelledby="article-hero-heading">
          <div className={pageContainer}>
            <div className="max-w-[760px]">
              <Eyebrow>{post.category ?? "Article"}</Eyebrow>
              <h1 id="article-hero-heading" className="mt-5 text-[clamp(2.4rem,3.9vw,3.5rem)] leading-[1.2] font-bold text-[#03071E]">
                {post.title}
              </h1>
              {post.excerpt ? <p className="mt-5 max-w-2xl text-base leading-7 text-[#03071E]">{post.excerpt}</p> : null}
              <div className="mt-8 flex flex-wrap gap-4">
                <PillLink href={href("/contact")}>Start Your Project</PillLink>
                <PillLink href={href("/projects")} variant="outline">
                  View Projects
                </PillLink>
              </div>
            </div>
          </div>
        </section>

        {meta.length ? (
          <section className="border-y border-[#e6e8ec] bg-[#F6F8FA]" aria-label="Article metadata">
            <dl className={`${pageContainer} grid gap-6 py-8 min-[720px]:grid-cols-4`}>
              {meta.map((item) => (
                <div key={item.label}>
                  <dt className="text-sm text-[#5c6570]">{item.label}</dt>
                  <dd className="mt-1 text-lg font-bold text-[#03071E]">{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {post.image?.url ? (
          <section className="bg-white py-12 min-[960px]:py-16" aria-label="Featured article image">
            <figure className={pageContainer}>
              <img src={post.image.url} alt={post.image.alt} className="h-[280px] w-full rounded-[16px] object-cover min-[960px]:h-[560px]" />
              {post.imageCaption || post.imageCredit ? (
                <figcaption className="mt-3 text-sm text-[#5c6570]">{[post.imageCaption, post.imageCredit].filter(Boolean).join(" · ")}</figcaption>
              ) : null}
            </figure>
          </section>
        ) : null}

        {toc.length ? (
          <nav className="bg-[#F6F6F6] py-[100px]" aria-labelledby="article-toc-heading">
            <div className={pageContainer}>
              <Eyebrow>Contents</Eyebrow>
              <h2 id="article-toc-heading" className={sectionTitle}>
                In this article
              </h2>
              <ol className="mt-10 grid gap-3 min-[720px]:grid-cols-2">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="flex items-center gap-4 rounded-[8px] bg-white px-5 py-4 font-bold text-[#03071E] hover:text-[#FF6610]">
                      <span className="text-[#FF6610]">{String(item.index).padStart(2, "0")}</span>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        ) : null}

        {intro.length ? (
          <section className="bg-white py-[100px]">
            <div className={`${pageContainer} max-w-3xl`}>
              <ArticleBlocks blocks={intro} />
            </div>
          </section>
        ) : null}

        {groups.map((group, index) => (
          <section
            key={group.heading.id}
            id={group.heading.id}
            className={`scroll-mt-[140px] py-[100px] ${index % 2 === 0 ? "bg-white" : "bg-[#F6F8FA]"}`}
            aria-labelledby={`article-${group.heading.id}`}
          >
            <div className={`${pageContainer} max-w-3xl`}>
              <p className="text-sm font-bold tracking-[0.14em] text-[#FF6610]">{String(index + 1).padStart(2, "0")}</p>
              <h2 id={`article-${group.heading.id}`} className={sectionTitle}>
                {group.heading.title}
              </h2>
              {group.blocks.length ? (
                <div className="mt-8">
                  <ArticleBlocks blocks={group.blocks} />
                </div>
              ) : null}
            </div>
          </section>
        ))}

        {author ? (
          <section className="bg-[#F6F6F6] py-[100px]" aria-labelledby="article-author-heading">
            <div className={`${pageContainer} grid items-center gap-8 min-[720px]:grid-cols-[160px_minmax(0,1fr)]`}>
              {author.image?.url ? (
                <img src={author.image.url} alt={author.image.alt || author.name} className="h-40 w-40 rounded-full object-cover" />
              ) : null}
              <div>
                <Eyebrow>Author</Eyebrow>
                <h2 id="article-author-heading" className={sectionTitle}>
                  {author.name}
                </h2>
                {author.role ? <p className="mt-3 font-semibold text-[#FF6610]">{author.role}</p> : null}
                {author.bio ? <p className={`mt-4 max-w-2xl ${bodyCopy}`}>{author.bio}</p> : null}
              </div>
            </div>
          </section>
        ) : null}

        {post.tags?.length ? (
          <section className="bg-white py-[100px]" aria-labelledby="article-tags-heading">
            <div className={pageContainer}>
              <Eyebrow>Topics</Eyebrow>
              <h2 id="article-tags-heading" className={sectionTitle}>
                Article tags
              </h2>
              <ul className="mt-8 flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-[#FFF1E8] px-4 py-2 font-semibold text-[#FF6610]">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </article>

      {previous || next ? (
        <section className="border-t border-[#e6e8ec] bg-[#F6F8FA] py-[100px]" aria-label="Article sequence">
          <div className={`${pageContainer} grid gap-6 min-[960px]:grid-cols-2`}>
            {previous ? <SequenceCard post={previous} direction="previous" href={href(`/blog/${previous.slug}`)} /> : <div className="hidden min-[960px]:block" />}
            {next ? <SequenceCard post={next} direction="next" href={href(`/blog/${next.slug}`)} /> : null}
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="bg-white py-[100px]" aria-labelledby="related-insights-heading">
          <div className={pageContainer}>
            <Eyebrow>Journal</Eyebrow>
            <h2 id="related-insights-heading" className={sectionTitle}>
              Related insights
            </h2>
            <ul className="mt-10 grid gap-6 min-[720px]:grid-cols-3">
              {related.map((item) => (
                <li key={item.id} className="overflow-hidden rounded-[12px] bg-[#F6F8FA]">
                  {item.image?.url ? <img src={item.image.url} alt={item.image.alt} className="h-48 w-full object-cover" /> : null}
                  <div className="p-6">
                    {item.category ? <p className="text-sm font-semibold text-[#FF6610]">{item.category}</p> : null}
                    <h3 className="mt-2 text-[20px] leading-snug font-bold text-[#03071E]">
                      <Link href={href(`/blog/${item.slug}`)} className="hover:text-[#FF6610]">
                        {item.title}
                      </Link>
                    </h3>
                    <Link href={href(`/blog/${item.slug}`)} className="mt-4 inline-flex font-bold text-[#03071E] hover:text-[#FF6610]">
                      Read the article
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="bg-[#03071E]" aria-labelledby="article-cta-heading">
        <div className={`${pageContainer} flex flex-wrap items-end justify-between gap-8 py-20`}>
          <div>
            <Eyebrow light>Next project</Eyebrow>
            <h2 id="article-cta-heading" className="mt-4 max-w-[14ch] text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.05] font-bold text-white">
              Have a project like this?
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/70">Bring the site and the schedule. We will bring the plan.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <PillLink href={href("/contact")}>Start a project</PillLink>
            <PillLink href={href("/blog")} variant="outline-light">
              All posts
            </PillLink>
          </div>
        </div>
      </section>
    </IndustrialFrame>
  );
}

function SequenceCard({ post, direction, href }: { post: BlogPost; direction: "previous" | "next"; href: string }) {
  return (
    <Link href={href} className="grid gap-4 rounded-[12px] bg-white p-6 hover:text-[#FF6610] min-[720px]:grid-cols-[minmax(0,1fr)_8rem]">
      <div className={direction === "next" ? "min-[720px]:order-2 min-[720px]:text-right" : undefined}>
        <p className="text-sm font-semibold text-[#FF6610]">{direction === "previous" ? "Previous article" : "Next article"}</p>
        {post.category ? <p className="mt-3 text-sm text-[#5c6570]">{post.category}</p> : null}
        <p className="mt-2 text-xl leading-snug font-bold text-[#03071E]">{post.title}</p>
      </div>
      {post.image?.url ? <img src={post.image.url} alt="" className={`h-28 w-full rounded-[8px] object-cover ${direction === "next" ? "min-[720px]:order-1" : ""}`} /> : null}
    </Link>
  );
}
