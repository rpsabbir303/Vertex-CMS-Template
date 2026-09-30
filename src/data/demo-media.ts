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
  hero: photo("hero", "Site crew reviewing a reinforced deck before a concrete pour", "hero.jpg", 1800, 1200),
  steel: photo("steel", "Tower cranes over a structural steel frame", "site-steel.jpg"),
  towers: photo("towers", "High-rise buildings under construction with tower cranes", "towers.jpg"),
  plans: photo("plans", "Project manager marking up a set of construction drawings", "plans.jpg"),
  commercial: photo("commercial", "Completed commercial office towers", "commercial.jpg"),
  interior: photo("interior", "Finished commercial workplace interior", "interior.jpg"),
  renovation: photo("renovation", "Interior renovation with shoring and selective demolition", "renovation.jpg"),
  healthcare: photo("healthcare", "Healthcare facility reception corridor", "healthcare.jpg"),
  industrial: photo("industrial", "Distribution warehouse interior with racking", "industrial.jpg", 1200, 1600),
  education: photo("education", "Institutional campus building", "education.jpg"),
  concrete: photo("concrete", "Crew tying rebar and setting formwork", "concrete.jpg"),
  crane: photo("crane", "Crew working on a reinforced slab", "crane.jpg"),
  worker: photo("worker", "Field electrician beside a temporary power panel", "worker.jpg"),
  portrait1: photo("p1", "Portrait of Jordan Hale", "portrait-1.jpg", 800, 1000),
  portrait2: photo("p2", "Portrait of Priya Shah", "portrait-2.jpg", 800, 1000),
  portrait3: photo("p3", "Portrait of Marcus Ellison", "portrait-3.jpg", 800, 1000),
  portrait4: photo("p4", "Portrait of Elena Vargas", "portrait-4.jpg", 800, 1000),
};
