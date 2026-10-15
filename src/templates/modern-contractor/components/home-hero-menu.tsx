"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

type HeroNavItem = {
  href: string;
  label: string;
};

/** Orange MENU control from the split hero. Opens the real site links. */
export function HomeHeroMenu({ items }: { items: HeroNavItem[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div>
      <button
        type="button"
        className="inline-flex min-h-9 items-center gap-3 bg-[#E7553D] px-3 text-[0.62rem] font-semibold tracking-[0.16em] text-white uppercase"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(true)}
      >
        Menu
        <span aria-hidden className="flex flex-col gap-[5px]">
          <span className="block h-px w-4 bg-white" />
          <span className="block h-px w-4 bg-white" />
        </span>
      </button>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-50 bg-black/50"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <nav
        id={panelId}
        aria-label="Primary"
        aria-hidden={!open}
        className={
          open
            ? "fixed inset-y-0 right-0 z-[60] flex w-[min(100%,20rem)] flex-col bg-[#111] text-white"
            : "fixed inset-y-0 right-0 z-[60] hidden"
        }
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <span className="text-[0.68rem] font-semibold tracking-[0.16em] uppercase">Menu</span>
          <button type="button" className="min-h-11 px-2 text-sm" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <ul className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block px-3 py-3 text-sm font-semibold tracking-[0.12em] uppercase hover:text-[#E7553D]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
