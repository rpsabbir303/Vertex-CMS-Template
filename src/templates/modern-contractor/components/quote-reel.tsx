"use client";

import { useState } from "react";

type Quote = { id: string; quote: string; by: string };

export function QuoteReel({ quotes }: { quotes: Quote[] }) {
  const [index, setIndex] = useState(0);
  const current = quotes[index];
  if (!current) return null;
  const total = quotes.length;

  return (
    <div>
      <blockquote>
        <p className="max-w-4xl text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.2] font-medium tracking-[-0.03em]">“{current.quote}”</p>
        <footer className="mt-6 text-sm text-white/60">{current.by}</footer>
      </blockquote>
      {total > 1 ? (
        <div className="mt-10 flex items-center gap-3">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:border-[#C8FF2E]"
            aria-label="Previous testimonial"
            onClick={() => setIndex((value) => (value - 1 + total) % total)}
          >
            ←
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 hover:border-[#C8FF2E]"
            aria-label="Next testimonial"
            onClick={() => setIndex((value) => (value + 1) % total)}
          >
            →
          </button>
          <span className="text-xs tracking-[0.16em] text-white/50">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      ) : null}
    </div>
  );
}
