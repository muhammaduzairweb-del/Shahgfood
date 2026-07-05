import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { PrivacyContent } from "@/components/content/LegalPages";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Shah G Foods collects, uses, shares and protects your personal information when you order desi food online.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <SiteShell>
      <PrivacyContent />
    </SiteShell>
  );
}
