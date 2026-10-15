import { sharedThemeDefaults } from "@/templates/shared/theme/base-tokens";
import type { TemplateThemeTokens } from "@/templates/shared/theme/types";

/**
 * Modern Contractor — warm editorial.
 * Paper canvas, ink type, a single deep-teal accent. Distinct from the
 * corporate green system and from the previous black/orange contractor look.
 */
export const modernContractorTheme: TemplateThemeTokens = {
  id: "modern-contractor",
  displayName: "Modern Contractor",
  cssVariables: {
    ...sharedThemeDefaults,
    "--vertex-font-display":
      'var(--font-display-modern, "Fraunces", ui-serif, Georgia, serif)',
    "--vertex-font-body": 'var(--font-body-modern, "Figtree", ui-sans-serif, system-ui, sans-serif)',
    "--vertex-font-mono": 'var(--font-mono-modern, "Geist Mono", ui-monospace, monospace)',
    "--vertex-primary": "#1A2E2B",
    "--vertex-primary-hover": "#12221F",
    "--vertex-secondary": "#3E4A46",
    "--vertex-secondary-hover": "#2C3835",
    "--vertex-accent": "#0E7C72",
    "--vertex-accent-hover": "#0A635B",
    "--vertex-accent-muted": "#E5F3F1",
    "--vertex-surface": "#F6F1E8",
    "--vertex-surface-muted": "#EFE8DC",
    "--vertex-surface-elevated": "#FFFCF7",
    "--vertex-text": "#1C1915",
    "--vertex-text-muted": "#6A6258",
    "--vertex-border": "#E3D9CB",
    "--vertex-text-inverse": "#F6F1E8",
    "--vertex-focus": "#0E7C72",
    "--vertex-section-y": "5.5rem",
    "--vertex-section-y-lg": "8rem",
    "--vertex-container-max": "80rem",
    "--vertex-aspect-hero": "4 / 5",
  },
};
