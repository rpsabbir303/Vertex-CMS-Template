import Link from "next/link";
import type { TemplateRenderMode } from "@/registry/template-types";
import type { Company } from "@/templates/shared/cms/types/company";
import type { Contact } from "@/templates/shared/cms/types/contact";
import { resolveCorporateContact } from "@/templates/corporate-construction/utils/resolve-corporate-contact";
import { Reveal } from "@/templates/modern-contractor/components/ui/reveal";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { ui } from "@/templates/modern-contractor/theme/ui";
import { cn } from "@/utils/cn";

type ModernContactCtaProps = {
  company: Company;
  contact: Contact | null;
  mode: TemplateRenderMode;
};

export function ModernContactCta({ company, contact, mode }: ModernContactCtaProps) {
  const resolved = resolveCorporateContact(company, contact);

  return (
    <section className="bg-[var(--color-surface)] px-3 pb-6 md:px-6" aria-labelledby="modern-cta-heading">
      <div className="vertex-container">
        <Reveal>
          <div className="grid gap-8 rounded-[2rem] bg-[var(--color-primary)] px-6 py-12 text-white md:px-12 md:py-16 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className={cn(ui.mono, "text-white/55")}>Next conversation</p>
              <h2
                id="modern-cta-heading"
                className="mt-3 max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(2.1rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.03em]"
              >
                Tell us about the building.
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/70">
                Share scope, schedule, and site conditions with {company.name}.
              </p>
            </div>
            <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end">
              {resolved.phone ? (
                <a
                  href={`tel:${resolved.phone.replace(/\s/g, "")}`}
                  className="font-[family-name:var(--font-display)] text-3xl font-medium tracking-[-0.03em] hover:text-[var(--color-accent-muted)]"
                >
                  {resolved.phone}
                </a>
              ) : null}
              {resolved.email ? (
                <a href={`mailto:${resolved.email}`} className="text-sm text-white/70 hover:text-white">
                  {resolved.email}
                </a>
              ) : null}
              <Link href={previewHref(mode, "/contact")} className={cn(ui.btnOnDark, "mt-2")}>
                Start a project
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
