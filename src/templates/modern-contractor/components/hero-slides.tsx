"use client";

import { useEffect, useState } from "react";
import type { CmsImage } from "@/templates/shared/cms/types/media";

type HeroSlidesProps = {
  images: CmsImage[];
};

export function HeroSlides({ images }: HeroSlidesProps) {
  const [active, setActive] = useState(0);
  const total = images.length;

  useEffect(() => {
    if (total < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % total), 6500);
    return () => window.clearInterval(timer);
  }, [total]);

  if (!total) return null;

  return (
    <div className="absolute inset-0">
      {images.map((image, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={image.id}
          src={image.url}
          alt={index === active ? image.alt || "" : ""}
          aria-hidden={index !== active}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${
            index === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {total > 1 ? (
        <div className="absolute right-6 bottom-8 z-10 flex gap-2 min-[960px]:right-10">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              onClick={() => setActive(index)}
              className={`h-2.5 w-2.5 rounded-full ${index === active ? "bg-[#C8FF2E]" : "bg-white/40"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
