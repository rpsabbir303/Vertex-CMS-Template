import type { TemplatePageProps } from "@/registry/template-types";
import { getSortedCollectionItems } from "@/templates/shared/cms/resolve-content";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { BlogArticleRenderer } from "@/templates/corporate-construction/components/blog-article-renderer";
import { BlogArticleShare } from "@/templates/corporate-construction/components/blog-article-share";
import { BlogArticleToc } from "@/templates/corporate-construction/components/blog-article-toc";
import { BlogPostAuthorSection } from "@/templates/corporate-construction/components/blog-post-author";
import { BlogPostHero } from "@/templates/corporate-construction/components/blog-post-hero";
import { BlogPostRelated } from "@/templates/corporate-construction/components/blog-post-related";
import { BlogPostSequenceNav } from "@/templates/corporate-construction/components/blog-post-sequence-nav";
import { BlogPostTags } from "@/templates/corporate-construction/components/blog-post-tags";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CtaBand } from "@/templates/corporate-construction/components/ui/cta-band";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { formatReadingTime, getPublishedBlogPosts } from "@/templates/corporate-construction/utils/blog-content";
import {
  ensureHeadingIds,
  extractArticleToc,
  resolveArticleSections,
  resolveBlogAuthor,
  resolveRelatedBlogPosts,
} from "@/templates/corporate-construction/utils/blog-article";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

export function CorporateConstructionBlogPostPage(props: TemplatePageProps) {
  const posts = props.payload.blog ? getSortedCollectionItems(props.payload.blog) : [];
  const published = getPublishedBlogPosts(posts);
  const team = getSortedCollectionItems(props.payload.team);
  const index = published.findIndex((item) => item.slug === props.entitySlug);
  const post = index >= 0 ? published[index] : undefined;

  if (!post) {
    return (
      <CorporatePageFrame {...props}>
        <section className="vertex-container pt-40 pb-24">
          <p className={ui.eyebrow}>Blog</p>
          <h1 className={cn(ui.h2, "mt-5")}>Post not found</h1>
          <a href={previewHref(props.mode, "/blog")} className={cn(ui.btnGhost, "mt-8")}>
            Back to the blog
          </a>
        </section>
      </CorporatePageFrame>
    );
  }

  const previous = index > 0 ? published[index - 1] : undefined;
  const next = index < published.length - 1 ? published[index + 1] : undefined;
  const sections = ensureHeadingIds(resolveArticleSections(post));
  const toc = extractArticleToc(sections);
  const author = resolveBlogAuthor(post, team);
  const related = resolveRelatedBlogPosts(post, published, 3);
  const readingTime = formatReadingTime(post);
  const indexLabel = `${pad(index + 1)} / ${pad(published.length)}`;
  return (
    <CorporatePageFrame {...props}>
      <article itemScope itemType="https://schema.org/Article">
        <meta itemProp="headline" content={post.title} />
        {post.publishedAt ? <meta itemProp="datePublished" content={post.publishedAt} /> : null}
        {post.author ? <meta itemProp="author" content={post.author} /> : null}

        <BlogPostHero
          mode={props.mode}
          title={post.title}
          excerpt={post.excerpt}
          category={post.category}
          publishedAt={post.publishedAt}
          author={post.author}
          readingTime={readingTime}
          indexLabel={indexLabel}
        />

        {post.image?.url ? (
          <div className="vertex-container pb-4 md:pb-8">
            <Reveal plate className={cn(ui.plate, "h-[52vh] min-h-[16rem] max-h-[44rem]")}>
              <CmsImageMedia image={post.image} aspect="auto" className="h-full w-full object-cover" sizes="100vw" priority />
            </Reveal>
            {post.imageCaption || post.imageCredit ? (
              <p className={cn(ui.mono, "mt-3 max-w-2xl text-[var(--color-text-muted)]")}>
                {[post.imageCaption, post.imageCredit].filter(Boolean).join(" · ")}
              </p>
            ) : null}
          </div>
        ) : null}

        <section className="bg-[var(--color-surface)]" aria-label="Article body">
          <div className="vertex-container py-12 md:py-16 lg:py-20">
            <div className="grid grid-cols-1 gap-12 xl:grid-cols-12 xl:gap-10">
              <div className="xl:col-span-2 xl:sticky xl:top-28 xl:self-start">
                <BlogArticleToc items={toc} variant="sidebar" />
              </div>

              <div className="min-w-0 xl:col-span-7 xl:max-w-[760px]">
                <BlogArticleToc items={toc} variant="mobile" />
                <BlogArticleRenderer sections={sections} />
                <BlogArticleShare mode={props.mode} slug={post.slug} title={post.title} layout="inline" className="mt-12 border-t border-[var(--color-border)] pt-8" />
                <p className="mt-10">
                  <a href={previewHref(props.mode, "/blog")} className={cn(ui.link, "text-sm")}>
                    ← Back to all insights
                  </a>
                </p>
              </div>

              <div className="xl:col-span-3 xl:sticky xl:top-28 xl:self-start">
                <BlogArticleShare mode={props.mode} slug={post.slug} title={post.title} layout="sidebar" />
              </div>
            </div>
          </div>
        </section>

        {author ? <BlogPostAuthorSection author={author} /> : null}
        {post.tags?.length ? <BlogPostTags tags={post.tags} /> : null}
      </article>

      <BlogPostSequenceNav mode={props.mode} previous={previous} next={next} />
      <BlogPostRelated mode={props.mode} posts={related} />

      <CtaBand
        mode={props.mode}
        title="Have a project like this?"
        body="Bring the site and the schedule. We will bring the plan."
        primaryLabel="Start a project"
        secondary={{ label: "All posts", href: "/blog" }}
      />
    </CorporatePageFrame>
  );
}
