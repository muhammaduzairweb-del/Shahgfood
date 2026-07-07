import type { MetadataRoute } from "next";
import { BRANCHES, branchSlug, MENU, dishSlug } from "@/lib/data";

const SITE_URL = "https://shahgfood.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["", 1, "daily"],
    ["menu", 0.9, "weekly"],
    ["best-desi-food-islamabad", 0.9, "weekly"],
    ["best-daal-chawal-islamabad", 0.9, "weekly"],
    ["shah-g-near-me", 0.8, "weekly"],
    ["shah-g-contact-number", 0.7, "monthly"],
    ["shah-g-foods-photos", 0.6, "monthly"],
    ["branches", 0.8, "weekly"],
    ["about", 0.6, "monthly"],
    ["careers", 0.5, "monthly"],
    ["contact", 0.5, "monthly"],
    ["faqs", 0.6, "monthly"],
    ["privacy", 0.3, "yearly"],
    ["terms", 0.3, "yearly"],
    // dedicated per-branch landing pages (local SEO)
    ...BRANCHES.map((b) => [`branches/${branchSlug(b.name)}`, 0.75, "weekly"] as [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]]),
    // dedicated per-dish pages (menu SEO)
    ...MENU.map((d) => [`menu/${dishSlug(d.name)}`, 0.6, "weekly"] as [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]]),
  ];
  return routes.map(([path, priority, changeFrequency]) => ({
    url: path ? `${SITE_URL}/${path}` : SITE_URL,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
