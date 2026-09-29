export type ImageFocalPoint = {
  x: number;
  y: number;
};

export type CmsImage = {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  focalPoint?: ImageFocalPoint;
  caption?: string;
};

export type CmsGallery = {
  id: string;
  images: CmsImage[];
};

export type MediaAspectToken =
  | "hero"
  | "card"
  | "portrait"
  | "square"
  | "wide"
  | "auto";

export type MediaCropBehavior = "cover" | "contain";
