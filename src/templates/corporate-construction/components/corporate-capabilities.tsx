import Link from "next/link";
import type { Service, ServicesSectionCopy } from "@/templates/shared/cms/types/services";
import { CapabilityTile } from "./capability-tile";
import { planCapabilityField } from "./capability-field-plan";

type CorporateCapabilitiesProps = {
  /** Section copy from the CMS; the template supplies a neutral default title */
  copy?: ServicesSectionCopy;
  /** Visible services in tenant display order */
  services: Service[];
  /** Fallback link target for services without their own link */
  servicesHref: string;
};

const DEFAULT_TITLE = "Capabilities";

/**
 * Capability Field
 *
 * An architectural, hairline-gridded field. The intro tile is part of the
 * grid rather than a separate header, which keeps the section compact. The
 * tenant supplies only content and order; the plan decides every placement.
 */
export function CorporateCapabilities({
  copy,
  services,
  servicesHref,
}: CorporateCapabilitiesProps) {
  if (!services.length) {
    return null;
  }

  const plan = planCapabilityField(services.length);
  const title = copy?.title?.trim() || DEFAULT_TITLE;
  const hasCta = Boolean(copy?.cta?.label && copy.cta.href);

  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby="corporate-services-heading">
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div className="grid grid-cols-12 gap-px border border-[var(--color-border)] bg-[var(--color-border)]">
          <div
            className={`flex min-w-0 flex-col gap-6 bg-[var(--color-surface-muted)] p-6 text-[var(--color-text)] md:flex-row md:items-end md:justify-between md:gap-10 md:p-8 lg:flex-col lg:items-stretch lg:justify-start lg:gap-6 ${plan.introPlacement}`}
          >
            <div className="min-w-0 md:max-w-xl lg:max-w-none">
              <span aria-hidden className="block h-1 w-10 bg-[var(--color-accent)]" />
              {copy?.eyebrow ? (
                <p className="mt-5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
                  {copy.eyebrow}
                </p>
              ) : null}
              <h2
                id="corporate-services-heading"
                className={`text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.1] text-[var(--color-primary)] md:text-4xl lg:text-[2.5rem] ${copy?.eyebrow ? "mt-3" : "mt-5"}`}
              >
                {title}
              </h2>
            </div>
            {copy?.description || hasCta ? (
              <div className="min-w-0 md:max-w-sm lg:mt-2 lg:max-w-none">
                {copy?.description ? (
                  <p className="text-pretty break-words leading-relaxed text-[var(--color-text-muted)]">
                    {copy.description}
                  </p>
                ) : null}
                {hasCta && copy?.cta ? (
                  <Link
                    href={copy.cta.href}
                    className={`inline-flex min-h-11 items-center gap-3 border border-[var(--color-primary)] px-5 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] motion-reduce:transition-none ${copy?.description ? "mt-6" : ""}`}
                  >
                    {copy.cta.label}
                    <span aria-hidden>→</span>
                  </Link>
                ) : null}
              </div>
            ) : null}
          </div>

          <ul role="list" className="contents">
            {services.map((service, index) => (
              <CapabilityTile
                key={service.id}
                service={service}
                index={index}
                plan={plan.tiles[index]}
                href={service.href ?? `${servicesHref}#${service.slug}`}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
