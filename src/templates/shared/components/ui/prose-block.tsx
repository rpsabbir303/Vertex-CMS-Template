import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type ProseBlockProps = {
  children: ReactNode;
  className?: string;
};

/** Long-content-safe text block — no clipping, no fixed heights */
export function ProseBlock({ children, className }: ProseBlockProps) {
  return (
    <div
      className={cn(
        "max-w-prose text-[var(--color-text-muted)] leading-relaxed break-words",
        className,
      )}
    >
      {children}
    </div>
  );
}
