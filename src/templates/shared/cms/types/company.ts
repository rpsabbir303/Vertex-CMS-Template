import type { CmsImage } from "./media";

export type SocialLink = {
  platform: "linkedin" | "facebook" | "instagram" | "youtube" | "x" | "other";
  label: string;
  url: string;
};

export type CompanyAddress = {
  line1: string;
  line2?: string;
  city: string;
  region?: string;
  postalCode?: string;
  country: string;
};

export type Company = {
  name: string;
  /** Primary hero headline when distinct from legal/display name */
  headline?: string;
  tagline?: string;
  description?: string;
  logo?: CmsImage;
  heroImage?: CmsImage;
  phone?: string;
  email?: string;
  address?: CompanyAddress;
  socialLinks?: SocialLink[];
  foundedYear?: number;
};
