import type { CmsImage } from "@/templates/shared/cms/types/media";
import { PillLink } from "@/templates/industrial-civil/components/pill-link";

export const pageContainer = "mx-auto max-w-[1320px] px-3";
export const sectionTitle = "mt-4 text-[clamp(2rem,3.1vw,2.75rem)] leading-[1.2] font-bold text-[#03071E]";
export const bodyCopy = "text-base leading-[26px] text-[#5c6570]";

export type HeroStat = {
  value: string;
  label: string;
};

export function RecordHeading({
  eyebrow,
  title,
  lead,
  image,
  stats = [],
  primaryHref,
  secondaryHref,
  primaryLabel = "Start Your Project",
  secondaryLabel = "View Projects",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  image?: CmsImage;
  stats?: HeroStat[];
  primaryHref?: string;
  secondaryHref?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative flex flex-col overflow-hidden bg-white pt-[150px] pb-6 min-[1180px]:block min-[1180px]:min-h-[981px] min-[1180px]:pt-[250px] min-[1180px]:pb-[160px]">
      <HeroFrameLines />
      {image?.url ? (
        <div className="relative mx-3 mb-0 h-[420px] overflow-hidden rounded-[32px] min-[1180px]:absolute min-[1180px]:top-0 min-[1180px]:right-0 min-[1180px]:mx-0 min-[1180px]:h-[882px] min-[1180px]:w-[54.5%] min-[1180px]:rounded-tl-[300px_560px] min-[1180px]:rounded-tr-none min-[1180px]:rounded-br-none min-[1180px]:rounded-bl-[320px] max-[1179px]:order-last">
          <img src={image.url} alt={image.alt} className="h-full w-full object-cover" />
          <svg className="pointer-events-none absolute -bottom-40 -left-20 h-[520px] w-[520px] text-white/70" viewBox="0 0 520 520" fill="none" aria-hidden>
            <circle cx="260" cy="260" r="250" stroke="currentColor" strokeWidth="3" />
            <circle cx="260" cy="260" r="200" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" />
          </svg>
        </div>
      ) : null}
      <div className="relative mx-auto max-w-[1320px] px-3 max-[1179px]:pb-12">
        <div className="max-w-[636px]">
          {eyebrow ? (
            <p className="flex items-center gap-2 text-[18px] font-semibold text-[#FF6610]">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2a4 4 0 0 0-4 4v1h8V6a4 4 0 0 0-4-4Zm-6 6.5h12v1.2a6 6 0 0 1-12 0V8.5ZM5 22v-2.5A5.5 5.5 0 0 1 10.5 14h3a5.5 5.5 0 0 1 5.5 5.5V22H5Z" />
              </svg>
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-5 max-w-[600px] text-[clamp(2.4rem,3.9vw,3.5rem)] leading-[1.3] font-bold text-[#03071E]">{title}</h1>
          {lead ? <p className="mt-5 text-base leading-7 text-[#03071E]">{lead}</p> : null}
          {primaryHref || secondaryHref ? (
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryHref ? <PillLink href={primaryHref}>{primaryLabel}</PillLink> : null}
              {secondaryHref ? (
                <PillLink href={secondaryHref} variant="outline">
                  {secondaryLabel}
                </PillLink>
              ) : null}
            </div>
          ) : null}
          {stats.length ? (
            <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
              {stats.map((stat) => (
                <div key={stat.label} className="min-w-[117px]">
                  <dt className="text-[32px] leading-none font-bold text-[#FF6610]">{stat.value}</dt>
                  <dd className="mt-3 text-base text-[#03071E]">{stat.label}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function HeroFrameLines() {
  return (
    <svg
      className="pointer-events-none absolute top-0 left-0 h-full w-[850px] max-w-full text-[#FF6610] opacity-[0.07]"
      viewBox="0 0 850 980"
      fill="none"
      stroke="currentColor"
      strokeWidth="26"
      preserveAspectRatio="xMinYMin slice"
      aria-hidden
    >
      <path d="M-40 260 L300 20 L640 260" />
      <path d="M40 300 V980 M280 300 V980 M520 300 V980" />
      <path d="M40 300 H560" />
      <path d="M40 300 L280 640 L520 300 M40 640 L280 980 L520 640" />
      <path d="M40 640 H520" />
    </svg>
  );
}
