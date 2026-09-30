import type { TemplateRenderMode } from "@/registry/template-types";
import type { Service, ServicesSectionCopy } from "@/templates/shared/cms/types/services";
import { HomeServicesIndex } from "@/templates/corporate-construction/components/home-services-index";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";

type CorporateServicesProps = {
  /** Already filtered to visible services in tenant display order */
  services: Service[];
  copy?: ServicesSectionCopy;
  mode: TemplateRenderMode;
};

export function CorporateServices({ services, copy, mode }: CorporateServicesProps) {
  if (!services.length) {
    return null;
  }

  return (
    <HomeServicesIndex
      services={services}
      copy={copy}
      servicesHref={previewHref(mode, "/services")}
    />
  );
}
