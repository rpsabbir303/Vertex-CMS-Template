import type { TemplateRenderMode } from "@/registry/template-types";
import type { BlogPost } from "@/templates/shared/cms/types/blog";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { formatReadingTime } from "@/templates/corporate-construction/utils/blog-content";
import { formatPostDateListing } from "@/templates/corporate-construction/utils/format-date";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type BlogPostRelatedProps = {
  mode: TemplateRenderMode;
  posts: BlogPost[];
};

export function BlogPostRelated({ mode, posts }: BlogPostRelatedProps) {
  if (!posts.length) return null;

  return (
    <section className="bg-[var(--color-surface-muted)]" aria-labelledby="keep-reading-heading">
      <div className="vertex-container py-24 md:py-32">
        <p className={ui.eyebrow}>Keep reading</p>
        <h2 id="keep-reading-heading" className={cn(ui.h3, "mt-5 max-w-[16ch]")}>
          Related insights
        </h2>
        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {posts.map((post) => {
            const href = previewHref(mode, `/blog/${post.slug}`);
            const meta = [formatPostDateListing(post.publishedAt), formatReadingTime(post)].filter(Boolean).join(" · ");
            return (
              <li key={post.id}>
                <a href={href} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]">
                  {post.image?.url ? (
                    <div className={cn(ui.plate, "aspect-[16/10] overflow-hidden")}>
                      <div className="h-full transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none">
                        <CmsImageMedia image={post.image} aspect="auto" className="h-full w-full object-cover" sizes="(min-width: 768px) 30vw, 100vw" />
                      </div>
                    </div>
                  ) : null}
                  {post.category ? <p className={cn(ui.mono, "mt-5 text-[var(--color-accent)]")}>{post.category}</p> : null}
                  <p className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
                    {post.title}
                  </p>
                  {meta ? <p className={cn(ui.mono, "mt-3 text-[var(--color-text-muted)]")}>{meta}</p> : null}
                  <span className={cn(ui.link, "mt-4 inline-flex text-sm")}>
                    Read <span aria-hidden>→</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
