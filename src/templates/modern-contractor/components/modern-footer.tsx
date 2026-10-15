import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { CmsSitePayload } from "@/templates/shared/cms/types";
import type { Company } from "@/templates/shared/cms/types/company";
import type { Contact } from "@/templates/shared/cms/types/contact";
import { getVisibleServices, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { resolvePublicNavigation } from "@/templates/shared/navigation/resolve-navigation";
import {
  footerExploreItems,
  footerLegalItems,
  footerSocialLinks,
} from "@/templates/corporate-construction/components/footer-nav-groups";
import { resolveCorporateContact } from "@/templates/corporate-construction/utils/resolve-corporate-contact";
import { MODERN_CONTRACTOR_SLUG } from "@/templates/modern-contractor/config/template-slug";

type ModernFooterProps = {
  payload: CmsSitePayload;
  company: Company;
  contact: Contact | null;
  mode: TemplateRenderMode;
};

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";

export function ModernFooter({ payload, company, contact, mode }: ModernFooterProps) {
  const previewBase = mode === "preview" ? `/preview/${MODERN_CONTRACTOR_SLUG}` : "";
  const withPreview = (href: string) =>
    href === "/" && previewBase ? previewBase : `${previewBase}${href}`;

  const explore = footerExploreItems(resolvePublicNavigation(payload));
  const services = getVisibleServices(payload.services).slice(0, 6);
  const legalItems = footerLegalItems(unwrapEnvelope(payload.optionalPages) ?? []);
  const { phone, email, addressInline } = resolveCorporateContact(company, contact);
  const socialLinks = footerSocialLinks(company.socialLinks, 5);

  return (
    <footer className="bg-[#0a0c0b] px-5 py-14 text-white min-[960px]:px-8">
      <h2 className="sr-only">Site footer</h2>
      <div className="mx-auto grid max-w-[1360px] gap-10 min-[960px]:grid-cols-12">
        <div className="min-[960px]:col-span-4">
          <p className={`${display} text-2xl tracking-[0.08em] uppercase`}>{company.name}</p>
          {company.tagline?.trim() ? <p className="mt-3 max-w-xs text-sm text-white/60">{company.tagline}</p> : null}
          <Link
            href={withPreview("/contact")}
            className="mt-8 inline-flex rounded-full bg-[#C8FF2E] px-5 py-3 text-sm font-semibold text-[#0a0c0b]"
          >
            Start a project
          </Link>
        </div>
        {explore.length ? (
          <nav aria-label="Explore" className="min-[960px]:col-span-3">
            <p className="text-[12px] tracking-[0.16em] text-[#C8FF2E] uppercase">Company</p>
            <ul className="mt-4 space-y-2">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link href={withPreview(item.href)} className="text-sm text-white/75 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        {services.length ? (
          <nav aria-label="Capabilities" className="min-[960px]:col-span-3">
            <p className="text-[12px] tracking-[0.16em] text-[#C8FF2E] uppercase">Expertise</p>
            <ul className="mt-4 space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href={withPreview(`/services/${service.slug}`)} className="text-sm text-white/75 hover:text-white">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <div className="min-[960px]:col-span-2">
          <p className="text-[12px] tracking-[0.16em] text-[#C8FF2E] uppercase">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {phone ? (
              <li>
                <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
              </li>
            ) : null}
            {email ? (
              <li>
                <a href={`mailto:${email}`} className="break-all">
                  {email}
                </a>
              </li>
            ) : null}
            {addressInline ? <li>{addressInline}</li> : null}
          </ul>
          {socialLinks.length ? (
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm text-white/60">
              {socialLinks.map((social) => (
                <li key={social.url}>
                  <a href={social.url} target="_blank" rel="noreferrer" className="hover:text-white">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1360px] flex-wrap justify-between gap-4 border-t border-white/10 pt-5 text-xs text-white/45">
        <p>
          © {new Date().getFullYear()} {company.name}
          {company.foundedYear ? ` · Est. ${company.foundedYear}` : ""}
        </p>
        {legalItems.length ? (
          <ul className="flex flex-wrap gap-x-4">
            {legalItems.map((item) => (
              <li key={item.id}>
                <Link href={withPreview(item.href)} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </footer>
  );
}
