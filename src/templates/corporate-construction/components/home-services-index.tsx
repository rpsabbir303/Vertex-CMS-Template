"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import type { Service, ServicesSectionCopy } from "@/templates/shared/cms/types/services";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { cn } from "@/utils/cn";

type HomeServicesIndexProps = {
  services: Service[];
  copy?: ServicesSectionCopy;
  servicesHref: string;
};

function serviceCopy(service: Service): string | undefined {
  return service.summary?.trim() || service.description?.trim() || undefined;
}

export function HomeServicesIndex({
  services,
  copy,
  servicesHref,
}: HomeServicesIndexProps) {
  const [activeId, setActiveId] = useState(services[0]?.id ?? "");
  const active = services.find((s) => s.id === activeId) ?? services[0];
  const title = copy?.title?.trim() || "Built for complex delivery";
  const eyebrow = copy?.eyebrow?.trim() || "Capabilities";

  const select = useCallback((id: string) => setActiveId(id), []);

  if (!services.length || !active) {
    return null;
  }

  const activeCopy = serviceCopy(active);
  const activeImage = active.image?.url ? active.image : null;
  const detailHref = active.href?.trim() || `${servicesHref}#${active.slug}`;

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="home-services-index-heading"
    >
      <div className="vertex-container py-16 md:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          {/* ~42% content */}
          <div className="order-2 min-w-0 lg:order-1 lg:col-span-5">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-secondary)]">
              {eyebrow}
            </p>
            <h2
              id="home-services-index-heading"
              className="mt-4 text-balance font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--color-primary)] md:text-4xl lg:text-[2.85rem]"
            >
              {title}
            </h2>
            {copy?.description ? (
              <p className="mt-5 max-w-md text-pretty text-sm leading-relaxed text-[var(--color-text-muted)] md:text-base">
                {copy.description}
              </p>
            ) : null}

            <ul
              className="mt-10 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]"
              role="list"
            >
              {services.map((service, index) => {
                const isActive = service.id === active.id;
                const label = String(index + 1).padStart(2, "0");
                return (
                  <li key={service.id}>
                    <button
                      type="button"
                      onMouseEnter={() => select(service.id)}
                      onFocus={() => select(service.id)}
                      onClick={() => select(service.id)}
                      className={cn(
                        "group flex w-full min-w-0 items-baseline gap-4 border-l-2 py-4 pl-4 text-left transition-colors duration-300 md:gap-5 md:py-5 md:pl-5",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
                        "motion-reduce:transition-none",
                        isActive
                          ? "border-[var(--color-accent)] bg-[var(--color-surface-muted)]/70"
                          : "border-transparent hover:border-[var(--color-border)] hover:bg-[var(--color-surface-muted)]/40",
                      )}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span
                        className={cn(
                          "shrink-0 font-[family-name:var(--font-display)] text-xs font-semibold tracking-[0.16em]",
                          isActive
                            ? "text-[var(--color-accent)]"
                            : "text-[var(--color-text-muted)]",
                        )}
                      >
                        {label}
                      </span>
                      <span
                        className={cn(
                          "min-w-0 text-balance break-words font-[family-name:var(--font-display)] text-lg font-semibold leading-snug md:text-xl",
                          isActive
                            ? "text-[var(--color-primary)]"
                            : "text-[var(--color-text)] group-hover:text-[var(--color-primary)]",
                        )}
                      >
                        {service.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {copy?.cta?.label && copy.cta.href ? (
              <Link
                href={copy.cta.href}
                className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
              >
                {copy.cta.label}
                <span aria-hidden>→</span>
              </Link>
            ) : (
              <Link
                href={servicesHref}
                className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
              >
                View all services
                <span aria-hidden>→</span>
              </Link>
            )}
          </div>

          {/* ~58% visual */}
          <div className="order-1 min-w-0 lg:order-2 lg:col-span-7">
            <div
              key={active.id}
              className="transition-opacity duration-300 motion-reduce:transition-none"
            >
              {activeImage ? (
                <div className="overflow-hidden border border-[var(--color-border)]">
                  <CmsImageMedia
                    image={activeImage}
                    aspect="wide"
                    className="min-h-[16rem] w-full md:min-h-[20rem] lg:min-h-[26rem] [&_img]:transition-transform [&_img]:duration-700"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
              ) : null}
              <div
                className={cn(
                  "min-w-0 border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-6 md:p-8",
                  activeImage && "border-t-0",
                )}
              >
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-secondary)]">
                  {active.title}
                </p>
                {activeCopy ? (
                  <p className="mt-4 text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                    {activeCopy}
                  </p>
                ) : null}
                <Link
                  href={detailHref}
                  className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                >
                  Explore service
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
