import { sharedThemeDefaults } from "@/templates/shared/theme/base-tokens";
import type { TemplateThemeTokens } from "@/templates/shared/theme/types";

/** Corporate Construction — established, structured, credible (Figma-aligned when synced) */
export const corporateConstructionTheme: TemplateThemeTokens = {
  id: "corporate-construction",
  displayName: "Corporate Construction",
  cssVariables: {
    ...sharedThemeDefaults,
    "--vertex-font-display": "var(--font-display-corporate, \"Source Serif 4\", ui-serif, Georgia, serif)",
    "--vertex-font-body": "var(--font-body-corporate, \"IBM Plex Sans\", ui-sans-serif, system-ui, sans-serif)",
    "--vertex-primary": "#0B1F33",
    "--vertex-primary-hover": "#081726",
    "--vertex-secondary": "#2F5496",
    "--vertex-secondary-hover": "#244275",
    "--vertex-accent": "#B94712",
    "--vertex-accent-hover": "#963A0E",
    "--vertex-accent-muted": "#F6EBE5",
    "--vertex-surface": "#FFFFFF",
    "--vertex-surface-muted": "#F7F8FA",
    "--vertex-text": "#111827",
    "--vertex-text-muted": "#667085",
    "--vertex-border": "#D9E0E8",
    "--vertex-text-inverse": "#FFFFFF",
    "--vertex-section-y": "5.5rem",
    "--vertex-section-y-lg": "8rem",
    "--vertex-container-max": "78rem",
    "--vertex-aspect-hero": "8 / 5",
  },
};
