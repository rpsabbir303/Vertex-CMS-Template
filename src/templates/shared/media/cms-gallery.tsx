import type { CmsGallery } from "@/templates/shared/cms/types/media";
import { cn } from "@/utils/cn";
import { CmsImageMedia } from "./cms-image";

type CmsGalleryProps = {
  gallery?: CmsGallery | null;
  className?: string;
  columns?: 1 | 2 | 3;
};

export function CmsGalleryGrid({
  gallery,
  className,
  columns = 2,
}: CmsGalleryProps) {
  if (!gallery?.images?.length) {
    return null;
  }

  const gridClass =
    columns === 1
      ? "grid-cols-1"
      : columns === 3
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2";

  return (
    <ul className={cn("grid gap-4", gridClass, className)}>
      {gallery.images.map((image) => (
        <li key={image.id} className="min-w-0">
          <figure className="min-w-0">
            <CmsImageMedia image={image} aspect="card" />
            {image.caption ? (
              <figcaption className="mt-2 text-sm text-[var(--color-text-muted)]">
                {image.caption}
              </figcaption>
            ) : null}
          </figure>
        </li>
      ))}
    </ul>
  );
}
