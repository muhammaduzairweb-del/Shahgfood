import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { AboutContent } from "@/components/content/ContentPages";

export const metadata: Metadata = {
  title: "About Us",
  description: "The Shah G Foods story: from one plate of Daal Chawal at F-10 Markaz to 40 branches across Islamabad and Rawalpindi.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <AboutContent />
    </SiteShell>
  );
}
