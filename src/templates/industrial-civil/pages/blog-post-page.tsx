import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import type { BlogArticleBlock, BlogPost } from "@/templates/shared/cms/types/blog";
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

type ArticlePart = {
  id: string;
  title: string;
  blocks: BlogArticleBlock[];
};

function splitArticle(sections: BlogArticleBlock[]): { intro: BlogArticleBlock[]; parts: ArticlePart[] } {
  const intro: BlogArticleBlock[] = [];
  const parts: ArticlePart[] = [];
  let current: ArticlePart | undefined;

  for (const block of sections) {
    if (block.type === "heading" && (block.level ?? 2) <= 2 && block.id) {
      current = { id: block.id, title: block.title, blocks: [] };
      parts.push(current);
      continue;
    }
    if (current) current.blocks.push(block);
    else intro.push(block);
  }

  return { intro, parts };
}

export function IndustrialCivilBlogPostPage(props: TemplatePageProps) {
  const { company, posts, team } = readIndustrialSite(props.payload);
  const published = [...posts].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  const index = published.findIndex((item) => item.slug === props.entitySlug);
  const post = index >= 0 ? published[index] : undefined;
  const href = (path: string) => previewHref(props.mode, path);

  if (!post) {
    return (
      <IndustrialFrame {...props}>
        <section className="bg-white pt-[150px] pb-20 min-[1180px]:pt-[220px]">
          <div className={pageContainer}>
            <Eyebrow>Insights</Eyebrow>
            <h1 className="mt-5 text-[clamp(2.4rem,3.9vw,3.5rem)] leading-[1.3] font-bold text-[#03071E]">Article unavailable</h1>
            <div className="mt-8">
              <PillLink href={href("/blog")} variant="outline">
                All insights
              </PillLink>
            </div>
          </div>
        </section>
      </IndustrialFrame>
    );
  }

  const sections = ensureHeadingIds(resolveArticleSections(post));
  const { intro, parts } = splitArticle(sections);
  const toc = extractArticleToc(sections);
  const author = resolveBlogAuthor(post, team);
  const related = resolveRelatedBlogPosts(post, published, 3);
  const previous = index > 0 ? published[index - 1] : undefined;
  const next = index < published.length - 1 ? published[index + 1] : undefined;
  const date = formatPostDateListing(post.publishedAt);
  const readingTime = formatReadingTime(post);
  const meta = [
    post.category ? { label: "Category", value: post.category } : null,
    author?.name ? { label: "Author", value: author.name } : null,
    date ? { label: "Date", value: date } : null,
    readingTime ? { label: "Reading time", value: readingTime } : null,
  ].filter((item): item is { label: string; value: string } => item != null);

  return (
    <IndustrialFrame {...props}>
      <section className="bg-white pt-[150px] pb-16 min-[1180px]:pt-[220px]" aria-labelledby="article-title">
        <div className={`${pageContainer} max-w-[860px]`}>
          <Eyebrow>Insights</Eyebrow>
          <h1 id="article-title" className="mt-5 text-[clamp(2.4rem,3.9vw,3.5rem)] leading-[1.2] font-bold text-[#03071E]">
            {post.title}
          </h1>
          {post.excerpt ? <p className="mt-5 text-base leading-7 text-[#03071E]">{post.excerpt}</p> : null}
          <div className="mt-8 flex flex-wrap gap-4">
            <PillLink href={href("/contact")}>Start Your Project</PillLink>
            <PillLink href={href("/blog")} variant="outline">
              All insights
            </PillLink>
          </div>
        </div>
      </section>

      {meta.length ? (
        <section className="border-y border-[#e6e8ec] bg-[#F6F8FA] py-10" aria-label="Article details">
          <dl className={`${pageContainer} grid gap-6 min-[720px]:grid-cols-4`}>
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
        <section className="bg-white py-[100px]" aria-label="Featured image">
          <figure className={pageContainer}>
            <img src={post.image.url} alt={post.image.alt} className="h-[320px] w-full rounded-[12px] object-cover min-[960px]:h-[640px]" />
            {post.imageCaption || post.imageCredit ? (
              <figcaption className="mt-4 text-sm text-[#5c6570]">
                {[post.imageCaption, post.imageCredit].filter(Boolean).join(" · ")}
              </figcaption>
            ) : null}
          </figure>
        </section>
      ) : null}

      {toc.length ? (
        <section className="bg-[#F6F8FA] py-[100px]" aria-labelledby="article-contents-heading">
          <div className={pageContainer}>
            <Eyebrow>In this article</Eyebrow>
            <h2 id="article-contents-heading" className={sectionTitle}>
              Section navigation
            </h2>
            <ol className="mt-10 grid gap-4 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-3">
              {toc.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="flex h-full items-start gap-4 rounded-[8px] bg-white p-5 font-bold text-[#03071E] hover:text-[#FF6610]">
                    <span className="text-[#FF6610]">{String(item.index).padStart(2, "0")}</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {intro.length ? (
        <section className="bg-white py-[100px]" aria-label="Article introduction">
          <div className={`${pageContainer} max-w-3xl`}>
            <ArticleBlocks blocks={intro} />
          </div>
        </section>
      ) : null}

      {parts.map((part, partIndex) => (
        <section
          key={part.id}
          id={part.id}
          className={`scroll-mt-[140px] py-[100px] ${partIndex % 2 === 0 ? "bg-white" : "bg-[#F6F8FA]"}`}
          aria-labelledby={`${part.id}-heading`}
        >
          <div className={`${pageContainer} max-w-3xl`}>
            <p className="text-sm font-bold tracking-[0.14em] text-[#FF6610]">{String(partIndex + 1).padStart(2, "0")}</p>
            <h2 id={`${part.id}-heading`} className={sectionTitle}>
              {part.title}
            </h2>
            {part.blocks.length ? (
              <div className="mt-8">
                <ArticleBlocks blocks={part.blocks} />
              </div>
            ) : null}
          </div>
        </section>
      ))}

      {author ? (
        <section className="border-t border-[#e6e8ec] bg-white py-[100px]" aria-labelledby="article-author-heading">
          <div className={`${pageContainer} flex flex-wrap items-start gap-6`}>
            {author.image?.url ? (
              <img src={author.image.url} alt={author.image.alt || author.name} className="h-24 w-24 rounded-full object-cover" />
            ) : null}
            <div className="max-w-2xl">
              <Eyebrow>Author</Eyebrow>
              <h2 id="article-author-heading" className={sectionTitle}>
                {author.name}
              </h2>
              {author.role ? <p className="mt-3 font-semibold text-[#FF6610]">{author.role}</p> : null}
              {author.bio ? <p className={`mt-4 ${bodyCopy}`}>{author.bio}</p> : null}
            </div>
          </div>
        </section>
      ) : null}

      {post.tags?.length ? (
        <section className="bg-[#F6F8FA] py-[100px]" aria-labelledby="article-tags-heading">
          <div className={pageContainer}>
            <Eyebrow>Topics</Eyebrow>
            <h2 id="article-tags-heading" className={sectionTitle}>
              Article tags
            </h2>
            <ul className="mt-8 flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#03071E]">
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {previous || next ? (
        <section className="bg-white py-[100px]" aria-label="Article sequence">
          <div className={`${pageContainer} grid gap-6 min-[960px]:grid-cols-2`}>
            {previous ? <SequenceCard post={previous} direction="previous" href={href(`/blog/${previous.slug}`)} /> : <div className="hidden min-[960px]:block" />}
            {next ? <SequenceCard post={next} direction="next" href={href(`/blog/${next.slug}`)} /> : null}
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="bg-[#F6F6F6] py-[100px]" aria-labelledby="related-insights-heading">
          <div className={pageContainer}>
            <Eyebrow>Keep reading</Eyebrow>
            <h2 id="related-insights-heading" className={sectionTitle}>
              Related insights
            </h2>
            <ul className="mt-10 grid gap-6 min-[720px]:grid-cols-3">
              {related.map((item) => (
                <li key={item.id} className="overflow-hidden rounded-[8px] bg-white">
                  {item.image?.url ? <img src={item.image.url} alt={item.image.alt} className="h-44 w-full object-cover" /> : null}
                  <div className="p-6">
                    {item.category ? <p className="text-sm font-bold text-[#FF6610]">{item.category}</p> : null}
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
            <p className="mt-5 max-w-md text-base leading-7 text-white/70">
              Bring the site and the schedule.{company?.name ? ` ${company.name} will bring the plan.` : " We will bring the plan."}
            </p>
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
  const label = direction === "previous" ? "Previous article" : "Next article";

  return (
    <Link href={href} className={`group block rounded-[8px] bg-[#F6F8FA] p-6 ${direction === "next" ? "min-[960px]:text-right" : ""}`}>
      <p className="text-sm font-bold tracking-[0.14em] text-[#FF6610]">{label}</p>
      {post.category ? <p className="mt-4 text-sm font-semibold text-[#5c6570]">{post.category}</p> : null}
      <p className="mt-2 text-[22px] leading-snug font-bold text-[#03071E] group-hover:text-[#FF6610]">{post.title}</p>
    </Link>
  );
}
