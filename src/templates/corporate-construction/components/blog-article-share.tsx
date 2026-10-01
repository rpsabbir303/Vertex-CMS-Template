"use client";

import { useEffect, useState } from "react";
import type { TemplateRenderMode } from "@/registry/template-types";
import { previewHref } from "@/templates/corporate-construction/utils/preview-href";
import { ui } from "@/templates/corporate-construction/theme/ui";
import { cn } from "@/utils/cn";

type BlogArticleShareProps = {
  mode: TemplateRenderMode;
  slug: string;
  title: string;
  className?: string;
  layout?: "sidebar" | "inline";
};

export function BlogArticleShare({ mode, slug, title, className, layout = "sidebar" }: BlogArticleShareProps) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState(previewHref(mode, `/blog/${slug}`));

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, [slug]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const mail = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;

  const buttonClass =
    "inline-flex min-h-10 items-center rounded-full border border-[var(--color-border)] px-4 text-xs font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]";

  return (
    <div className={cn(className, layout === "sidebar" ? "hidden xl:block" : "xl:hidden")}>
      <p className={cn(ui.mono, "text-[var(--color-text-muted)]")}>Share article</p>
      <ul className="mt-4 flex flex-wrap gap-2 xl:flex-col xl:items-stretch">
        <li>
          <a href={linkedIn} target="_blank" rel="noopener noreferrer" className={buttonClass}>
            LinkedIn
          </a>
        </li>
        <li>
          <a href={mail} className={buttonClass}>
            Email
          </a>
        </li>
        <li>
          <button type="button" onClick={copyLink} className={buttonClass}>
            {copied ? "Link copied" : "Copy link"}
          </button>
        </li>
      </ul>
    </div>
  );
}
