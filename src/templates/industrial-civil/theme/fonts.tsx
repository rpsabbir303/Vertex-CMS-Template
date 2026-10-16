import { Figtree } from "next/font/google";
import type { ReactNode } from "react";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export function IndustrialFontProvider({ children }: { children: ReactNode }) {
  return (
    <div className={figtree.variable} style={{ fontFamily: "var(--font-figtree), ui-sans-serif, system-ui, sans-serif" }}>
      {children}
    </div>
  );
}
