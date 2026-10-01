"use client";

import { cn } from "@/utils/cn";

type BlogCategoryNavProps = {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
};

export function BlogCategoryNav({ categories, active, onChange }: BlogCategoryNavProps) {
  if (categories.length <= 1) return null;

  return (
    <nav className="border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]" aria-label="Blog categories">
      <div className="vertex-container">
        <ul className="flex gap-2 overflow-x-auto py-4 [-ms-overflow-style:none] [scrollbar-width:none] md:gap-3 md:py-5 [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => {
            const isActive = category === active;
            return (
              <li key={category} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onChange(category)}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
                    isActive
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]",
                  )}
                  aria-pressed={isActive}
                >
                  {category}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
