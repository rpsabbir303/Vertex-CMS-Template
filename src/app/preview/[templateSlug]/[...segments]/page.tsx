import {
  generatePreviewMetadata,
  TemplatePreviewPage,
  type PreviewPageProps,
} from "@/app/preview/render-template-preview";

export function generateMetadata(props: PreviewPageProps) {
  return generatePreviewMetadata(props);
}

export default function Page(props: PreviewPageProps) {
  return TemplatePreviewPage(props);
}
