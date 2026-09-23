import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { NearMeContent } from "@/components/content/SeoPages";

export const metadata: Metadata = {
  title: { absolute: "Shah G Foods Near Me: Find Your Nearest Branch" },
  description:
    "Find the Shah G Foods branch nearest to you. Share your location to see the closest of our 40 branches in Islamabad and Rawalpindi, with distance, address and directions.",
  alternates: { canonical: "/shah-g-near-me" },
};

export default function Page() {
  return (
    <SiteShell>
      <NearMeContent />
    </SiteShell>
  );
}
