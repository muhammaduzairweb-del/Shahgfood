import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import MenuContent from "@/components/content/MenuContent";

export const metadata: Metadata = {
  title: "Menu — 54 Desi Dishes",
  description: "Browse the full Shah G Foods menu — Daal Chawal, biryani, karahi, handi, BBQ, rolls, burgers, chaat, lassi and desi chai. Order online for fast delivery.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <SiteShell>
      <MenuContent />
    </SiteShell>
  );
}
