import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { AboutContent } from "@/components/content/ContentPages";

export const metadata: Metadata = {
  title: "About us",
  description: "The Shah Jee Foods story — from one plate of legendary Daal Chawal in F-10 to 35+ branches across Islamabad & Rawalpindi.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <AboutContent />
    </SiteShell>
  );
}
