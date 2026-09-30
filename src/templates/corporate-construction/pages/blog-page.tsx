import type { TemplatePageProps } from "@/registry/template-types";
import type { BlogPost } from "@/templates/shared/cms/types/blog";
import { getSortedCollectionItems, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CtaBand } from "@/templates/corporate-construction/components/ui/cta-band";
import { PageIntro } from "@/templates/corporate-construction/components/ui/page-intro";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { formatPostDate } from "@/templates/corporate-construction/utils/format-date";
import { pageSeoDescription, splitParagraphs } from "@/templates/corporate-construction/utils/page-seo";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

function postMeta(post: BlogPost): string {
  return [post.category, formatPostDate(post.publishedAt), post.author].filter(Boolean).join(" · ");
}

export function CorporateConstructionBlogPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const posts = props.payload.blog ? getSortedCollectionItems(props.payload.blog) : [];
  const [featured, ...archive] = posts;
  const perspective = splitParagraphs(company?.description)[1];
  const categories = Array.from(new Set(posts.map((p) => p.category).filter((c): c is string => Boolean(c))));

  return (
    <CorporatePageFrame {...props}>
      <PageIntro
        eyebrow="Blog"
        title="Notes from the field."
        lead={pageSeoDescription(props.payload, "blog")}
        meta={[
          posts.length ? `${posts.length} ${posts.length === 1 ? "post" : "posts"}` : undefined,
          ...categories,
        ].filter((v): v is string => Boolean(v))}
      />

      {!posts.length ? (
        <section className="vertex-container py-16 md:py-20">
          <p className="text-[var(--color-text-muted)]">No posts have been published yet.</p>
        </section>
      ) : null}

      {featured ? (
        <section className="bg-[var(--color-surface)]" aria-label="Latest post">
          <a href={previewHref(props.mode, `/blog/${featured.slug}`)} className="group block">
            <div className="vertex-container grid gap-10 pb-24 lg:grid-cols-12 lg:gap-16 md:pb-32">
              <Reveal plate as="figure" className="lg:col-span-7">
                <div className={cn(ui.plate, "h-[64vw] max-h-[30rem] md:h-[36rem] lg:h-[40rem] lg:max-h-none")}>
                  <div className="h-full transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none">
                    <CmsImageMedia image={featured.image} aspect="auto" className="h-full" sizes="(min-width: 1440px) 56vw, 100vw" priority />
                  </div>
                </div>
              </Reveal>
              <div className="lg:col-span-5 lg:self-end">
                <p className={cn(ui.mono, "text-[var(--color-accent)]")}>{pad(1)}</p>
                <h2 className={cn(ui.h3, "mt-4 text-balance transition-colors group-hover:text-[var(--color-accent)]")}>
                  {featured.title}
                </h2>
                <p className={cn(ui.mono, "mt-3 text-[var(--color-text-muted)]")}>{postMeta(featured)}</p>
                {featured.excerpt ? <p className={cn(ui.lead, "mt-8 max-w-xl")}>{featured.excerpt}</p> : null}
                <span className={cn(ui.link, "mt-8")}>
                  Read the post <span aria-hidden>→</span>
                </span>
              </div>
            </div>
          </a>
        </section>
      ) : null}

      {archive.length ? (
        <section className="bg-[var(--color-surface-muted)]" aria-labelledby="archive-heading">
          <div className="vertex-container py-24 md:py-32">
            <div className="flex items-end justify-between gap-6">
              <h2 id="archive-heading" className={ui.h3}>
                More posts
              </h2>
              <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>
                {archive.length} {archive.length === 1 ? "post" : "posts"}
              </p>
            </div>
            <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {archive.map((post, i) => (
                <Reveal as="li" key={post.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <a href={previewHref(props.mode, `/blog/${post.slug}`)} className="group block">
                    <div className={cn(ui.plate, "h-[64vw] max-h-[20rem] sm:h-[18rem]")}>
                      <div className="h-full transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none">
                        <CmsImageMedia image={post.image} aspect="auto" className="h-full" sizes="(min-width: 1024px) 33vw, 100vw" />
                      </div>
                    </div>
                    <div className="mt-5 flex items-baseline justify-between gap-4">
                      <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{postMeta(post)}</p>
                      <span className={cn(ui.mono, "shrink-0 text-[var(--color-accent)]")}>{pad(i + 2)}</span>
                    </div>
                    <h3 className="mt-3 text-balance font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
                      {post.title}
                    </h3>
                    {post.excerpt ? <p className={cn(ui.small, "mt-4")}>{post.excerpt}</p> : null}
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {perspective ? (
        <section className="bg-[var(--color-surface)]" aria-labelledby="blog-perspective">
          <div className="vertex-container grid gap-10 py-24 md:py-32 lg:grid-cols-12">
            <p id="blog-perspective" className={cn(ui.eyebrow, "lg:col-span-3")}>
              How we work
            </p>
            <Reveal className="lg:col-span-9">
              <p className="max-w-4xl text-balance font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.2vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--color-text)]">
                {perspective}
              </p>
            </Reveal>
          </div>
        </section>
      ) : null}

      <CtaBand
        mode={props.mode}
        title="Talk to the people who wrote this."
        body={company?.name ? `Start a project conversation with ${company.name}.` : undefined}
        secondary={{ label: "About the company", href: "/about" }}
      />
    </CorporatePageFrame>
  );
}
