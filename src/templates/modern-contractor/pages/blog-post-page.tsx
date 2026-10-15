import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import type { BlogArticleBlock } from "@/templates/shared/cms/types/blog";
import { getSortedCollectionItems } from "@/templates/shared/cms/resolve-content";
import { formatReadingTime, getPublishedBlogPosts } from "@/templates/corporate-construction/utils/blog-content";
import {
  ensureHeadingIds,
  extractArticleToc,
  resolveArticleSections,
  resolveBlogAuthor,
  resolveRelatedBlogPosts,
} from "@/templates/corporate-construction/utils/blog-article";
import { formatPostDateListing } from "@/templates/corporate-construction/utils/format-date";
import { ModernBlogArticle } from "@/templates/modern-contractor/components/modern-blog-article";
import { ModernPageFrame } from "@/templates/modern-contractor/components/modern-page-frame";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { pad, ui } from "@/templates/modern-contractor/theme/ui";
import { cn } from "@/utils/cn";

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";
const heading = `${display} text-[clamp(2.2rem,3.6vw,3.35rem)] leading-[1.32] font-semibold tracking-[-0.04em]`;

type ArticleChapter = {
  id: string;
  title: string;
  index: number;
  blocks: BlogArticleBlock[];
};

function articleChapters(sections: BlogArticleBlock[]): { preface: BlogArticleBlock[]; chapters: ArticleChapter[] } {
  const preface: BlogArticleBlock[] = [];
  const chapters: ArticleChapter[] = [];
  let current: ArticleChapter | undefined;

  sections.forEach((block, index) => {
    if (block.type === "heading" && (block.level ?? 2) <= 2) {
      current = {
        id: block.id ?? `section-${index}`,
        title: block.title,
        index: chapters.length + 1,
        blocks: [],
      };
      chapters.push(current);
      return;
    }
    if (current) current.blocks.push(block);
    else preface.push(block);
  });

  return { preface, chapters };
}

