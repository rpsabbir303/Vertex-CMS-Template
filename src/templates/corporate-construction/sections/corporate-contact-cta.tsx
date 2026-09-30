import type { TemplateRenderMode } from "@/registry/template-types";
import { ArchitecturalGrid } from "@/templates/corporate-construction/components/ui/architectural-grid";
import type { Company } from "@/templates/shared/cms/types/company";
import type { Contact } from "@/templates/shared/cms/types/contact";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { resolveCorporateContact } from "@/templates/corporate-construction/utils/resolve-corporate-contact";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type CorporateContactCtaProps = {
  company: Company;
  contact: Contact | null;
  mode: TemplateRenderMode;
};

/**
 * 12 — Final call. Giant line, one button, live contact facts.
 */
export function CorporateContactCta({ company, contact, mode }: CorporateContactCtaProps) {
  const { phone, email, addressInline } = resolveCorporateContact(company, contact);
  const facts = [
    ["Phone", phone, phone ? `tel:${phone.replace(/\s/g, "")}` : undefined],
    ["Email", email, email ? `mailto:${email}` : undefined],
    ["Office", addressInline, undefined],
  ].filter((f): f is [string, string, string | undefined] => Boolean(f[1]));

  return (
    <section className="relative overflow-hidden bg-[var(--color-primary)] text-white" aria-labelledby="cta-heading">
      <ArchitecturalGrid tone="dark" className="absolute inset-0" />
      <div className="vertex-container relative py-28 md:py-40">
        <p className={ui.eyebrow}>Next project</p>
        <h2
          id="cta-heading"
          className="mt-6 font-[family-name:var(--font-display)] text-[clamp(3.5rem,11vw,12rem)] font-semibold leading-[0.85] tracking-[-0.06em]"
        >
          Let’s build.
        </h2>
        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="max-w-md text-pretty text-lg leading-relaxed text-white/70">
              Tell {company.name} about the site, the schedule, and what the building has to do. A
              preconstruction lead will reply.
            </p>
            <a href={previewHref(mode, "/contact")} className={cn(ui.btnAccent, "mt-8")}>
              Start a project
            </a>
          </div>
          {facts.length ? (
            <dl className="grid gap-6 sm:grid-cols-3 lg:col-span-6">
              {facts.map(([label, value, href]) => (
                <div key={label} className="border-t border-white/15 pt-4">
                  <dt className={cn(ui.mono, "text-white/45")}>{label}</dt>
                  <dd className="mt-2 text-sm font-medium">
                    {href ? (
                      <a href={href} className="break-all transition-colors hover:text-[var(--color-accent)]">
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </section>
  );
}
