import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Content-Security-Policy: locks down where the page may load things from, while
// still allowing Google AdSense (which loads scripts, frames and images from
// many Google domains over https), Google Fonts, the map tiles and the
// geocoder. Inline scripts are needed for Next.js and the JSON-LD blocks.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https:",
  "frame-src https:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // geolocation stays on for our own pages (the location picker needs it)
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), payment=(), usb=(), magnetometer=(), gyroscope=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  async redirects() {
    return [
      // old marketplace-era URLs -> their Shah G Foods equivalents
      { source: "/restaurant/shah-g-foods/menu", destination: "/menu", permanent: true },
      { source: "/complaint", destination: "/complaints", permanent: true },
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
      { source: "/admin", destination: "/", permanent: false },
      { source: "/admin/super", destination: "/", permanent: false },
    ];
  },
  // Pin the workspace root — a stray lockfile in the parent Downloads folder
  // otherwise confuses Next's root inference.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
