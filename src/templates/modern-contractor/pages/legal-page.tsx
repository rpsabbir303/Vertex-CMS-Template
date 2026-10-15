import Link from "next/link";
import type { TemplatePageProps } from "@/registry/template-types";
import { unwrapEnvelope } from "@/templates/shared/cms/resolve-content";
import type { OptionalPage } from "@/templates/shared/cms/types/pages";
import { planLegalPage } from "@/templates/shared/legal/plan-legal-page";
import { ModernPageFrame } from "@/templates/modern-contractor/components/modern-page-frame";
import { previewHref } from "@/templates/modern-contractor/utils/preview-href";
import { pad } from "@/templates/modern-contractor/theme/ui";

const display = "font-[family-name:var(--font-arc-display),Space_Grotesk,sans-serif]";
const heading = `${display} text-[clamp(1.8rem,2.6vw,2.4rem)] leading-[1.32] font-semibold tracking-[-0.04em]`;

type ModernLegalPageProps = TemplatePageProps & {
  page: OptionalPage;
};

type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

function parseContentBlocks(content: string): ContentBlock[] {
  const chunks = content
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
  const blocks: ContentBlock[] = [];

  for (const chunk of chunks) {
    const lines = chunk
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    if (!lines.length) continue;

    const isUnordered = lines.every((line) => /^[-*•]\s+/.test(line));
    const isOrdered = lines.every((line) => /^\d+[.)]\s+/.test(line));

    if (isUnordered) {
      blocks.push({ type: "ul", items: lines.map((line) => line.replace(/^[-*•]\s+/, "").trim()) });
      continue;
    }
    if (isOrdered) {
      blocks.push({ type: "ol", items: lines.map((line) => line.replace(/^\d+[.)]\s+/, "").trim()) });
      continue;
    }
    blocks.push({ type: "paragraph", text: lines.join(" ") });
  }

  return blocks;
}

export function ModernContractorLegalPage({ page, ...props }: ModernLegalPageProps) {
  const planned = planLegalPage(page);
  const company = unwrapEnvelope(props.payload.company);
  const heroImage = page.heroImage?.url ? page.heroImage : company?.heroImage;
  const homeHref = previewHref(props.mode, "/");
  const contactHref = previewHref(props.mode, "/contact");

  if (!planned.isPublished || !planned.hasContent) {
    return (
      <ModernPageFrame {...props}>
        <section className="bg-[#f3f1e9] px-5 pt-40 pb-24 text-[#0a0c0b]">
          <div className="mx-auto max-w-[1360px]">
            <p className="text-[12px] font-extrabold tracking-[0.18em] uppercase">Legal</p>
            <h1 className={`${display} mt-4 text-[clamp(2.4rem,3.6vw,3.5rem)] leading-[1.28] font-semibold tracking-[-0.04em]`}>
              {planned.title}
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-[#3e4438]">This page has not yet been published.</p>
          </div>
        </section>
      </ModernPageFrame>
    );
  }

  return (
    <ModernPageFrame {...props}>
      <header className="relative min-h-[640px] overflow-hidden bg-[#0a0c0b] text-white min-[960px]:min-h-[684px]">
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
            <span className="text-white">{planned.title}</span>
          </nav>
          <div className="mt-auto grid items-end gap-10 pt-16 min-[960px]:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <p className="flex items-center gap-4 text-[12px] font-extrabold tracking-[0.18em] text-[#C8FF2E] uppercase">
                <span className="h-px w-8 bg-[#C8FF2E]" />
                Legal
              </p>
              <h1 className={`${display} mt-5 text-[clamp(2.4rem,3.6vw,3.5rem)] leading-[1.28] font-semibold tracking-[-0.04em] text-balance`}>
                {planned.title}
              </h1>
              {planned.intro ? <p className="mt-6 max-w-[40rem] text-[17px] leading-relaxed text-white/78">{planned.intro}</p> : null}
            </div>
            <aside className="border-l border-white/25 py-2 pl-6">
              <p className="text-[11px] tracking-[0.14em] text-[#9ba49c] uppercase">
                {planned.effectiveDate ? `Effective ${planned.effectiveDate}` : "Sections on record"}
              </p>
              <p className={`${display} mt-2 text-[2.4rem] leading-none font-semibold`}>{pad(planned.sections.length)}</p>
              <p className="mt-3 text-[13px] tracking-[0.08em] text-white/80 uppercase">
                {planned.sections.length === 1 ? "Section" : "Sections"}
              </p>
            </aside>
          </div>
        </div>
      </header>

      {planned.sections.length > 1 ? (
        <nav aria-labelledby="legal-toc-heading" className="border-b border-black/15 bg-[#f3f1e9] text-[#0a0c0b]">
          <div className="mx-auto max-w-[1360px] px-5 py-8 min-[960px]:px-8">
            <h2 id="legal-toc-heading" className="text-[12px] font-extrabold tracking-[0.18em] uppercase">
              On this page
            </h2>
            <ol className="mt-5 flex flex-wrap gap-2">
              {planned.sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-flex rounded-full border border-black/15 px-4 py-2.5 text-sm font-semibold hover:bg-[#0a0c0b] hover:text-white"
                  >
                    {pad(index + 1)} {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      ) : null}

      <div className="bg-[#f3f1e9] px-5 py-16 text-[#0a0c0b] min-[960px]:px-8 min-[960px]:py-24">
        <div className="mx-auto max-w-[760px]">
          {planned.sections.map((section, index) => {
            const isContact = section.heading.trim().toLowerCase() === "contact";
            return (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-t border-black/15 py-12 first:border-t-0 first:pt-0"
                aria-labelledby={`${section.id}-heading`}
              >
                <p className="text-[12px] font-extrabold tracking-[0.16em] text-[#667067]">{pad(index + 1)}</p>
                <h2 id={`${section.id}-heading`} className={`${heading} mt-3`}>
                  {section.heading}
                </h2>
                <LegalCopy content={section.content} />
                {isContact ? (
                  <Link href={contactHref} className="mt-6 inline-flex rounded-full bg-[#0a0c0b] px-5 py-3 text-sm font-semibold text-white">
                    Contact us
                  </Link>
                ) : null}
              </section>
            );
          })}
        </div>
      </div>
    </ModernPageFrame>
  );
}

function LegalCopy({ content }: { content: string }) {
  const blocks = parseContentBlocks(content);
  if (!blocks.length) return null;

  return (
    <div className="mt-5 space-y-5">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={`p-${index}`} className="text-[17px] leading-relaxed text-[#3e4438]">
              {block.text}
            </p>
          );
        }
        if (block.type === "ul") {
          return (
            <ul key={`ul-${index}`} className="space-y-3">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3 text-[17px] leading-relaxed text-[#3e4438]">
                  <span className="mt-[0.7rem] h-px w-4 shrink-0 bg-[#0a0c0b]" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <ol key={`ol-${index}`} className="space-y-3">
            {block.items.map((item, itemIndex) => (
              <li key={item} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 text-[17px] leading-relaxed text-[#3e4438]">
                <span className="text-[12px] font-extrabold tracking-[0.14em] text-[#667067]">{pad(itemIndex + 1)}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
}
