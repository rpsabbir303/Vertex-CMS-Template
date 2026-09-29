import type { CmsImage } from "./media";

export type Certification = {
  id: string;
  name: string;
  issuer?: string;
  year?: number;
  asset?: CmsImage;
  sortOrder?: number;
};

export type CertificationsCollection = {
  items: Certification[];
};
