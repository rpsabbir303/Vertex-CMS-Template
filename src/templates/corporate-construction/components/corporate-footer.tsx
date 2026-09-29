import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { CmsSitePayload } from "@/templates/shared/cms/types";
import type { Company } from "@/templates/shared/cms/types/company";
import type { Contact } from "@/templates/shared/cms/types/contact";
import { getVisibleServices, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { resolvePublicNavigation } from "@/templates/shared/navigation/resolve-navigation";
import { formatAddress } from "@/utils/format-address";
import { companyFooterDescription, footerExploreItems } from "./footer-nav-groups";
import { FooterSocialIcon } from "./footer-social-icon";

type CorporateFooterProps = {
  payload: CmsSitePayload;
  company: Company;
  contact: Contact | null;
  mode: TemplateRenderMode;
};

const linkClass =
  "inline-flex min-h-11 max-w-full items-center text-sm text-white/85 transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none";

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

  const legalPages = (unwrapEnvelope(payload.optionalPages) ?? []).filter(
    (page) => !page.showInNavigation && page.slug && page.title,
  );

  const address = contact?.address ?? company.address;
  const addressBlock = address ? formatAddress(address) : null;
  const phone = contact?.phone ?? company.phone;
  const email = contact?.email ?? company.email;
  const socialLinks = company.socialLinks?.filter((link) => link.url && link.label) ?? [];
  const description = companyFooterDescription(company.description);

  const hasBrand = Boolean(company.logo?.url || company.name || description || company.foundedYear);
  const hasExplore = explore.length > 0;
  const hasServices = services.length > 0;
  const hasContact = Boolean(addressBlock || phone || email);
  const hasSocial = socialLinks.length > 0;
  const hasLegal = legalPages.length > 0;
  const hasIndex = hasExplore || hasServices || hasContact;

  if (!hasBrand && !hasIndex && !hasLegal && !company.name) {
    return null;
  }

  return (
    <footer className="bg-[#081726] text-[var(--color-text-inverse)]">
      <div aria-hidden className="h-0.5 bg-[var(--color-accent)]" />
      <h2 className="sr-only">Site footer</h2>

      {hasBrand || hasIndex ? (
        <div className="vertex-container py-8 md:py-9 lg:py-10">
          <div className="grid gap-8 md:grid-cols-12 md:gap-x-8 md:gap-y-10 lg:gap-x-10">
            {hasBrand ? (
              <div className="min-w-0 md:col-span-12 lg:order-1 lg:col-span-5">
                <div className="flex min-w-0 items-start gap-3">
                  {company.logo?.url ? (
                    <Link
                      href={withPreview("/")}
                      className="shrink-0 bg-white p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={company.logo.url}
                        alt=""
                        className="h-10 w-10 object-contain md:h-11 md:w-11"
                        width={44}
                        height={44}
                      />
                    </Link>
                  ) : null}
                  <div className="min-w-0">
                    {company.name ? (
                      <Link
                        href={withPreview("/")}
                        className="block text-balance break-words font-[family-name:var(--font-display)] text-xl font-semibold leading-tight text-white hover:text-white/90 md:text-2xl"
                      >
                        {company.name}
                      </Link>
                    ) : null}
                    {company.foundedYear ? (
                      <p className="mt-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-[#AAB6C3]">
                        Established {company.foundedYear}
                      </p>
                    ) : null}
                  </div>
                </div>
                {description ? (
                  <p className="mt-4 max-w-md text-pretty break-words text-sm leading-relaxed text-white/75">
                    {description}
                  </p>
                ) : null}
                <Link
                  href={contactHref}
                  className="group mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none"
                >
                  Start a project
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                  >
                    →
                  </span>
                </Link>
              </div>
            ) : null}

            {hasContact ? (
              <div className="min-w-0 border-t border-white/12 pt-6 md:col-span-4 md:border-t-0 md:pt-0 lg:order-4 lg:col-span-3">
                <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#AAB6C3]">
                  Contact
                </h3>
                <address className="mt-3 space-y-2.5 not-italic text-sm leading-relaxed text-white/85">
                  {addressBlock ? (
                    <p className="whitespace-pre-line text-pretty break-words text-white/75">
                      {addressBlock}
                    </p>
                  ) : null}
                  {phone ? (
                    <p>
                      <a className={linkClass} href={`tel:${phone.replace(/\s/g, "")}`}>
                        {phone}
                      </a>
                    </p>
                  ) : null}
                  {email ? (
                    <p>
                      <a className={`${linkClass} break-all`} href={`mailto:${email}`}>
                        {email}
                      </a>
                    </p>
                  ) : null}
                </address>
              </div>
            ) : null}

            {hasExplore ? (
              <div className="min-w-0 border-t border-white/12 pt-6 md:col-span-4 md:border-t-0 md:pt-0 lg:order-2 lg:col-span-2">
                <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#AAB6C3]">
                  Explore
                </h3>
                <ul className="mt-2">
                  {explore.map((item, index) => (
                    <li key={item.href}>
                      <Link href={withPreview(item.href)} className={`${linkClass} gap-3`}>
                        <span className="w-6 shrink-0 tabular-nums text-xs text-[var(--color-accent)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 break-words">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {hasServices ? (
              <div className="min-w-0 border-t border-white/12 pt-6 md:col-span-4 md:border-t-0 md:pt-0 lg:order-3 lg:col-span-2">
                <h3 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[#AAB6C3]">
                  Capabilities
                </h3>
                <ul className="mt-2 columns-2 gap-x-6 lg:columns-1">
                  {services.map((service) => (
                    <li key={service.id} className="break-inside-avoid">
                      <Link
                        href={service.href ?? `${servicesHref}#${service.slug}`}
                        className={linkClass}
                      >
                        <span className="break-words">{service.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="border-t border-white/12">
        <div className="vertex-container flex flex-col gap-4 py-5 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-8 md:gap-y-3 md:py-5">
          <p className="order-3 min-w-0 text-pretty break-words text-xs text-[#AAB6C3] md:order-1">
            © {new Date().getFullYear()} {company.name}
          </p>
          {hasLegal ? (
            <nav aria-label="Legal" className="order-2 min-w-0 md:order-2">
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {legalPages.map((page) => (
                  <li key={page.id}>
                    <Link
                      href={withPreview(`/${page.slug}`)}
                      className="inline-flex min-h-11 items-center text-xs text-[#AAB6C3] transition-colors hover:text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          {hasSocial ? (
            <ul className="order-1 flex flex-wrap items-center gap-1 md:order-3">
              {socialLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#AAB6C3] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={link.label}
                  >
                    <FooterSocialIcon platform={link.platform} />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {mode === "preview" ? (
          <p className="vertex-container border-t border-white/10 pb-4 pt-3 text-center text-[0.65rem] text-white/40">
            Vertex CMS template preview — demo content
          </p>
        ) : null}
      </div>
    </footer>
  );
}
