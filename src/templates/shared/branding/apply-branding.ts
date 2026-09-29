import type { CSSProperties } from "react";
import type { TemplateThemeTokens } from "@/templates/shared/theme/types";
import type { TenantBranding } from "./types";

const CSS_VAR_MAP: Record<keyof NonNullable<TenantBranding["colors"]>, string> = {
  primary: "--vertex-primary",
  primaryHover: "--vertex-primary-hover",
  secondary: "--vertex-secondary",
  secondaryHover: "--vertex-secondary-hover",
  accent: "--vertex-accent",
  accentHover: "--vertex-accent-hover",
  accentMuted: "--vertex-accent-muted",
  surface: "--vertex-surface",
  surfaceMuted: "--vertex-surface-muted",
  text: "--vertex-text",
  textMuted: "--vertex-text-muted",
  border: "--vertex-border",
};

export function buildBrandingStyle(
  theme: TemplateThemeTokens,
  branding?: TenantBranding,
): CSSProperties {
  const style: Record<string, string> = {
    ...theme.cssVariables,
  };

  if (branding?.typography?.displayFamily) {
    style["--vertex-font-display"] = branding.typography.displayFamily;
  }
  if (branding?.typography?.bodyFamily) {
    style["--vertex-font-body"] = branding.typography.bodyFamily;
  }

  if (branding?.colors) {
    for (const [key, value] of Object.entries(branding.colors)) {
      const cssVar = CSS_VAR_MAP[key as keyof typeof CSS_VAR_MAP];
      if (cssVar && value) {
        style[cssVar] = value;
      }
    }
  }

  return withResolvedAliases(style) as CSSProperties;
}

const COLOR_ROLES = new Set([
  "surface",
  "surface-muted",
  "surface-elevated",
  "text",
  "text-muted",
  "text-inverse",
  "border",
  "primary",
  "primary-hover",
  "secondary",
  "secondary-hover",
  "accent",
  "accent-hover",
  "accent-muted",
  "focus",
]);

const FONT_ROLES = new Set(["font-display", "font-body", "font-mono"]);

/**
 * The global `--color-*` / `--font-*` tokens are declared once at :root, where the
 * template's `--vertex-*` values do not exist yet, so var() would resolve to the
 * defaults for the whole page. Re-declaring the aliases on the same element that
 * carries the `--vertex-*` values makes template themes and tenant branding
 * actually reach every component. Only variables that are defined are aliased.
 */
function withResolvedAliases(style: Record<string, string>): Record<string, string> {
  const resolved: Record<string, string> = { ...style };
  for (const key of Object.keys(style)) {
    if (!key.startsWith("--vertex-")) {
      continue;
    }
    const role = key.slice("--vertex-".length);
    if (COLOR_ROLES.has(role)) {
      resolved[`--color-${role}`] = `var(${key})`;
    } else if (FONT_ROLES.has(role)) {
      resolved[`--${role}`] = `var(${key})`;
    }
  }
  return resolved;
}
