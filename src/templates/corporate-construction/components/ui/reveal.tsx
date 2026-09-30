"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: 0 | 1 | 2 | 3;
  /** Use the image-plate settle instead of the text rise */
  plate?: boolean;
};

/** Adds `is-in` once the element enters the viewport. CSS handles the motion. */
export function Reveal({ children, className, as: Tag = "div", delay = 0, plate }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-in");
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 },
    );
    io.observe(el);
    // Safety net: never leave content hidden if the observer is throttled or never fires.
    const fallback = window.setTimeout(() => el.classList.add("is-in"), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(plate ? "cc-plate" : "cc-reveal", className)}
      data-delay={delay || undefined}
    >
      {children}
    </Tag>
  );
}
