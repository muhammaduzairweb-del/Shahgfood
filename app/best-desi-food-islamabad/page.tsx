import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import GuideContent from "@/components/content/GuideContent";

export const metadata: Metadata = {
  title: "Best Desi Food & Daal Chawal in Islamabad & Rawalpindi (2026 Guide)",
  description:
    "Where to get the best daal chawal, biryani, karahi and BBQ in Islamabad & Rawalpindi. A local guide to Shah G Foods — 40+ branches, fast delivery, open daily 11 AM–2 AM.",
  alternates: { canonical: "/best-desi-food-islamabad" },
};

export default function GuidePage() {
  return (
    <SiteShell>
      <GuideContent />
    </SiteShell>
  );
}
