import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { BranchesContent } from "@/components/content/ContentPages";

export const metadata: Metadata = {
  title: "Our Branches",
  description: "35+ Shah Jee Foods branches across Islamabad & Rawalpindi. Find your nearest one for fast desi food delivery.",
  alternates: { canonical: "/branches" },
};

export default function BranchesPage() {
  return (
    <SiteShell>
      <BranchesContent />
    </SiteShell>
  );
}
