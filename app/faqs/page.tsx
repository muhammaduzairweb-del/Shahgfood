import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { FaqsContent } from "@/components/content/ContentPages";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Delivery areas, timings, fees, payment methods and order tracking — answers to common Shah Jee Foods questions.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  return (
    <SiteShell>
      <FaqsContent />
    </SiteShell>
  );
}
