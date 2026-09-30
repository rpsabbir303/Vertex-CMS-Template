"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";

type ArchitecturalGridProps = {
  /** Light pages use ink at 10%. Dark bands use white at 8%. */
  tone?: "light" | "dark";
  className?: string;
};

type GridLine = {
  key: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity: number;
};

/**
 * Radial fade matching the previous CSS mask:
 * radial-gradient(ellipse at top, #000 35%, transparent 80%)
 * with the default farthest-corner ellipse.
 */
function maskAlpha(x: number, y: number, width: number, height: number): number {
  const rx = width / 2;
  const ry = height;
  if (rx <= 0 || ry <= 0) return 0;
  const d = Math.hypot((x - width / 2) / rx, y / ry);
  if (d <= 0.35) return 1;
  if (d >= 0.8) return 0;
  return 1 - (d - 0.35) / 0.45;
}

function buildLines(width: number, height: number, step: number, baseOpacity: number): GridLine[] {
  const lines: GridLine[] = [];
  const segment = step / 2;

  const add = (x1: number, y1: number, x2: number, y2: number, key: string) => {
    const opacity = baseOpacity * maskAlpha((x1 + x2) / 2, (y1 + y2) / 2, width, height);
    if (opacity < 0.004) return;
    lines.push({
      key,
      x1: round(x1),
      y1: round(y1),
      x2: round(x2),
      y2: round(y2),
      opacity: Math.round(opacity * 1000) / 1000,
    });
  };

  const cols = Math.ceil(width / step);
  const rows = Math.ceil(height / step);

  for (let col = 0; col <= cols; col += 1) {
    const x = Math.min(col * step, width);
    for (let y = 0; y < height; y += segment) {
      const y2 = Math.min(y + segment, height);
      if (y2 - y < 0.5) continue;
      add(x, y, x, y2, `v-${col}-${y}`);
    }
  }

  for (let row = 0; row <= rows; row += 1) {
    const y = Math.min(row * step, height);
    for (let x = 0; x < width; x += segment) {
      const x2 = Math.min(x + segment, width);
      if (x2 - x < 0.5) continue;
      add(x, y, x2, y, `h-${row}-${x}`);
    }
  }

  return lines;
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

/**
 * Architectural hairline grid as a real SVG.
 * Spacing is 6rem. Light stroke is brand green #294A3D at ~7% effective opacity; dark is white at 8%.
 * A top-centered radial fade matches the previous CSS mask.
 */
export function ArchitecturalGrid({ tone = "light", className }: ArchitecturalGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ width: number; height: number; step: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const rootFont = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const rect = el.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      if (width < 1 || height < 1) return;
      setBox((current) => {
        const step = 6 * rootFont;
        if (current && current.width === width && current.height === height && current.step === step) {
          return current;
        }
        return { width, height, step };
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const color = tone === "dark" ? "#FFFFFF" : "#294A3D";
  const baseOpacity = tone === "dark" ? 0.08 : 0.07;
  const lines = box ? buildLines(box.width, box.height, box.step, baseOpacity) : [];

  return (
    <div ref={ref} className={cn("pointer-events-none overflow-hidden", className)} aria-hidden>
      {box ? (
        <svg
          width={box.width}
          height={box.height}
          viewBox={`0 0 ${box.width} ${box.height}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 block max-w-none"
          style={{ pointerEvents: "none" }}
          focusable="false"
          data-architectural-grid={tone}
        >
          {lines.map((line) => (
            <line
              key={line.key}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke={color}
              strokeWidth={1}
              strokeOpacity={line.opacity}
            />
          ))}
        </svg>
      ) : null}
    </div>
  );
}
