import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { ContactNumberContent } from "@/components/content/SeoPages";

export const metadata: Metadata = {
  title: "Shah G Foods Contact Number — Call to Order",
  description:
    "Shah G Foods contact number for all branches in Islamabad & Rawalpindi. Call +92 330 786 2992 to order, give feedback or ask about catering. Open daily 11 AM–2 AM.",
  alternates: { canonical: "/shah-g-contact-number" },
};

export default function Page() {
  return (
    <SiteShell>
      <ContactNumberContent />
    </SiteShell>
  );
}
