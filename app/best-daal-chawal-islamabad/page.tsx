import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { DaalChawalContent } from "@/components/content/SeoPages";

export const metadata: Metadata = {
  title: "Best Daal Chawal in Islamabad & Rawalpindi",
  description:
    "Looking for the best daal chawal in Islamabad or Rawalpindi? Shah G Foods serves its famous, budget-friendly Daal Chawal at 40 branches. Cooked fresh and delivered hot.",
  alternates: { canonical: "/best-daal-chawal-islamabad" },
};

export default function Page() {
  return (
    <SiteShell>
      <DaalChawalContent />
    </SiteShell>
  );
}
