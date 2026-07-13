import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { ServiceContent } from "@/components/content/LegalPages";

export const metadata: Metadata = {
  title: "Service Delivery Policy",
  description: "Service delivery policy for Shah G Online — a digital marketplace. No physical shipping; restaurant listings are activated within 24 hours of verified payment.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return (
    <SiteShell>
      <ServiceContent />
    </SiteShell>
  );
}
