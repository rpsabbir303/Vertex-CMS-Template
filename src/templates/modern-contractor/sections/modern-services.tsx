"use client";

import Link from "next/link";
import { useState } from "react";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Service, ServicesSectionCopy } from "@/templates/shared/cms/types/services";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { pad, ui } from "@/templates/modern-contractor/theme/ui";
import { cn } from "@/utils/cn";

type ModernServicesProps = {
  services: Service[];
  copy?: ServicesSectionCopy | null;
  mode: TemplateRenderMode;
};

export function ModernServices({ services, copy, mode }: ModernServicesProps) {
  const [active, setActive] = useState(0);
  if (!services.length) return null;

  const current = services[Math.min(active, services.length - 1)];
  const eyebrow = copy?.eyebrow?.trim() || "Capabilities";
  const title = copy?.title?.trim() || "What we take on.";

  return (
    <section className={cn(ui.section, "bg-[var(--color-surface-muted)]")} aria-labelledby="modern-services-heading">
      <div className="vertex-container">
        <div className="max-w-2xl">
          <p className={ui.eyebrow}>{eyebrow}</p>
          <h2 id="modern-services-heading" className={cn(ui.h2, "mt-3")}>
            {title}
          </h2>
          {copy?.description?.trim() ? <p className={cn(ui.lead, "mt-4")}>{copy.description.trim()}</p> : null}
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <ol className="lg:col-span-7">
            {services.map((service, index) => {
              const selected = index === active;
              return (
                <li key={service.id} className="border-t border-[var(--color-border)] last:border-b">
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    aria-pressed={selected}
                    className="flex w-full items-start gap-4 py-5 text-left"
                  >
                    <span className={cn(ui.mono, selected ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)]")}>
                      {pad(index + 1)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block font-[family-name:var(--font-display)] text-[clamp(1.35rem,2vw,1.85rem)] font-medium tracking-[-0.02em] transition-colors",
                          selected ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]",
                        )}
                      >
                        {service.title}
                      </span>
                      {selected && service.summary ? (
                        <span className={cn(ui.body, "mt-2 block max-w-lg")}>{service.summary}</span>
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div className="lg:sticky lg:top-28 lg:col-span-5">
            <div className="mc-frame aspect-[4/5] bg-[var(--color-surface)]">
              {current?.image?.url ? (
                <CmsImageMedia
                  image={current.image}
                  aspect="auto"
                  className="h-full w-full"
                  sizes="(min-width: 1024px) 34vw, 100vw"
                />
              ) : (
                <div className="flex h-full items-end p-6">
                  <p className={ui.eyebrow}>{current?.title}</p>
                </div>
              )}
            </div>
            <Link href={previewHref(mode, "/services")} className={cn(ui.link, "mt-5")}>
              Explore capabilities
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
