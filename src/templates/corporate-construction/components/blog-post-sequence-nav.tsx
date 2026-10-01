import type { TemplateRenderMode } from "@/registry/template-types";
import type { BlogPost } from "@/templates/shared/cms/types/blog";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type BlogPostSequenceNavProps = {
  mode: TemplateRenderMode;
  previous?: BlogPost;
  next?: BlogPost;
};

function NavCard({ post, direction, mode }: { post: BlogPost; direction: "previous" | "next"; mode: TemplateRenderMode }) {
  const href = previewHref(mode, `/blog/${post.slug}`);
  const label = direction === "previous" ? "Previous article" : "Next article";
  const arrow = direction === "previous" ? "←" : "→";

  return (
    <a
      href={href}
      className="group grid gap-4 border-t border-[var(--color-border)] pt-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)] sm:grid-cols-[1fr_auto]"
    >
      <div className={direction === "next" ? "sm:order-2 sm:text-right" : ""}>
        <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>
          {arrow} {label}
        </p>
        {post.category ? <p className={cn(ui.mono, "mt-2 text-[var(--color-accent)]")}>{post.category}</p> : null}
        <p className="mt-2 font-[family-name:var(--font-display)] text-lg font-semibold tracking-[-0.02em] text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
          {post.title}
        </p>
      </div>
      {post.image?.url ? (
        <div className={cn(ui.plate, "h-24 w-full overflow-hidden sm:h-28 sm:w-36", direction === "next" ? "sm:order-1" : "")}>
          <CmsImageMedia image={post.image} aspect="auto" className="h-full w-full object-cover" sizes="9rem" />
        </div>
      ) : null}
    </a>
  );
}

export function BlogPostSequenceNav({ mode, previous, next }: BlogPostSequenceNavProps) {
  if (!previous && !next) return null;

  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)]" aria-label="Article sequence">
      <div className="vertex-container grid gap-10 py-16 md:grid-cols-2 md:gap-12 md:py-20">
        {previous ? <NavCard post={previous} direction="previous" mode={mode} /> : <div className="hidden md:block" aria-hidden />}
        {next ? <NavCard post={next} direction="next" mode={mode} /> : null}
      </div>
    </section>
  );
}
