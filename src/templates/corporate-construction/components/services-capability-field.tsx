import Link from "next/link";
import type { Service } from "@/templates/shared/cms/types/services";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { cn } from "@/utils/cn";
import type { ServicesFieldPlan } from "./services-field-plan";

type ServicesFieldItemProps = {
  service: Service;
  index: number;
  compact: boolean;
};

function ServicesFieldItem({ service, index, compact }: ServicesFieldItemProps) {
  const label = String(index + 1).padStart(2, "0");
  const copy = service.summary ?? service.description;
  const hasImage = Boolean(service.image?.url);
  const detailHref = service.href?.trim() || undefined;

  return (
    <article
      id={service.slug}
      className={cn(
        "group flex min-w-0 flex-col scroll-mt-28 border-b border-[var(--color-border)] md:border-b-0",
        compact ? "p-5 md:p-6" : "p-6 md:p-8",
      )}
    >
      <p className="font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.16em] text-[var(--color-accent)]">
        {label}
      </p>
      <h3
        className={cn(
          "mt-2 text-balance break-words font-[family-name:var(--font-display)] font-semibold leading-snug text-[var(--color-primary)]",
          compact ? "text-lg md:text-xl" : "text-xl md:text-2xl",
        )}
      >
        {service.title}
      </h3>
      {copy ? (
        <p
          className={cn(
            "mt-3 text-pretty break-words leading-relaxed text-[var(--color-text-muted)]",
            compact ? "text-sm" : "text-sm md:text-base",
          )}
        >
          {copy}
        </p>
      ) : null}
      {hasImage ? (
        <div className={cn("mt-5 overflow-hidden border border-[var(--color-border)]", compact && "mt-4")}>
          <CmsImageMedia
            image={service.image}
            aspect="card"
            className={cn(
              "w-full [&_img]:transition-transform [&_img]:duration-500 group-hover:[&_img]:scale-[1.02] motion-reduce:[&_img]:transition-none motion-reduce:group-hover:[&_img]:scale-100",
              compact && "max-h-40",
            )}
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>
      ) : null}
      {detailHref ? (
        <Link
          href={detailHref}
          className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
        >
          View service
          <span aria-hidden>→</span>
        </Link>
      ) : null}
    </article>
  );
}

type ServicesCapabilityFieldProps = {
  services: Service[];
  /** Zero-based index of the first item in the full services list */
  startIndex: number;
  plan: ServicesFieldPlan;
  heading?: string;
};

export function ServicesCapabilityField({
  services,
  startIndex,
  plan,
  heading = "Capabilities",
}: ServicesCapabilityFieldProps) {
  if (!services.length) {
    return null;
  }

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]"
      aria-labelledby="services-field-heading"
    >
      <div className="vertex-container py-10 md:py-12 lg:py-14">
        <div className="mb-6 flex flex-col gap-2 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary)]">
              Index
            </p>
            <h2
              id="services-field-heading"
              className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-primary)] md:text-3xl"
            >
              {heading}
            </h2>
          </div>
          <p className="text-sm tabular-nums text-[var(--color-text-muted)]">
            {String(services.length).padStart(2, "0")}{" "}
            {services.length === 1 ? "service" : "services"}
          </p>
        </div>

        <ul className={cn("bg-[var(--color-surface)]", plan.listClass)}>
          {services.map((service, offset) => (
            <li key={service.id} className="min-w-0">
              <ServicesFieldItem
                service={service}
                index={startIndex + offset}
                compact={plan.compact}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
