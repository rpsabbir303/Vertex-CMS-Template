import type { BlogPostAuthor } from "@/templates/shared/cms/types/blog";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type BlogPostAuthorSectionProps = {
  author: BlogPostAuthor;
};

export function BlogPostAuthorSection({ author }: BlogPostAuthorSectionProps) {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]" aria-labelledby="post-author-heading">
      <div className="vertex-container py-16 md:py-20">
        <div className="mx-auto max-w-[760px] xl:mx-0 xl:max-w-none xl:pl-[calc(16.666%+2.5rem)]">
        <p id="post-author-heading" className={ui.eyebrow}>
          About the author
        </p>
        <div className="mt-6 flex gap-5">
          {author.image?.url ? (
            <div className={cn(ui.plateSm, "h-16 w-16 shrink-0 overflow-hidden rounded-full")}>
              <CmsImageMedia image={author.image} aspect="square" className="h-full w-full object-cover" sizes="4rem" />
            </div>
          ) : null}
          <div className="min-w-0">
            <p className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-[var(--color-text)]">
              {author.name}
            </p>
            {author.role ? <p className={cn(ui.mono, "mt-1 text-[var(--color-text-muted)]")}>{author.role}</p> : null}
            {author.bio ? <p className={cn(ui.body, "mt-4 text-base leading-relaxed")}>{author.bio}</p> : null}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
