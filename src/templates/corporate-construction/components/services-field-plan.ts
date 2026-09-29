/**
 * Services page field planner — adaptive layouts for supporting services
 * (everything after the primary featured service).
 */

export type ServicesFieldPlan = {
  listClass: string;
  /** Compact density for high service counts */
  compact: boolean;
};

export function planServicesField(count: number): ServicesFieldPlan {
  if (count <= 0) {
    return { listClass: "grid gap-0", compact: false };
  }

  if (count === 1) {
    return {
      listClass: "grid gap-0 border-t border-[var(--color-border)]",
      compact: false,
    };
  }

  if (count === 2) {
    return {
      listClass:
        "grid gap-0 border-t border-[var(--color-border)] md:grid-cols-2 md:divide-x md:divide-[var(--color-border)]",
      compact: false,
    };
  }

  if (count === 3) {
    return {
      listClass:
        "grid gap-0 border-t border-[var(--color-border)] md:grid-cols-3 md:divide-x md:divide-[var(--color-border)]",
      compact: false,
    };
  }

  if (count === 4) {
    return {
      listClass:
        "grid gap-0 border-t border-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-2 [&>*:nth-child(odd)]:sm:border-r [&>*]:border-b [&>*]:border-[var(--color-border)]",
      compact: false,
    };
  }

  if (count <= 6) {
    return {
      listClass:
        "grid gap-0 border-t border-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-b [&>*]:border-[var(--color-border)] lg:[&>*:not(:nth-child(3n))]:border-r",
      compact: false,
    };
  }

  if (count <= 9) {
    return {
      listClass:
        "grid gap-0 border-t border-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-b [&>*]:border-[var(--color-border)] lg:[&>*:not(:nth-child(3n))]:border-r",
      compact: true,
    };
  }

  // 10+ — denser indexed field
  return {
    listClass:
      "grid gap-0 border-t border-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3 [&>*]:border-b [&>*]:border-[var(--color-border)] lg:[&>*:not(:nth-child(3n))]:border-r",
    compact: true,
  };
}

/** Balanced pair layout when the tenant publishes exactly two services. */
export function planServicesPair(): ServicesFieldPlan {
  return {
    listClass:
      "grid gap-0 border-t border-[var(--color-border)] lg:grid-cols-2 lg:divide-x lg:divide-[var(--color-border)]",
    compact: false,
  };
}
