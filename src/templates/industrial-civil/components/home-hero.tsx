import type { CmsImage } from "@/templates/shared/cms/types/media";
import { RecordHeading, type HeroStat } from "@/templates/industrial-civil/components/record-heading";

export type { HeroStat };

export function HomeHero({
  kicker,
  title,
  body,
  image,
  stats,
  primaryHref,
  secondaryHref,
}: {
  kicker?: string;
  title: string;
  body?: string;
  image?: CmsImage;
  stats: HeroStat[];
  primaryHref: string;
  secondaryHref: string;
}) {
  return (
    <RecordHeading
      eyebrow={kicker}
      title={title}
      lead={body}
      image={image}
      stats={stats}
      primaryHref={primaryHref}
      secondaryHref={secondaryHref}
    />
  );
}
