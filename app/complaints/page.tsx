import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { ComplaintsList } from "@/components/content/ComplaintsContent";

export const metadata: Metadata = {
  title: "Restaurant Complaints & Ratings in Pakistan",
  description:
    "Read real customer complaints and ratings for restaurants across Pakistan, in Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta and more. Had a bad experience? File your complaint.",
  alternates: { canonical: "/complaints" },
};

export default function ComplaintsPage() {
  return (
    <SiteShell>
      <ComplaintsList />
    </SiteShell>
  );
}
