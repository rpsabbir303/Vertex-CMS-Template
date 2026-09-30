import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/**
 * Separate build caches for `next dev` and `next build`.
 * Sharing `.next` caused recurring Internal Server Errors on Windows
 * whenever a production build ran while Turbopack was watching.
 */
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  distDir: isDev ? ".next-dev" : ".next",
  /** Hide the bottom-left Next.js route/dev indicator (dev only). */
  devIndicators: false,
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
