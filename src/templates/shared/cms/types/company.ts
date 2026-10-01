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

/** Editable About-page history milestone (CMS-mapped when available). */
export type CompanyHistoryMilestone = {
  year?: string;
  title: string;
  description?: string;
};

/** Optional About-page history block. */
export type CompanyAboutHistory = {
  eyebrow?: string;
  headline?: string;
  milestones?: CompanyHistoryMilestone[];
  image?: CmsImage;
};

export type CompanyIndexedItem = {
  title: string;
  body?: string;
};

export type CompanyAboutHowWeWork = {
  eyebrow?: string;
  headline?: string;
  /** Paragraphs separated by blank lines. */
  intro?: string;
  principles?: CompanyIndexedItem[];
};

export type CompanyAboutLeader = {
  role: string;
  name?: string;
  /** Short line only — not a full biography. */
  note?: string;
  image?: CmsImage;
  teamMemberId?: string;
};

export type CompanyAboutLeadership = {
  eyebrow?: string;
  headline?: string;
  intro?: string;
  leaders?: CompanyAboutLeader[];
  image?: CmsImage;
};

export type CompanyOfficeToFieldStage = {
  label: string;
  body: string;
};

export type CompanyAboutOfficeToField = {
  eyebrow?: string;
  headline?: string;
  statement?: string;
  image?: CmsImage;
  stages?: CompanyOfficeToFieldStage[];
};

export type CompanyAboutBeliefs = {
  eyebrow?: string;
  headline?: string;
  principles?: CompanyIndexedItem[];
};

export type Company = {
  name: string;
  /** Primary hero headline when distinct from legal/display name */
  headline?: string;
  tagline?: string;
  description?: string;
  /** Additional About-page supporting paragraphs (CMS). */
  aboutSupporting?: string[];
  /** About-page history / timeline (CMS). */
  aboutHistory?: CompanyAboutHistory;
  aboutHowWeWork?: CompanyAboutHowWeWork;
  aboutLeadership?: CompanyAboutLeadership;
  aboutOfficeToField?: CompanyAboutOfficeToField;
  aboutBeliefs?: CompanyAboutBeliefs;
  logo?: CmsImage;
  heroImage?: CmsImage;
  phone?: string;
  email?: string;
  address?: CompanyAddress;
  socialLinks?: SocialLink[];
  foundedYear?: number;
};
