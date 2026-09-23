import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import DishDetail from "@/components/content/DishDetail";
import { MENU, CATS, dishSlug, getDishBySlug, dishImage } from "@/lib/data";

import { SITE_URL } from "@/lib/copy";

export function generateStaticParams() {
  return MENU.map((d) => ({ slug: dishSlug(d.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDishBySlug(slug);
  if (!d) return {};
  const title = `${d.name}: Rs. ${d.price}`;
  const description = `${d.desc}. Order ${d.name} from Shah G Foods for Rs. ${d.price}, freshly cooked and delivered hot across Islamabad and Rawalpindi.`;
  const img = dishImage(d);
  return {
    title,
    description,
    alternates: { canonical: `/menu/${slug}` },
    openGraph: { title, description, url: `${SITE_URL}/menu/${slug}`, type: "website", images: [img ? `${SITE_URL}${img}` : "/Shahglogo.png"] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDishBySlug(slug);
  if (!d) notFound();

  const cat = CATS.find((c) => c.key === d.cat);
  const img = dishImage(d);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: d.name,
    description: d.desc,
    image: img ? `${SITE_URL}${img}` : `${SITE_URL}/Shahglogo.png`,
    url: `${SITE_URL}/menu/${slug}`,
    menuAddOn: cat ? cat.label : undefined,
    offers: {
      "@type": "Offer",
      price: d.price,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/menu/${slug}`,
    },
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DishDetail slug={slug} />
    </SiteShell>
  );
}
