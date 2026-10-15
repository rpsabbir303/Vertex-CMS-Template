import type { BlogArticleBlock } from "@/templates/shared/cms/types/blog";

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";

type ModernBlogArticleProps = {
  sections: BlogArticleBlock[];
  /** Promote the opening paragraph when the article has no heading yet. */
  promoteLead?: boolean;
};

export function ModernBlogArticle({ sections, promoteLead = false }: ModernBlogArticleProps) {
  if (!sections.length) return null;

  let chapter = 0;
  let leadUsed = false;

  return (
    <div className="space-y-7">
      {sections.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === "heading") {
          const id = block.id ?? `section-${index}`;
          if (block.level === 3) {
            return (
              <h3 key={key} id={id} className={`${display} scroll-mt-28 pt-2 text-[1.35rem] leading-snug font-semibold tracking-[-0.03em]`}>
                {block.title}
              </h3>
            );
          }
          chapter += 1;
          return (
            <h2 key={key} id={id} className={`${display} scroll-mt-28 border-t border-black/15 pt-8 text-[clamp(1.7rem,2.4vw,2.3rem)] leading-[1.32] font-semibold tracking-[-0.04em] first:border-t-0 first:pt-0`}>
              <span className="mr-3 text-[0.85rem] tracking-[0.12em] text-[#667067]">{String(chapter).padStart(2, "0")}</span>
              {block.title}
            </h2>
          );
        }

        if (block.type === "paragraph") {
          const lead = promoteLead && !leadUsed && chapter === 0;
          if (lead) leadUsed = true;
          return (
            <p key={key} className={lead ? `${display} text-[1.45rem] leading-[1.45] font-medium tracking-[-0.03em]` : "text-[17px] leading-[1.75] text-[#3e4438]"}>
              {block.body}
            </p>
          );
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";
          return (
            <ListTag
              key={key}
              className={
                block.ordered
                  ? "max-w-[42rem] list-decimal space-y-3 pl-6 text-[17px] leading-relaxed text-[#3e4438]"
                  : "max-w-[42rem] space-y-3 text-[17px] leading-relaxed text-[#3e4438]"
              }
            >
              {block.items.map((item, itemIndex) => (
                <li key={`${itemIndex}-${item.slice(0, 24)}`} className={block.ordered ? undefined : "flex gap-3"}>
                  {block.ordered ? null : <span className="mt-[0.55rem] h-px w-4 shrink-0 bg-[#0a0c0b]" aria-hidden />}
                  <span>{item}</span>
                </li>
              ))}
            </ListTag>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote key={key} className="max-w-[42rem] border-l-2 border-[#C8FF2E] py-1 pl-6">
              <p className={`${display} text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.32] font-semibold tracking-[-0.035em]`}>
                {block.text}
              </p>
              {block.attribution ? (
                <footer className="mt-4 text-[12px] font-extrabold tracking-[0.14em] text-[#667067] uppercase">{block.attribution}</footer>
              ) : null}
            </blockquote>
          );
        }

        if (block.type === "highlight") {
          return (
            <p
              key={key}
              className={`${display} max-w-[42rem] border-y border-black/15 py-6 text-[1.35rem] leading-snug font-medium tracking-[-0.03em] whitespace-pre-line`}
            >
              {block.body}
            </p>
          );
        }

        if (block.type === "callout") {
          return (
            <aside key={key} className="max-w-[42rem] rounded-tl-[22px] rounded-tr-[22px] rounded-br-[56px] border border-black/10 bg-white/50 p-7">
              {block.title ? (
                <p className="text-[12px] font-extrabold tracking-[0.16em] uppercase">{block.title}</p>
              ) : null}
              <p className="mt-3 text-[17px] leading-relaxed">{block.body}</p>
            </aside>
          );
        }

        if (block.type === "image" && block.image?.url) {
          return (
            <figure key={key} className="max-w-[42rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={block.image.url} alt={block.image.alt || ""} className="aspect-[16/10] w-full rounded-tl-[22px] rounded-tr-[22px] rounded-br-[64px] object-cover" />
              {block.caption || block.credit ? (
                <figcaption className="mt-3 text-[13px] leading-relaxed text-[#667067]">
                  {block.caption}
                  {block.credit ? <span className="mt-1 block tracking-[0.08em] uppercase">{block.credit}</span> : null}
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
