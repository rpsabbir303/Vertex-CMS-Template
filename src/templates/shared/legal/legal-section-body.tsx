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
    const lines = chunk.split("\n").map((line) => line.trim()).filter(Boolean);
    if (!lines.length) {
      continue;
    }

    const isUnordered = lines.every((line) => /^[-*•]\s+/.test(line));
    const isOrdered = lines.every((line) => /^\d+[.)]\s+/.test(line));

    if (isUnordered) {
      blocks.push({
        type: "ul",
        items: lines.map((line) => line.replace(/^[-*•]\s+/, "").trim()),
      });
      continue;
    }

    if (isOrdered) {
      blocks.push({
        type: "ol",
        items: lines.map((line) => line.replace(/^\d+[.)]\s+/, "").trim()),
      });
      continue;
    }

    blocks.push({ type: "paragraph", text: lines.join(" ") });
  }

  return blocks;
}

type LegalSectionBodyProps = {
  content: string;
};

/** Renders CMS legal section body: paragraphs and simple lists. */
export function LegalSectionBody({ content }: LegalSectionBodyProps) {
  const blocks = parseContentBlocks(content);

  if (!blocks.length) {
    return null;
  }

  return (
    <div className="space-y-4">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p
              key={`p-${index}`}
              className="text-pretty break-words text-base leading-relaxed text-[var(--color-text-muted)]"
            >
              {block.text}
            </p>
          );
        }

        if (block.type === "ul") {
          return (
            <ul
              key={`ul-${index}`}
              className="list-disc space-y-2 pl-5 text-base leading-relaxed text-[var(--color-text-muted)]"
            >
              {block.items.map((item) => (
                <li key={item.slice(0, 48)} className="text-pretty break-words pl-1">
                  {item}
                </li>
              ))}
            </ul>
          );
        }

        return (
          <ol
            key={`ol-${index}`}
            className="list-decimal space-y-2 pl-5 text-base leading-relaxed text-[var(--color-text-muted)]"
          >
            {block.items.map((item) => (
              <li key={item.slice(0, 48)} className="text-pretty break-words pl-1">
                {item}
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
}
