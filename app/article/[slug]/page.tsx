import { getArticlesBySlug } from "@/app/Strapi/strapi.server";
import Image from "next/image";
 import Link from "next/link";

async function getStrapiData(slug: string) {
    try {
        return getArticlesBySlug(slug);
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
    const article = await getStrapiData(params.slug);

    if (!article) {
        return <div>Error loading article</div>;
    }

    return (
      <div className="flex flex-col justify-center items-center">
        {article.cover && (
          <Image
            src={
              article.cover.url.startsWith("/")
                ? `http://localhost:1337${article.cover.url}`
                : article.cover.url
            }
            alt={article.cover.alternativeText || ""}
            width={article.cover.width}
            height={article.cover.height}
            className="w-96 rounded-2xl"
          />
        )}
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        {article.author && <p>{article.author.name}</p>}
        {article.category && <p>{article.category.name}</p>}
        
           
            <Link href="/article" className="text-blue-500 hover:underline mt-4">
                Retour à la page précédente
            </Link>
      </div>
    
    );
}
