import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { CmsSitePayload } from "@/templates/shared/cms/types";
import type { Company, SocialLink } from "@/templates/shared/cms/types/company";
import type { Contact } from "@/templates/shared/cms/types/contact";
import { getVisibleServices, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { resolvePublicNavigation } from "@/templates/shared/navigation/resolve-navigation";
import { resolveCorporateContact } from "@/templates/corporate-construction/utils/resolve-corporate-contact";
import {
  companyFooterDescription,
  footerExploreItems,
  footerLegalItems,
  footerSocialLinks,
} from "./footer-nav-groups";
import { FooterSocialIcon } from "./footer-social-icon";

type CorporateFooterProps = {
  payload: CmsSitePayload;
  company: Company;
  contact: Contact | null;
  mode: TemplateRenderMode;
};

const muted = "#A8B4C2";
const text = "#F8FAFC";
const border = "rgba(168, 180, 194, 0.18)";

const navLinkClass =
  "inline-flex min-h-10 max-w-full items-center py-1 text-sm text-[#F8FAFC]/90 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none";

const utilityLinkClass =
  "inline-flex min-h-10 items-center text-xs text-[#A8B4C2] transition-colors hover:text-[#F8FAFC] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none";

const socialLinkClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center text-[#A8B4C2] transition-colors hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none";

function FooterSocialList({ links }: { links: SocialLink[] }) {
  if (!links.length) {
    return null;
  }

  return (
    <ul className="flex flex-wrap items-center gap-0.5" aria-label="Social media">
      {links.map((link) => (
        <li key={link.url}>
          <a
            href={link.url}
            className={socialLinkClass}
            rel="noopener noreferrer"
            target="_blank"
            aria-label={link.label}
          >
            <FooterSocialIcon platform={link.platform} />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function CorporateFooter({
  payload,
  company,
  contact,
  mode,
}: CorporateFooterProps) {
  const previewBase = mode === "preview" ? "/preview/corporate-construction" : "";
  const withPreview = (href: string) =>
    href === "/" && previewBase ? previewBase : `${previewBase}${href}`;

  const explore = footerExploreItems(resolvePublicNavigation(payload));
  const services = getVisibleServices(payload.services);
  const servicesHref = withPreview("/services");
  const contactHref = withPreview("/contact");

  const legalItems = footerLegalItems(unwrapEnvelope(payload.optionalPages) ?? []);
  const resolved = resolveCorporateContact(company, contact);
  const { phone, email, addressBlock } = resolved;
  const socialLinks = footerSocialLinks(company.socialLinks, 5);
  const description = companyFooterDescription(company.description);

  const hasBrand = Boolean(
    company.logo?.url || company.name || description || company.foundedYear,
  );
  const hasExplore = explore.length > 0;
  const hasServices = services.length > 0;
  const hasContact = Boolean(addressBlock || phone || email);
  const hasSocial = socialLinks.length > 0;
  const hasLegal = legalItems.length > 0;
  const hasPrimary = hasBrand || hasExplore || hasServices || hasContact;
  const hasUtility = Boolean(company.name || hasLegal);

  if (!hasPrimary && !hasUtility && !hasSocial) {
    return null;
  }

  return (
    <footer className="bg-[#0B1F33]" style={{ color: text }}>
      <div aria-hidden className="h-0.5 bg-[var(--color-accent)]" />
      <h2 className="sr-only">Site footer</h2>

      {hasPrimary ? (
        <div className="vertex-container py-[4.5rem] md:py-20 lg:py-[5.25rem]">
          <div className="grid gap-10 md:grid-cols-12 md:gap-x-8 md:gap-y-10 lg:gap-x-12 lg:gap-y-0">
            {hasBrand ? (
              <div className="min-w-0 md:col-span-12 lg:col-span-4">
                <div className="flex min-w-0 items-start gap-3.5">
                  {company.logo?.url ? (
                    <Link
                      href={withPreview("/")}
                      className="shrink-0 bg-white p-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                      aria-label={`${company.name} home`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={company.logo.url}
                        alt=""
                        className="h-11 w-11 object-contain md:h-12 md:w-12"
                        width={48}
                        height={48}
                      />
                    </Link>
                  ) : null}
                  <div className="min-w-0 pt-0.5">
                    {company.name ? (
                      <Link
                        href={withPreview("/")}
                        className="block text-balance break-words font-[family-name:var(--font-display)] text-xl font-semibold leading-snug text-[#F8FAFC] hover:text-white md:text-2xl"
                      >
                        {company.name}
                      </Link>
                    ) : null}
                    {company.foundedYear ? (
                      <p
                        className="mt-2 text-[0.6875rem] font-medium uppercase tracking-[0.18em]"
                        style={{ color: muted }}
                      >
                        Established {company.foundedYear}
                      </p>
                    ) : null}
                  </div>
                </div>

                {description ? (
                  <p
                    className="mt-5 max-w-md text-pretty break-words text-sm leading-relaxed md:text-[0.9375rem] md:leading-relaxed"
                    style={{ color: muted }}
                  >
                    {description}
                  </p>
                ) : null}

                <Link
                  href={contactHref}
                  className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
                >
                  Start a project
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  >
                    →
                  </span>
                </Link>

                {/* Desktop/tablet: social under brand. Mobile: rendered after Contact. */}
                {hasSocial ? (
                  <div className="mt-8 hidden border-t pt-6 md:block" style={{ borderColor: border }}>
                    <FooterSocialList links={socialLinks} />
                  </div>
                ) : null}
              </div>
            ) : null}

            {hasExplore ? (
              <nav
                aria-label="Explore"
                className="min-w-0 border-t pt-8 md:col-span-4 md:border-t-0 md:pt-0 lg:col-span-2"
                style={{ borderColor: border }}
              >
                <h3
                  className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: muted }}
                >
                  Explore
                </h3>
                <ul className="mt-4 space-y-1">
                  {explore.map((item) => (
                    <li key={item.href}>
                      <Link href={withPreview(item.href)} className={navLinkClass}>
                        <span className="min-w-0 break-words">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            {hasServices ? (
              <nav
                aria-label="Capabilities"
                className="min-w-0 border-t pt-8 md:col-span-4 md:border-t-0 md:pt-0 lg:col-span-3"
                style={{ borderColor: border }}
              >
                <h3
                  className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: muted }}
                >
                  Capabilities
                </h3>
                <ul className="mt-4 space-y-1">
                  {services.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={service.href ?? `${servicesHref}#${service.slug}`}
                        className={navLinkClass}
                      >
                        <span className="min-w-0 break-words">{service.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}

            {hasContact ? (
              <div
                className="min-w-0 border-t pt-8 md:col-span-4 md:border-t-0 md:pt-0 lg:col-span-3"
                style={{ borderColor: border }}
              >
                <h3
                  className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: muted }}
                >
                  Contact
                </h3>
                <address className="mt-4 space-y-3 not-italic text-sm leading-relaxed">
                  {addressBlock ? (
                    <p
                      className="whitespace-pre-line text-pretty break-words"
                      style={{ color: muted }}
                    >
                      {addressBlock}
                    </p>
                  ) : null}
                  {phone ? (
                    <p>
                      <a
                        className={navLinkClass}
                        href={`tel:${phone.replace(/\s/g, "")}`}
                      >
                        {phone}
                      </a>
                    </p>
                  ) : null}
                  {email ? (
                    <p>
                      <a className={`${navLinkClass} break-all`} href={`mailto:${email}`}>
                        {email}
                      </a>
                    </p>
                  ) : null}
                </address>
              </div>
            ) : null}

            {/* Mobile-only social after Contact */}
            {hasSocial ? (
              <div
                className="min-w-0 border-t pt-8 md:hidden"
                style={{ borderColor: border }}
              >
                <FooterSocialList links={socialLinks} />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {hasUtility ? (
        <div style={{ borderTop: `1px solid ${border}` }}>
          <div className="vertex-container flex flex-col gap-3 py-5 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-8 md:gap-y-2 md:py-5">
            {company.name ? (
              <p
                className="order-2 min-w-0 text-pretty break-words text-xs md:order-1"
                style={{ color: muted }}
              >
                © {new Date().getFullYear()} {company.name}
              </p>
            ) : null}

            {hasLegal ? (
              <nav aria-label="Legal" className="order-1 min-w-0 md:order-2 md:ml-auto">
                <ul className="flex flex-wrap gap-x-5 gap-y-0">
                  {legalItems.map((item) => (
                    <li key={item.id}>
                      <Link href={withPreview(item.href)} className={utilityLinkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </div>
      ) : null}
    </footer>
  );
}
