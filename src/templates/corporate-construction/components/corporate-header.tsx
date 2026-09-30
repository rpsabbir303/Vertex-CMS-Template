"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { CmsSitePayload } from "@/templates/shared/cms/types";
import type { Company } from "@/templates/shared/cms/types/company";
import type { Contact } from "@/templates/shared/cms/types/contact";
import { MobileNav } from "@/templates/shared/layout/mobile-nav";
import {
  isNavItemActive,
  resolvePublicNavigation,
} from "@/templates/shared/navigation/resolve-navigation";
import { cn } from "@/utils/cn";

type CorporateHeaderProps = {
  payload: CmsSitePayload;
  company: Company;
  contact: Contact | null;
  currentPath?: string;
  mode: TemplateRenderMode;
};

/**
 * Floating glass bar. Sits over every page; tightens after the first scroll.
 */
export function CorporateHeader({ payload, company, currentPath = "/", mode }: CorporateHeaderProps) {
  const navItems = resolvePublicNavigation(payload);
  const previewBase = mode === "preview" ? "/preview/corporate-construction" : "";
  const withPreview = (href: string) =>
    href === "/" && previewBase ? previewBase : `${previewBase}${href}`;
  const resolvedPath = currentPath === "/" && previewBase ? previewBase : currentPath;
  const isActive = (href: string) => {
    const target = withPreview(href);
    // Home must match only the index, not every nested preview route.
    if (href === "/") return resolvedPath === target;
    return isNavItemActive(target, resolvedPath);
  };

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-6 md:pt-5">
      <div
        className={cn(
          "mx-auto flex max-w-[var(--spacing-container-max)] items-center gap-4 rounded-full border px-3 py-2 transition-[background-color,border-color,box-shadow] duration-300 motion-reduce:transition-none md:px-4",
          scrolled
            ? "border-[var(--color-primary)]/10 bg-white/85 shadow-[0_8px_30px_-12px_rgba(10,18,32,0.25)] backdrop-blur-xl"
            : "border-transparent bg-white/60 backdrop-blur-md",
        )}
      >
        <Link
          href={withPreview("/")}
          className="flex min-w-0 items-center gap-2.5 pl-1"
          aria-label={`${company.name} home`}
        >
          {company.logo?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={company.logo.url}
              alt=""
              className="h-8 w-8 shrink-0 rounded-md object-contain"
              width={32}
              height={32}
            />
          ) : (
            <span className="h-8 w-8 shrink-0 rounded-md bg-[var(--color-primary)]" aria-hidden />
          )}
          <span className="hidden min-w-0 truncate font-[family-name:var(--font-display)] text-[0.9375rem] font-semibold tracking-[-0.02em] text-[var(--color-primary)] sm:block">
            {company.name}
          </span>
        </Link>

        <nav className="mx-auto hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={withPreview(item.href)}
              className={cn(
                "relative inline-flex min-h-10 items-center rounded-full px-3.5 text-[0.8125rem] font-medium transition-colors motion-reduce:transition-none",
                isActive(item.href)
                  ? "bg-[var(--color-primary)]/[0.06] text-[var(--color-primary)]"
                  : "text-[var(--color-text-muted)] hover:bg-[var(--color-primary)]/[0.05] hover:text-[var(--color-primary)]",
              )}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          <Link
            href={withPreview("/contact")}
            className="hidden min-h-10 items-center rounded-full bg-[var(--color-primary)] px-4 text-[0.8125rem] font-semibold text-white transition-colors hover:bg-[var(--color-accent)] sm:inline-flex"
          >
            Start a project
          </Link>
          <MobileNav
            items={navItems.map((item) => ({ ...item, href: withPreview(item.href) }))}
            currentPath={resolvedPath}
            ctaHref={withPreview("/contact")}
            ctaLabel="Start a project"
            buttonClassName="rounded-full border-[var(--color-primary)]/15"
          />
        </div>
      </div>
    </header>
  );
}
