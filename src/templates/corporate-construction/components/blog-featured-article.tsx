import type { TemplateRenderMode } from "@/registry/template-types";
import type { BlogPost } from "@/templates/shared/cms/types/blog";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { formatReadingTime } from "@/templates/corporate-construction/utils/blog-content";
import { formatPostDateListing } from "@/templates/corporate-construction/utils/format-date";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type BlogFeaturedArticleProps = {
  mode: TemplateRenderMode;
  post: BlogPost;
};

export function BlogFeaturedArticle({ mode, post }: BlogFeaturedArticleProps) {
  const href = previewHref(mode, `/blog/${post.slug}`);
  const meta = [formatPostDateListing(post.publishedAt), formatReadingTime(post)].filter(Boolean).join(" · ");

  return (
    <section className="bg-[var(--color-surface)]" aria-labelledby="blog-featured-heading">
      <a href={href} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]">
        <div className="vertex-container grid gap-10 pb-24 md:grid-cols-12 md:items-center md:gap-14 md:pb-32 lg:gap-16">
          <Reveal plate as="figure" className="md:col-span-7 lg:col-span-7">
            <div className={cn(ui.plate, "aspect-[4/3] max-h-[28rem] w-full md:aspect-[16/11] md:max-h-[36rem] lg:max-h-[40rem]")}>
              <div className="h-full transition-transform duration-700 group-hover:scale-[1.02] motion-reduce:transition-none">
                <CmsImageMedia
                  image={post.image}
                  aspect="auto"
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  priority
                />
              </div>
            </div>
          </Reveal>
          <div className="md:col-span-5 lg:col-span-5">
            <p className={cn(ui.mono, "text-[var(--color-accent)]")}>Featured</p>
            {post.category ? (
              <p className={cn(ui.mono, "mt-4 text-[var(--color-text-muted)]")}>{post.category}</p>
            ) : null}
            <h2
              id="blog-featured-heading"
              className={cn(ui.h2, "mt-4 max-w-[16ch] text-balance transition-colors group-hover:text-[var(--color-accent)]")}
            >
              {post.title}
            </h2>
            {post.excerpt ? <p className={cn(ui.lead, "mt-6 max-w-lg text-pretty")}>{post.excerpt}</p> : null}
            {meta ? <p className={cn(ui.mono, "mt-6 text-[var(--color-text-muted)]")}>{meta}</p> : null}
            <span className={cn(ui.link, "mt-8 inline-flex transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none")}>
              Read article <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </a>
    </section>
  );
}
