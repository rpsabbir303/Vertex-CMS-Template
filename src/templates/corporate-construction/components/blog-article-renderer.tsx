import type { BlogArticleBlock } from "@/templates/shared/cms/types/blog";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type BlogArticleRendererProps = {
  sections: BlogArticleBlock[];
};

export function BlogArticleRenderer({ sections }: BlogArticleRendererProps) {
  if (!sections.length) return null;

  return (
    <div className="article-body space-y-8 md:space-y-10">
      {sections.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "heading") {
          const Tag = block.level === 3 ? "h3" : "h2";
          const id = block.id ?? `section-${index}`;
          return (
            <Tag
              key={key}
              id={id}
              className={cn(
                "scroll-mt-32 text-balance text-[var(--color-text)]",
                block.level === 3
                  ? "font-[family-name:var(--font-display)] text-[clamp(1.25rem,2vw,1.625rem)] font-semibold tracking-[-0.02em]"
                  : cn(ui.h3, "mt-4 pt-6 first:mt-0 first:pt-0"),
              )}
            >
              {block.title}
            </Tag>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={key} className="text-pretty text-[1.0625rem] leading-[1.75] text-[var(--color-text-muted)] md:text-lg md:leading-[1.8]">
              {block.body}
            </p>
          );
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag
              key={key}
              className={cn(
                "space-y-3 pl-5 text-[1.0625rem] leading-relaxed text-[var(--color-text-muted)] md:text-lg",
                block.ordered ? "list-decimal" : "list-disc",
              )}
            >
              {block.items.map((item) => (
                <li key={item.slice(0, 32)}>{item}</li>
              ))}
            </ListTag>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={key}
              className="border-l-2 border-[var(--color-accent)] py-2 pl-6 font-[family-name:var(--font-display)] text-[clamp(1.375rem,2.4vw,2rem)] font-semibold leading-snug tracking-[-0.03em] text-[var(--color-text)]"
            >
              <p>&ldquo;{block.text}&rdquo;</p>
              {block.attribution ? (
                <footer className={cn(ui.mono, "mt-4 text-sm font-normal text-[var(--color-text-muted)]")}>{block.attribution}</footer>
              ) : null}
            </blockquote>
          );
        }

        if (block.type === "highlight") {
          return (
            <p
              key={key}
              className="whitespace-pre-line border-t border-b border-[var(--color-border)] py-8 font-[family-name:var(--font-display)] text-[clamp(1.125rem,2vw,1.5rem)] font-semibold leading-snug tracking-[-0.02em] text-[var(--color-text)]"
            >
              {block.body}
            </p>
          );
        }

        if (block.type === "callout") {
          return (
            <aside
              key={key}
              className="relative overflow-hidden rounded-[1rem] bg-[var(--color-primary)] px-6 py-8 text-white md:px-8 md:py-10"
              aria-label={block.title ?? "Callout"}
            >
              {block.title ? <p className={cn(ui.mono, "text-white/60")}>{block.title}</p> : null}
              <p className="mt-3 text-pretty text-base leading-relaxed text-white/90 md:text-lg">{block.body}</p>
            </aside>
          );
        }

        if (block.type === "image" && block.image?.url) {
          return (
            <figure key={key} className={cn(block.layout === "inline" ? "max-w-lg" : "w-full")}>
              <div className={cn(ui.plate, "overflow-hidden", block.layout === "full" ? "aspect-[16/10]" : "aspect-[4/3]")}>
                <CmsImageMedia
                  image={block.image}
                  aspect="auto"
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 680px, 100vw"
                />
              </div>
              {block.caption || block.credit ? (
                <figcaption className={cn(ui.mono, "mt-3 text-[var(--color-text-muted)]")}>
                  {[block.caption, block.credit].filter(Boolean).join(" · ")}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
}
