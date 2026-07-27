import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import KitchenIndexContent from "@/components/content/KitchenIndexContent";

export const metadata: Metadata = {
  title: "Home Kitchens — Order Fresh Homestyle Food",
  description: "Browse independent home kitchen partners on Shah G Online — fresh, homestyle food made and delivered directly by home cooks near you.",
  alternates: { canonical: "/kitchen" },
};

export default function KitchenIndexPage() {
  return (
    <SiteShell>
      <KitchenIndexContent />
    </SiteShell>
  );
}
