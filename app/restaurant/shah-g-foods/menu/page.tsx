import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import MenuContent from "@/components/content/MenuContent";

export const metadata: Metadata = {
  title: "Shah G Foods Menu — 92 Desi Dishes & Prices",
  description: "The full Shah G Foods menu on Shah G Online — Daal Chawal, biryani, karahi, handi, BBQ, rolls, breakfast, chaat, shakes, juices & more. Order directly by call or WhatsApp.",
  alternates: { canonical: "/restaurant/shah-g-foods/menu" },
};

export default function ShahGFoodsMenuPage() {
  return (
    <SiteShell>
      <MenuContent />
    </SiteShell>
  );
}
