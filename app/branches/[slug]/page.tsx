import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import BranchDetail from "@/components/content/BranchDetail";
import { BRANCHES, ORDER_TEL, branchSlug, getBranchBySlug } from "@/lib/data";

import { SITE_URL } from "@/lib/copy";

export function generateStaticParams() {
  return BRANCHES.map((b) => ({ slug: branchSlug(b.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBranchBySlug(slug);
  if (!b) return {};
  const title = `Shah G Foods ${b.name}, ${b.city}: Address, Timings & Delivery`;
  const description = `Order Daal Chawal, biryani, karahi and BBQ from Shah G Foods ${b.name}, ${b.city}. Address: ${b.address}. Open daily 8 AM to 2 AM with fast home delivery.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/branches/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/branches/${slug}`, type: "website" },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const b = getBranchBySlug(slug);
  if (!b) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: `Shah G Foods ${b.name}`,
    servesCuisine: ["Pakistani", "Desi", "BBQ"],
    telephone: ORDER_TEL,
    image: `${SITE_URL}/Shahgfoods__Feature.jpg`,
    parentOrganization: { "@id": `${SITE_URL}/#restaurant` },
    priceRange: "Rs 100–2000",
    url: `${SITE_URL}/branches/${slug}`,
    address: { "@type": "PostalAddress", streetAddress: b.address, addressLocality: b.city, addressRegion: b.city === "Rawalpindi" ? "Punjab" : "Islamabad Capital Territory", addressCountry: "PK" },
    geo: { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng },
    openingHours: "Mo-Su 08:00-02:00",
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BranchDetail slug={slug} />
    </SiteShell>
  );
}
