import type { TemplatePageProps } from "@/registry/template-types";
import { pageSeoDescription } from "@/templates/corporate-construction/utils/page-seo";
import { BlogPageBody } from "@/templates/industrial-civil/components/blog-page-body";
import { Eyebrow, PillLink } from "@/templates/industrial-civil/components/pill-link";
import { IndustrialFrame } from "@/templates/industrial-civil/components/industrial-frame";
import { RecordHeading, pageContainer } from "@/templates/industrial-civil/components/record-heading";
import { readIndustrialSite } from "@/templates/industrial-civil/utils/site-content";
import { previewHref } from "@/templates/industrial-civil/utils/preview-href";

export function IndustrialCivilBlogPage(props: TemplatePageProps) {
  const { company, posts } = readIndustrialSite(props.payload);
  const lead =
    pageSeoDescription(props.payload, "blog") ??
    "Perspectives on construction, project delivery, coordination, and the work behind complex commercial projects.";
  const href = (path: string) => previewHref(props.mode, path);

  return (
    <IndustrialFrame {...props}>
      <RecordHeading
        eyebrow="Insights / Journal"
        title="Ideas, experience, and insight from the field."
        lead={lead}
        image={company?.heroImage ?? posts.find((post) => post.image?.url)?.image}
        primaryHref={href("/contact")}
        secondaryHref={href("/projects")}
      />
      <BlogPageBody posts={posts} mode={props.mode} image={company?.heroImage} />
      {posts.length ? (
        <section className="bg-[#03071E]" aria-labelledby="blog-cta-heading">
          <div className={`${pageContainer} flex flex-wrap items-end justify-between gap-8 py-20`}>
            <div>
              <Eyebrow light>Next project</Eyebrow>
              <h2 id="blog-cta-heading" className="mt-4 max-w-[14ch] text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.05] font-bold text-white">
                Have a project in mind?
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-white/70">Let&apos;s talk about the work ahead.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <PillLink href={href("/contact")}>Start a project</PillLink>
              <PillLink href={href("/contact")} variant="outline-light">
                Contact us
              </PillLink>
            </div>
          </div>
        </section>
      ) : null}
    </IndustrialFrame>
  );
}
