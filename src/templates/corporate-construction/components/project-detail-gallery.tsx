import type { CmsImage } from "@/templates/shared/cms/types/media";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type ProjectDetailGalleryProps = {
  title: string;
  images: CmsImage[];
};

function GalleryFigure({ image, className, sizes }: { image: CmsImage; className?: string; sizes: string }) {
  return (
    <figure className={className}>
      <div className={cn(ui.plate, "h-full min-h-[14rem] w-full overflow-hidden")}>
        <CmsImageMedia image={image} aspect="auto" className="h-full w-full object-cover" sizes={sizes} />
      </div>
      {image.caption ? (
        <figcaption className={cn(ui.mono, "mt-3 max-w-prose text-[var(--color-text-muted)]")}>{image.caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function ProjectDetailGallery({ title, images }: ProjectDetailGalleryProps) {
  const frames = images.filter((img) => img.url);
  if (!frames.length) return null;

  const defaultCaption = title;

  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby="project-gallery-heading">
      <div className="vertex-container py-28 md:py-36 lg:py-40">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className={ui.eyebrow}>On site</p>
            <h2 id="project-gallery-heading" className={cn(ui.h2, "mt-5 max-w-[14ch]")}>
              Project gallery
            </h2>
          </div>
          <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>
            {frames.length} {frames.length === 1 ? "frame" : "frames"}
          </p>
        </div>

        <div className="mt-14 space-y-4 md:space-y-6">
          <Reveal plate className="block">
            <GalleryFigure
              image={{ ...frames[0], caption: frames[0].caption ?? defaultCaption }}
              className="w-full"
              sizes="100vw"
            />
          </Reveal>

          {frames.length > 1 ? (
            <div className="grid gap-4 md:grid-cols-12 md:gap-6">
              {frames.slice(1, 3).map((img, i) => (
                <Reveal key={img.id} plate className={cn(i === 0 ? "md:col-span-5" : "md:col-span-7")}>
                  <GalleryFigure image={img} sizes="(min-width: 1024px) 45vw, 100vw" />
                </Reveal>
              ))}
            </div>
          ) : null}

          {frames[3] ? (
            <Reveal plate>
              <GalleryFigure image={frames[3]} className="max-w-4xl" sizes="(min-width: 1024px) 60vw, 100vw" />
            </Reveal>
          ) : null}

          {frames.slice(4).map((img) => (
            <Reveal key={img.id} plate className="block">
              <GalleryFigure image={img} sizes="100vw" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
