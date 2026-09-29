import type { ElementType, ReactNode } from "react";
import { cn } from "@/utils/cn";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4";
  id?: string;
  children: ReactNode;
  className?: string;
  display?: boolean;
};

const sizeMap = {
  h1: "text-4xl md:text-5xl font-semibold tracking-tight leading-tight",
  h2: "text-3xl md:text-4xl font-semibold tracking-tight leading-tight",
  h3: "text-2xl font-semibold tracking-tight",
  h4: "text-xl font-semibold",
};

export function Heading({
  as: Tag = "h2",
  id,
  children,
  className,
  display = false,
}: HeadingProps) {
  const Component = Tag as ElementType;
  return (
    <Component
      id={id}
      className={cn(
        sizeMap[Tag],
        display && "font-[family-name:var(--font-display)]",
        "text-balance",
        className,
      )}
    >
      {children}
    </Component>
  );
}
