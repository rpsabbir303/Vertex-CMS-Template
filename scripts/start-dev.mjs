#!/usr/bin/env node
/**
 * Stable local preview starter.
 * - Frees the requested port if a stale Next process is holding it
 * - Starts Next via the local binary (avoids Windows npx spawn EINVAL)
 *
 * Usage: node scripts/start-dev.mjs [port]
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { platform } from "node:os";

const require = createRequire(import.meta.url);
const port = Number(process.argv[2] || process.env.PORT || 3000);
const nextBin = require.resolve("next/dist/bin/next");

function canListen(p) {
  return new Promise((resolve) => {
    const server = createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(p, "127.0.0.1");
  });
}

async function freePort(p) {
  if (await canListen(p)) {
    return;
  }

  console.log(`Port ${p} is busy — releasing stale listeners…`);

  if (platform() === "win32") {
    await new Promise((resolve) => {
      const finder = spawn(
        "powershell.exe",
        [
          "-NoProfile",
          "-Command",
          `Get-NetTCPConnection -LocalPort ${p} -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }`,
        ],
        { stdio: "ignore", shell: false },
      );
      finder.on("exit", () => resolve());
      finder.on("error", () => resolve());
    });
  } else {
    await new Promise((resolve) => {
      const finder = spawn("sh", ["-c", `lsof -ti tcp:${p} | xargs -r kill -9`], {
        stdio: "ignore",
      });
      finder.on("exit", () => resolve());
      finder.on("error", () => resolve());
    });
  }

  await new Promise((r) => setTimeout(r, 500));
}

await freePort(port);

console.log(`Starting Next.js on http://localhost:${port}`);

const child = spawn(
  process.execPath,
  [nextBin, "dev", "--turbopack", "-p", String(port)],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "development",
    },
  },
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
