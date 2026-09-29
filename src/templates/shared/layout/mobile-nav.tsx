"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import type { SiteNavigationItem } from "@/templates/shared/cms/types/pages";
import { cn } from "@/utils/cn";

type MobileNavProps = {
  items: SiteNavigationItem[];
  currentPath?: string;
  ctaHref?: string;
  ctaLabel?: string;
  className?: string;
  panelClassName?: string;
};

export function MobileNav({
  items,
  currentPath,
  ctaHref,
  ctaLabel,
  className,
  panelClassName,
}: MobileNavProps) {
  const isActive = (href: string) =>
    href === currentPath ||
    Boolean(currentPath && currentPath.startsWith(href) && href !== "/");
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const labelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [currentPath]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={cn("lg:hidden", className)}>
      <button
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded border border-[var(--color-border)] px-3 text-sm font-medium text-[var(--color-text)]"
        aria-expanded={open}
        aria-controls={panelId}
        aria-labelledby={labelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span id={labelId} className="sr-only">
          {open ? "Close menu" : "Open menu"}
        </span>
        <span aria-hidden className="flex flex-col gap-1.5">
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 bg-[var(--color-primary)]/40"
          aria-hidden
          onClick={() => setOpen(false)}
        />
      ) : null}

      <nav
        id={panelId}
        aria-label="Mobile"
        aria-hidden={!open}
        className={cn(
          "fixed inset-y-0 right-0 z-[60] flex w-[min(100%,20rem)] flex-col bg-[var(--color-surface)] shadow-xl transition-transform duration-[var(--duration-normal)] ease-[var(--ease-standard)] motion-reduce:transition-none",
          open ? "translate-x-0" : "translate-x-full pointer-events-none invisible",
          panelClassName,
        )}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border)] px-5 py-4">
          <span className="text-sm font-semibold text-[var(--color-text)]">Menu</span>
          <button
            type="button"
            className="min-h-11 min-w-11 text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
        <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block rounded px-3 py-3 text-base font-medium",
                  isActive(item.href)
                    ? "bg-[var(--color-surface-muted)] text-[var(--color-primary)]"
                    : "text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]",
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
              {item.children?.length ? (
                <ul className="ml-3 border-l border-[var(--color-border)] pl-3">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        {ctaHref && ctaLabel ? (
          <div className="border-t border-[var(--color-border)] p-4">
            <Link
              href={ctaHref}
              className="flex min-h-11 items-center justify-center rounded bg-[var(--color-accent)] px-4 text-sm font-medium text-[var(--color-text-inverse)]"
            >
              {ctaLabel}
            </Link>
          </div>
        ) : null}
      </nav>
    </div>
  );
}
