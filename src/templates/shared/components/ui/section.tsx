import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type SectionProps = {
  id?: string;
  ariaLabelledBy?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  spacing?: "default" | "compact" | "large";
};

export function Section({
  id,
  ariaLabelledBy,
  children,
  className,
  containerClassName,
  spacing = "default",
}: SectionProps) {
  const spacingClass =
    spacing === "compact"
      ? "py-[calc(var(--spacing-section-y)*0.65)]"
      : spacing === "large"
        ? "py-[var(--spacing-section-y-lg)]"
        : "py-[var(--spacing-section-y)]";

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(spacingClass, className)}
    >
      <div className={cn("vertex-container", containerClassName)}>{children}</div>
    </section>
  );
}
