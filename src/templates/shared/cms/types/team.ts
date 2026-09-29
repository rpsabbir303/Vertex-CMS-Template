import type { CmsImage } from "./media";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: CmsImage;
  sortOrder?: number;
};

export type TeamCollection = {
  items: TeamMember[];
};
