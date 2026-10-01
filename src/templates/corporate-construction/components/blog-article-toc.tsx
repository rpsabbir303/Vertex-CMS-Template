"use client";

import { useState } from "react";
import type { ArticleTocItem } from "@/templates/corporate-construction/utils/blog-article";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type BlogArticleTocProps = {
  items: ArticleTocItem[];
  variant?: "sidebar" | "mobile";
};

export function BlogArticleToc({ items, variant = "sidebar" }: BlogArticleTocProps) {
  const [open, setOpen] = useState(false);

  if (!items.length) return null;

  if (variant === "mobile") {
    return (
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] lg:hidden">
        <button
          type="button"
          className="flex w-full items-center justify-between px-0 py-4 text-left text-sm font-semibold text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          In this article
          <span className={cn(ui.mono, "text-[var(--color-text-muted)]")}>{open ? "Hide" : "Show"}</span>
        </button>
        {open ? (
          <nav aria-label="In this article" className="pb-4">
            <ol className="space-y-2">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="flex gap-3 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
                    onClick={() => setOpen(false)}
                  >
                    <span className={cn(ui.mono, "text-[var(--color-accent)]")}>{pad(item.index)}</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
      </div>
    );
  }

  return (
    <nav aria-label="In this article" className="hidden lg:block">
      <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>In this article</p>
      <ol className="mt-5 space-y-4 border-l border-[var(--color-border)] pl-4">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="group flex gap-3 text-sm leading-snug text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              <span className={cn(ui.mono, "shrink-0 text-[var(--color-accent)]")}>{pad(item.index)}</span>
              <span className="text-pretty">{item.title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
