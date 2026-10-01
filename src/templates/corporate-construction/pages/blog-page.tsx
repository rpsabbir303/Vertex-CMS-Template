import type { TemplatePageProps } from "@/registry/template-types";
import { getSortedCollectionItems, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { BlogHero } from "@/templates/corporate-construction/components/blog-hero";
import { CorporateBlogPageBody } from "@/templates/corporate-construction/components/corporate-blog-page-body";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CtaBand } from "@/templates/corporate-construction/components/ui/cta-band";
import { getPublishedBlogPosts } from "@/templates/corporate-construction/utils/blog-content";
import { pageSeoDescription } from "@/templates/corporate-construction/utils/page-seo";
export function CorporateConstructionBlogPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const posts = props.payload.blog ? getSortedCollectionItems(props.payload.blog) : [];
  const published = getPublishedBlogPosts(posts);
  const lead = pageSeoDescription(props.payload, "blog");
  const knowledgeImage = company?.heroImage;

  return (
    <CorporatePageFrame {...props}>
      <BlogHero lead={lead} postCount={published.length} />

      <CorporateBlogPageBody mode={props.mode} posts={posts} knowledgeImage={knowledgeImage} />

      <CtaBand
        mode={props.mode}
        title="Have a project in mind?"
        body="Let's talk about the work ahead."
        primaryLabel="Start a project"
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </CorporatePageFrame>
  );
}
