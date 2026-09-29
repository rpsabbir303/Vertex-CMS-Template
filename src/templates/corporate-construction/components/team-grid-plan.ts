/**
 * Leadership grid — intentional compositions for variable team counts.
 * Breakpoints follow the template: md = 1024, lg = 1440.
 */

export type TeamGridPlan = {
  listClass: string;
  itemClass: (index: number, total: number) => string;
};

export function planTeamGrid(count: number): TeamGridPlan {
  if (count <= 0) {
    return { listClass: "grid gap-10", itemClass: () => "" };
  }

  if (count === 1) {
    return {
      listClass: "grid gap-10 sm:max-w-md",
      itemClass: () => "min-w-0",
    };
  }

  if (count === 2) {
    return {
      listClass: "grid gap-10 sm:grid-cols-2 sm:gap-x-12 lg:gap-x-14",
      itemClass: () => "min-w-0",
    };
  }

  if (count === 3) {
    return {
      listClass: "grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-x-10 lg:gap-x-12",
      itemClass: () => "min-w-0",
    };
  }

  if (count === 4) {
    return {
      listClass:
        "grid gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 xl:gap-x-10",
      itemClass: () => "min-w-0",
    };
  }

  if (count === 5) {
    return {
      listClass: "grid gap-10 sm:grid-cols-2 md:grid-cols-6 md:gap-x-8 lg:gap-x-10",
      itemClass: (index) =>
        index < 3 ? "min-w-0 md:col-span-2" : "min-w-0 md:col-span-3",
    };
  }

  if (count === 6) {
    return {
      listClass:
        "grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-10",
      itemClass: () => "min-w-0",
    };
  }

  if (count === 7) {
    return {
      listClass: "grid gap-10 sm:grid-cols-2 md:grid-cols-12 md:gap-x-8 lg:gap-x-10",
      itemClass: (index) =>
        index < 4 ? "min-w-0 md:col-span-3" : "min-w-0 md:col-span-4",
    };
  }

  if (count === 8) {
    return {
      listClass:
        "grid gap-10 sm:grid-cols-2 md:grid-cols-4 md:gap-x-6 lg:gap-x-8",
      itemClass: () => "min-w-0",
    };
  }

  // 9+ — steady three-column rhythm
  return {
    listClass:
      "grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-10",
    itemClass: () => "min-w-0",
  };
}
