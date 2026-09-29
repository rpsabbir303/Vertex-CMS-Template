import type { TemplatePageProps } from "@/registry/template-types";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { composeCorporateHomeSections } from "@/templates/corporate-construction/sections/compose-home-sections";

export function CorporateConstructionHomePage(props: TemplatePageProps) {
  return (
    <CorporatePageFrame {...props}>
      {composeCorporateHomeSections(props.payload, props.mode)}
    </CorporatePageFrame>
  );
}
