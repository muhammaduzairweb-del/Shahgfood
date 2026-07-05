import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { TermsContent } from "@/components/content/LegalPages";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern your use of the Shah G Foods website and your orders — pricing, delivery, cancellations, refunds and more.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <SiteShell>
      <TermsContent />
    </SiteShell>
  );
}
