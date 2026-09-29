import type { TemplatePageProps } from "@/registry/template-types";
import {
  unwrapCollectionItems,
  unwrapEnvelope,
} from "@/templates/shared/cms/resolve-content";
import type { OptionalPage } from "@/templates/shared/cms/types/pages";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { SafetyApproach } from "@/templates/corporate-construction/components/safety-approach";
import { SafetyCommitment } from "@/templates/corporate-construction/components/safety-commitment";
import { SafetyDocuments } from "@/templates/corporate-construction/components/safety-documents";
import { SafetyHero } from "@/templates/corporate-construction/components/safety-hero";
import { planSafetyPageContent } from "@/templates/corporate-construction/components/safety-page-content";
import { SafetyPractices } from "@/templates/corporate-construction/components/safety-practices";
import { SafetyCta } from "@/templates/corporate-construction/sections/safety-cta";

type CorporateSafetyPageProps = TemplatePageProps & {
  page: OptionalPage;
};

export function CorporateConstructionSafetyPage({
  page,
  ...props
}: CorporateSafetyPageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const certifications = unwrapCollectionItems(props.payload.certifications);
  const content = planSafetyPageContent(page, certifications);

  const hasApproach = Boolean(content.approachHeading || content.approachParagraphs.length);
  const hasCommitment = Boolean(content.commitmentHeading);

  return (
    <CorporatePageFrame {...props}>
      <SafetyHero
        title={content.headline}
        description={content.heroDescription}
        image={content.heroImage}
      />

      {hasApproach ? (
        <SafetyApproach
          heading={content.approachHeading}
          paragraphs={content.approachParagraphs}
        />
      ) : null}

      <SafetyPractices practices={content.practices} />

      <SafetyDocuments records={content.records} />

      {hasCommitment && content.commitmentHeading ? (
        <SafetyCommitment
          heading={content.commitmentHeading}
          body={content.commitmentBody}
        />
      ) : null}

      <SafetyCta mode={props.mode} companyName={company?.name} />
    </CorporatePageFrame>
  );
}
