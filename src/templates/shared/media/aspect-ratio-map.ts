import type { CSSProperties } from "react";
import type { MediaAspectToken } from "@/templates/shared/cms/types/media";

export function aspectRatioStyle(token: MediaAspectToken): CSSProperties {
  switch (token) {
    case "hero":
      return { aspectRatio: "var(--aspect-hero)" };
    case "card":
      return { aspectRatio: "var(--aspect-card)" };
    case "portrait":
      return { aspectRatio: "var(--aspect-portrait)" };
    case "square":
      return { aspectRatio: "1 / 1" };
    case "wide":
      return { aspectRatio: "21 / 9" };
    case "auto":
    default:
      return {};
  }
}
