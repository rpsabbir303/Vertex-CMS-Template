import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { CmsSitePayload } from "@/templates/shared/cms/types";
import type { Company } from "@/templates/shared/cms/types/company";
import type { Contact } from "@/templates/shared/cms/types/contact";
import { MobileNav } from "@/templates/shared/layout/mobile-nav";
import {
  isNavItemActive,
  resolvePublicNavigation,
} from "@/templates/shared/navigation/resolve-navigation";
import { ButtonLink } from "@/templates/shared/components/ui/button-link";
import { CorporateUtilityBar } from "@/templates/corporate-construction/components/corporate-utility-bar";
import { resolveCorporateContact } from "@/templates/corporate-construction/utils/resolve-corporate-contact";
import { cn } from "@/utils/cn";

type CorporateHeaderProps = {
  payload: CmsSitePayload;
  company: Company;
  contact: Contact | null;
  currentPath?: string;
  mode: TemplateRenderMode;
};

export function CorporateHeader({
  payload,
  company,
  contact,
  currentPath = "/",
  mode,
}: CorporateHeaderProps) {
  const navItems = resolvePublicNavigation(payload);
  const previewBase =
    mode === "preview" ? "/preview/corporate-construction" : "";
  const withPreview = (href: string) =>
    href === "/" && previewBase ? previewBase : `${previewBase}${href}`;

  const resolvedPath =
    currentPath === "/" && previewBase ? previewBase : currentPath;

  const isActive = (href: string) =>
    isNavItemActive(withPreview(href), resolvedPath);

  const resolvedContact = resolveCorporateContact(company, contact);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <CorporateUtilityBar contact={resolvedContact} />

      <div className="vertex-container flex items-center gap-4 py-4 lg:gap-6 lg:py-5">
        <Link
          href={withPreview("/")}
          className="flex min-w-0 max-w-[min(100%,20rem)] items-center gap-3"
          aria-label={`${company.name} home`}
        >
          {company.logo?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={company.logo.url}
              alt=""
              className="h-10 w-10 shrink-0 object-contain md:h-11 md:w-11"
              width={44}
              height={44}
            />
          ) : null}
          <span className="min-w-0 text-balance font-[family-name:var(--font-display)] text-base font-semibold leading-tight text-[var(--color-primary)] sm:text-lg md:text-xl">
            {company.name}
          </span>
        </Link>

        <nav
          className="ml-auto hidden items-center gap-0.5 lg:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={withPreview(item.href)}
              className={cn(
                "relative inline-flex min-h-11 items-center px-3 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]",
                isActive(item.href)
                  ? "text-[var(--color-secondary)]"
                  : "text-[var(--color-text)] hover:text-[var(--color-secondary)]",
              )}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
              {isActive(item.href) ? (
                <span className="absolute inset-x-3 bottom-2 h-0.5 bg-[var(--color-accent)]" />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          <ButtonLink
            href={withPreview("/contact")}
            className="hidden rounded-none sm:inline-flex"
          >
            Request a consultation
          </ButtonLink>
          <MobileNav
            items={navItems.map((item) => ({
              ...item,
              href: withPreview(item.href),
            }))}
            currentPath={resolvedPath}
            ctaHref={withPreview("/contact")}
            ctaLabel="Request a consultation"
          />
        </div>
      </div>
    </header>
  );
}
