"use client";

import { useEffect, useState } from "react";
import type { LegalSection } from "@/templates/shared/cms/types/pages";
import { cn } from "@/utils/cn";

type LegalTableOfContentsProps = {
  sections: LegalSection[];
  /** Compact select-style control for small screens */
  variant?: "sidebar" | "mobile";
};

export function LegalTableOfContents({
  sections,
  variant = "sidebar",
}: LegalTableOfContentsProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    if (!sections.length || typeof IntersectionObserver === "undefined") {
      return;
    }

    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.35, 0.6],
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  if (!sections.length) {
    return null;
  }

  if (variant === "mobile") {
    return (
      <nav aria-label="On this page" className="border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-4">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
          On this page
        </p>
        <ul className="mt-3 space-y-1">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="inline-flex min-h-10 max-w-full items-center gap-3 text-sm text-[var(--color-text)] no-underline hover:text-[var(--color-primary)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
              >
                <span className="w-6 shrink-0 tabular-nums text-xs text-[var(--color-accent)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 break-words">{section.heading}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="On this page" className="sticky top-28">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
        On this page
      </p>
      <ul className="mt-4 space-y-0 border-l border-[var(--color-border)]">
        {sections.map((section, index) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={cn(
                  "flex min-h-10 max-w-full items-start gap-3 border-l-2 py-2 pl-4 text-sm no-underline transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] motion-reduce:transition-none",
                  isActive
                    ? "-ml-px border-[var(--color-accent)] text-[var(--color-primary)]"
                    : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-primary)]",
                )}
                aria-current={isActive ? "location" : undefined}
              >
                <span
                  className={cn(
                    "mt-0.5 w-6 shrink-0 tabular-nums text-xs",
                    isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 break-words leading-snug">{section.heading}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
