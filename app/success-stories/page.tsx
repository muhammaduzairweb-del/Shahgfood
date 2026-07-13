import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { SuccessStoriesContent } from "@/components/content/CompanyPages";

export const metadata: Metadata = {
  title: "Success stories",
  description:
    "Partner success stories on Shah G Online (shahgfood.com) — starting with Shah G Foods, our first featured partner with 90+ dishes listed on the Super Premium yearly package.",
  alternates: { canonical: "/success-stories" },
};

export default function SuccessStoriesPage() {
  return (
    <SiteShell>
      <SuccessStoriesContent />
    </SiteShell>
  );
}
