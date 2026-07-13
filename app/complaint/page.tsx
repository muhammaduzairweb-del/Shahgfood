import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import ComplaintContent from "@/components/content/ComplaintContent";

export const metadata: Metadata = {
  title: "File a Complaint",
  description: "Had a problem with an order from a restaurant listed on Shah G Online? File a complaint and our team will investigate — scams, undelivered food, quality issues and more.",
  alternates: { canonical: "/complaint" },
};

export default function ComplaintPage() {
  return (
    <SiteShell>
      <ComplaintContent />
    </SiteShell>
  );
}
