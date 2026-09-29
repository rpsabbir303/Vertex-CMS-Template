import { sharedThemeDefaults } from "@/templates/shared/theme/base-tokens";
import type { TemplateThemeTokens } from "@/templates/shared/theme/types";

export const premiumBuilderTheme: TemplateThemeTokens = {
  id: "premium-builder",
  displayName: "Premium Builder",
  cssVariables: {
    ...sharedThemeDefaults,
    "--vertex-font-display": '"Cormorant Garamond", ui-serif, Georgia, serif',
    "--vertex-font-body": '"Outfit", ui-sans-serif, system-ui, sans-serif',
    "--vertex-accent": "#2c2c2c",
    "--vertex-accent-hover": "#1a1a1a",
    "--vertex-surface-muted": "#f7f5f2",
  },
};
