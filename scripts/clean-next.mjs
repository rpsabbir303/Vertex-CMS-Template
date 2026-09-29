import { rmSync } from "node:fs";

console.log(
  "Tip: Stop `npm run dev` before cleaning .next, or the dev server will return 500 until restarted.",
);

try {
  rmSync(".next", { recursive: true, force: true });
  console.log("Removed .next cache");
} catch {
  console.log("No .next folder to remove");
}
