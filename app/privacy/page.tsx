import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { PrivacyContent } from "@/components/content/LegalPages";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Shah G Foods collects, uses and protects your information when you use shahgfood.com or order from us.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <PrivacyContent />
    </SiteShell>
  );
}
