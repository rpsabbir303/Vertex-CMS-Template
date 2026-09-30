import { IBM_Plex_Mono, Inter, Inter_Tight } from "next/font/google";
import type { ReactNode } from "react";
import "./corporate.css";

const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-corporate",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-corporate",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-corporate",
  display: "swap",
});

export function CorporateFontProvider({ children }: { children: ReactNode }) {
  return (
    <div className={`${display.variable} ${body.variable} ${mono.variable} corporate-root`}>
      {children}
    </div>
  );
}
