import type { TemplatePageProps } from "@/registry/template-types";
import {
  getSortedCollectionItems,
  unwrapCollectionItems,
  unwrapEnvelope,
} from "@/templates/shared/cms/resolve-content";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CorporateAboutHero } from "@/templates/corporate-construction/components/corporate-about-hero";
import { CorporateAboutApproach } from "@/templates/corporate-construction/sections/about-approach";
import { CorporateAboutCta } from "@/templates/corporate-construction/sections/about-cta";
import { CorporateAboutOverview } from "@/templates/corporate-construction/sections/about-overview";
import { CorporateAboutStory } from "@/templates/corporate-construction/sections/about-story";
import { CorporateTeam } from "@/templates/corporate-construction/sections/corporate-team";
import { CorporateTrust } from "@/templates/corporate-construction/sections/corporate-trust";

function splitDescription(description?: string): string[] {
  if (!description?.trim()) {
    return [];
  }
  return description
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function CorporateConstructionAboutPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const team = getSortedCollectionItems(props.payload.team);
  const certifications = unwrapCollectionItems(props.payload.certifications);
  const paragraphs = splitDescription(company?.description);
  const introduction = paragraphs[0];
  /**
   * Short descriptions stay in the hero only.
   * Longer multi-paragraph copy expands in Who We Are.
   * Company Story uses founded year (CMS) as the history signal.
   */
  const overviewParagraphs = paragraphs.length > 1 ? paragraphs : [];
  const hasHeroImage = Boolean(company?.heroImage?.url);

  if (!company) {
    return (
      <CorporatePageFrame {...props}>
        <section className="vertex-container py-20">
          <p className="text-[var(--color-text-muted)]">
            Company information is unavailable. This template does not display placeholder
            marketing content when CMS data is missing.
          </p>
        </section>
      </CorporatePageFrame>
    );
  }

  return (
    <CorporatePageFrame {...props}>
      <CorporateAboutHero
        company={company}
        mode={props.mode}
        introduction={introduction}
      />

      <CorporateAboutOverview
        company={company}
        paragraphs={overviewParagraphs}
        showImage={!hasHeroImage}
      />

      <CorporateAboutStory foundedYear={company.foundedYear} storyParagraphs={[]} />

      <CorporateAboutApproach />

      {certifications.length ? <CorporateTrust certifications={certifications} /> : null}

      {team.length ? <CorporateTeam members={team} mode={props.mode} /> : null}

      <CorporateAboutCta companyName={company.name} mode={props.mode} />
    </CorporatePageFrame>
  );
}
