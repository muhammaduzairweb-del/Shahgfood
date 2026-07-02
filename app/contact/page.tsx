import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { ContactContent } from "@/components/content/ContentPages";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Get in touch with Shah Jee Foods — call, email or send us a message for orders, feedback and catering.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <SiteShell>
      <ContactContent />
    </SiteShell>
  );
}
