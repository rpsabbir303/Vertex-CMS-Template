export type TemplateThemeId =
  | "corporate-construction"
  | "modern-contractor"
  | "premium-builder"
  | "industrial-civil"
  | "specialty-contractor"
  | "project-portfolio"
  | "minimal-professional";

export type TemplateThemeTokens = {
  id: TemplateThemeId;
  /** CSS custom properties applied on template root */
  cssVariables: Record<string, string>;
  /** Semantic labels for builder UI */
  displayName: string;
};
