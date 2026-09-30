"use client";

import { useState } from "react";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Service, ServicesSectionCopy } from "@/templates/shared/cms/types/services";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type HomeServicesIndexProps = {
  services: Service[];
  copy?: ServicesSectionCopy;
  mode: TemplateRenderMode;
};

/**
 * 04 — Capabilities. Dark index; the plate follows the pointer.
 */
export function HomeServicesIndex({ services, copy, mode }: HomeServicesIndexProps) {
  const [active, setActive] = useState(0);
  const current = services[active] ?? services[0];
  if (!current) return null;

  const servicesHref = previewHref(mode, "/services");
  const hrefFor = (s: Service) => s.href ?? `${servicesHref}#${s.slug}`;

  return (
    <section className="bg-[var(--color-primary)] text-white" aria-labelledby="capabilities-heading">
      <div className="vertex-container py-24 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={ui.eyebrow}>{copy?.eyebrow?.trim() || "Capabilities"}</p>
            <h2 id="capabilities-heading" className={cn(ui.h2, "mt-5 max-w-[14ch] !text-white")}>
              {copy?.title?.trim() || "Everything a building needs, under one contract."}
            </h2>
          </div>
          {copy?.description?.trim() ? (
            <p className="max-w-sm text-pretty text-base leading-relaxed text-white/60">{copy.description}</p>
          ) : null}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <ul className="order-2 divide-y divide-white/10 lg:order-1 lg:col-span-6" role="list">
            {services.map((service, index) => {
              const isActive = index === active;
              return (
                <li key={service.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={() => setActive(index)}
                    aria-pressed={isActive}
                    className="group grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 py-5 text-left transition-colors motion-reduce:transition-none"
                  >
                    <span className={cn(ui.mono, isActive ? "text-[var(--color-accent)]" : "text-white/35")}>
                      {pad(index + 1)}
                    </span>
                    <span
                      className={cn(
                        "font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.4vw,2.5rem)] font-semibold leading-none tracking-[-0.03em] transition-colors motion-reduce:transition-none",
                        isActive ? "text-white" : "text-white/40 group-hover:text-white/70",
                      )}
                    >
                      {service.title}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "h-2 w-2 rounded-full transition-all motion-reduce:transition-none",
                        isActive ? "scale-100 bg-[var(--color-accent)]" : "scale-0 bg-white",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="order-1 lg:order-2 lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <div className={cn(ui.plate, "relative h-[56vw] min-h-[16rem] bg-white/5 lg:h-[30rem]")}>
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className={cn(
                      "absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none",
                      index === active ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden={index !== active}
                  >
                    <CmsImageMedia
                      image={service.image}
                      aspect="auto"
                      className="h-full"
                      sizes="(min-width: 1440px) 42vw, 100vw"
                    />
                  </div>
                ))}
                <span className={cn(ui.mono, "absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1.5 text-white backdrop-blur")}>
                  {pad(active + 1)} / {pad(services.length)}
                </span>
              </div>
              <div className="mt-6 min-h-[7.5rem]">
                <p className="text-pretty text-base leading-relaxed text-white/70">
                  {current.summary?.trim() || current.description?.split(/\n\n+/)[0]?.trim()}
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href={hrefFor(current)} className={ui.btnOnDark}>
                    {current.title}
                  </a>
                  <a
                    href={copy?.cta?.href ? previewHref(mode, copy.cta.href) : servicesHref}
                    className="inline-flex min-h-12 items-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition-colors hover:border-white"
                  >
                    {copy?.cta?.label?.trim() || "All capabilities"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
