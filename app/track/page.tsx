import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { TrackContent } from "@/components/content/ContentPages";

export const metadata: Metadata = {
  title: "Order tracking",
  description: "Track your Shah G Foods order live on the map with your rider and a countdown ETA. Enter your Order ID to begin.",
  alternates: { canonical: "/track" },
  robots: { index: false, follow: true },
};

export default function TrackPage() {
  return (
    <SiteShell>
      <TrackContent />
    </SiteShell>
  );
}
