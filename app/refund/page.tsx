import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { RefundContent } from "@/components/content/LegalPages";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "How Shah G Foods handles missing items, wrong orders, quality problems and refunds.",
  alternates: { canonical: "/refund" },
};

export default function RefundPage() {
  return (
    <SiteShell>
      <RefundContent />
    </SiteShell>
  );
}
