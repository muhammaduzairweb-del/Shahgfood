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
      // old marketplace-era URLs -> their Shah G Foods equivalents
      { source: "/restaurant/shah-g-foods/menu", destination: "/menu", permanent: true },
      { source: "/complaint", destination: "/contact", permanent: true },
      { source: "/careers", destination: "/contact", permanent: true },
      { source: "/track", destination: "/contact", permanent: true },
      { source: "/shipping", destination: "/terms", permanent: true },
      { source: "/partner", destination: "/", permanent: true },
      { source: "/kitchen/:path*", destination: "/", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      { source: "/chat", destination: "/contact", permanent: true },
      { source: "/vendor/:path*", destination: "/", permanent: true },
      { source: "/how-it-works", destination: "/about", permanent: true },
      { source: "/mission", destination: "/about", permanent: true },
      { source: "/why-shah-g-online", destination: "/about", permanent: true },
      { source: "/success-stories", destination: "/about", permanent: true },
      { source: "/checkout", destination: "/menu", permanent: true },
      { source: "/login", destination: "/", permanent: true },
      { source: "/signup", destination: "/", permanent: true },
      { source: "/forgot-password", destination: "/", permanent: true },
      { source: "/admin/:path*", destination: "/", permanent: false },
    ];
  },
  // Pin the workspace root — a stray lockfile in the parent Downloads folder
  // otherwise confuses Next's root inference.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
