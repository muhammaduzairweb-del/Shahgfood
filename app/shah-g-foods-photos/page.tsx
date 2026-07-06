import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { PhotosContent } from "@/components/content/SeoPages";

export const metadata: Metadata = {
  title: "Shah G Foods Photos — Food Gallery",
  description:
    "Photos of Shah G Foods — daal chawal, biryani, karahi, handi, charcoal BBQ, rolls, chaat, lassi and desi chai. See the food, then order online across Islamabad & Rawalpindi.",
  alternates: { canonical: "/shah-g-foods-photos" },
};

export default function Page() {
  return (
    <SiteShell>
      <PhotosContent />
    </SiteShell>
  );
}
