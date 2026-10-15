import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import { getSortedCollectionItems, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { blogCategoryNavLabels, getPublishedBlogPosts, resolveFeaturedBlogPost } from "@/templates/corporate-construction/utils/blog-content";
import { pageSeoDescription } from "@/templates/corporate-construction/utils/page-seo";
import { ModernBlogBody } from "@/templates/modern-contractor/components/modern-blog-body";
import { ModernPageFrame } from "@/templates/modern-contractor/components/modern-page-frame";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { pad } from "@/templates/modern-contractor/theme/ui";

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";

const BLOG_LEAD =
  "Perspectives on construction, project delivery, coordination, and the work behind complex commercial projects.";

export function ModernContractorBlogPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const posts = props.payload.blog ? getSortedCollectionItems(props.payload.blog) : [];
  const published = getPublishedBlogPosts(posts);
  const featured = resolveFeaturedBlogPost(published);
  const topicCount = blogCategoryNavLabels(published).filter((category) => category !== "All").length;
  const lead = pageSeoDescription(props.payload, "blog") || BLOG_LEAD;
  const heroImage = featured?.image;
  const homeHref = previewHref(props.mode, "/");
  const contactHref = previewHref(props.mode, "/contact");

  return (
    <ModernPageFrame {...props}>
      <section className="relative min-h-[640px] overflow-hidden bg-[#0a0c0b] text-white min-[960px]:min-h-[684px]">
        {heroImage?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#0a0c0b_8%,rgba(10,12,11,0.82)_42%,rgba(10,12,11,0.38)_100%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="relative mx-auto flex min-h-[640px] max-w-[1360px] flex-col px-5 pt-32 pb-14 min-[960px]:min-h-[684px] min-[960px]:px-8 min-[960px]:pt-36">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-3 text-[12px] tracking-[0.16em] text-white/70 uppercase">
            <Link href={homeHref} className="hover:text-white">
              Home
            </Link>
            <span aria-hidden>›</span>
            <span className="text-white">Blog</span>
          </nav>
          <div className="mt-auto grid items-end gap-10 pt-16 min-[960px]:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
                <span className="h-px w-8 bg-[#C8FF2E]" />
                Insights / Journal
              </p>
              <h1 className={`${display} mt-5 text-[clamp(2.4rem,3.6vw,3.5rem)] leading-[1.28] font-semibold tracking-[-0.04em] text-balance`}>
                Ideas, experience, and insight from the field.
              </h1>
              <p className="mt-6 max-w-[40rem] text-[17px] leading-relaxed text-white/78">{lead}</p>
            </div>
            {published.length ? (
              <aside className="border-l border-white/25 py-2 pl-6">
                <p className="text-[11px] tracking-[0.14em] text-[#9ba49c] uppercase">Articles on record</p>
                <p className={`${display} mt-2 text-[2.4rem] leading-none font-semibold`}>{pad(published.length)}</p>
                {topicCount ? (
                  <p className="mt-3 text-[13px] tracking-[0.08em] text-white/80 uppercase">
                    {topicCount} {topicCount === 1 ? "topic" : "topics"}
                  </p>
                ) : null}
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      <ModernBlogBody mode={props.mode} posts={posts} knowledgeImage={company?.heroImage} />

      <section className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24">
        <div className="mx-auto max-w-[1360px] rounded-tl-[34px] rounded-tr-[34px] rounded-br-[34px] rounded-bl-[110px] border border-white/15 bg-[linear-gradient(135deg,#111512,#050706)] px-8 py-14 min-[960px]:px-20 min-[960px]:py-[70px]">
          <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
            <span className="h-px w-8 bg-[#C8FF2E]" />
            Start a project
          </p>
          <h2 className={`${display} mt-5 max-w-3xl text-[clamp(2.4rem,4vw,3.8rem)] leading-[1.32] font-semibold tracking-[-0.04em]`}>
            Have a project in mind?
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">Let&apos;s talk about the work ahead.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={contactHref} className="inline-flex rounded-full bg-[#C8FF2E] px-6 py-3.5 text-sm font-semibold text-[#0a0c0b]">
              Start a project
            </Link>
            <Link href={contactHref} className="inline-flex rounded-full border border-white/30 px-6 py-3.5 text-sm font-semibold text-white">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </ModernPageFrame>
  );
}
