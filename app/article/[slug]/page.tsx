import ArticleClientWrapper from "@/components/article/one/ArticleClientWrapper";
import { getArticlesBySlug } from "@/app/Strapi/strapi.server";
import { transformToArticle } from "@/lib/types/articleTransform";
import { LoadingSpinner } from "@/components/article/LoadingSpinner";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const rawData = await getArticlesBySlug(params.slug);
  const article = transformToArticle(rawData);

  if (!article) {
    return <LoadingSpinner />;
  }

  return <ArticleClientWrapper initialArticle={article} />;
}
