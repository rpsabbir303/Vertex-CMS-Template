import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import { getVisibleServices, unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { ModernPageFrame } from "@/templates/modern-contractor/components/modern-page-frame";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { pad, ui } from "@/templates/modern-contractor/theme/ui";
import { cn } from "@/utils/cn";

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";

function sentences(text?: string) {
  if (!text?.trim()) return [];
  return text
    .split(/\n+|(?<=[.])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function ModernContractorServiceDetailPage(props: TemplatePageProps) {
  const services = getVisibleServices(props.payload.services);
  const company = unwrapEnvelope(props.payload.company);
  const index = services.findIndex((item) => item.slug === props.entitySlug);
  const service = index >= 0 ? services[index] : undefined;

  if (!service) {
    return (
      <ModernPageFrame {...props}>
        <section className="vertex-container pt-40 pb-24">
          <p className={ui.eyebrow}>Services</p>
          <h1 className={cn(ui.h2, "mt-4")}>Service not found</h1>
          <Link href={previewHref(props.mode, "/services")} className={cn(ui.btnOutline, "mt-8 inline-flex")}>
            Back to services
          </Link>
        </section>
      </ModernPageFrame>
    );
  }

  const parts = sentences(service.description);
  const scope = parts.slice(1, 5);
  const homeHref = previewHref(props.mode, "/");
  const servicesHref = previewHref(props.mode, "/services");
  const contactHref = previewHref(props.mode, "/contact");

  return (
    <ModernPageFrame {...props}>
      <section className="relative min-h-[640px] overflow-hidden bg-[#0a0c0b] text-white min-[960px]:min-h-[684px]">
        {service.image?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={service.image.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#0a0c0b_0%,rgba(10,12,11,0.72)_38%,rgba(10,12,11,0.45)_100%)]" />
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
            <Link href={servicesHref} className="hover:text-white">
              Services
            </Link>
            <span aria-hidden>›</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <div className="mt-auto grid items-end gap-10 pt-16 min-[960px]:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
                <span className="h-px w-8 bg-[#C8FF2E]" />
                Service / {service.title}
              </p>
              <h1 className={`${display} mt-5 max-w-[14ch] text-[clamp(3rem,5.6vw,5.2rem)] leading-[0.92] font-semibold tracking-[-0.05em]`}>
                {service.title}
              </h1>
              {service.summary ? <p className="mt-6 max-w-[42rem] text-[17px] leading-relaxed text-white/78">{service.summary}</p> : null}
            </div>
            <aside className="border-l border-white/25 py-2 pl-6">
              <p className="text-[11px] tracking-[0.14em] text-[#9ba49c] uppercase">Capabilities on record</p>
              <p className={`${display} mt-2 text-[2.4rem] leading-none font-semibold`}>
                {pad(index + 1)}
                <span className="text-[1.2rem] text-white/55"> / {pad(services.length)}</span>
              </p>
              <p className="mt-3 text-[13px] tracking-[0.08em] text-white/80 uppercase">{service.title}</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24">
        <div className="mx-auto grid max-w-[1360px] gap-12 min-[960px]:grid-cols-[250px_minmax(0,1fr)] min-[960px]:gap-16">
          <aside className="min-[960px]:sticky min-[960px]:top-28 min-[960px]:self-start">
            <p className="text-[12px] font-extrabold tracking-[0.16em] uppercase">Related expertise</p>
            <nav aria-label="Services" className="mt-4">
              <ul>
                {services.map((item) => {
                  const current = item.slug === service.slug;
                  return (
                    <li key={item.id} className="border-b border-black/15">
                      <Link
                        href={previewHref(props.mode, `/services/${item.slug}`)}
                        aria-current={current ? "page" : undefined}
                        className={current ? "block py-3 text-[17px] font-extrabold" : "block py-3 text-[17px] font-bold text-[#0a0c0b]/80 hover:text-[#0a0c0b]"}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div>
            <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
              <span className="h-px w-8 bg-[#0a0c0b]" />
              {service.title}
            </p>
            <h2 className={`${display} mt-4 text-[clamp(2.2rem,4vw,4rem)] leading-[0.95] font-semibold tracking-[-0.045em]`}>
              {service.summary || service.title}
            </h2>
            {parts[0] ? <p className={`${display} mt-8 max-w-[40rem] text-[clamp(1.4rem,2vw,1.85rem)] leading-[1.3] font-medium tracking-[-0.03em]`}>{parts[0]}</p> : null}
            {parts.length > 1 && scope.length === 0 ? (
              <div className="mt-6 max-w-[40rem] space-y-4 text-[17px] leading-relaxed text-[#3e4438]">
                {parts.slice(1).map((part) => (
                  <p key={part.slice(0, 32)}>{part}</p>
                ))}
              </div>
            ) : null}

            {scope.length ? (
              <ul className="mt-12 grid gap-px border border-black/10 bg-black/10 min-[960px]:grid-cols-2">
                {scope.map((item, itemIndex) => (
                  <li key={item.slice(0, 32)} className="bg-[#f3f1e9] p-7">
                    <span className="text-[11px] tracking-[0.14em] text-[#667067]">{pad(itemIndex + 1)}</span>
                    <p className="mt-4 text-[17px] leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            ) : null}

            {service.image?.url ? (
              <div className="mt-14 grid items-center gap-8 min-[960px]:grid-cols-2">
                <div>
                  <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
                    <span className="h-px w-8 bg-[#0a0c0b]" />
                    {service.title}
                  </p>
                  <h3 className={`${display} mt-4 text-[clamp(1.8rem,2.6vw,2.6rem)] leading-[1.05] font-semibold tracking-[-0.04em]`}>
                    {service.summary || service.title}
                  </h3>
                  <Link href={contactHref} className="mt-8 inline-flex text-[15px] font-semibold underline decoration-[#0a0c0b]/30 underline-offset-4">
                    Discuss your project ↗
                  </Link>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={service.image.url} alt={service.image.alt || ""} className="aspect-[4/3] w-full object-cover" />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-24">
        <div className="mx-auto max-w-[1360px] rounded-tl-[34px] rounded-tr-[34px] rounded-br-[34px] rounded-bl-[110px] border border-white/15 bg-[linear-gradient(135deg,#111512,#050706)] px-8 py-14 min-[960px]:px-20 min-[960px]:py-[70px]">
          <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
            <span className="h-px w-8 bg-[#C8FF2E]" />
            Start a project
          </p>
          <h2 className={`${display} mt-5 max-w-[12ch] text-[clamp(2.8rem,5vw,4.8rem)] leading-[0.92] font-semibold tracking-[-0.045em]`}>
            Let’s build.
          </h2>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
            {company?.name
              ? `Tell ${company.name} about the site, the schedule, and what the building has to do. A preconstruction lead will reply.`
              : "Tell us about the site, the schedule, and what the building has to do."}
          </p>
          <Link href={contactHref} className="mt-8 inline-flex rounded-full bg-[#C8FF2E] px-6 py-3.5 text-sm font-semibold text-[#0a0c0b]">
            Start a conversation
          </Link>
        </div>
      </section>
    </ModernPageFrame>
  );
}
