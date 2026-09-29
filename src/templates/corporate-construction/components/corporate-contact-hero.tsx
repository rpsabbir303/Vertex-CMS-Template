import type { CompanyAddress } from "@/templates/shared/cms/types/company";
import type { CmsImage } from "@/templates/shared/cms/types/media";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { formatAddressInline } from "@/utils/format-address";
import { cn } from "@/utils/cn";

export type CorporateContactHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: CmsImage | null;
  phone?: string;
  email?: string;
  address?: CompanyAddress | null;
  /** When true, primary CTA scrolls to the inquiry form on this page */
  inquiryCta?: boolean;
};

const INQUIRY_TARGET = "contact-inquiry";

export function CorporateContactHero({
  eyebrow,
  title,
  description,
  image,
  phone,
  email,
  address,
  inquiryCta = false,
}: CorporateContactHeroProps) {
  const locationLine = address ? formatAddressInline(address) : undefined;
  const hasContactHints = Boolean(phone || email || locationLine);
  const hasImage = Boolean(image?.url);

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
      aria-labelledby="contact-page-hero-heading"
    >
      <div className="vertex-container py-12 md:py-14 lg:py-16">
        <div
          className={cn(
            "grid min-w-0 gap-10 md:gap-12",
            hasImage ? "lg:grid-cols-12 lg:items-start lg:gap-x-10" : "max-w-3xl",
          )}
        >
          <div className={cn("min-w-0", hasImage && "lg:col-span-5")}>
            <div className="border-l-2 border-[var(--color-accent)] pl-5 md:pl-6">
              {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
                  {eyebrow}
                </p>
              ) : null}
              <h1
                id="contact-page-hero-heading"
                className={cn(
                  "text-balance break-words font-[family-name:var(--font-display)] text-3xl font-semibold leading-[1.1] text-[var(--color-primary)] md:text-4xl lg:text-[2.35rem]",
                  eyebrow ? "mt-3" : undefined,
                )}
              >
                {title}
              </h1>
            </div>

            {description ? (
              <p className="mt-5 max-w-lg text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)] md:text-lg">
                {description}
              </p>
            ) : null}

            {inquiryCta ? (
              <a
                href={`#${INQUIRY_TARGET}`}
                className="mt-6 inline-flex min-h-11 items-center gap-2 bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white no-underline transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] motion-reduce:transition-none"
              >
                Start an inquiry
                <span aria-hidden>→</span>
              </a>
            ) : null}

            {hasContactHints ? (
              <ul className="mt-8 grid gap-4 border-t border-[var(--color-border)] pt-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
                {phone ? (
                  <li className="min-w-0">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                      Project inquiries
                    </p>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="mt-1 inline-flex min-h-11 items-center break-words text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:underline"
                    >
                      {phone}
                    </a>
                  </li>
                ) : null}
                {email ? (
                  <li className="min-w-0">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                      General questions
                    </p>
                    <a
                      href={`mailto:${email}`}
                      className="mt-1 inline-flex min-h-11 items-center break-all text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:underline"
                    >
                      {email}
                    </a>
                  </li>
                ) : null}
                {locationLine ? (
                  <li className="min-w-0 sm:col-span-2 lg:col-span-1">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                      Office
                    </p>
                    <p className="mt-1 text-pretty break-words text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {locationLine}
                    </p>
                  </li>
                ) : null}
              </ul>
            ) : null}
          </div>

          {hasImage ? (
            <div className="min-w-0 lg:col-span-7 lg:pt-2">
              <div className="relative">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -left-3 top-6 hidden h-[calc(100%-3rem)] w-px bg-[var(--color-border)] lg:block"
                />
                <CmsImageMedia
                  image={image}
                  aspect="wide"
                  className="w-full max-h-[16rem] ring-1 ring-[var(--color-border)] sm:max-h-[18rem] md:max-h-[20rem] lg:max-h-[22rem]"
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  priority
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Anchor id for the inquiry block below the hero (set on the contact page section). */
export const CONTACT_INQUIRY_SECTION_ID = INQUIRY_TARGET;
