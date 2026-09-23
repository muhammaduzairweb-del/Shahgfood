import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import GuideContent from "@/components/content/GuideContent";

export const metadata: Metadata = {
  title: "Best Desi Food & Daal Chawal in Islamabad & Rawalpindi",
  description:
    "Where to find the best daal chawal, biryani, karahi and BBQ in Islamabad and Rawalpindi. A local guide to Shah G Foods: 40 branches, fast delivery, open daily 8 AM to 2 AM.",
  alternates: { canonical: "/best-desi-food-islamabad" },
};

export default function GuidePage() {
  return (
    <SiteShell>
      <GuideContent />
    </SiteShell>
  );
}
