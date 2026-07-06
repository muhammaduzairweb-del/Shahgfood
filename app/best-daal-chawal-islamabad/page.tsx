import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { DaalChawalContent } from "@/components/content/SeoPages";

export const metadata: Metadata = {
  title: "Best Daal Chawal in Islamabad & Rawalpindi",
  description:
    "Where to get the best daal chawal in Islamabad & Rawalpindi — Shah G Foods' legendary, budget-friendly daal chawal, cooked fresh and delivered hot. Order online, 40+ branches.",
  alternates: { canonical: "/best-daal-chawal-islamabad" },
};

export default function Page() {
  return (
    <SiteShell>
      <DaalChawalContent />
    </SiteShell>
  );
}
