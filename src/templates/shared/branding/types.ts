export type BrandColorRoles = {
  primary?: string;
  primaryHover?: string;
  secondary?: string;
  secondaryHover?: string;
  accent?: string;
  accentHover?: string;
  accentMuted?: string;
  surface?: string;
  surfaceMuted?: string;
  text?: string;
  textMuted?: string;
  border?: string;
};

export type BrandTypography = {
  displayFamily?: string;
  bodyFamily?: string;
};

export type TenantBranding = {
  logoUrl?: string;
  faviconUrl?: string;
  colors?: Partial<BrandColorRoles>;
  typography?: BrandTypography;
  /** Optional hero/brand imagery override */
  brandImageUrl?: string;
};
