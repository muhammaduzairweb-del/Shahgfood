import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { TermsContent } from "@/components/content/LegalPages";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms for using shahgfood.com and ordering from Shah G Foods: pricing, payment, delivery, cancellations and more.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <SiteShell>
      <TermsContent />
    </SiteShell>
  );
}
