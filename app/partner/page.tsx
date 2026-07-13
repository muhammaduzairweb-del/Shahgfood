import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import PartnerContent from "@/components/content/PartnerContent";

export const metadata: Metadata = {
  title: "List Your Restaurant — Shah G Online Marketplace",
  description:
    "Become a digital partner on Shah G Online. List up to 5 signature dishes for Rs 15,000/month — 0% commission, direct call & WhatsApp orders, reach 1,000+ daily customers in Islamabad & Rawalpindi.",
  alternates: { canonical: "/partner" },
};

export default function PartnerPage() {
  return (
    <SiteShell>
      <PartnerContent />
    </SiteShell>
  );
}
