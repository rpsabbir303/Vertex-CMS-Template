import type { BlogArticleBlock } from "@/templates/shared/cms/types/blog";

export function ArticleBlocks({ blocks }: { blocks: BlogArticleBlock[] }) {
  return (
    <div className="space-y-6 text-base leading-[28px] text-[#5c6570]">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const Tag = block.level === 3 ? "h3" : "h2";
          return (
            <Tag key={block.id ?? index} id={block.id} className="pt-2 text-[28px] leading-snug font-bold text-[#03071E]">
              {block.title}
            </Tag>
          );
        }
        if (block.type === "paragraph") {
          return <p key={index}>{block.body}</p>;
        }
        if (block.type === "highlight") {
          return (
            <p key={index} className="whitespace-pre-line rounded-[12px] bg-[#FFF1E8] p-6 font-semibold text-[#03071E]">
              {block.body}
            </p>
          );
        }
        if (block.type === "list") {
          const List = block.ordered ? "ol" : "ul";
          return (
            <List key={index} className={block.ordered ? "list-decimal space-y-2 pl-5" : "list-disc space-y-2 pl-5"}>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </List>
          );
        }
        if (block.type === "image") {
          return (
            <figure key={block.image.id ?? index}>
              <img src={block.image.url} alt={block.image.alt} className="w-full rounded-[12px] object-cover" />
              {block.caption ? <figcaption className="mt-3 text-sm text-[#5c6570]">{block.caption}</figcaption> : null}
              {block.credit ? <figcaption className="text-sm text-[#5c6570]">{block.credit}</figcaption> : null}
            </figure>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote key={index} className="rounded-[12px] bg-[#FFF1E8] px-6 py-5 text-[#03071E]">
              <p className="text-xl leading-snug font-bold">“{block.text}”</p>
              {block.attribution ? <footer className="mt-3 text-sm font-semibold text-[#FF6610]">{block.attribution}</footer> : null}
            </blockquote>
          );
        }
        return (
          <aside key={index} className="rounded-[12px] bg-[#F6F8FA] p-6">
            {block.title ? <p className="text-lg font-bold text-[#03071E]">{block.title}</p> : null}
            <p className={block.title ? "mt-2" : undefined}>{block.body}</p>
          </aside>
        );
      })}
    </div>
  );
}
