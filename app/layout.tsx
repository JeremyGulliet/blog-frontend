import type { Metadata } from "next";
import "./globals.css";
import { getGlobalData, getGlobalPageMetadata } from "./Strapi/strapi.server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getGlobalPageMetadata();
  //console.dir(metadata, { depth: null });

  // Formater l'URL du favicon
  const faviconUrl = metadata?.data?.favicon?.url
    ? metadata.data.favicon.url.startsWith("/")
      ? `http://localhost:1337${metadata.data.favicon.url}`
      : metadata.data.favicon.url
    : "/favicon.ico";

  // Formater l'URL de l'image OpenGraph
  const ogImageUrl = metadata?.data?.defaultSeo?.shareImage?.url
    ? metadata.data.defaultSeo.shareImage.url.startsWith("/")
      ? `http://localhost:1337${metadata.data.defaultSeo.shareImage.url}`
      : metadata.data.defaultSeo.shareImage.url
    : "";

  return {
    metadataBase: new URL("http://localhost:3000"),
    title: metadata?.data?.siteName ?? "Epic Next Course",
    description: metadata?.data?.siteDescription ?? "Epic Next Course",
    icons: {
      icon: [
        {
          url: faviconUrl,
          sizes: `${metadata?.data?.favicon?.width}x${metadata?.data?.favicon?.height}`,
          type: metadata?.data?.favicon?.mime,
        },
      ],
    },
    keywords: [
      "blog",
      "retraite",
      "articles",
      "planification de la retraite",
      "conseils de retraite",
      "épargne retraite",
      "investissement",
      "finances personnelles",
      "retraite anticipée",
      "stratégies de retraite",
    ],
    openGraph: {
      title: metadata?.data?.defaultSeo?.metaTitle,
      description: metadata?.data?.defaultSeo?.metaDescription,
      url:"http://localhost:3000",
      images: [
        {
          url: ogImageUrl,
          width: metadata?.data?.defaultSeo?.shareImage?.width,
          height: metadata?.data?.defaultSeo?.shareImage?.height,
          alt: metadata?.data?.defaultSeo?.shareImage?.alternativeText,
        },
      ],
      siteName: metadata?.data?.siteName,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = await getGlobalData();
  //console.dir(globalData, {depth: null});
  return (
    <html lang="en">
      <body>
        <Header data={globalData.data.header} />
        <div className="pt-16">{children}</div>
        <Footer data={globalData.data.footer} />
      </body>
    </html>
  );
}
