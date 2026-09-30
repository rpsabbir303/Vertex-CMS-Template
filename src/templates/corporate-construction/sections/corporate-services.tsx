import type { TemplateRenderMode } from "@/registry/template-types";
import type { Service, ServicesSectionCopy } from "@/templates/shared/cms/types/services";
import { HomeServicesIndex } from "@/templates/corporate-construction/components/home-services-index";

type CorporateServicesProps = {
  services: Service[];
  copy?: ServicesSectionCopy;
  mode: TemplateRenderMode;
};

export function CorporateServices({ services, copy, mode }: CorporateServicesProps) {
  if (!services.length) return null;
  return <HomeServicesIndex services={services} copy={copy} mode={mode} />;
}
