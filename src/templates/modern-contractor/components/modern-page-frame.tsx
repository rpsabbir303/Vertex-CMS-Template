import type { ReactNode } from "react";
import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { ModernFontProvider } from "@/templates/modern-contractor/theme/fonts";
import { ModernFooter } from "./modern-footer";
import { ModernHeader } from "./modern-header";

type ModernPageFrameProps = TemplatePageProps & {
  children: ReactNode;
};

export function ModernPageFrame({ payload, mode, currentPath, children }: ModernPageFrameProps) {
  const company = unwrapEnvelope(payload.company);
  const contact = unwrapEnvelope(payload.contact);

  return (
    <ModernFontProvider>
      {company ? (
        <ModernHeader
          payload={payload}
          company={company}
          contact={contact}
          currentPath={currentPath}
          mode={mode}
        />
      ) : null}
      <main id="main-content">{children}</main>
      {company ? <ModernFooter payload={payload} company={company} contact={contact} mode={mode} /> : null}
    </ModernFontProvider>
  );
}