export function ModernContractorBlogPostPage(props: TemplatePageProps) {
  const posts = props.payload.blog ? getSortedCollectionItems(props.payload.blog) : [];
  const published = getPublishedBlogPosts(posts);
  const team = getSortedCollectionItems(props.payload.team);
  const index = published.findIndex((item) => item.slug === props.entitySlug);
  const post = index >= 0 ? published[index] : undefined;
  const blogHref = previewHref(props.mode, "/blog");
  const homeHref = previewHref(props.mode, "/");
  const contactHref = previewHref(props.mode, "/contact");

  if (!post) {
    return (
      <ModernPageFrame {...props}>
        <section className="vertex-container pt-40 pb-24">
          <p className={ui.eyebrow}>Blog</p>
          <h1 className={cn(ui.h2, "mt-4")}>Post not found</h1>
          <Link href={blogHref} className={cn(ui.btnOutline, "mt-8 inline-flex")}>
            Back to the blog
          </Link>
        </section>
      </ModernPageFrame>
    );
  }

  const previous = index > 0 ? published[index - 1] : undefined;
  const next = index < published.length - 1 ? published[index + 1] : undefined;
  const sections = ensureHeadingIds(resolveArticleSections(post));
  const toc = extractArticleToc(sections);
  const { preface, chapters } = articleChapters(sections);
  const author = resolveBlogAuthor(post, team);
  const related = resolveRelatedBlogPosts(post, published, 3);
  const date = formatPostDateListing(post.publishedAt);
  const reading = formatReadingTime(post);
  const meta = [
    post.category?.trim() ? { label: "Category", value: post.category.trim() } : undefined,
    author?.name ? { label: "Author", value: author.name } : undefined,
    date ? { label: "Published", value: date } : undefined,
    reading ? { label: "Reading time", value: reading } : undefined,
  ].filter((item): item is { label: string; value: string } => Boolean(item));

  return (
    <ModernPageFrame {...props}>
      <article>
        <header className="relative min-h-[640px] overflow-hidden bg-[#0a0c0b] text-white min-[960px]:min-h-[684px]">
          {post.image?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : null}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,#0a0c0b_8%,rgba(10,12,11,0.82)_42%,rgba(10,12,11,0.38)_100%)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div className="relative mx-auto flex min-h-[640px] max-w-[1360px] flex-col px-5 pt-32 pb-14 min-[960px]:min-h-[684px] min-[960px]:px-8 min-[960px]:pt-36">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 text-[12px] tracking-[0.16em] text-white/70 uppercase">
              <Link href={homeHref} className="hover:text-white">
                Home
              </Link>
              <span aria-hidden>›</span>
              <Link href={blogHref} className="hover:text-white">
                Blog
              </Link>
              <span aria-hidden>›</span>
              <span className="text-white">{post.category?.trim() || "Article"}</span>
            </nav>
            <div className="mt-auto grid items-end gap-10 pt-16 min-[960px]:grid-cols-[minmax(0,1fr)_280px]">
              <div className="min-w-0">
                <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
                  <span className="h-px w-8 bg-[#C8FF2E]" />
                  Article
                </p>
                <h1 className={`${display} mt-5 text-[clamp(2.4rem,3.6vw,3.5rem)] leading-[1.28] font-semibold tracking-[-0.04em] text-balance`}>
                  {post.title}
                </h1>
                {post.excerpt ? <p className="mt-6 max-w-[40rem] text-[17px] leading-relaxed text-white/78">{post.excerpt}</p> : null}
              </div>
              <aside className="border-l border-white/25 py-2 pl-6">
                <p className="text-[11px] tracking-[0.14em] text-[#9ba49c] uppercase">In the journal</p>
                <p className={`${display} mt-2 text-[2.4rem] leading-none font-semibold`}>
                  {pad(index + 1)}
                  <span className="text-[1.2rem] text-white/55"> / {pad(published.length)}</span>
                </p>
                {post.category?.trim() ? (
                  <p className="mt-3 text-[13px] tracking-[0.08em] text-white/80 uppercase">{post.category}</p>
                ) : null}
              </aside>
            </div>
          </div>
        </header>

        {meta.length ? (
          <section className="bg-[#f3f1e9] px-5 py-10 text-[#0a0c0b] min-[960px]:px-8" aria-labelledby="article-meta-heading">
            <div className="mx-auto max-w-[1360px]">
              <h2 id="article-meta-heading" className="text-[12px] font-extrabold tracking-[0.18em] uppercase">
                Article details
              </h2>
              <dl className="mt-6 grid gap-6 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-4">
                {meta.map((item) => (
                  <div key={item.label} className="border-t border-black/15 pt-4">
                    <dt className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067] uppercase">{item.label}</dt>
                    <dd className={`${display} mt-2 text-[1.2rem] leading-tight font-semibold tracking-[-0.03em]`}>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        ) : null}

        {post.image?.url ? (
          <section className="bg-[#f3f1e9] px-5 pb-8 text-[#0a0c0b] min-[960px]:px-8" aria-label="Featured image">
            <figure className="mx-auto max-w-[1360px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.image.url}
                alt={post.image.alt || ""}
                className="aspect-[16/8] w-full rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] object-cover"
              />
              {post.imageCaption || post.imageCredit ? (
                <figcaption className="mt-4 text-[13px] leading-relaxed text-[#667067]">
                  {post.imageCaption}
                  {post.imageCredit ? <span className="mt-1 block tracking-[0.08em] uppercase">{post.imageCredit}</span> : null}
                </figcaption>
              ) : null}
            </figure>
          </section>
        ) : null}

        {toc.length ? (
          <nav aria-labelledby="article-toc-heading" className="border-y border-black/15 bg-[#f3f1e9] text-[#0a0c0b]">
            <div className="mx-auto max-w-[1360px] px-5 py-8 min-[960px]:px-8">
              <h2 id="article-toc-heading" className="text-[12px] font-extrabold tracking-[0.18em] uppercase">
                On this article
              </h2>
              <ol className="mt-5 flex flex-wrap gap-2">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="inline-flex rounded-full border border-black/15 px-4 py-2.5 text-sm font-semibold hover:bg-[#0a0c0b] hover:text-white"
                    >
                      {pad(item.index)} {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        ) : null}

        <div className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24">
          <div className="mx-auto max-w-[760px]">
            {preface.length ? <ModernBlogArticle sections={preface} promoteLead /> : null}
            {chapters.map((chapter) => (
              <section key={chapter.id} id={chapter.id} className="scroll-mt-28 border-t border-black/15 py-12 first:border-t-0 first:pt-0" aria-labelledby={`${chapter.id}-heading`}>
                <p className="text-[12px] font-extrabold tracking-[0.16em] text-[#667067]">{pad(chapter.index)}</p>
                <h2 id={`${chapter.id}-heading`} className={`${display} mt-3 text-[clamp(1.8rem,2.6vw,2.4rem)] leading-[1.32] font-semibold tracking-[-0.04em]`}>
                  {chapter.title}
                </h2>
                <div className="mt-6">
                  <ModernBlogArticle sections={chapter.blocks} promoteLead={chapter.index === 1 && preface.length === 0} />
                </div>
              </section>
            ))}
          </div>
        </div>

        {author ? (
          <section className="border-t border-black/15 bg-[#e7e3d6] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-20" aria-labelledby="article-author-heading">
            <div className="mx-auto grid max-w-[1360px] items-center gap-8 min-[960px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] min-[960px]:gap-16">
              <div className="flex items-center gap-5">
                {author.image?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={author.image.url} alt="" className="h-20 w-20 rounded-full object-cover" />
                ) : (
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-[#0a0c0b] text-xl font-semibold text-[#C8FF2E]">
                    {author.name.slice(0, 1)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-[12px] font-extrabold tracking-[0.16em] uppercase">Author</p>
                  <h2 id="article-author-heading" className={`${display} mt-2 text-[clamp(1.8rem,2.6vw,2.4rem)] leading-[1.2] font-semibold tracking-[-0.04em]`}>
                    {author.name}
                  </h2>
                  {author.role ? <p className="mt-2 text-[15px] text-[#667067]">{author.role}</p> : null}
                </div>
              </div>
              {author.bio ? <p className="text-[18px] leading-relaxed text-[#3e4438]">{author.bio}</p> : null}
            </div>
          </section>
        ) : null}

        {post.tags?.length ? (
          <section className="bg-[#f3f1e9] px-5 py-12 text-[#0a0c0b] min-[960px]:px-8" aria-labelledby="article-tags-heading">
            <div className="mx-auto max-w-[1360px]">
              <h2 id="article-tags-heading" className="text-[12px] font-extrabold tracking-[0.18em] uppercase">
                Article tags
              </h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-black/15 px-4 py-2 text-[13px] font-semibold tracking-[0.06em] uppercase">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {previous || next ? (
          <nav aria-label="Article sequence" className="border-t border-black/15 bg-[#f3f1e9] px-5 py-12 text-[#0a0c0b] min-[960px]:px-8">
            <div className="mx-auto grid max-w-[1360px] gap-8 min-[960px]:grid-cols-2">
              {previous ? (
                <Link href={previewHref(props.mode, `/blog/${previous.slug}`)} className="min-w-0">
                  <span className="text-[12px] font-extrabold tracking-[0.16em] uppercase">Previous article</span>
                  <span className={`${display} mt-3 block text-[clamp(1.25rem,2vw,1.7rem)] leading-[1.28] font-semibold tracking-[-0.03em]`}>
                    {previous.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={previewHref(props.mode, `/blog/${next.slug}`)} className="min-w-0 min-[960px]:text-right">
                  <span className="text-[12px] font-extrabold tracking-[0.16em] uppercase">Next article</span>
                  <span className={`${display} mt-3 block text-[clamp(1.25rem,2vw,1.7rem)] leading-[1.28] font-semibold tracking-[-0.03em]`}>
                    {next.title}
                  </span>
                </Link>
              ) : null}
            </div>
          </nav>
        ) : null}

        {related.length ? (
          <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="related-insights-heading">
            <div className="mx-auto max-w-[1360px]">
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
                <span className="h-px w-8 bg-[#0a0c0b]" />
                Keep reading
              </p>
              <h2 id="related-insights-heading" className={`${heading} mt-5`}>
                Related insights
              </h2>
              <ul className="mt-12 grid gap-8 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-3">
                {related.map((item) => (
                  <li key={item.id}>
                    <Link href={previewHref(props.mode, `/blog/${item.slug}`)} className="block">
                      {item.image?.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.image.url}
                          alt={item.image.alt || ""}
                          className="aspect-[16/10] w-full rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] object-cover"
                        />
                      ) : null}
                      {item.category ? (
                        <p className="mt-4 text-[12px] font-extrabold tracking-[0.14em] text-[#667067] uppercase">{item.category}</p>
                      ) : null}
                      <p className={`${display} mt-2 text-[1.35rem] leading-[1.28] font-semibold tracking-[-0.03em]`}>{item.title}</p>
                      <p className="mt-3 text-[12px] tracking-[0.06em] text-[#667067] uppercase">
                        {[formatPostDateListing(item.publishedAt), formatReadingTime(item)].filter(Boolean).join(" · ")}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24">
          <div className="mx-auto max-w-[1360px] rounded-tl-[34px] rounded-tr-[34px] rounded-br-[34px] rounded-bl-[110px] border border-white/15 bg-[linear-gradient(135deg,#111512,#050706)] px-8 py-14 min-[960px]:px-20 min-[960px]:py-[70px]">
            <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
              <span className="h-px w-8 bg-[#C8FF2E]" />
              Start a project
            </p>
            <h2 className={`${display} mt-5 max-w-3xl text-[clamp(2.4rem,4vw,3.8rem)] leading-[1.32] font-semibold tracking-[-0.04em]`}>
              Have a project like this?
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
              Bring the site and the schedule. We will bring the plan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={contactHref} className="inline-flex rounded-full bg-[#C8FF2E] px-6 py-3.5 text-sm font-semibold text-[#0a0c0b]">
                Start a project
              </Link>
              <Link href={blogHref} className="inline-flex rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white">
                All posts
              </Link>
            </div>
          </div>
        </section>
      </article>
    </ModernPageFrame>
  );
}
