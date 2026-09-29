import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-[var(--color-accent)] text-[var(--color-text-inverse)] hover:bg-[var(--color-accent-hover)]",
  secondary:
    "bg-[var(--color-secondary)] text-[var(--color-text-inverse)] hover:bg-[var(--color-secondary-hover)]",
  outline:
    "border border-[var(--color-border)] bg-transparent text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]",
  ghost:
    "min-h-0 px-0 text-[var(--color-secondary)] underline-offset-4 hover:underline",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
        variant !== "ghost" && "no-underline",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
