import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import SaleContent from "@/components/content/SaleContent";

export const metadata: Metadata = {
  title: { absolute: "shahgfood.com Is for Sale: Food Website & Premium Domain" },
  description:
    "shahgfood.com is for sale: a premium domain listed on GoDaddy plus a 3-month-old food website with 86,800 Google impressions, 2,510 clicks and a 6.1 average position.",
  alternates: { canonical: "/website-for-sale" },
};

export default function WebsiteForSalePage() {
  return (
    <SiteShell>
      <SaleContent />
    </SiteShell>
  );
}
