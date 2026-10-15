"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { CmsSitePayload } from "@/templates/shared/cms/types";
import type { Company } from "@/templates/shared/cms/types/company";
import type { Contact } from "@/templates/shared/cms/types/contact";
import {
  isNavItemActive,
  resolvePublicNavigation,
} from "@/templates/shared/navigation/resolve-navigation";
import { MODERN_CONTRACTOR_SLUG } from "@/templates/modern-contractor/config/template-slug";

type ModernHeaderProps = {
  payload: CmsSitePayload;
  company: Company;
  contact: Contact | null;
  currentPath?: string;
  mode: TemplateRenderMode;
};

export function ModernHeader({ payload, company, currentPath = "/", mode }: ModernHeaderProps) {
  const navItems = resolvePublicNavigation(payload);
  const previewBase = mode === "preview" ? `/preview/${MODERN_CONTRACTOR_SLUG}` : "";
  const withPreview = (href: string) =>
    href === "/" && previewBase ? previewBase : `${previewBase}${href}`;
  const resolvedPath = currentPath === "/" && previewBase ? previewBase : currentPath;
  const isActive = (href: string) => {
    const target = withPreview(href);
    if (href === "/") return resolvedPath === target;
    return isNavItemActive(target, resolvedPath);
  };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-3 pt-3 min-[960px]:px-6 min-[960px]:pt-5">
        <div className="pointer-events-auto mx-auto flex h-[68px] max-w-[1360px] items-center gap-6 rounded-full bg-[#121413]/90 px-3 backdrop-blur-md min-[960px]:px-5">
          <Link href={withPreview("/")} className="flex min-w-0 items-center gap-3 text-white" aria-label={`${company.name} home`}>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#C8FF2E] text-[#0a0c0b]">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </span>
            <span className="truncate font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif] text-[15px] font-semibold tracking-[0.08em] uppercase">
              {company.name}
            </span>
          </Link>
          <nav className="ml-auto hidden items-center gap-5 min-[1180px]:flex" aria-label="Primary">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={withPreview(item.href)}
                  aria-current={active ? "page" : undefined}
                  className={active ? "text-[14px] text-[#C8FF2E]" : "text-[14px] text-white/80 hover:text-white"}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href={withPreview("/contact")}
            className="ml-auto hidden rounded-full bg-[#C8FF2E] px-4 py-2 text-[13px] font-semibold text-[#0a0c0b] min-[1180px]:ml-2 min-[1180px]:inline-flex"
          >
            Start a project
          </Link>
          <button
            type="button"
            className="ml-auto grid h-10 w-10 place-items-center rounded-full text-white min-[1180px]:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex w-5 flex-col gap-1.5" aria-hidden>
              <span className="h-0.5 w-5 bg-current" />
              <span className="h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </header>
      {open ? (
        <div className="fixed inset-0 z-30 bg-[#0a0c0b] px-6 pt-28 text-white min-[1180px]:hidden">
          <nav aria-label="Mobile">
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={withPreview(item.href)}
                    className="font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif] text-4xl font-semibold tracking-[-0.04em]"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href={withPreview("/contact")}
            className="mt-8 inline-flex rounded-full bg-[#C8FF2E] px-5 py-3 text-sm font-semibold text-[#0a0c0b]"
            onClick={() => setOpen(false)}
          >
            Start a project
          </Link>
        </div>
      ) : null}
    </>
  );
}
