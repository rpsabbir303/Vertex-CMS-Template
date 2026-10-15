import type { TemplatePageProps } from "@/registry/template-types";
import { ModernPageFrame } from "@/templates/modern-contractor/components/modern-page-frame";
import { ModernHomeScreen } from "@/templates/modern-contractor/sections/modern-home-screen";

export function ModernContractorHomePage(props: TemplatePageProps) {
  return (
    <ModernPageFrame {...props}>
      <ModernHomeScreen payload={props.payload} mode={props.mode} />
    </ModernPageFrame>
  );
}
