/** Format an ISO date (YYYY-MM-DD) as "18 Aug 2026"; returns undefined for invalid input. */
export function formatPostDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  const date = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
