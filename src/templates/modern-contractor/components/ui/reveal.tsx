"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  delay?: 0 | 1 | 2 | 3;
};

export function Reveal({ children, className, as: Tag = "div", delay = 0 }: RevealProps) {
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );
    io.observe(el);
    const fallback = window.setTimeout(() => el.classList.add("is-in"), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag ref={ref} className={cn("mc-reveal", className)} data-delay={delay || undefined}>
      {children}
    </Tag>
  );
}
