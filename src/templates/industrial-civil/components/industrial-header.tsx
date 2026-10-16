"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "@/templates/industrial-civil/components/pill-link";

export type HeaderNavItem = { label: string; href: string; active: boolean };

export function IndustrialHeader({
  homeHref,
  companyName,
  logoUrl,
  nav,
  quoteHref,
}: {
  homeHref: string;
  companyName: string;
  logoUrl?: string;
  nav: HeaderNavItem[];
  quoteHref: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-[0_4px_24px_rgba(3,7,30,0.08)]" : "py-4"}`}>
      <div className="mx-auto max-w-[1320px] px-3">
        <div
          className={`flex items-center justify-between gap-4 bg-white transition-all duration-300 ${
            scrolled ? "min-h-[84px]" : "min-h-[84px] rounded-[50px] px-4 shadow-[0_8px_32px_rgba(3,7,30,0.08)] min-[480px]:px-6"
          }`}
        >
          <Link href={homeHref} className="flex min-w-0 items-center gap-2.5 text-[18px] font-bold tracking-tight text-[#FF6610] min-[480px]:text-[22px]">
            {logoUrl ? <img src={logoUrl} alt="" className="h-8 w-8 shrink-0" /> : null}
            <span className="leading-tight min-[640px]:whitespace-nowrap">{companyName}</span>
          </Link>
          <nav className="hidden items-center min-[1180px]:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={`px-4 text-[18px] font-medium transition-colors hover:text-[#FF6610] ${item.active ? "text-[#FF6610]" : "text-[#03071E]"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href={quoteHref}
              className="hidden items-center gap-3 rounded-[25px] bg-[#FF6610] py-2 pr-2 pl-4 text-[18px] font-bold text-white transition-colors hover:bg-[#03071E] min-[640px]:inline-flex"
            >
              Get A Free Quote
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#03071E]">
                <ArrowIcon />
              </span>
            </Link>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#FF6610] text-white min-[1180px]:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                {open ? <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
              </svg>
            </button>
          </div>
        </div>
        {open ? (
          <nav className="mt-2 rounded-[20px] bg-white p-4 shadow-[0_8px_32px_rgba(3,7,30,0.12)] min-[1180px]:hidden" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3 text-[17px] font-medium ${item.active ? "bg-[#FFF1E8] text-[#FF6610]" : "text-[#03071E]"}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href={quoteHref} onClick={() => setOpen(false)} className="mt-2 block rounded-[25px] bg-[#FF6610] px-4 py-3 text-center font-bold text-white">
              Get A Free Quote
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
