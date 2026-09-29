import type { ReactNode } from "react";
import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { CorporateFooter } from "./corporate-footer";
import { CorporateHeader } from "./corporate-header";
import { CorporateFontProvider } from "@/templates/corporate-construction/theme/fonts";

type CorporatePageFrameProps = TemplatePageProps & {
  children: ReactNode;
};

export function CorporatePageFrame({
  payload,
  mode,
  currentPath,
  children,
}: CorporatePageFrameProps) {
  const company = unwrapEnvelope(payload.company);
  const contact = unwrapEnvelope(payload.contact);

  return (
    <CorporateFontProvider>
      {company ? (
        <CorporateHeader
          payload={payload}
          company={company}
          currentPath={currentPath}
          mode={mode}
        />
      ) : null}
      <main id="main-content">{children}</main>
      {company ? (
        <CorporateFooter
          payload={payload}
          company={company}
          contact={contact}
          mode={mode}
        />
      ) : null}
    </CorporateFontProvider>
  );
}
