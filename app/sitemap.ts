import type { MetadataRoute } from "next";

const SITE_URL = "https://shahgfood.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["", 1, "daily"],
    ["menu", 0.9, "weekly"],
    ["about", 0.6, "monthly"],
    ["branches", 0.8, "weekly"],
    ["careers", 0.5, "monthly"],
    ["contact", 0.5, "monthly"],
    ["faqs", 0.6, "monthly"],
    ["privacy", 0.3, "yearly"],
    ["terms", 0.3, "yearly"],
  ];
  return routes.map(([path, priority, changeFrequency]) => ({
    url: path ? `${SITE_URL}/${path}` : SITE_URL,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
