import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import { ContactForm } from "@/templates/shared/components/forms/contact-form";
import { pageSeoDescription } from "@/templates/corporate-construction/utils/page-seo";
import { resolveCorporateContact } from "@/templates/corporate-construction/utils/resolve-corporate-contact";
import { ModernPageFrame } from "@/templates/modern-contractor/components/modern-page-frame";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { pad } from "@/templates/modern-contractor/theme/ui";

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";

export function ModernContractorContactPage(props: TemplatePageProps) {
  const company = unwrapEnvelope(props.payload.company);
  const contact = resolveCorporateContact(company, unwrapEnvelope(props.payload.contact));
  const lead =
    pageSeoDescription(props.payload, "contact") ||
    (company?.name ? `Share scope, schedule, and site conditions with ${company.name}.` : undefined);
  const replyMatch = contact.form?.successMessage?.match(/(\d+|one)\s+business day/i);
  const replyWindow = replyMatch
    ? `${replyMatch[1].toLowerCase() === "one" ? "1" : replyMatch[1]} business day`
    : undefined;
  const homeHref = previewHref(props.mode, "/");
  const heroImage = company?.heroImage;
  const city = contact.address?.city?.trim();
  const hoursLine = contact.hours.map((entry) => `${entry.days}: ${entry.hours}`).join("\n");

  const cards = [
    contact.addressBlock
      ? {
          kicker: contact.address?.country?.trim() || "Office",
          title: city || "Office",
          body: contact.addressBlock,
          href: contact.email ? `mailto:${contact.email}` : undefined,
          action: contact.email ? "Email the office" : undefined,
        }
      : null,
    contact.phone
      ? {
          kicker: "Phone",
          title: contact.phone,
          body: company?.name,
          href: `tel:${contact.phone.replace(/[^\d+]/g, "")}`,
          action: "Call the office",
        }
      : null,
    hoursLine
      ? {
          kicker: "Hours",
          title: contact.hours[0]?.days || "Hours",
          body: contact.hours.map((entry) => entry.hours).join("\n"),
          href: "#inquiry",
          action: "Send an inquiry",
        }
      : null,
  ].filter((card): card is NonNullable<typeof card> => Boolean(card));

  return (
    <ModernPageFrame {...props}>
      <section className="relative min-h-[640px] overflow-hidden bg-[#0a0c0b] text-white min-[960px]:min-h-[684px]">
        {heroImage?.url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroImage.url} alt="" className="absolute inset-0 h-full w-full object-cover" />
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
            <span className="text-white">Contact</span>
          </nav>
          <div className="mt-auto grid items-end gap-10 pt-16 min-[960px]:grid-cols-[minmax(0,1fr)_320px] min-[960px]:gap-16">
            <div>
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
                <span className="h-px w-8 bg-[#C8FF2E]" />
                Contact
              </p>
              <h1 className={`${display} mt-5 max-w-[12ch] text-[clamp(3.4rem,8vw,7.2rem)] leading-[0.9] font-semibold tracking-[-0.05em]`}>
                Start a project.
              </h1>
              {lead ? <p className="mt-6 max-w-[40rem] text-[17px] leading-relaxed text-white/78">{lead}</p> : null}
            </div>
            {replyWindow || contact.phone ? (
              <aside className="border-l border-white/25 py-2 pl-6">
                <p className="text-[11px] tracking-[0.14em] text-[#9ba49c] uppercase">{replyWindow ? "Reply" : "Phone"}</p>
                <p className={`${display} mt-2 text-[2rem] leading-none font-semibold`}>
                  {replyWindow || contact.phone}
                </p>
                <p className="mt-3 text-[13px] tracking-[0.08em] text-white/80 uppercase">
                  {replyWindow ? "A coordinator will reply" : "Call the office"}
                </p>
              </aside>
            ) : null}
          </div>
        </div>
      </section>

      {!contact.hasAny ? (
        <section className="bg-[#f3f1e9] px-5 py-16">
          <p className="mx-auto max-w-[1360px] text-[#3e4438]">
            Contact details and the inquiry form are not available for this tenant yet.
          </p>
        </section>
      ) : null}

      {contact.hasForm || contact.email || contact.phone ? (
        <section className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-[132px]">
          <div className="mx-auto grid max-w-[1360px] items-start gap-12 min-[960px]:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)] min-[960px]:gap-[90px]">
            <div>
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] uppercase">
                <span className="h-px w-8 bg-[#0a0c0b]" />
                Project inquiry
              </p>
              <h2 className={`${display} mt-4 text-[clamp(2.6rem,4.6vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.045em]`}>
                Tell us about the project.
              </h2>
              <p className="mt-6 max-w-[32rem] text-[17px] leading-relaxed text-[#5c655d]">
                Tell us about location, timeline, and scope. We will follow up with next steps.
              </p>
              {contact.email || contact.phone ? (
                <dl className="mt-10 border-t border-black/15">
                  {contact.email ? (
                    <div className="border-b border-black/15 py-5">
                      <dt className="text-[11px] font-extrabold tracking-[0.14em] uppercase">Email</dt>
                      <dd className={`${display} mt-2 text-[1.65rem] leading-none font-semibold tracking-[-0.03em]`}>
                        <a href={`mailto:${contact.email}`} className="break-all hover:underline">
                          {contact.email}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                  {contact.phone ? (
                    <div className="border-b border-black/15 py-5">
                      <dt className="text-[11px] font-extrabold tracking-[0.14em] uppercase">Phone</dt>
                      <dd className={`${display} mt-2 text-[1.65rem] leading-none font-semibold tracking-[-0.03em]`}>
                        <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="hover:underline">
                          {contact.phone}
                        </a>
                      </dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}
            </div>

            {contact.hasForm ? (
              <div id="inquiry" className="mc-inquiry scroll-mt-28 rounded-tl-[28px] rounded-tr-[28px] rounded-br-[90px] rounded-bl-[28px] border border-black/10 bg-white/45 p-6 min-[960px]:p-[34px]">
                <ContactForm config={contact.form} />
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {cards.length ? (
        <section className="bg-[#0a0c0b] px-5 py-16 text-white min-[960px]:px-8 min-[960px]:py-[132px]">
          <div className="mx-auto max-w-[1360px]">
            <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
              <span className="h-px w-8 bg-[#C8FF2E]" />
              Office
            </p>
            <h2 className={`${display} mt-4 max-w-[14ch] text-[clamp(2.6rem,4.6vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.045em]`}>
              {company?.tagline?.trim() || city || "Contact"}
            </h2>
            <ul className="mt-12 grid gap-[18px] min-[960px]:grid-cols-3">
              {cards.map((card, index) => (
                <li
                  key={card.kicker}
                  className="flex min-h-[280px] flex-col rounded-tl-[26px] rounded-tr-[26px] rounded-br-[72px] border border-white/15 p-7"
                >
                  <p className="text-[12px] tracking-[0.14em] text-white/55 uppercase">
                    {pad(index + 1)} / {card.kicker}
                  </p>
                  <h3 className={`${display} mt-5 text-[clamp(1.7rem,2vw,2.2rem)] leading-[1.05] font-semibold tracking-[-0.04em]`}>
                    {card.title}
                  </h3>
                  {card.body ? <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-white/70">{card.body}</p> : null}
                  {card.href && card.action ? (
                    <a href={card.href} className="mt-auto pt-8 text-[13px] font-extrabold tracking-[0.12em] text-[#C8FF2E] uppercase">
                      {card.action} ↗
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </ModernPageFrame>
  );
}
