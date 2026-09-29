import { sharedThemeDefaults } from "@/templates/shared/theme/base-tokens";
import type { TemplateThemeTokens } from "@/templates/shared/theme/types";

export const specialtyContractorTheme: TemplateThemeTokens = {
  id: "specialty-contractor",
  displayName: "Specialty Contractor",
  cssVariables: {
    ...sharedThemeDefaults,
    "--vertex-font-display": '"Libre Baskerville", ui-serif, Georgia, serif',
    "--vertex-font-body": '"Work Sans", ui-sans-serif, system-ui, sans-serif',
    "--vertex-accent": "#166534",
    "--vertex-accent-hover": "#14532d",
  },
};
