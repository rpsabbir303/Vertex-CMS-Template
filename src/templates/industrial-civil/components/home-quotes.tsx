"use client";

import { useState } from "react";

export type HomeQuote = {
  id: string;
  quote: string;
  name: string;
  role?: string;
  title?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export function HomeQuotes({ quotes }: { quotes: HomeQuote[] }) {
  const [index, setIndex] = useState(0);
  const quote = quotes[index];
  if (!quote) return null;
  const initials = quote.name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const step = (delta: number) => setIndex((current) => (current + delta + quotes.length) % quotes.length);

  return (
    <div className="relative mx-auto max-w-[1100px] min-[1180px]:pr-24">
      <div className="grid gap-8 rounded-[8px] bg-white p-5 shadow-[0_10px_40px_rgba(3,7,30,0.05)] min-[960px]:grid-cols-[500px_minmax(0,1fr)] min-[960px]:p-6">
        {quote.imageUrl ? (
          <div className="relative h-[320px] overflow-hidden rounded-[8px] min-[960px]:h-[515px]">
            <img src={quote.imageUrl} alt={quote.imageAlt ?? ""} className="h-full w-full object-cover" />
            <svg className="pointer-events-none absolute -bottom-36 -left-16 h-[420px] w-[420px] text-white/60" viewBox="0 0 420 420" fill="none" aria-hidden>
              <circle cx="210" cy="210" r="200" stroke="currentColor" strokeWidth="3" />
            </svg>
          </div>
        ) : null}
        <div className="flex flex-col justify-center py-2 min-[960px]:pr-4">
          <svg className="h-8 w-8 text-[#FF6610]/40" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M4 18h5l2-5V6H4v7h3l-3 5Zm9 0h5l2-5V6h-7v7h3l-3 5Z" />
          </svg>
          {quote.title ? <h3 className="mt-5 text-[24px] font-bold text-[#03071E]">{quote.title}</h3> : null}
          <blockquote className="mt-4 text-base leading-7 text-[#5c6570]">“{quote.quote}”</blockquote>
          <div className="mt-8 border-t border-[#e6e8ec] pt-6">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[6px] bg-[#FFF1E8] text-xl font-bold text-[#FF6610]">
                {initials}
              </span>
              <span>
                <span className="block text-[20px] font-bold text-[#03071E]">{quote.name}</span>
                {quote.role ? <span className="mt-1 block text-base text-[#5c6570]">{quote.role}</span> : null}
              </span>
            </div>
          </div>
        </div>
      </div>
      {quotes.length > 1 ? (
        <div className="mt-6 flex justify-center gap-4 min-[1180px]:absolute min-[1180px]:top-1/2 min-[1180px]:right-0 min-[1180px]:mt-0 min-[1180px]:-translate-y-1/2 min-[1180px]:flex-col">
          <QuoteButton label="Next testimonial" onClick={() => step(1)} direction="next" />
          <QuoteButton label="Previous testimonial" onClick={() => step(-1)} direction="prev" />
        </div>
      ) : null}
    </div>
  );
}

function QuoteButton({ label, onClick, direction }: { label: string; onClick: () => void; direction: "next" | "prev" }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-12 w-12 items-center justify-center rounded-[4px] bg-[#FFE6D7] text-[#03071E] transition-colors hover:bg-[#FF6610] hover:text-white"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden>
        <path d={direction === "next" ? "m9 6 6 6-6 6" : "m15 6-6 6 6 6"} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
