import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import FeedContent from "@/components/content/FeedContent";

export const metadata: Metadata = {
  title: "Feed — New Restaurants & Home Kitchens",
  description: "See the newest restaurants and home kitchens that just went live on Shah G Online.",
  alternates: { canonical: "/feed" },
};

export default function FeedPage() {
  return (
    <SiteShell>
      <FeedContent />
    </SiteShell>
  );
}
