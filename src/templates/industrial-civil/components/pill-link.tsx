import type { ReactNode } from "react";
import Link from "next/link";

type PillVariant = "solid" | "outline" | "outline-light";

const variantClass: Record<PillVariant, string> = {
  solid: "bg-[#FF6610] text-white border border-[#FF6610] hover:bg-[#03071E] hover:border-[#03071E]",
  outline: "border border-[#FF6610] text-[#FF6610] hover:bg-[#FF6610] hover:text-white",
  "outline-light": "border border-white text-white hover:bg-white hover:text-[#03071E]",
};

const circleClass: Record<PillVariant, string> = {
  solid: "bg-white text-[#03071E]",
  outline: "bg-[#FF6610] text-white",
  "outline-light": "bg-white text-[#03071E]",
};

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PillLink({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: PillVariant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 rounded-[25px] py-2 pr-2 pl-4 text-[18px] leading-none font-bold transition-colors ${variantClass[variant]} ${className}`}
    >
      <span className="py-[9px]">{children}</span>
      <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${circleClass[variant]}`}>
        <ArrowIcon />
      </span>
    </Link>
  );
}

export function Eyebrow({ children, className = "", light = false }: { children: ReactNode; className?: string; light?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2 text-[18px] font-semibold ${light ? "text-white" : "text-[#03071E]"} ${className}`}>
      <svg className="h-5 w-5 text-[#FF6610]" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2a4 4 0 0 0-4 4v1h8V6a4 4 0 0 0-4-4Zm-6 6.5h12v1.2a6 6 0 0 1-12 0V8.5ZM5 22v-2.5A5.5 5.5 0 0 1 10.5 14h3a5.5 5.5 0 0 1 5.5 5.5V22H5Z" />
      </svg>
      {children}
    </p>
  );
}
