import type { Metadata } from "next";
import Head from "next/head";

export default function ArticleLayout({
  children,
  metadata,
}: Readonly<{
  children: React.ReactNode;
  metadata?: Metadata;
}>) {
  return (
    <>
      <Head>
        {metadata?.title && <title>{`${metadata.title}`}</title>}
        {metadata?.description && (
          <meta name="description" content={metadata.description} />
        )}
      </Head>
      <main>{children}</main>
    </>
  );
}
