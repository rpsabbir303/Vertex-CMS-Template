import type { TemplateRenderMode } from "@/registry/template-types";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { ArchitecturalGrid } from "@/templates/corporate-construction/components/ui/architectural-grid";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type BlogKnowledgeMomentProps = {
  mode: TemplateRenderMode;
  image?: CmsImage | null;
};

export function BlogKnowledgeMoment({ mode, image }: BlogKnowledgeMomentProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)] text-white" aria-labelledby="blog-knowledge-heading">
      <ArchitecturalGrid tone="dark" className="pointer-events-none absolute inset-0 opacity-40" />
      <div className="vertex-container relative grid gap-10 py-28 md:grid-cols-12 md:items-center md:gap-14 md:py-36 lg:py-40">
        <div className="md:col-span-6 lg:col-span-5">
          <p className={cn(ui.eyebrow, "!text-[var(--color-accent)]")}>Field knowledge</p>
          <h2 id="blog-knowledge-heading" className={cn(ui.h2, "mt-5 max-w-[14ch] !text-white text-balance")}>
            What we learn in the field shapes how we build.
          </h2>
          <p className="mt-8 max-w-md text-pretty text-base leading-relaxed text-white/75">
            Every project creates lessons about coordination, sequencing, safety, communication, and delivery. We bring those lessons into the next job.
          </p>
          <a href={previewHref(mode, "/about")} className={cn(ui.btnOnDark, "mt-10")}>
            Explore our approach
          </a>
        </div>
        {image?.url ? (
          <div className={cn(ui.plate, "relative aspect-[16/11] min-h-[16rem] md:col-span-6 md:min-h-[20rem] lg:col-span-7")}>
            <CmsImageMedia image={image} aspect="auto" className="h-full w-full object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        ) : null}
      </div>
    </section>
  );
}
