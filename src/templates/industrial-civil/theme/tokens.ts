import { sharedThemeDefaults } from "@/templates/shared/theme/base-tokens";
import type { TemplateThemeTokens } from "@/templates/shared/theme/types";

export const industrialCivilTheme: TemplateThemeTokens = {
  id: "industrial-civil",
  displayName: "Industrial / Civil",
  cssVariables: {
    ...sharedThemeDefaults,
    "--vertex-font-display": "var(--font-figtree), Figtree, ui-sans-serif, system-ui, sans-serif",
    "--vertex-font-body": "var(--font-figtree), Figtree, ui-sans-serif, system-ui, sans-serif",
    "--vertex-primary": "#03071E",
    "--vertex-primary-hover": "#020512",
    "--vertex-accent": "#FF6610",
    "--vertex-accent-hover": "#e85a0a",
    "--vertex-accent-muted": "#FFF1E8",
    "--vertex-text": "#212529",
    "--vertex-text-muted": "#5c6570",
    "--vertex-text-inverse": "#03071E",
    "--vertex-surface": "#ffffff",
    "--vertex-surface-muted": "#F6F8FA",
    "--vertex-border": "#e6e8ec",
    "--vertex-focus": "#03071E",
  },
};
