"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/templates/shared/cms/types/testimonials";
import { attribution } from "@/templates/corporate-construction/utils/testimonial-attribution";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type PerspectiveShowcaseProps = {
  testimonials: Testimonial[];
};

const QUOTE_MS = 7000;

/**
 * Client perspective — rotating display quote with an index rail, and a slow
 * vertical ticker of every quote alongside it. Hover/focus pauses; reduced-motion stops.
 */
export function PerspectiveShowcase({ testimonials }: PerspectiveShowcaseProps) {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const count = testimonials.length;
  const current = testimonials[active] ?? testimonials[0];
  const playing = count > 1 && inView && !hovering && !reducedMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((i) => (i + 1) % count), QUOTE_MS);
    return () => window.clearTimeout(timer);
  }, [playing, active, count]);

  if (!current) return null;

  const tickerItems = count > 1 ? [...testimonials, ...testimonials] : testimonials;

  return (
    <div
      ref={rootRef}
      className={cn("grid gap-12 lg:grid-cols-12 lg:gap-16", !playing && "is-paused")}
      style={{ ["--cc-slide-ms" as string]: `${QUOTE_MS}ms` }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovering(false);
      }}
    >
      <div className="lg:col-span-7">
        <blockquote key={current.id} className="cc-fade">
          <p className="max-w-3xl text-balance font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.4vw,3.5rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-[var(--color-text)]">
            <span className="text-[var(--color-accent)]">“</span>
            {current.quote.trim()}
            <span className="text-[var(--color-accent)]">”</span>
          </p>
          <footer className={cn(ui.mono, "mt-8 text-[var(--color-text-muted)]")}>{attribution(current)}</footer>
        </blockquote>

        {count > 1 ? (
          <ul className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-4" role="tablist" aria-label="Client perspectives">
            {testimonials.map((t, index) => {
              const isActive = index === active;
              return (
                <li key={t.id} className="min-w-0">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Show perspective ${index + 1}`}
                    onClick={() => setActive(index)}
                    className="group block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]"
                  >
                    <span className="block h-px w-full overflow-hidden bg-[var(--color-primary)]/12" aria-hidden>
                      <span
                        key={isActive ? `${t.id}-run` : `${t.id}-idle`}
                        className={cn("block h-full bg-[var(--color-accent)]", isActive ? "cc-progress" : "scale-x-0")}
                      />
                    </span>
                    <span className={cn(ui.mono, "mt-3 block", isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]")}>
                      {pad(index + 1)}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block truncate text-sm font-semibold transition-colors motion-reduce:transition-none",
                        isActive ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text)]",
                      )}
                    >
                      {t.companyName || t.personName}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="hidden lg:col-span-5 lg:block" aria-hidden>
          <div className="cc-ticker h-[34rem]">
            <ul className="cc-ticker-track space-y-4">
              {tickerItems.map((t, index) => (
                <li
                  key={`${t.id}-${index}`}
                  className={cn(
                    "rounded-[1rem] border p-6 transition-colors motion-reduce:transition-none",
                    ui.rule,
                    testimonials[active]?.id === t.id ? "bg-[var(--color-surface-muted)]" : "bg-[var(--color-surface)]",
                  )}
                >
                  <p className={cn(ui.small, "text-pretty text-[var(--color-text)]")}>“{t.quote.trim()}”</p>
                  <p className={cn(ui.mono, "mt-4 text-[var(--color-text-muted)]")}>{attribution(t)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
