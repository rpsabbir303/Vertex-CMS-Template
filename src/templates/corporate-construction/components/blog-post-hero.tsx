import type { TemplateRenderMode } from "@/registry/template-types";
import { ArchitecturalGrid } from "@/templates/corporate-construction/components/ui/architectural-grid";
import { blogHeroTitleLines } from "@/templates/corporate-construction/utils/blog-article";
import { formatPostDateListing } from "@/templates/corporate-construction/utils/format-date";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type BlogPostHeroProps = {
  mode: TemplateRenderMode;
  title: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  author?: string;
  readingTime?: string;
  indexLabel: string;
};

export function BlogPostHero({
  mode,
  title,
  excerpt,
  category,
  publishedAt,
  author,
  readingTime,
  indexLabel,
}: BlogPostHeroProps) {
  const lines = blogHeroTitleLines(title);
  const blogHref = previewHref(mode, "/blog");
  const date = formatPostDateListing(publishedAt);

  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)]">
      <ArchitecturalGrid className="absolute inset-x-0 top-0 h-[36rem]" />
      <div className="vertex-container relative pt-36 pb-6 md:pt-44 md:pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className={cn(ui.mono, "flex flex-wrap items-center gap-x-4 gap-y-2 text-[var(--color-text-muted)]")}>
            <a href={blogHref} className="transition-colors hover:text-[var(--color-text)]">
              Blog
            </a>
            <span aria-hidden>/</span>
            <span className="text-[var(--color-accent)]">{indexLabel}</span>
          </p>
          <a href={blogHref} className={cn(ui.link, "text-sm")}>
            ← Back to all insights
          </a>
        </div>

        {category ? <p className={cn(ui.mono, "mt-8 text-[var(--color-accent)]")}>{category}</p> : null}

        <h1 className="mt-4 max-w-[16ch] font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-[var(--color-text)] text-balance">
          {lines.primary}
          {lines.secondary ? (
            <>
              <br />
              {lines.secondary}
            </>
          ) : null}
        </h1>

        {excerpt ? <p className={cn(ui.lead, "mt-8 max-w-2xl text-pretty")}>{excerpt}</p> : null}

        <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--color-border)] pt-6">
          {category ? (
            <div>
              <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>Category</dt>
              <dd className="mt-1 text-sm font-medium">{category}</dd>
            </div>
          ) : null}
          {date ? (
            <div>
              <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>Published</dt>
              <dd className="mt-1 text-sm font-medium">{date}</dd>
            </div>
          ) : null}
          {author ? (
            <div>
              <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>Author</dt>
              <dd className="mt-1 text-sm font-medium">{author}</dd>
            </div>
          ) : null}
          {readingTime ? (
            <div>
              <dt className={cn(ui.mono, "text-[var(--color-text-muted)]")}>Reading time</dt>
              <dd className="mt-1 text-sm font-medium">{readingTime}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </section>
  );
}
