/**
 * Capability Field — layout planner.
 *
 * The tenant only supplies an ordered list of services. This module decides where
 * each one sits in a 12-column field, for any count. Rules:
 *
 *  - Service 1 is the LEAD tile, next to the navy intro tile.
 *  - Up to two more services complete the "opening band" (FEATURE tiles).
 *  - Every remaining service becomes a COMPACT tile in balanced full-width rows.
 *  - Every row always sums to 12 columns, so the field never has holes.
 *
 * Class names are written out in full so Tailwind can see them.
 */

export type TileRole = "lead" | "feature" | "compact";
export type TileEmphasis = "xl" | "lg" | "md";

export type TilePlan = {
  role: TileRole;
  emphasis: TileEmphasis;
  /** Grid placement classes for all breakpoints */
  placement: string;
  /** Minimum height for the opening band, keeps small counts feeling editorial */
  minHeight: string;
};

export type FieldPlan = {
  introPlacement: string;
  tiles: TilePlan[];
};

const TABLET_SPAN: Record<number, string> = {
  6: "min-[640px]:col-span-6",
  12: "min-[640px]:col-span-12",
};

const MD_SPAN: Record<number, string> = {
  3: "md:col-span-3",
  4: "md:col-span-4",
  6: "md:col-span-6",
  8: "md:col-span-8",
  12: "md:col-span-12",
};

const LG_SPAN: Record<number, string> = {
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  6: "lg:col-span-6",
  8: "lg:col-span-8",
  12: "lg:col-span-12",
};

/** Split `count` tiles into balanced rows of at most `maxPerRow`; returns a span per tile */
function balancedSpans(count: number, maxPerRow: number): number[] {
  if (count <= 0) {
    return [];
  }
  const rows = Math.ceil(count / maxPerRow);
  const base = Math.floor(count / rows);
  const extra = count % rows;
  const spans: number[] = [];
  for (let row = 0; row < rows; row += 1) {
    const perRow = base + (row < extra ? 1 : 0);
    for (let cell = 0; cell < perRow; cell += 1) {
      spans.push(12 / perRow);
    }
  }
  return spans;
}

export function planCapabilityField(count: number): FieldPlan {
  const editorial = count <= 2;

  // Opening band: lead + up to two features. Never leave a single orphan for the
  // continuation rows (4 services -> band of 2, continuation of 2).
  const bandSize = count <= 2 ? count : count - 3 === 1 ? 2 : 3;

  const continuationCount = count - bandSize;
  const lgContinuation = balancedSpans(continuationCount, 4);
  const mdContinuation = balancedSpans(continuationCount, 3);

  // Between 640px and 1023px: two per row after the lead, last one spans if odd.
  const afterLead = count - 1;

  const tiles: TilePlan[] = Array.from({ length: count }, (_, index) => {
    const tablet = (() => {
      if (index === 0) {
        return 12;
      }
      const isLast = index === count - 1;
      return isLast && afterLead % 2 === 1 ? 12 : 6;
    })();

    let md = 12;
    let lg = 8;
    let role: TileRole = "compact";

    if (index === 0) {
      role = "lead";
    } else if (index < bandSize) {
      role = "feature";
      if (bandSize === 3) {
        md = 6;
        lg = 4;
      }
    } else {
      const position = index - bandSize;
      md = mdContinuation[position];
      lg = lgContinuation[position];
    }

    const emphasis: TileEmphasis =
      role === "lead" || editorial ? "xl" : role === "feature" ? "lg" : "md";

    let minHeight = "";
    if (role !== "compact") {
      minHeight = editorial
        ? "md:min-h-[17rem] lg:min-h-[19rem]"
        : role === "lead"
          ? "md:min-h-[14rem] lg:min-h-[15rem]"
          : "";
    }

    return {
      role,
      emphasis,
      minHeight,
      placement: ["col-span-12", TABLET_SPAN[tablet], MD_SPAN[md], LG_SPAN[lg]].join(" "),
    };
  });

  return {
    introPlacement:
      count > 1 ? "col-span-12 lg:col-span-4 lg:row-span-2" : "col-span-12 lg:col-span-4",
    tiles,
  };
}
