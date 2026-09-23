import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import ContactContent from "@/components/content/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Shah G Foods in Islamabad and Rawalpindi. Call +92 330 786 2992, message us on WhatsApp, or send feedback, catering requests and order issues online.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <SiteShell>
      <ContactContent />
    </SiteShell>
  );
}
