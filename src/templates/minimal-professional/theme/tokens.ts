import { sharedThemeDefaults } from "@/templates/shared/theme/base-tokens";
import type { TemplateThemeTokens } from "@/templates/shared/theme/types";

export const minimalProfessionalTheme: TemplateThemeTokens = {
  id: "minimal-professional",
  displayName: "Minimal Professional",
  cssVariables: {
    ...sharedThemeDefaults,
    "--vertex-font-display": '"Inter", ui-sans-serif, system-ui, sans-serif',
    "--vertex-font-body": '"Inter", ui-sans-serif, system-ui, sans-serif',
    "--vertex-accent": "#2563eb",
    "--vertex-section-y": "3.5rem",
    "--vertex-section-y-lg": "5rem",
  },
};
