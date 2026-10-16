import type { TemplatePageProps } from "@/registry/template-types";
import { ArrowIcon, Eyebrow, PillLink } from "@/templates/industrial-civil/components/pill-link";
import { IndustrialFrame } from "@/templates/industrial-civil/components/industrial-frame";
import { RecordHeading, bodyCopy, pageContainer, sectionTitle } from "@/templates/industrial-civil/components/record-heading";
import { readIndustrialSite, splitParagraphs } from "@/templates/industrial-civil/utils/site-content";
import { previewHref } from "@/templates/industrial-civil/utils/preview-href";

const DELIVERY = [
  { title: "Discover", body: "Site, program, and budget reviewed before anything is priced." },
  { title: "Plan", body: "Logistics, sequencing, and procurement set with the trades." },
  { title: "Build", body: "Superintendent-led field work against a published schedule." },
  { title: "Control", body: "Cost, quality, and safety tracked and reported every week." },
  { title: "Deliver", body: "Commissioning, documentation, and a clean handover." },
];

export function IndustrialCivilServicesPage(props: TemplatePageProps) {
  const { company, services, servicesSection } = readIndustrialSite(props.payload);
  const href = (path: string) => previewHref(props.mode, path);
  const title = servicesSection?.title?.trim() || "Commercial capabilities";
  const lead = servicesSection?.description?.trim();

  return (
    <IndustrialFrame {...props}>
      <RecordHeading
        eyebrow={servicesSection?.eyebrow ?? "Services"}
        title={title}
        lead={lead}
        image={company?.heroImage ?? services[0]?.image}
        primaryHref={href("/contact")}
        secondaryHref={href("/projects")}
      />

      {services.length ? (
        <section className="bg-[#F6F8FA] py-[100px]" aria-labelledby="services-overview-heading">
          <div className={pageContainer}>
            <Eyebrow>Overview</Eyebrow>
            <h2 id="services-overview-heading" className={`max-w-[16ch] ${sectionTitle}`}>
              Commercial capabilities
            </h2>
            <ul className="mt-12 grid gap-4 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-12">
              {services.map((service, index) => {
                const wide = index % 3 === 0;
                return (
                  <li key={service.id} className={wide ? "min-[720px]:col-span-2 min-[1180px]:col-span-8" : "min-[1180px]:col-span-4"}>
                    <a
                      href={`#${service.slug}`}
                      className="group relative block h-[280px] overflow-hidden rounded-[12px] bg-[#03071E] min-[1180px]:h-[420px]"
                    >
                      {service.image?.url ? (
                        <img
                          src={service.image.url}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      ) : null}
                      <span className="absolute inset-0 bg-gradient-to-t from-[#03071E]/90 via-[#03071E]/25 to-transparent" aria-hidden />
                      <span className="absolute top-5 left-5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-bold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="absolute inset-x-0 bottom-0 p-6">
                        <span className="block text-[clamp(1.5rem,2.2vw,2.25rem)] leading-none font-bold text-white">{service.title}</span>
                        {service.summary ? <span className="mt-3 block max-w-lg text-sm leading-6 text-white/80">{service.summary}</span> : null}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : (
        <section className="bg-white py-[100px]">
          <p className={`${pageContainer} ${bodyCopy}`}>Services have not been published yet.</p>
        </section>
      )}

      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.slug}
          className={`scroll-mt-[140px] py-[100px] ${index % 2 === 0 ? "bg-white" : "bg-[#F6F8FA]"}`}
          aria-labelledby={`service-${service.slug}`}
        >
          <div className={`${pageContainer} grid items-center gap-12 min-[960px]:grid-cols-2`}>
            <div className={index % 2 ? "min-[960px]:order-2" : ""}>
              <p className="text-sm font-bold tracking-[0.14em] text-[#FF6610]">{String(index + 1).padStart(2, "0")}</p>
              <h2 id={`service-${service.slug}`} className={sectionTitle}>
                {service.title}
              </h2>
              {service.summary ? <p className="mt-5 text-lg font-semibold text-[#03071E]">{service.summary}</p> : null}
              {splitParagraphs(service.description).map((paragraph) => (
                <p key={paragraph} className={`mt-4 ${bodyCopy}`}>
                  {paragraph}
                </p>
              ))}
              <a href={href("/contact")} className="mt-6 inline-flex items-center gap-1.5 font-bold text-[#03071E] hover:text-[#FF6610]">
                Discuss {service.title.toLowerCase()} <ArrowIcon />
              </a>
            </div>
            {service.image?.url ? (
              <img
                src={service.image.url}
                alt={service.image.alt}
                className={`h-[320px] w-full rounded-[12px] object-cover min-[960px]:h-[460px] ${index % 2 ? "min-[960px]:order-1" : ""}`}
              />
            ) : null}
          </div>
        </section>
      ))}

      {services.length ? (
        <section className="bg-white py-[100px]" aria-labelledby="services-process-heading">
          <div className={pageContainer}>
            <div className="grid items-end gap-6 min-[960px]:grid-cols-[1.4fr_0.6fr]">
              <div>
                <Eyebrow>How we deliver</Eyebrow>
                <h2 id="services-process-heading" className={`max-w-[16ch] ${sectionTitle}`}>
                  One sequence, from first price to handover.
                </h2>
              </div>
              <p className={bodyCopy}>
                The same team stays on the project from preconstruction through closeout, so nothing is lost between phases.
              </p>
            </div>
            <ol className="mt-12 grid gap-4 min-[720px]:grid-cols-2 min-[1180px]:grid-cols-5">
              {DELIVERY.map((phase, index) => (
                <li key={phase.title} className="flex min-h-[220px] flex-col justify-between rounded-[8px] bg-[#F6F8FA] p-6">
                  <span className="text-[44px] leading-none font-bold text-[#FF6610]/30">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="text-[20px] font-bold text-[#03071E]">{phase.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#5c6570]">{phase.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {services.length ? (
        <section className="bg-[#03071E]" aria-labelledby="services-cta-heading">
          <div className={`${pageContainer} flex flex-wrap items-end justify-between gap-8 py-20`}>
            <div>
              <Eyebrow light>Next project</Eyebrow>
              <h2 id="services-cta-heading" className="mt-4 max-w-[12ch] text-[clamp(2.4rem,4.5vw,4rem)] leading-[1.05] font-bold text-white">
                Scope it with us.
              </h2>
              {company?.name ? (
                <p className="mt-5 max-w-md text-base leading-7 text-white/70">
                  Share drawings or an early program. {company.name} will return a real price and schedule.
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-4">
              <PillLink href={href("/contact")}>Start a project</PillLink>
              <PillLink href={href("/projects")} variant="outline-light">
                See the work
              </PillLink>
            </div>
          </div>
        </section>
      ) : null}
    </IndustrialFrame>
  );
}
