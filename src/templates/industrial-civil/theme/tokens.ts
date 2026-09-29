import { sharedThemeDefaults } from "@/templates/shared/theme/base-tokens";
import type { TemplateThemeTokens } from "@/templates/shared/theme/types";

export const industrialCivilTheme: TemplateThemeTokens = {
  id: "industrial-civil",
  displayName: "Industrial / Civil",
  cssVariables: {
    ...sharedThemeDefaults,
    "--vertex-font-display": '"Roboto Condensed", ui-sans-serif, system-ui, sans-serif',
    "--vertex-font-body": '"Roboto", ui-sans-serif, system-ui, sans-serif',
    "--vertex-accent": "#334155",
    "--vertex-accent-hover": "#1e293b",
    "--vertex-accent-muted": "#e2e8f0",
  },
};
