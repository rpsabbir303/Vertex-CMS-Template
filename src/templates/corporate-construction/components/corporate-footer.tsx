import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { CmsSitePayload } from "@/templates/shared/cms/types";
import type { Company } from "@/templates/shared/cms/types/company";
import type { Contact } from "@/templates/shared/cms/types/contact";
import { getVisibleServices, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { resolvePublicNavigation } from "@/templates/shared/navigation/resolve-navigation";
import { resolveCorporateContact } from "@/templates/corporate-construction/utils/resolve-corporate-contact";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { footerExploreItems, footerLegalItems, footerSocialLinks } from "./footer-nav-groups";
import { FooterSocialIcon } from "./footer-social-icon";
import { cn } from "@/utils/cn";

type CorporateFooterProps = {
  payload: CmsSitePayload;
  company: Company;
  contact: Contact | null;
  mode: TemplateRenderMode;
};

const link =
  "inline-flex min-h-9 items-center text-sm text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/**
 * Footer: oversized wordmark, three spec columns, utility rule.
 */
export function CorporateFooter({ payload, company, contact, mode }: CorporateFooterProps) {
  const previewBase = mode === "preview" ? "/preview/corporate-construction" : "";
  const withPreview = (href: string) =>
    href === "/" && previewBase ? previewBase : `${previewBase}${href}`;

  const explore = footerExploreItems(resolvePublicNavigation(payload));
  const services = getVisibleServices(payload.services);
  const legalItems = footerLegalItems(unwrapEnvelope(payload.optionalPages) ?? []);
  const { phone, email, addressBlock } = resolveCorporateContact(company, contact);
  const socialLinks = footerSocialLinks(company.socialLinks, 5);

  return (
    <footer className="bg-[var(--cc-ink)] text-white">
      <h2 className="sr-only">Site footer</h2>
      <div className="vertex-container pt-20 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className={cn(ui.mono, "text-white/45")}>
              {company.foundedYear ? `Est. ${company.foundedYear}` : "Commercial construction"}
            </p>
            <p className="mt-5 max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
              {company.name}
            </p>
            <Link href={withPreview("/contact")} className={cn(ui.btnOnDark, "mt-10")}>
              Start a project
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {explore.length ? (
              <nav aria-label="Explore">
                <p className={cn(ui.mono, "text-white/45")}>Explore</p>
                <ul className="mt-4 space-y-1">
                  {explore.map((item) => (
                    <li key={item.href}>
                      <Link href={withPreview(item.href)} className={link}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
            {services.length ? (
              <nav aria-label="Capabilities">
                <p className={cn(ui.mono, "text-white/45")}>Capabilities</p>
                <ul className="mt-4 space-y-1">
                  {services.map((service) => (
                    <li key={service.id}>
                      <Link
                        href={service.href ?? `${withPreview("/services")}#${service.slug}`}
                        className={link}
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
            {phone || email || addressBlock || socialLinks.length ? (
              <div>
                <p className={cn(ui.mono, "text-white/45")}>Contact</p>
                {addressBlock || phone || email ? (
                  <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed text-white/70">
                    {addressBlock ? <p className="whitespace-pre-line">{addressBlock}</p> : null}
                    {phone ? (
                      <p>
                        <a className={link} href={`tel:${phone.replace(/\s/g, "")}`}>
                          {phone}
                        </a>
                      </p>
                    ) : null}
                    {email ? (
                      <p>
                        <a className={cn(link, "break-all")} href={`mailto:${email}`}>
                          {email}
                        </a>
                      </p>
                    ) : null}
                  </address>
                ) : null}
                {socialLinks.length ? (
                  <ul
                    className="mt-4 flex items-center gap-1"
                    aria-label="Social media"
                  >
                    {socialLinks.map((s) => (
                      <li key={s.url}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                          <FooterSocialIcon platform={s.platform} />
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div
          className="mt-20 grid min-w-0 grid-cols-1 items-center gap-3 border-t border-white/15 py-5 md:grid-cols-[1fr_auto_1fr] md:gap-x-6"
          aria-label="Footer legal"
        >
          <p className={cn(ui.mono, "text-left text-white/40")}>
            © {new Date().getFullYear()} {company.name}
          </p>
          <p className={cn(ui.mono, "text-left text-white/40 md:text-center")}>
            Built by Vertex Software and Tech. Inc.
          </p>
          {legalItems.length ? (
            <nav
              aria-label="Legal policies"
              className="flex flex-wrap gap-x-6 gap-y-2 text-left md:justify-end md:text-right"
            >
              {legalItems.map((item) => (
                <Link
                  key={item.id}
                  href={withPreview(item.href)}
                  className={cn(ui.mono, "text-white/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white")}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : (
            <span className="hidden md:block" aria-hidden />
          )}
        </div>
      </div>
    </footer>
  );
}
