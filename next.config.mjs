import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      // the menu now lives under the featured restaurant's path
      { source: "/menu", destination: "/restaurant/shah-g-foods/menu", permanent: true },
      // contact page replaced by the complaint page; careers removed
      { source: "/contact", destination: "/complaint", permanent: true },
      { source: "/careers", destination: "/partner", permanent: true },
      { source: "/track", destination: "/complaint", permanent: false },
    ];
  },
  // Pin the workspace root — a stray lockfile in the parent Downloads folder
  // otherwise confuses Next's root inference.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
