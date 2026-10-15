import { Figtree, Fraunces, Geist_Mono, Manrope, Oswald, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./modern.css";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-modern",
  display: "swap",
});

const body = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-modern",
  display: "swap",
});

const industrial = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-industrial-modern",
  display: "swap",
});

const arcDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-arc-display",
  display: "swap",
});

const arcBody = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arc-body",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-modern",
  display: "swap",
});

export function ModernFontProvider({ children }: { children: ReactNode }) {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} ${industrial.variable} ${arcDisplay.variable} ${arcBody.variable} modern-root`}>
      {children}
    </div>
  );
}
