import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import type { ReactNode } from "react";

const display = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display-corporate",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-corporate",
  display: "swap",
});

export function CorporateFontProvider({ children }: { children: ReactNode }) {
  return <div className={`${display.variable} ${body.variable}`}>{children}</div>;
}
