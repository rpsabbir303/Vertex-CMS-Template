import type { CmsGallery, CmsImage } from "./media";

/** Construction lifecycle — map from CMS when published. */
export type ProjectBuildStatus = "completed" | "ongoing";

/** Residential vs commercial market — map from CMS when published. */
export type ProjectBuildingType = "residential" | "commercial";

export type ProjectMetadata = {
  client?: string;
  sector?: string;
  scope?: string;
  duration?: string;
  status?: ProjectBuildStatus;
  buildingType?: ProjectBuildingType;
  projectType?: string;
  size?: string;
  deliveryMethod?: string;
};

export type ProjectDeliveryStageSlug = "discover" | "plan" | "build" | "control" | "deliver";

export type ProjectDeliveryMilestone = {
  label: string;
  title?: string;
  description?: string;
};

export type ProjectDeliveryInsight = {
  title?: string;
  body: string;
};

export type ProjectDeliveryControlPillar = {
  label: string;
  body: string;
};

export type ProjectDeliveryBuildPhase = {
  label: string;
  description?: string;
};

export type ProjectDeliveryProgress = {
  currentPhaseLabel?: string;
  /** Only render when CMS supplies a value — never invent percentages. */
  progressPercent?: number;
  milestoneLabels?: string[];
};

export type ProjectDeliveryMetric = {
  label: string;
  value: string;
};

/** Project-specific chapter for one step of the delivery framework (Discover → Deliver). */
export type ProjectDeliveryStage = {
  slug: ProjectDeliveryStageSlug;
  /** Main narrative — paragraphs separated by blank lines. */
  narrative?: string;
  insight?: ProjectDeliveryInsight;
  images?: CmsImage[];
  milestones?: ProjectDeliveryMilestone[];
  controlPillars?: ProjectDeliveryControlPillar[];
  buildPhases?: ProjectDeliveryBuildPhase[];
  progress?: ProjectDeliveryProgress;
  metrics?: ProjectDeliveryMetric[];
};

export type ProjectOutcome = {
  eyebrow?: string;
  headline?: string;
  summary?: string;
  statement?: string;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  description?: string;
  image?: CmsImage;
  gallery?: CmsGallery;
  location?: string;
  year?: number;
  featured?: boolean;
  metadata?: ProjectMetadata;
  sortOrder?: number;
  /** Before/after comparison — optional until CMS supplies assets. */
  beforeImage?: CmsImage;
  afterImage?: CmsImage;
  /** Optional intro copy for the case-study opening (falls back to `description`). */
  introduction?: string;
  deliveryStages?: ProjectDeliveryStage[];
  outcome?: ProjectOutcome;
  /** Prefer these slugs for related projects; otherwise inferred from sector. */
  relatedProjectSlugs?: string[];
};

export type ProjectsCollection = {
  items: Project[];
};
