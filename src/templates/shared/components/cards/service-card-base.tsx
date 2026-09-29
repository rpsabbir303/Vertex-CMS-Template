import Link from "next/link";
import type { Service } from "@/templates/shared/cms/types/services";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { cn } from "@/utils/cn";

export type ServiceCardBaseProps = {
  service: Service;
  className?: string;
  mediaClassName?: string;
  bodyClassName?: string;
  showImage?: boolean;
  linkable?: boolean;
};

export function ServiceCardBase({
  service,
  className,
  mediaClassName,
  bodyClassName,
  showImage = true,
  linkable = true,
}: ServiceCardBaseProps) {
  const copy = service.summary ?? service.description;
  const href = `/services/${service.slug}`;

  return (
    <article className={cn("min-w-0", className)}>
      {showImage && service.image ? (
        <CmsImageMedia
          image={service.image}
          aspect="card"
          className={cn("w-full", mediaClassName)}
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      ) : null}
      <div className={cn("min-w-0", bodyClassName)}>
        <h3 className="text-balance text-lg font-semibold text-[var(--color-text)]">
          {linkable ? (
            <Link href={href} className="hover:text-[var(--color-secondary)]">
              {service.title}
            </Link>
          ) : (
            service.title
          )}
        </h3>
        {copy ? (
          <p className="mt-3 text-pretty text-sm leading-relaxed text-[var(--color-text-muted)]">
            {copy}
          </p>
        ) : null}
      </div>
    </article>
  );
}
