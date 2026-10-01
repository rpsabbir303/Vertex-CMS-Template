import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type BlogPostTagsProps = {
  tags: string[];
};

export function BlogPostTags({ tags }: BlogPostTagsProps) {
  const items = tags.filter(Boolean);
  if (!items.length) return null;

  return (
    <div className="vertex-container py-10">
      <div className="mx-auto max-w-[760px] xl:mx-0 xl:max-w-none xl:pl-[calc(16.666%+2.5rem)]">
      <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>Topics</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((tag) => (
          <li key={tag}>
            <span className="inline-flex rounded-full border border-[var(--color-border)] px-4 py-1.5 text-xs font-semibold text-[var(--color-text-muted)]">
              {tag}
            </span>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
