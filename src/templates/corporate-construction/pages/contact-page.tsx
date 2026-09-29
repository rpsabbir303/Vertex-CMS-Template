import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import {
  CorporateContactHero,
} from "@/templates/corporate-construction/components/corporate-contact-hero";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { ContactInquirySection } from "@/templates/corporate-construction/sections/contact-inquiry";
import { ContactLocationSection } from "@/templates/corporate-construction/sections/contact-location";
import { resolveCorporateContact } from "@/templates/corporate-construction/utils/resolve-corporate-contact";

function contactPageSeo(payload: TemplatePageProps["payload"]) {
  return unwrapEnvelope(payload.pageSeo)?.find((entry) => entry.pageSlug === "contact");
}

export function CorporateConstructionContactPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const contactEnvelope = unwrapEnvelope(props.payload.contact);
  const pageSeo = contactPageSeo(props.payload);
  const contact = resolveCorporateContact(company, contactEnvelope);

  const heroEyebrow = "Contact";
  const heroTitle = company?.name
    ? `Discuss your next project with ${company.name}`
    : "Ready to discuss your project";
  const heroDescription =
    pageSeo?.description?.trim() ||
    (company?.name
      ? `Share scope, schedule, and site conditions with ${company.name}.`
      : "Share scope, schedule, and site conditions with the project team.");
  const heroImage = company?.heroImage?.url ? company.heroImage : null;

  return (
    <CorporatePageFrame {...props}>
      <CorporateContactHero
        eyebrow={heroEyebrow}
        title={heroTitle}
        description={heroDescription}
        image={heroImage}
        inquiryCta={contact.hasForm}
      />

      <ContactInquirySection contact={contact} companyName={company?.name} />

      <ContactLocationSection contact={contact} />
    </CorporatePageFrame>
  );
}
