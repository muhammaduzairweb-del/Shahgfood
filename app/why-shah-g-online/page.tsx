import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { WhyUsContent } from "@/components/content/CompanyPages";

export const metadata: Metadata = {
  title: "Why Shah G Online",
  description:
    "Why restaurants choose Shah G Online (shahgfood.com) over commission apps — 10,000+ daily visitors, 0% commission, direct call & WhatsApp orders, and Google-ranked pages like Shah G Foods'.",
  alternates: { canonical: "/why-shah-g-online" },
};

export default function WhyUsPage() {
  return (
    <SiteShell>
      <WhyUsContent />
    </SiteShell>
  );
}
