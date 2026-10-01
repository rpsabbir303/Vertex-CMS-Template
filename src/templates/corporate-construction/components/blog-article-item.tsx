import type { TemplateRenderMode } from "@/registry/template-types";
import type { BlogPost } from "@/templates/shared/cms/types/blog";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { formatReadingTime } from "@/templates/corporate-construction/utils/blog-content";
import { formatPostDateListing } from "@/templates/corporate-construction/utils/format-date";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type BlogArticleItemProps = {
  mode: TemplateRenderMode;
  post: BlogPost;
  variant?: "lead" | "standard" | "compact";
};

export function BlogArticleItem({ mode, post, variant = "standard" }: BlogArticleItemProps) {
  const href = previewHref(mode, `/blog/${post.slug}`);
  const date = formatPostDateListing(post.publishedAt);
  const reading = formatReadingTime(post);

  if (variant === "lead") {
    return (
      <article className="border-t border-[var(--color-border)] py-12 md:py-14">
        <a href={href} className="group grid gap-8 md:grid-cols-12 md:items-center md:gap-10">
          <div className={cn(ui.plate, "aspect-[16/10] overflow-hidden md:col-span-5")}>
            <div className="h-full transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none">
              <CmsImageMedia image={post.image} aspect="auto" className="h-full w-full object-cover" sizes="(min-width: 768px) 40vw, 100vw" />
            </div>
          </div>
          <div className="md:col-span-7">
            {post.category ? <p className={cn(ui.mono, "text-[var(--color-accent)]")}>{post.category}</p> : null}
            <h3 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em] text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
              {post.title}
            </h3>
            {post.excerpt ? <p className={cn(ui.body, "mt-4 max-w-xl text-lg")}>{post.excerpt}</p> : null}
            <p className={cn(ui.mono, "mt-6 text-[var(--color-text-muted)]")}>
              {[date, reading, post.author].filter(Boolean).join(" · ")}
            </p>
            <span className={cn(ui.link, "mt-4 inline-flex")}>
              Read <span className="transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden>→</span>
            </span>
          </div>
        </a>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="border-t border-[var(--color-border)] py-8">
        <a href={href} className="group flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
          <div className="min-w-0 flex-1">
            {post.category ? <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{post.category}</p> : null}
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
              {post.title}
            </h3>
            {post.excerpt ? <p className={cn(ui.small, "mt-2 line-clamp-2 max-w-prose")}>{post.excerpt}</p> : null}
          </div>
          <div className="shrink-0 sm:text-right">
            <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{[date, reading].filter(Boolean).join(" · ")}</p>
            <span className={cn(ui.link, "mt-2 inline-flex text-sm")} aria-hidden>
              →
            </span>
          </div>
        </a>
      </article>
    );
  }

  return (
    <article>
      <a href={href} className="group block">
        <div className={cn(ui.plate, "aspect-[16/10] overflow-hidden")}>
          <div className="h-full transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none">
            <CmsImageMedia image={post.image} aspect="auto" className="h-full w-full object-cover" sizes="(min-width: 1024px) 33vw, 50vw" />
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {post.category ? <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{post.category}</p> : null}
            <h3 className="mt-2 text-balance font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
              {post.title}
            </h3>
          </div>
        </div>
        {post.excerpt ? <p className={cn(ui.small, "mt-3 max-w-prose")}>{post.excerpt}</p> : null}
        <p className={cn(ui.mono, "mt-4 text-[var(--color-text-muted)]")}>
          {[date, reading, post.author].filter(Boolean).join(" · ")}
        </p>
      </a>
    </article>
  );
}
