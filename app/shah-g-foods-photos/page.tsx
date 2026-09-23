import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import { PhotosContent } from "@/components/content/SeoPages";

export const metadata: Metadata = {
  title: { absolute: "Shah G Foods Photos: Real Food Gallery" },
  description:
    "Real photos of Shah G Foods dishes: daal chawal, biryani, karahi, charcoal BBQ, rolls, chaat, shakes and chai. See the food, then order in Islamabad and Rawalpindi.",
  alternates: { canonical: "/shah-g-foods-photos" },
};

export default function Page() {
  return (
    <SiteShell>
      <PhotosContent />
    </SiteShell>
  );
}
