"use client";

import Link from "next/link";
import { useState } from "react";
import type { Service } from "@/templates/shared/cms/types/services";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { cn } from "@/utils/cn";
import type { TilePlan } from "./capability-field-plan";

type CapabilityTileProps = {
  service: Service;
  /** Zero-based position in the tenant's display order */
  index: number;
  plan: TilePlan;
  href: string;
};

const TITLE_SIZE = {
  xl: "text-2xl @min-[30rem]:text-3xl",
  lg: "text-xl @min-[30rem]:text-2xl",
  md: "text-lg",
} as const;

const MEDIA_HOVER =
  "overflow-hidden bg-[var(--color-surface-muted)] [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.04] motion-reduce:[&_img]:transition-none motion-reduce:group-hover:[&_img]:scale-100";

/**
 * One service in the Capability Field.
 *
 * Media form follows the tile's own width (container queries), so the same tile
 * works in any slot of the field:
 *   chip  -> small corner thumbnail (narrow tiles, all compact tiles)
 *   band  -> shallow image band above the text (medium feature tiles)
 *   split -> image beside the text (wide feature and lead tiles)
 * If a service has no image, or its image fails, the media slot is removed and
 * the text fills the tile.
 */
export function CapabilityTile({ service, index, plan, href }: CapabilityTileProps) {
  const [mediaFailed, setMediaFailed] = useState(false);
  const hasMedia = Boolean(service.image?.url) && !mediaFailed;
  const text = service.summary ?? service.description;
  const isLead = plan.role === "lead";
  const isCompact = plan.role === "compact";
  const label = String(index + 1).padStart(2, "0");

  const image = (
    <CmsImageMedia
      image={service.image}
      aspect="auto"
      className="absolute! inset-0 h-full"
      sizes={isLead ? "(max-width: 1024px) 100vw, 40vw" : "(max-width: 1024px) 100vw, 25vw"}
      onFail={() => setMediaFailed(true)}
    />
  );

  // Compact tiles: the chip floats inside the text so copy wraps around it.
  const chip = isCompact && hasMedia ? (
    <div className={cn("relative float-right mb-1 ml-3 h-12 w-16", MEDIA_HOVER)}>{image}</div>
  ) : null;

  // Lead and feature tiles: media is a sibling of the text and changes form by width.
  const sideMediaClass = isLead
    ? "relative h-40 w-full shrink-0 @min-[30rem]:h-auto @min-[30rem]:w-[46%]"
    : "absolute right-4 top-4 z-10 h-12 w-16 shrink-0 @min-[23rem]:inset-auto @min-[23rem]:relative @min-[23rem]:h-28 @min-[23rem]:w-full @min-[30rem]:h-auto @min-[30rem]:w-[42%]";

  const textPadding = isCompact
    ? "block p-4 @min-[23rem]:p-5 @min-[23rem]:pb-10"
    : cn(
        "flex flex-col",
        isLead ? "p-5 @min-[30rem]:p-7" : "p-5 @min-[30rem]:p-6",
        !isLead && hasMedia && "pr-24 @min-[23rem]:pr-5 @min-[30rem]:pr-6",
      );

  return (
    <li className={cn("@container min-w-0 bg-[var(--color-surface)]", plan.placement, plan.minHeight)}>
      <Link
        href={href}
        className={cn(
          "group relative flex h-full min-h-11 flex-col outline-offset-[-4px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]",
          !isCompact && "@min-[30rem]:flex-row",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-20 h-0.5 origin-left scale-x-0 bg-[var(--color-accent)] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
        />

        {!isCompact && hasMedia ? (
          <div className={cn(MEDIA_HOVER, sideMediaClass)}>{image}</div>
        ) : !isCompact ? (
          // No image: a typographic index mark stands in on wide tiles only
          <div
            aria-hidden
            className={cn(
              "hidden shrink-0 items-center justify-center bg-[var(--color-surface-muted)] font-[family-name:var(--font-display)] font-semibold leading-none text-[var(--color-border)] @min-[30rem]:flex",
              isLead
                ? "@min-[30rem]:w-[34%] @min-[30rem]:text-[7rem]"
                : "@min-[30rem]:w-[30%] @min-[30rem]:text-[4.5rem]",
            )}
          >
            {label}
          </div>
        ) : null}

        <div className={cn("min-w-0 flex-1", textPadding)}>
          {chip}
          <span className="flex items-center gap-3 text-xs font-semibold tabular-nums tracking-[0.18em] text-[var(--color-accent)]">
            {label}
            <span aria-hidden className="h-px w-8 bg-[var(--color-border)]" />
          </span>
          <h3
            className={cn(
              "mt-3 text-balance break-words font-[family-name:var(--font-display)] font-semibold leading-tight text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-secondary)] motion-reduce:transition-none",
              TITLE_SIZE[plan.emphasis],
            )}
          >
            {service.title}
          </h3>
          {text ? (
            <p
              className={cn(
                "mt-2 text-pretty break-words leading-relaxed text-[var(--color-text-muted)]",
                plan.emphasis === "md" ? "text-sm" : "text-sm @min-[30rem]:text-base",
              )}
            >
              {text}
            </p>
          ) : null}
          {isCompact ? null : (
            <span
              aria-hidden
              className="mt-auto hidden pt-4 text-lg leading-none text-[var(--color-primary)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-accent)] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 @min-[23rem]:block"
            >
              →
            </span>
          )}
        </div>

        {isCompact ? (
          <span
            aria-hidden
            className="absolute bottom-3 right-4 hidden text-lg leading-none text-[var(--color-primary)] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-accent)] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 @min-[23rem]:block"
          >
            →
          </span>
        ) : null}
      </Link>
    </li>
  );
}
