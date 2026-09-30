import { sharedThemeDefaults } from "@/templates/shared/theme/base-tokens";

import type { TemplateThemeTokens } from "@/templates/shared/theme/types";

/** Corporate Construction — product-grade, modern, construction-first */
export const corporateConstructionTheme: TemplateThemeTokens = {
  id: "corporate-construction",
  displayName: "Corporate Construction",
  cssVariables: {
    ...sharedThemeDefaults,
    "--vertex-font-display":
      'var(--font-display-corporate, "Inter Tight", ui-sans-serif, system-ui, sans-serif)',
    "--vertex-font-body": 'var(--font-body-corporate, "Inter", ui-sans-serif, system-ui, sans-serif)',
    "--vertex-font-mono": 'var(--font-mono-corporate, "IBM Plex Mono", ui-monospace, monospace)',
    "--vertex-primary": "#294A3D",
    "--vertex-primary-hover": "#1F352C",
    "--vertex-secondary": "#3A5549",
    "--vertex-secondary-hover": "#294A3D",
    "--vertex-accent": "#294A3D",
    "--vertex-accent-hover": "#1F352C",
    "--vertex-accent-muted": "#E8EBE6",
    "--vertex-surface": "#FFFFFF",
    "--vertex-surface-muted": "#F3F0E8",
    "--vertex-text": "#111111",
    "--vertex-text-muted": "#4A4A45",
    "--vertex-border": "#D8D6CF",
    "--vertex-text-inverse": "#FFFFFF",
    "--vertex-focus": "#294A3D",
    "--vertex-section-y": "6rem",
    "--vertex-section-y-lg": "9rem",
    "--vertex-container-max": "84rem",
    "--vertex-aspect-hero": "16 / 9",
  },
};
