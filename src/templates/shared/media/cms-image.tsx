"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useState } from "react";
import type { CmsImage, MediaAspectToken, MediaCropBehavior } from "@/templates/shared/cms/types/media";
import { cn } from "@/utils/cn";
import { aspectRatioStyle } from "./aspect-ratio-map";

export type CmsImageProps = {
  image?: CmsImage | null;
  aspect?: MediaAspectToken;
  crop?: MediaCropBehavior;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Called once when the image fails, so a parent can collapse its media slot */
  onFail?: () => void;
};

function focalStyle(image: CmsImage): CSSProperties | undefined {
  if (!image.focalPoint) {
    return undefined;
  }
  return {
    objectPosition: `${image.focalPoint.x * 100}% ${image.focalPoint.y * 100}%`,
  };
}

function isLocalAsset(url: string): boolean {
  return url.startsWith("/");
}

export function CmsImageMedia({
  image,
  aspect = "card",
  crop = "cover",
  className,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority = false,
  onFail,
}: CmsImageProps) {
  const [failed, setFailed] = useState(false);
  const handleError = () => {
    setFailed(true);
    onFail?.();
  };

  if (!image?.url || failed) {
    return null;
  }

  const objectClass = crop === "contain" ? "object-contain" : "object-cover";
  const local = isLocalAsset(image.url);

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-[var(--color-surface-muted)]", className)}
      style={aspectRatioStyle(aspect)}
    >
      {local ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image.url}
          alt={image.alt}
          className={cn("absolute inset-0 h-full w-full", objectClass)}
          style={focalStyle(image)}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={handleError}
        />
      ) : (
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className={cn(objectClass)}
          style={focalStyle(image)}
          sizes={sizes}
          priority={priority}
          onError={handleError}
        />
      )}
    </div>
  );
}
