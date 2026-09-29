import { sharedThemeDefaults } from "@/templates/shared/theme/base-tokens";
import type { TemplateThemeTokens } from "@/templates/shared/theme/types";

export const modernContractorTheme: TemplateThemeTokens = {
  id: "modern-contractor",
  displayName: "Modern Contractor",
  cssVariables: {
    ...sharedThemeDefaults,
    "--vertex-font-display": '"DM Sans", ui-sans-serif, system-ui, sans-serif',
    "--vertex-font-body": '"DM Sans", ui-sans-serif, system-ui, sans-serif',
    "--vertex-accent": "#c2410c",
    "--vertex-accent-hover": "#9a3412",
    "--vertex-accent-muted": "#ffedd5",
  },
};
