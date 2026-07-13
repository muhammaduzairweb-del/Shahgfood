import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { MissionContent } from "@/components/content/CompanyPages";

export const metadata: Metadata = {
  title: "Our mission",
  description:
    "The mission behind Shah G Online (shahgfood.com) — giving every Pakistani kitchen, from Shah G Foods to home chefs, the digital power to sell great food with zero commission.",
  alternates: { canonical: "/mission" },
};

export default function MissionPage() {
  return (
    <SiteShell>
      <MissionContent />
    </SiteShell>
  );
}
