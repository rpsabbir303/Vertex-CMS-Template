import { existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const roots = [".next", ".next-dev"];

for (const dir of roots) {
  const target = resolve(process.cwd(), dir);
  if (!existsSync(target)) {
    console.log(`No ${dir} folder to remove`);
    continue;
  }
  try {
    rmSync(target, { recursive: true, force: true });
    console.log(`Removed ${dir} cache`);
  } catch (error) {
    console.error(`Failed to remove ${dir}:`, error);
    process.exitCode = 1;
  }
}

console.log(
  "Caches cleared. Start the app with `npm run dev` or `npm run dev:3001` (do not run `npm run build` against the same port process).",
);
