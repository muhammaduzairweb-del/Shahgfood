import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { FaqsContent } from "@/components/content/ContentPages";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about Shah G Foods: how to order, delivery areas, opening hours, payment and catering.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  return (
    <SiteShell>
      <FaqsContent />
    </SiteShell>
  );
}
