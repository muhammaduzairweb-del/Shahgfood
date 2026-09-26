import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { ComplaintForm } from "@/components/content/ComplaintsContent";

export const metadata: Metadata = {
  title: "File a Complaint About a Restaurant",
  description:
    "Had a bad experience at a restaurant anywhere in Pakistan? File a complaint about food quality, hygiene, delivery, overcharging or staff. Your contact details stay private.",
  alternates: { canonical: "/complaints/new" },
};

export default function NewComplaintPage() {
  return (
    <SiteShell>
      <ComplaintForm />
    </SiteShell>
  );
}
