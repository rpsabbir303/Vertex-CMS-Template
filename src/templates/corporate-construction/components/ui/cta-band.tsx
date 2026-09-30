import type { TemplateRenderMode } from "@/registry/template-types";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CtaBandProps = {
  mode: TemplateRenderMode;
  title: string;
  body?: string;
  primaryLabel?: string;
  secondary?: { label: string; href: string };
};

/** Closing call for inner pages. Dark, one line, one action. */
export function CtaBand({ mode, title, body, primaryLabel = "Start a project", secondary }: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)] text-white">
      <div className="cc-grid cc-grid-dark pointer-events-none absolute inset-0" aria-hidden />
      <div className="vertex-container relative grid gap-10 py-24 md:py-32 lg:grid-cols-12 lg:items-end">
        <h2 className={cn(ui.h2, "max-w-[12ch] !text-white lg:col-span-8")}>{title}</h2>
        <div className="flex flex-col gap-6 lg:col-span-4">
          {body ? <p className="max-w-sm text-pretty text-base leading-relaxed text-white/70">{body}</p> : null}
          <div className="flex flex-wrap gap-3">
            <a href={previewHref(mode, "/contact")} className={ui.btnOnDark}>
              {primaryLabel}
            </a>
            {secondary ? (
              <a
                href={previewHref(mode, secondary.href)}
                className="inline-flex min-h-12 items-center rounded-full border border-white/30 px-6 text-sm font-semibold text-white transition-colors hover:border-white"
              >
                {secondary.label}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
