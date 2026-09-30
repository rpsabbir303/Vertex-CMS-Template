import { sharedThemeDefaults } from "@/templates/shared/theme/base-tokens";
import type { TemplateThemeTokens } from "@/templates/shared/theme/types";

/** Corporate Construction — product-grade, modern, construction-first */
export const corporateConstructionTheme: TemplateThemeTokens = {
  id: "corporate-construction",
  displayName: "Corporate Construction",
  cssVariables: {
    ...sharedThemeDefaults,
    "--vertex-font-display":
      "var(--font-display-corporate, \"Inter Tight\", ui-sans-serif, system-ui, sans-serif)",
    "--vertex-font-body": "var(--font-body-corporate, \"Inter\", ui-sans-serif, system-ui, sans-serif)",
    "--vertex-font-mono": "var(--font-mono-corporate, \"IBM Plex Mono\", ui-monospace, monospace)",
    "--vertex-primary": "#0A1220",
    "--vertex-primary-hover": "#141F33",
    "--vertex-secondary": "#3B4B63",
    "--vertex-secondary-hover": "#2A3648",
    "--vertex-accent": "#E8590C",
    "--vertex-accent-hover": "#C64A08",
    "--vertex-accent-muted": "#FDEBDF",
    "--vertex-surface": "#FFFFFF",
    "--vertex-surface-muted": "#F4F3EF",
    "--vertex-text": "#0A1220",
    "--vertex-text-muted": "#5B6472",
    "--vertex-border": "#E3E2DC",
    "--vertex-text-inverse": "#FFFFFF",
    "--vertex-section-y": "6rem",
    "--vertex-section-y-lg": "9rem",
    "--vertex-container-max": "84rem",
    "--vertex-aspect-hero": "16 / 9",
  },
};
