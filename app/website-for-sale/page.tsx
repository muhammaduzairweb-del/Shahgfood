import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import SaleContent from "@/components/content/SaleContent";

export const metadata: Metadata = {
  title: { absolute: "Food Website & Domain for Sale: shahgfood.com | From 2,800 USD" },
  description:
    "Buy shahgfood.com: a 3-month-old food website with 86,800 Google impressions, 2,510 clicks and a 6.1 average position. Full Next.js code, 150+ pages, free hosting. Starting from 2,800 USD.",
  alternates: { canonical: "/website-for-sale" },
};

export default function WebsiteForSalePage() {
  return (
    <SiteShell>
      <SaleContent />
    </SiteShell>
  );
}
