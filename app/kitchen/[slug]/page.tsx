import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import KitchenContent from "@/components/content/KitchenContent";
import { KITCHENS, getKitchen } from "@/lib/kitchens";

const SITE_URL = "https://shahgfood.com";

export function generateStaticParams() {
  return KITCHENS.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const k = getKitchen(slug);
  if (!k) return {};
  const title = `${k.name} — Order Homestyle Food`;
  const description = `${k.tagline} Order directly from ${k.name} by call or WhatsApp. Delivering to ${k.areas.join(", ")}.`;
  return {
    title,
    description,
    alternates: { canonical: `/kitchen/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/kitchen/${slug}`, type: "website" },
  };
}

export default async function KitchenPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const kitchen = getKitchen(slug);
  if (!kitchen) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: kitchen.name,
    servesCuisine: ["Pakistani", "Desi", "Home-cooked"],
    url: `${SITE_URL}/kitchen/${slug}`,
    telephone: kitchen.phone,
    areaServed: kitchen.areas,
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <KitchenContent kitchen={kitchen} />
    </SiteShell>
  );
}
