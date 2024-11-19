/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHomePageData } from "@/app/Strapi/strapi.server";
import { HeroSection } from "@/components/layout/hero-section";
import { FeatureSection } from "@/components/layout/features-section";

const blockComponents = {
  "layout.hero-section": HeroSection,
  "layout.features-section": FeatureSection,
};

function blockRenderer(block: any) {
  const Component =
    blockComponents[block.__component as keyof typeof blockComponents];
  return Component ? <Component key={block.id} data={block} /> : null;
}

export default async function Home() {
  const data = await getHomePageData();
  const { blocks } = data.data;

  return (
    <main className="container mx-auto py-6">{blocks.map(blockRenderer)}</main>
  );
}
