import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Company } from "@/templates/shared/cms/types/company";
import type { Contact } from "@/templates/shared/cms/types/contact";
import { ButtonLink } from "@/templates/shared/components/ui/button-link";
import { resolveCorporateContact } from "@/templates/corporate-construction/utils/resolve-corporate-contact";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";

type CorporateContactCtaProps = {
  company: Company;
  contact: Contact | null;
  mode: TemplateRenderMode;
};

export function CorporateContactCta({
  company,
  contact,
  mode,
}: CorporateContactCtaProps) {
  const resolved = resolveCorporateContact(company, contact);
  const { phone, email, hasDetails } = resolved;

  if (!hasDetails && !phone && !email) {
    return null;
  }

  const contactPageHref = previewHref(mode, "/contact");

  return (
    <section
      className="relative overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-surface)]"
      aria-labelledby="corporate-contact-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "4.5rem 4.5rem",
        }}
      />

      <div className="vertex-container relative py-20 md:py-24 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="min-w-0 lg:col-span-8">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-white/50">
              Start a project
            </p>
            <h2
              id="corporate-contact-heading"
              className="mt-5 max-w-[14ch] text-balance break-words font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.02] tracking-[-0.03em] md:text-5xl lg:text-[3.75rem]"
            >
              Ready to build something that lasts?
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/60 md:text-lg">
              Tell us about scope, schedule, and location. Our team will help determine the right
              next step—from early pricing through field delivery.
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-4 lg:justify-end">
            <ButtonLink
              href={contactPageHref}
              className="rounded-none border-transparent bg-[var(--color-accent)] px-6 text-white hover:bg-[var(--color-accent-hover)]"
            >
              Start a project
            </ButtonLink>
            {phone ? (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="inline-flex min-h-11 items-center justify-center rounded-none border border-white/40 px-5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact us
              </a>
            ) : (
              <Link
                href={contactPageHref}
                className="inline-flex min-h-11 items-center justify-center rounded-none border border-white/40 px-5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact us
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
