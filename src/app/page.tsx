import Link from "next/link";
import { listTemplates } from "@/registry/template-registry";

export default function HomePage() {
  const templates = listTemplates();

  return (
    <main className="vertex-container py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Vertex CMS — Construction Template Engine
      </h1>
      <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
        Foundation preview. Select a template slug to render tenant sites. Corporate
        Construction is the first reference implementation (in progress).
      </p>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {templates.map((t) => (
          <li
            key={t.id}
            className="rounded border border-[var(--color-border)] p-6"
          >
            <h2 className="text-lg font-medium">{t.name}</h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {t.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link
                className="font-medium text-[var(--color-accent)] underline-offset-4 hover:underline"
                href={`/preview/${t.slug}`}
              >
                Preview
              </Link>
              {t.slug === "corporate-construction" ? (
                <>
                  <Link
                    className="text-[var(--color-text-muted)] hover:underline"
                    href={`/preview/${t.slug}?fixture=partial`}
                  >
                    Partial CMS
                  </Link>
                  <Link
                    className="text-[var(--color-text-muted)] hover:underline"
                    href={`/preview/${t.slug}?fixture=empty`}
                  >
                    Empty CMS
                  </Link>
                </>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
