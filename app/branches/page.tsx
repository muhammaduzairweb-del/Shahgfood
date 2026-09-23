import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { BranchesContent } from "@/components/content/ContentPages";

export const metadata: Metadata = {
  title: "All Branches in Islamabad & Rawalpindi",
  description: "Find your nearest Shah G Foods branch. 40 locations across Islamabad and Rawalpindi with addresses, timings and directions. Open daily 8 AM to 2 AM.",
  alternates: { canonical: "/branches" },
};

export default function BranchesPage() {
  return (
    <SiteShell>
      <BranchesContent />
    </SiteShell>
  );
}
