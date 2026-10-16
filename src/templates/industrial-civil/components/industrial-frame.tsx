import type { ReactNode } from "react";
import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import { footerLegalItems } from "@/templates/corporate-construction/components/footer-nav-groups";
import { FooterSocialIcon } from "@/templates/corporate-construction/components/footer-social-icon";
import { IndustrialHeader } from "@/templates/industrial-civil/components/industrial-header";
import { ArrowIcon } from "@/templates/industrial-civil/components/pill-link";
import { IndustrialFontProvider } from "@/templates/industrial-civil/theme/fonts";
import { formatAddressLines, readIndustrialSite } from "@/templates/industrial-civil/utils/site-content";
import { previewHref } from "@/templates/industrial-civil/utils/preview-href";

export function IndustrialFrame({
  payload,
  mode,
  currentPath,
  children,
  overlayHeader = true,
}: TemplatePageProps & { children: ReactNode; overlayHeader?: boolean }) {
  const site = readIndustrialSite(payload);
  const company = site.company;
  const contact = site.contact;
  const phone = contact?.phone || company?.phone;
  const email = contact?.email || company?.email;
  const addressLines = formatAddressLines(contact?.address ?? company?.address);
  const legal = footerLegalItems(site.optionalPages);
  const hours = contact?.hours ?? [];
  const social = company?.socialLinks?.filter((link) => link.platform !== "x").slice(0, 4) ?? [];
  const year = new Date().getFullYear();
  const companyName = company?.name ?? "Industrial / Civil";

  return (
    <IndustrialFontProvider>
      <div className="flex min-h-dvh flex-col bg-white text-[#03071E]">
        <IndustrialHeader
          homeHref={previewHref(mode, "/")}
          companyName={companyName}
          logoUrl={company?.logo?.url}
          quoteHref={previewHref(mode, "/contact")}
          nav={site.navigation.map((item) => {
            const href = previewHref(mode, item.href);
            return { label: item.label, href, active: currentPath === href };
          })}
        />
        <main id="main-content" className={`flex-1 ${overlayHeader ? "" : "pt-[116px]"}`}>
          {children}
        </main>
        <footer className="bg-white">
          <div className="mx-auto grid max-w-[1320px] gap-10 px-3 pt-20 pb-14 [&>*]:min-w-0 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-[1.15fr_0.7fr_1fr_1.15fr] min-[1180px]:gap-12">
            <div>
              <Link href={previewHref(mode, "/")} className="flex items-center gap-2.5 text-[22px] font-bold text-[#FF6610]">
                {company?.logo?.url ? <img src={company.logo.url} alt="" className="h-8 w-8" /> : null}
                {companyName}
              </Link>
              {company?.tagline || company?.description ? (
                <p className="mt-5 max-w-[19rem] text-base leading-[26px] text-[#5c6570]">
                  {company?.description?.split(/\n\s*\n/)[0] ?? company?.tagline}
                </p>
              ) : null}
              {social.length ? (
                <ul className="mt-6 flex gap-3">
                  {social.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.label}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF1E8] text-[#FF6610] transition-colors hover:bg-[#FF6610] hover:text-white"
                      >
                        <FooterSocialIcon platform={link.platform} className="!h-4 !w-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div>
              <p className="text-[20px] font-bold">About Link</p>
              <ul className="mt-6 space-y-4">
                {site.navigation.map((item) => (
                  <li key={`f-${item.href}`}>
                    <Link href={previewHref(mode, item.href)} className="text-base text-[#5c6570] transition-colors hover:text-[#FF6610]">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[20px] font-bold">Contact Us</p>
              <ul className="mt-6 space-y-5 text-base text-[#5c6570]">
                {email ? (
                  <li className="flex gap-3">
                    <FooterGlyph path="M3 6.5h18v11H3zM3.5 7l8.5 6.5L20.5 7" />
                    <a href={`mailto:${email}`} className="break-all hover:text-[#FF6610]">
                      {email}
                    </a>
                  </li>
                ) : null}
                {addressLines.length ? (
                  <li className="flex gap-3">
                    <FooterGlyph path="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <span>{addressLines.slice(0, 3).join(", ")}</span>
                  </li>
                ) : null}
                {phone ? (
                  <li className="flex gap-3">
                    <FooterGlyph path="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
                    <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="hover:text-[#FF6610]">
                      {phone}
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
            <div>
              <p className="text-[20px] font-bold">Office Hours</p>
              {hours.length ? (
                <ul className="mt-6 space-y-2 text-base text-[#5c6570]">
                  {hours.map((entry) => (
                    <li key={entry.days}>
                      <span className="font-semibold text-[#03071E]">{entry.days}</span>
                      <span className="block">{entry.hours}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <Link
                href={previewHref(mode, "/contact")}
                className="mt-6 flex items-center justify-between rounded-[30px] bg-[#F6F8FA] py-2 pr-2 pl-5 text-base text-[#5c6570] transition-colors hover:text-[#03071E]"
              >
                <span className="min-w-0 truncate">{email ?? "Contact"}</span>
                <span className="inline-flex shrink-0 items-center gap-3 rounded-[25px] bg-[#FF6610] py-2 pr-2 pl-4 font-bold text-white">
                  Contact
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#03071E]">
                    <ArrowIcon />
                  </span>
                </span>
              </Link>
            </div>
          </div>
          <div className="mx-auto max-w-[1320px] px-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e6e8ec] py-6 text-base text-[#5c6570]">
              <p>{`© Copyright ${year} ${companyName}. All rights reserved`}</p>
              <p className="flex flex-wrap items-center gap-2">
                {legal.map((item, index) => (
                  <span key={item.id} className="flex items-center gap-2">
                    {index ? <span aria-hidden>|</span> : null}
                    <Link href={previewHref(mode, item.href)} className="hover:text-[#FF6610]">
                      {item.label}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </IndustrialFontProvider>
  );
}

function FooterGlyph({ path }: { path: string }) {
  return (
    <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#03071E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
