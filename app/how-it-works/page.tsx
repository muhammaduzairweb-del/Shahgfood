import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { HowItWorksContent } from "@/components/content/CompanyPages";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How Shah G Online (shahgfood.com) works — browse menus from restaurants like Shah G Foods, order directly by call or WhatsApp, and list your own restaurant with zero commission.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <SiteShell>
      <HowItWorksContent />
    </SiteShell>
  );
}
