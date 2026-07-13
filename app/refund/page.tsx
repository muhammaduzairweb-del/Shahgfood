import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { RefundContent } from "@/components/content/LegalPages";

export const metadata: Metadata = {
  title: "Return & Refund Policy",
  description: "Refund policy for Shah G Online — how refunds work for food orders (handled by the restaurant) and for restaurant listing subscriptions.",
  alternates: { canonical: "/refund" },
};

export default function RefundPage() {
  return (
    <SiteShell>
      <RefundContent />
    </SiteShell>
  );
}
