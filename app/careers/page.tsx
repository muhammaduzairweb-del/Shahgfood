import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { CareersContent } from "@/components/content/ContentPages";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Shah G Foods team. Open roles for managers, chefs, riders and counter staff across Islamabad & Rawalpindi.",
  alternates: { canonical: "/careers" },
};

export default function CareersPage() {
  return (
    <SiteShell>
      <CareersContent />
    </SiteShell>
  );
}
