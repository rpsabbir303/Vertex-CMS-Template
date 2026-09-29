import type { CmsImage } from "@/templates/shared/cms/types/media";

function photo(
  id: string,
  alt: string,
  file: string,
  width = 1600,
  height = 1067,
): CmsImage {
  return { id, alt, url: `/media/corporate/${file}`, width, height };
}

export const demoMedia = {
  logo: {
    id: "logo",
    alt: "Alden Commercial Builders mark",
    url: "/media/demo/logo-mark.svg",
    width: 96,
    height: 96,
  } satisfies CmsImage,
  hero: photo("hero", "Tower crane over a commercial building frame", "hero.jpg", 1800, 1200),
  steel: photo("steel", "Structural steel frame on an active jobsite", "site-steel.jpg"),
  commercial: photo("commercial", "Completed commercial office building", "commercial.jpg"),
  interior: photo("interior", "Finished commercial workplace interior", "interior.jpg"),
  healthcare: photo("healthcare", "Healthcare facility corridor", "healthcare.jpg"),
  industrial: photo("industrial", "Industrial building interior during construction", "industrial.jpg"),
  education: photo("education", "Institutional campus building", "education.jpg"),
  concrete: photo("concrete", "Concrete structure under construction", "concrete.jpg"),
  crane: photo("crane", "Crew and crane on a commercial site", "crane.jpg"),
  portrait1: photo("p1", "Portrait of Jordan Hale", "portrait-1.jpg", 800, 1000),
  portrait2: photo("p2", "Portrait of Priya Shah", "portrait-2.jpg", 800, 1000),
  portrait3: photo("p3", "Portrait of Marcus Ellison", "portrait-3.jpg", 800, 1000),
  portrait4: photo("p4", "Portrait of Elena Vargas", "portrait-4.jpg", 800, 1000),
};
