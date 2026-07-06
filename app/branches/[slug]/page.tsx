import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import BranchDetail from "@/components/content/BranchDetail";
import { BRANCHES, branchSlug, getBranchBySlug } from "@/lib/data";

const SITE_URL = "https://shahgfood.com";

export function generateStaticParams() {
  return BRANCHES.map((b) => ({ slug: branchSlug(b.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const b = getBranchBySlug(slug);
  if (!b) return {};
  const title = `Shah G Foods ${b.name} — Menu, Delivery & Timings`;
  const description = `Order Daal Chawal, biryani, karahi, handi & BBQ from Shah G Foods ${b.name}, ${b.city}. Fast home delivery, open daily 11 AM–2 AM. Address: ${b.address}.`;
  return {
    title,
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
    priceRange: "Rs 1–1,000",
    url: `${SITE_URL}/branches/${slug}`,
    address: { "@type": "PostalAddress", streetAddress: b.address, addressLocality: b.city, addressRegion: b.city === "Rawalpindi" ? "Punjab" : "Islamabad Capital Territory", addressCountry: "PK" },
    geo: { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng },
    openingHours: "Mo-Su 11:00-02:00",
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BranchDetail slug={slug} />
    </SiteShell>
  );
}
