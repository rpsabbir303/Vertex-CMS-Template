import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type MarqueeProps = {
  items: string[];
  className?: string;
  tone?: "light" | "dark";
};

/** Continuous spec strip. Items are duplicated once so the loop is seamless. */
export function Marquee({ items, className, tone = "light" }: MarqueeProps) {
  const clean = items.map((item) => item.trim()).filter(Boolean);
  if (!clean.length) return null;
  const loop = [...clean, ...clean];

  return (
    <div className={cn("cc-marquee", className)} aria-hidden>
      <div className="cc-marquee-track">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={cn(
              ui.mono,
              "flex items-center gap-8 pr-8",
              tone === "dark" ? "text-white/60" : "text-[var(--color-text-muted)]",
            )}
          >
            {item}
            <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />
          </span>
        ))}
      </div>
    </div>
  );
}
