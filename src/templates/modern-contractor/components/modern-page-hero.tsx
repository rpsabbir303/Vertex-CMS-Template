import type { ReactNode } from "react";
import { ui } from "@/templates/modern-contractor/theme/ui";
import { cn } from "@/utils/cn";

type ModernPageHeroProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  meta?: string[];
  actions?: ReactNode;
  /** Kept for existing callers. Page openers use the same dark construction band. */
  dark?: boolean;
};

export function ModernPageHero({ eyebrow, title, lead, meta, actions }: ModernPageHeroProps) {
  return (
    <section className="bg-[#0a0c0b] pt-32 pb-16 text-white min-[960px]:pt-40 min-[960px]:pb-20">
      <div className="vertex-container grid gap-8 min-[960px]:grid-cols-12 min-[960px]:items-end">
        <div className="min-[960px]:col-span-8">
          {eyebrow ? (
            <p className="flex items-center gap-3 text-[12px] tracking-[0.2em] text-[#C8FF2E] uppercase">
              <span className="h-2.5 w-2.5 rounded-full bg-[#C8FF2E]" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className={cn(ui.h1, "mt-4 max-w-[14ch] text-balance !text-white")}>{title}</h1>
        </div>
        <div className="min-[960px]:col-span-4">
          {lead ? <p className="text-[16px] leading-relaxed text-white/75">{lead}</p> : null}
          {meta?.length ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {meta.map((item) => (
                <li key={item} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
          {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
