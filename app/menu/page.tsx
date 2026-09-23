import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import MenuContent from "@/components/content/MenuContent";

export const metadata: Metadata = {
  title: "Menu & Prices",
  description:
    "The full Shah G Foods menu with prices: Daal Chawal, biryani, Bannu pulao, karahi, charcoal BBQ, rolls, burgers, breakfast, chaat, shakes and fresh juices. Order by call or WhatsApp in Islamabad and Rawalpindi.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <SiteShell>
      <MenuContent />
    </SiteShell>
  );
}
