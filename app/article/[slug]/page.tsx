"use client";

import { useState, useEffect } from "react";
import { getArticlesBySlug } from "@/app/Strapi/strapi.server";
import { Article, ArticleComment } from "@/lib/types/zodTypes";
import { transformToArticle } from "@/lib/types/articleTransform";
import Link from "next/link";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import ArticleLayout from "@/app/article/[slug]/layout";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleCover } from "@/components/article/ArticleCover";
import { ArticleContent } from "@/components/article/ArticleContent";
import { Comments } from "@/components/article/Comments";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState<ArticleComment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawData = await getArticlesBySlug(params.slug);
        const articleData = transformToArticle(rawData);

        if (articleData) {
          setArticle(articleData);
          setComments(articleData.comments || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [params.slug]);

  if (!article) return <div className="flex justify-center items-center">Article en cours de chargement.</div>;

  const handleCommentAdded = (newComment: ArticleComment) => {
    setComments((prev) => [...prev, newComment]);
    setShowForm(false);
  };

  return (
    <ArticleLayout
      metadata={{ title: article.title, description: article.description }}
    >
      <div className="flex flex-col items-center justify-center bg-gray-500 p-4">
        <ArticleHeader article={article} />
        <ArticleCover
          cover={
            article.cover
              ? {
                  ...article.cover,
                  alternativeText:
                    article.cover.alternativeText || "Article image",
                }
              : undefined
          }
        />
        <ArticleContent content={(article.content as BlocksContent) || []} />
        <Comments
          comments={comments}
          showForm={showForm}
          setShowForm={setShowForm}
          articleSlug={article.slug || article.documentId}
          onCommentAdded={handleCommentAdded}
        />
        <Link
          href="/article"
          className="flex items-center justify-center gap-2 hover:underline"
        >
          <IoArrowBackCircleOutline size={20} color="black" />
          <text className="text-sm">Retourner à la liste des articles</text>
        </Link>
      </div>
    </ArticleLayout>
  );
}
