import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import type { Service } from "@/templates/shared/cms/types/services";
import { getVisibleServices, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { pageSeoDescription } from "@/templates/corporate-construction/utils/page-seo";
import { ModernPageFrame } from "@/templates/modern-contractor/components/modern-page-frame";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { pad } from "@/templates/modern-contractor/theme/ui";

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";
const heading = `${display} text-[clamp(2.2rem,4vw,3.6rem)] leading-[1.12] font-semibold tracking-[-0.04em]`;

const PHASES = [
  { title: "Discover", body: "Site, program, and budget reviewed before anything is priced." },
  { title: "Plan", body: "Logistics, sequencing, and procurement set with the trades." },
  { title: "Build", body: "Superintendent-led field work against a published schedule." },
  { title: "Control", body: "Cost, quality, and safety tracked and reported every week." },
  { title: "Deliver", body: "Commissioning, documentation, and a clean handover." },
];

export function ModernContractorServicesPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const collection = unwrapEnvelope(props.payload.services);
  const services = getVisibleServices(props.payload.services);
  const section = collection?.section;
  const title = section?.title?.trim() || "Commercial capabilities";
  const lead = section?.description?.trim() || pageSeoDescription(props.payload, "services");
  const homeHref = previewHref(props.mode, "/");
  const contactHref = previewHref(props.mode, "/contact");
  const heroImage = services.find((service) => service.image?.url)?.image;

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
            <span className="text-white">Services</span>
          </nav>
          <div className="mt-auto grid items-end gap-10 pt-16 min-[960px]:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
                <span className="h-px w-8 bg-[#C8FF2E]" />
                Services
              </p>
              <h1 className={`${display} mt-5 text-[clamp(2.6rem,4.4vw,4.2rem)] leading-[1.12] font-semibold tracking-[-0.04em] text-balance`}>
                {title}
              </h1>
              {lead ? <p className="mt-6 max-w-[40rem] text-[17px] leading-relaxed text-white/78">{lead}</p> : null}
            </div>
            {services.length ? (
              <aside className="border-l border-white/25 py-2 pl-6">
                <p className="text-[11px] tracking-[0.14em] text-[#9ba49c] uppercase">Capabilities on record</p>
                <p className={`${display} mt-2 text-[2.4rem] leading-none font-semibold`}>{pad(services.length)}</p>
                {company?.tagline?.trim() ? (
                  <p className="mt-3 text-[13px] tracking-[0.08em] text-white/80 uppercase">{company.tagline}</p>
                ) : null}
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="services-overview-heading">
        <div className="mx-auto max-w-[1360px]">
          <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
            <span className="h-px w-8 bg-[#0a0c0b]" />
            Overview
          </p>
          <h2 id="services-overview-heading" className={`${heading} mt-5 max-w-3xl`}>
            {title}
          </h2>
          {lead ? <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-[#3e4438]">{lead}</p> : null}
          {!services.length ? (
            <p className="mt-10 text-[#3e4438]">Services have not been published yet.</p>
          ) : (
            <ul className="mt-12 grid gap-[18px] min-[720px]:grid-cols-2 min-[1180px]:grid-cols-3">
              {services.map((service, index) => (
                <li key={service.id} className="overflow-hidden rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] border border-black/15 bg-white/40">
                  {service.image?.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={service.image.url} alt={service.image.alt || ""} className="aspect-[4/3] w-full object-cover" />
                  ) : null}
                  <div className="p-6">
                    <p className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067]">{pad(index + 1)}</p>
                    <h3 className={`${display} mt-3 text-[1.45rem] leading-tight font-semibold tracking-[-0.03em]`}>{service.title}</h3>
                    {service.summary ? <p className="mt-3 text-[15px] leading-relaxed text-[#3e4438]">{service.summary}</p> : null}
                    <Link href={contactHref} className="mt-5 inline-flex text-sm font-semibold underline decoration-[#0a0c0b]/30 underline-offset-4">
                      Discuss
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {services.map((service, index) => (
        <ServiceBand key={service.id} service={service} index={index} contactHref={contactHref} />
      ))}

      <section className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24" aria-labelledby="services-sequence-heading">
        <div className="mx-auto max-w-[1360px]">
          <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
            <span className="h-px w-8 bg-[#C8FF2E]" />
            Project delivery
          </p>
          <h2 id="services-sequence-heading" className={`${heading} mt-5 max-w-3xl`}>
            One sequence, from first price to handover.
          </h2>
          <ol className="mt-12 grid gap-6 min-[960px]:grid-cols-5">
            {PHASES.map((phase, index) => (
              <li key={phase.title} className="border-t border-[#C8FF2E] pt-4">
                <p className="text-[12px] font-extrabold tracking-[0.14em] text-[#C8FF2E]">{pad(index + 1)}</p>
                <h3 className={`${display} mt-4 text-[1.35rem] leading-tight font-semibold tracking-[-0.03em]`}>{phase.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-white/72">{phase.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#0a0c0b] px-5 pb-16 text-white min-[960px]:px-8 min-[960px]:pb-24">
        <div className="mx-auto max-w-[1360px] rounded-tl-[34px] rounded-tr-[34px] rounded-br-[34px] rounded-bl-[110px] border border-white/15 bg-[linear-gradient(135deg,#111512,#050706)] px-8 py-14 min-[960px]:px-20 min-[960px]:py-[70px]">
          <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
            <span className="h-px w-8 bg-[#C8FF2E]" />
            Start a project
          </p>
          <h2 className={`${display} mt-5 max-w-3xl text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[1.12] font-semibold tracking-[-0.04em]`}>
            Scope it with us.
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
            {company?.name
              ? `Tell ${company.name} about the site, the schedule, and what the building has to do. A preconstruction lead will reply.`
              : "Tell us about the site, the schedule, and what the building has to do."}
          </p>
          <Link href={contactHref} className="mt-8 inline-flex rounded-full bg-[#C8FF2E] px-6 py-3.5 text-sm font-semibold text-[#0a0c0b]">
            Discuss
          </Link>
        </div>
      </section>
    </ModernPageFrame>
  );
}

function ServiceBand({ service, index, contactHref }: { service: Service; index: number; contactHref: string }) {
  const imageFirst = index % 2 === 1;

  return (
    <section id={service.slug} className="bg-[#f3f1e9] px-5 text-[#0a0c0b] min-[960px]:px-8">
      <article className="mx-auto grid max-w-[1360px] items-center gap-8 border-t border-black/15 py-14 min-[960px]:grid-cols-2 min-[960px]:gap-16 min-[960px]:py-20">
        <div className={imageFirst ? "min-[960px]:order-2" : undefined}>
          <p className="text-[12px] font-extrabold tracking-[0.16em] text-[#667067]">{pad(index + 1)}</p>
          <h2 className={`${heading} mt-3`}>{service.title}</h2>
          {service.summary ? <p className="mt-4 text-[17px] leading-relaxed text-[#3e4438]">{service.summary}</p> : null}
          {service.description ? <p className="mt-4 text-[17px] leading-relaxed text-[#3e4438]">{service.description}</p> : null}
          <Link href={contactHref} className="mt-6 inline-flex rounded-full bg-[#0a0c0b] px-5 py-3 text-sm font-semibold text-white">
            Discuss
          </Link>
        </div>
        {service.image?.url ? (
          <div className={imageFirst ? "min-[960px]:order-1" : undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.image.url}
              alt={service.image.alt || ""}
              className="aspect-[4/3] w-full rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] object-cover"
            />
          </div>
        ) : null}
      </article>
    </section>
  );
}
