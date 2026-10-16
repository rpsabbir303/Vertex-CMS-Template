import type { TemplatePageProps } from "@/registry/template-types";
import { ContactForm } from "@/templates/shared/components/forms/contact-form";
import { FooterSocialIcon } from "@/templates/corporate-construction/components/footer-social-icon";
import { IndustrialFrame } from "@/templates/industrial-civil/components/industrial-frame";
import { RecordHeading, bodyCopy, pageContainer } from "@/templates/industrial-civil/components/record-heading";
import { formatAddressLines, readIndustrialSite } from "@/templates/industrial-civil/utils/site-content";
import { previewHref } from "@/templates/industrial-civil/utils/preview-href";

export function IndustrialCivilContactPage(props: TemplatePageProps) {
  const { company, contact } = readIndustrialSite(props.payload);
  const phone = contact?.phone || company?.phone;
  const email = contact?.email || company?.email;
  const address = formatAddressLines(contact?.address ?? company?.address);
  const social = company?.socialLinks?.filter((link) => link.platform !== "x") ?? [];

  return (
    <IndustrialFrame {...props}>
      <RecordHeading
        eyebrow="Contact"
        title="Get A Free Quote"
        lead={company?.name}
        image={company?.heroImage}
        primaryHref={previewHref(props.mode, "/contact")}
        secondaryHref={previewHref(props.mode, "/projects")}
      />
      <section className="bg-[#F6F8FA] py-[100px]">
        <div className={`${pageContainer} grid items-start gap-8 min-[960px]:grid-cols-[0.8fr_1.2fr]`}>
          <div className="rounded-[16px] bg-white p-8">
            <h2 className="text-[28px] font-bold text-[#03071E]">Contact Us</h2>
            <ul className={`mt-6 space-y-4 ${bodyCopy}`}>
              {phone ? (
                <li>
                  <span className="block text-sm font-semibold text-[#03071E]">Phone</span>
                  <a href={`tel:${phone.replace(/[^+\d]/g, "")}`} className="hover:text-[#FF6610]">
                    {phone}
                  </a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <span className="block text-sm font-semibold text-[#03071E]">Email</span>
                  <a href={`mailto:${email}`} className="break-all hover:text-[#FF6610]">
                    {email}
                  </a>
                </li>
              ) : null}
              {address.length ? (
                <li>
                  <span className="block text-sm font-semibold text-[#03071E]">Office</span>
                  {address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </li>
              ) : null}
            </ul>
            {contact?.hours?.length ? (
              <div className="mt-8 border-t border-[#e6e8ec] pt-6">
                <p className="text-[20px] font-bold text-[#03071E]">Office Hours</p>
                <ul className={`mt-3 space-y-2 ${bodyCopy}`}>
                  {contact.hours.map((entry) => (
                    <li key={entry.days}>
                      <span className="font-semibold text-[#03071E]">{entry.days}</span>
                      <span className="block">{entry.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {social.length ? (
              <ul className="mt-8 flex gap-3">
                {social.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF1E8] text-[#FF6610] transition-colors hover:bg-[#FF6610] hover:text-white"
                    >
                      <FooterSocialIcon platform={link.platform} className="!h-4 !w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="rounded-[16px] bg-white p-8">
            <ContactForm
              config={contact?.form}
              className="[&_button]:mt-2 [&_button]:w-fit [&_button]:rounded-[25px] [&_button]:bg-[#FF6610] [&_button]:px-8 [&_button]:py-3 [&_button]:text-base [&_button]:font-bold [&_button]:text-white [&_button]:hover:bg-[#03071E] [&_input]:rounded-[14px] [&_input]:border-[#e6e8ec] [&_select]:rounded-[14px] [&_select]:border-[#e6e8ec] [&_textarea]:rounded-[14px] [&_textarea]:border-[#e6e8ec]"
            />
          </div>
        </div>
      </section>
    </IndustrialFrame>
  );
}
