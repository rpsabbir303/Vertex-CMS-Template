import type { TemplatePageProps } from "@/registry/template-types";
import type { OptionalPage } from "@/templates/shared/cms/types/pages";
import { LegalPageLayout } from "@/templates/shared/legal/legal-page-layout";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";

type CorporateLegalPageProps = TemplatePageProps & {
  page: OptionalPage;
};

/** Corporate Construction wrapper around the shared LegalPage layout. */
export function CorporateConstructionLegalPage({ page, ...props }: CorporateLegalPageProps) {
  return (
    <CorporatePageFrame {...props}>
      {/* Clear the floating header */}
      <div className="pt-24 md:pt-28">
        <LegalPageLayout page={page} />
      </div>
    </CorporatePageFrame>
  );
}
