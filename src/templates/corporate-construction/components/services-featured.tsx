import Link from "next/link";
import type { Service } from "@/templates/shared/cms/types/services";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { cn } from "@/utils/cn";

type ServicesFeaturedProps = {
  service: Service;
  index: number;
};

export function ServicesFeatured({ service, index }: ServicesFeaturedProps) {
  const label = String(index + 1).padStart(2, "0");
  const body = service.description ?? service.summary;
  const hasImage = Boolean(service.image?.url);
  const detailHref = service.href?.trim() || undefined;

  return (
    <section
      id={service.slug}
      className="scroll-mt-28 border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby={`service-featured-${service.id}`}
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div
          className={cn(
            "grid min-w-0 gap-8 lg:gap-12",
            hasImage && "lg:grid-cols-12 lg:items-start",
          )}
        >
          {hasImage ? (
            <div className="min-w-0 lg:col-span-7">
              <CmsImageMedia
                image={service.image}
                aspect="wide"
                className="w-full border border-[var(--color-border)]"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          ) : null}

          <div className={cn("min-w-0", hasImage ? "lg:col-span-5" : "max-w-3xl")}>
            <p className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.16em] text-[var(--color-accent)]">
              {label}
            </p>
            <h2
              id={`service-featured-${service.id}`}
              className="mt-3 text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight text-[var(--color-primary)] md:text-4xl lg:text-[2.5rem]"
            >
              {service.title}
            </h2>
            {service.summary && service.description ? (
              <p className="mt-4 text-pretty break-words text-lg leading-relaxed text-[var(--color-text)]">
                {service.summary}
              </p>
            ) : null}
            {body ? (
              <p
                className={cn(
                  "text-pretty break-words leading-relaxed text-[var(--color-text-muted)]",
                  service.summary && service.description ? "mt-4 text-base" : "mt-4 text-base md:text-lg",
                )}
              >
                {body}
              </p>
            ) : null}
            {detailHref ? (
              <Link
                href={detailHref}
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
              >
                View service
                <span aria-hidden>→</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
