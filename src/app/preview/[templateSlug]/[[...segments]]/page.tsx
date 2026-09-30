import {
  generatePreviewMetadata,
  TemplatePreviewPage,
  type PreviewPageProps,
} from "@/app/preview/render-template-preview";

/**
 * Single preview route for home + nested pages.
 * Avoids Next.js conflicts between `[templateSlug]/page` and `[...segments]`.
 */
export function generateMetadata(props: PreviewPageProps) {
  return generatePreviewMetadata(props);
}

export default function Page(props: PreviewPageProps) {
  return TemplatePreviewPage(props);
}
