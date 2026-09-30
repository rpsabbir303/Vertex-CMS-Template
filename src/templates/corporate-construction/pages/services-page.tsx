import type { TemplatePageProps } from "@/registry/template-types";
import { getVisibleServices, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { CmsImageMedia } from "@/templates/shared/media/cms-image";
import { CorporatePageFrame } from "@/templates/corporate-construction/components/corporate-page-frame";
import { CtaBand } from "@/templates/corporate-construction/components/ui/cta-band";
import { PageIntro } from "@/templates/corporate-construction/components/ui/page-intro";
import { Reveal } from "@/templates/corporate-construction/components/ui/reveal";
import { CorporateDelivery } from "@/templates/corporate-construction/sections/corporate-delivery";
import { pageSeoDescription, splitParagraphs } from "@/templates/corporate-construction/utils/page-seo";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { pad, ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

/** Bento spans for the capability mosaic (index → column span at lg). */
function tileSpan(index: number, total: number): string {
  if (total === 1) return "lg:col-span-12";
  if (total === 2) return "lg:col-span-6";
  // 8/4, 4/8, 4/4/4 rhythm
  const pattern = ["lg:col-span-8", "lg:col-span-4", "lg:col-span-4", "lg:col-span-8", "lg:col-span-4", "lg:col-span-4", "lg:col-span-4"];
  return pattern[index % pattern.length];
}

export function CorporateConstructionServicesPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const collection = unwrapEnvelope(props.payload.services);
  const services = getVisibleServices(props.payload.services);
  const section = collection?.section;
  const count = services.length;

  const title = section?.title?.trim() || "What we build.";
  const eyebrow = section?.eyebrow?.trim() || "Capabilities";
  const lead = section?.description?.trim() || pageSeoDescription(props.payload, "services");

  return (
    <CorporatePageFrame {...props}>
      <PageIntro
        eyebrow={eyebrow}
        title={title}
        lead={lead}
        meta={count ? [`${count} ${count === 1 ? "capability" : "capabilities"}`] : []}
        actions={
          <a href={previewHref(props.mode, "/contact")} className={ui.btn}>
            Start a project
          </a>
        }
      />

      {!count ? (
        <section className="vertex-container py-16 md:py-20">
          <p className="text-[var(--color-text-muted)]">Services have not been published yet.</p>
        </section>
      ) : null}

      {count ? (
        <section className="bg-[var(--color-surface)]" aria-label="Capability index">
          <div className="vertex-container pb-24 md:pb-32">
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
              {services.map((service, index) => {
                const wide = tileSpan(index, count) === "lg:col-span-8" || count <= 2;
                return (
                  <Reveal
                    as="li"
                    key={service.id}
                    delay={(index % 4) as 0 | 1 | 2 | 3}
                    className={cn("min-w-0 md:col-span-1", tileSpan(index, count))}
                  >
                    <a
                      href={`#${service.slug}`}
                      className={cn(ui.plate, "group relative block h-[24rem] bg-[var(--color-primary)] text-white lg:h-[30rem]")}
                    >
                      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none">
                        <CmsImageMedia
                          image={service.image}
                          aspect="auto"
                          className="h-full opacity-80"
                          sizes={wide ? "(min-width: 1440px) 66vw, 100vw" : "(min-width: 1440px) 33vw, 100vw"}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--cc-ink)]/90 via-[var(--cc-ink)]/30 to-transparent" aria-hidden />
                      <span className={cn(ui.mono, "absolute left-5 top-5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur")}>
                        {pad(index + 1)}
                      </span>
                      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                        <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,2.6vw,2.75rem)] font-semibold leading-none tracking-[-0.03em]">
                          {service.title}
                        </h2>
                        {service.summary ? (
                          <p className="mt-3 max-w-lg text-pretty text-sm leading-relaxed text-white/75 md:text-base">
                            {service.summary}
                          </p>
                        ) : null}
                      </div>
                    </a>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {count ? (
        <section className="bg-[var(--color-surface-muted)]" aria-label="Capability detail">
          <div className="vertex-container py-24 md:py-32">
            <ol className={cn("divide-y", ui.rule)}>
              {services.map((service, index) => {
                const paragraphs = splitParagraphs(service.description);
                return (
                  <li key={service.id} id={service.slug} className="scroll-mt-32 grid gap-8 py-14 lg:grid-cols-12 lg:py-20">
                    <div className="lg:col-span-4">
                      <p className={cn(ui.mono, "text-[var(--color-accent)]")}>{pad(index + 1)}</p>
                      <h2 className={cn(ui.h3, "mt-4 max-w-[14ch]")}>{service.title}</h2>
                    </div>
                    <Reveal className="lg:col-span-5">
                      {service.summary ? <p className={cn(ui.lead, "!text-lg")}>{service.summary}</p> : null}
                      <div className={cn("space-y-4", service.summary && "mt-5")}>
                        {paragraphs.map((p) => (
                          <p key={p.slice(0, 32)} className={ui.body}>
                            {p}
                          </p>
                        ))}
                      </div>
                      <a href={previewHref(props.mode, "/contact")} className={cn(ui.link, "mt-6")}>
                        Discuss {service.title.toLowerCase()} <span aria-hidden>→</span>
                      </a>
                    </Reveal>
                    {service.image?.url ? (
                      <Reveal plate className={cn(ui.plateSm, "h-56 lg:col-span-3 lg:h-72")}>
                        <CmsImageMedia image={service.image} aspect="auto" className="h-full" sizes="(min-width: 1440px) 25vw, 100vw" />
                      </Reveal>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      ) : null}

      {count ? <CorporateDelivery /> : null}

      {count ? (
        <CtaBand
          mode={props.mode}
          title="Scope it with us."
          body={
            company?.name
              ? `Share drawings or an early program. ${company.name} will return a real price and schedule.`
              : undefined
          }
          secondary={{ label: "See the work", href: "/projects" }}
        />
      ) : null}
    </CorporatePageFrame>
  );
}
