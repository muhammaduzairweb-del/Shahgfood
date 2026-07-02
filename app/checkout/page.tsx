import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import CheckoutContent from "@/components/content/CheckoutContent";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <SiteShell>
      <CheckoutContent />
    </SiteShell>
  );
}
