import { sharedThemeDefaults } from "@/templates/shared/theme/base-tokens";
import type { TemplateThemeTokens } from "@/templates/shared/theme/types";

export const projectPortfolioTheme: TemplateThemeTokens = {
  id: "project-portfolio",
  displayName: "Project Portfolio",
  cssVariables: {
    ...sharedThemeDefaults,
    "--vertex-font-display": '"Playfair Display", ui-serif, Georgia, serif',
    "--vertex-font-body": '"Inter", ui-sans-serif, system-ui, sans-serif',
    "--vertex-accent": "#111827",
    "--vertex-surface-muted": "#fafafa",
  },
};
