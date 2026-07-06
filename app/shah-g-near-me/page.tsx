import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { NearMeContent } from "@/components/content/SeoPages";

export const metadata: Metadata = {
  title: "Shah G Foods Near Me — Find Your Nearest Branch",
  description:
    "Find the nearest Shah G Foods branch to you. Allow your location to see the closest branches across Islamabad & Rawalpindi with distance, address and directions.",
  alternates: { canonical: "/shah-g-near-me" },
};

export default function Page() {
  return (
    <SiteShell>
      <NearMeContent />
    </SiteShell>
  );
}
