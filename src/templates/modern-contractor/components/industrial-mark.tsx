import { cn } from "@/utils/cn";

type IndustrialMarkProps = {
  letter: string;
  className?: string;
  color?: string;
};

/** Outlined geometric initial. Matches the industrial home mark, not a boxed logo. */
export function IndustrialMark({ letter, className, color = "#E7553D" }: IndustrialMarkProps) {
  const initial = letter.trim().slice(0, 1).toUpperCase() || "A";

  if (initial !== "A") {
    return (
      <span
        className={cn(
          "mc-display inline-flex items-center justify-center leading-none text-transparent",
          className,
        )}
        style={{ WebkitTextStroke: `3px ${color}` }}
        aria-hidden
      >
        {initial}
      </span>
    );
  }

  return (
    <svg viewBox="0 0 80 80" className={className} style={{ color }} fill="none" aria-hidden>
      <path d="M8 74L40 6L72 74" stroke="currentColor" strokeWidth="8" strokeLinejoin="miter" />
      <path d="M23 49H57" stroke="currentColor" strokeWidth="8" />
    </svg>
  );
}
