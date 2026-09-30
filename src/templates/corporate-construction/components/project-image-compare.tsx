"use client";

import { useCallback, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectImageCompareProps = {
  beforeImage: CmsImage;
  afterImage: CmsImage;
  className?: string;
  /** 0–100, position of the divider from the left */
  initialPosition?: number;
};

const KEY_STEP = 4;

export function ProjectImageCompare({
  beforeImage,
  afterImage,
  className,
  initialPosition = 50,
}: ProjectImageCompareProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [position, setPosition] = useState(initialPosition);
  const labelId = useId();

  const clamp = (value: number) => Math.min(100, Math.max(0, value));

  const setFromClientX = useCallback((clientX: number) => {
    const node = rootRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(clamp(pct));
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromClientX(event.clientX);
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (!dragging.current) return;
    setFromClientX(event.clientX);
  };

  const onPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    dragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((p) => clamp(p - KEY_STEP));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((p) => clamp(p + KEY_STEP));
    } else if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div
      ref={rootRef}
      className={cn(ui.plate, "relative aspect-[16/10] w-full cursor-ew-resize select-none md:aspect-[21/10]", className)}
      onPointerDown={(event) => {
        if (event.target === event.currentTarget || (event.target as HTMLElement).tagName === "IMG") {
          dragging.current = true;
          setFromClientX(event.clientX);
        }
      }}
      onPointerMove={(event) => {
        if (!dragging.current) return;
        setFromClientX(event.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerLeave={() => {
        dragging.current = false;
      }}
    >
      <div className="absolute inset-0">
        <CmsImageMedia image={beforeImage} aspect="auto" className="h-full" sizes="100vw" />
        <span className={cn(ui.mono, "absolute left-4 top-4 z-10 bg-black/40 px-2 py-1 text-white/90")}>Before</span>
      </div>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 0 0 ${position}%)` }}
        aria-hidden
      >
        <CmsImageMedia image={afterImage} aspect="auto" className="h-full" sizes="100vw" />
      </div>
      <span className={cn(ui.mono, "pointer-events-none absolute right-4 top-4 z-10 bg-black/40 px-2 py-1 text-white/90")}>
        After
      </span>

      <div
        className="absolute inset-y-0 z-20 w-px bg-white/90 shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
        style={{ left: `${position}%` }}
        aria-hidden
      />

      <button
        type="button"
        id={labelId}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-label="Drag to compare before and after project images"
        className="absolute top-1/2 z-30 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-[var(--color-surface)]/95 text-[var(--color-text)] shadow-sm transition-transform focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] motion-safe:active:scale-95"
        style={{ left: `${position}%` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <span aria-hidden className="text-sm tracking-tighter">
          ↔
        </span>
      </button>
    </div>
  );
}
