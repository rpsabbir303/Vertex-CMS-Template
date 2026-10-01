import { ArchitecturalGrid } from "@/templates/corporate-construction/components/ui/architectural-grid";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type BlogHeroProps = {
  lead?: string;
  postCount?: number;
};

export function BlogHero({ lead, postCount }: BlogHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-surface)]">
      <ArchitecturalGrid className="absolute inset-x-0 top-0 h-[32rem]" />
      <div className="vertex-container relative pt-36 pb-16 md:pt-44 md:pb-20">
        <p className={cn(ui.eyebrow, "cc-rise")}>Insights / Journal</p>
        <h1 className={cn(ui.h1, "cc-rise mt-6 max-w-[14ch] text-balance")} data-delay="1">
          Ideas, experience, and insight from the field.
        </h1>
        <div className="cc-rise mt-10 grid gap-8 md:grid-cols-12 md:items-end" data-delay="2">
          <p className={cn(ui.lead, "max-w-xl text-pretty md:col-span-8")}>
            {lead ??
              "Perspectives on construction, project delivery, coordination, and the work behind complex commercial projects."}
          </p>
          {typeof postCount === "number" && postCount > 0 ? (
            <p className={cn(ui.mono, "text-[var(--color-text-muted)] md:col-span-4 md:text-right")}>
              {postCount} published {postCount === 1 ? "article" : "articles"}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
