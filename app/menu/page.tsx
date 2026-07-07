import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import MenuContent from "@/components/content/MenuContent";

export const metadata: Metadata = {
  title: "Shah G Foods Menu — 92 Desi Dishes & Prices",
  description: "The full Shah G Foods menu with prices — Daal Chawal, biryani, karahi, handi, BBQ, rolls, burgers, chaat, lassi and desi chai. Order online for fast delivery in Islamabad & Rawalpindi.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <SiteShell>
      <MenuContent />
    </SiteShell>
  );
}
