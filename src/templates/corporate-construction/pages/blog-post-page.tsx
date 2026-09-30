import type { TemplatePageProps } from "@/registry/template-types";
import { getSortedCollectionItems } from "@/templates/shared/cms/resolve-content";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { ArchitecturalGrid } from "@/templates/corporate-construction/components/ui/architectural-grid";
import { CtaBand } from "@/templates/corporate-construction/components/ui/cta-band";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { formatPostDate } from "@/templates/corporate-construction/utils/format-date";
import { splitParagraphs } from "@/templates/corporate-construction/utils/page-seo";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

export function CorporateConstructionBlogPostPage(props: TemplatePageProps) {
  const posts = props.payload.blog ? getSortedCollectionItems(props.payload.blog) : [];
  const index = posts.findIndex((item) => item.slug === props.entitySlug);
  const post = index >= 0 ? posts[index] : undefined;

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

  const next = posts[(index + 1) % posts.length];
  const hasNext = posts.length > 1 && next && next.id !== post.id;
  const nextHref = hasNext ? previewHref(props.mode, `/blog/${next.slug}`) : undefined;

  const facts = [
    ["Category", post.category],
    ["Published", formatPostDate(post.publishedAt)],
    ["Author", post.author],
  ].filter((f): f is [string, string] => Boolean(f[1]));

  const body = splitParagraphs(post.body);

  return (
    <CorporatePageFrame {...props}>
      <section className="relative overflow-hidden bg-[var(--color-surface)]">
        <ArchitecturalGrid className="absolute inset-x-0 top-0 h-[36rem]" />
        <div className="vertex-container relative pt-36 md:pt-44">
          <p className={cn(ui.mono, "cc-rise flex flex-wrap items-center gap-x-4 gap-y-2 text-[var(--color-text-muted)]")}>
            <a href={previewHref(props.mode, "/blog")} className="hover:text-[var(--color-text)]">
              Blog
            </a>
            <span aria-hidden>/</span>
            <span className="text-[var(--color-accent)]">
              {pad(index + 1)} / {pad(posts.length)}
            </span>
          </p>
          <h1 className={cn(ui.h2, "cc-rise mt-6 max-w-[18ch] text-balance")} data-delay="1">
            {post.title}
          </h1>
          <div className="cc-rise mt-10 grid gap-8 md:grid-cols-12" data-delay="2">
            {post.excerpt ? <p className={cn(ui.lead, "max-w-xl md:col-span-7")}>{post.excerpt}</p> : null}
            {facts.length ? (
              <dl className={cn("grid grid-cols-2 gap-x-6 gap-y-5 md:col-span-5 md:grid-cols-3", !post.excerpt && "md:col-span-12 md:grid-cols-6")}>
                {facts.map(([label, value]) => (
                  <div key={label} className={cn("border-t pt-3", ui.rule)}>
                    <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{label}</dt>
                    <dd className="mt-1.5 text-sm font-medium text-[var(--color-text)]">{value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>

        {post.image?.url ? (
          <div className="vertex-container mt-14 pb-4 md:mt-20">
            <Reveal plate className={cn(ui.plate, "h-[56vh] min-h-[16rem] max-h-[44rem]")}>
              <CmsImageMedia image={post.image} aspect="auto" className="h-full" sizes="100vw" priority />
            </Reveal>
          </div>
        ) : null}
      </section>

      {body.length ? (
        <section className="bg-[var(--color-surface)]" aria-labelledby="post-body-heading">
          <div className="vertex-container grid gap-10 py-24 md:py-32 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p id="post-body-heading" className={ui.eyebrow}>
                The post
              </p>
            </div>
            <Reveal className="lg:col-span-7">
              <p className="max-w-3xl text-balance font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.6vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-[var(--color-text)]">
                {body[0]}
              </p>
              {body.length > 1 ? (
                <div className="mt-8 max-w-2xl space-y-5">
                  {body.slice(1).map((p) => (
                    <p key={p.slice(0, 32)} className={cn(ui.body, "text-lg")}>
                      {p}
                    </p>
                  ))}
                </div>
              ) : null}
            </Reveal>
          </div>
        </section>
      ) : null}

      {hasNext && nextHref ? (
        <section className="bg-[var(--color-surface-muted)]" aria-label="Next post">
          <a href={nextHref} className="group block">
            <div className="vertex-container grid gap-8 py-20 md:grid-cols-12 md:items-center md:py-28">
              <div className="md:col-span-7">
                <p className={ui.eyebrow}>Next post</p>
                <p className={cn(ui.h3, "mt-5 max-w-[22ch] text-balance transition-colors group-hover:text-[var(--color-accent)]")}>
                  {next.title}
                </p>
                <p className={cn(ui.mono, "mt-6 text-[var(--color-text-muted)]")}>
                  {[next.category, formatPostDate(next.publishedAt), next.author].filter(Boolean).join(" · ")}
                </p>
              </div>
              {next.image?.url ? (
                <div className={cn(ui.plate, "h-56 md:col-span-5 md:h-72")}>
                  <div className="h-full transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none">
                    <CmsImageMedia image={next.image} aspect="auto" className="h-full" sizes="(min-width: 1024px) 40vw, 100vw" />
                  </div>
                </div>
              ) : null}
            </div>
          </a>
        </section>
      ) : null}

      <CtaBand
        mode={props.mode}
        title="Have a project like this?"
        body="Bring the site and the schedule. We will bring the plan."
        secondary={{ label: "All posts", href: "/blog" }}
      />
    </CorporatePageFrame>
  );
}
