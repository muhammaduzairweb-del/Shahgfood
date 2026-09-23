import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { ContactNumberContent } from "@/components/content/SeoPages";

export const metadata: Metadata = {
  title: { absolute: "Shah G Foods Contact Number: Call or WhatsApp to Order" },
  description:
    "The Shah G Foods contact number for every branch in Islamabad and Rawalpindi is +92 330 786 2992. Call or WhatsApp to order, share feedback or ask about catering. Open daily 8 AM to 2 AM.",
  alternates: { canonical: "/shah-g-contact-number" },
};

export default function Page() {
  return (
    <SiteShell>
      <ContactNumberContent />
    </SiteShell>
  );
}
