import React from "react";
import Image from "next/image";
import { getArticles, getCategory } from "../Strapi/strapi.server";
import Link from "next/link";
import { FaCommentAlt } from "react-icons/fa";
import { Search } from "@/components/search";
import { PaginationComponent } from "@/components/pagination-component";

async function getStrapiData(
  category?: string | null,
  query?: string | null,
  page: number = 1,
) {
  try {
    const [categories, articlesData] = await Promise.all([
      getCategory(),
      getArticles({
        category: category ?? null,
        query: query ?? null,
        currentPage: page,
      }),
    ]);
    return {
      articles: articlesData.articles,
      categories,
      meta: articlesData.meta,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      articles: [],
      categories: [],
      meta: { pagination: { page: 1, pageSize: 4, pageCount: 1, total: 0 } },
    };
  }
}

export default async function ArticlesList({
  searchParams,
}: {
  searchParams: {
    page?: string;
    category?: string;
    query?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const { articles, categories, meta } = await getStrapiData(
    searchParams.category,
    searchParams.query,
    currentPage,
  );

  const activeCategory = searchParams.category || null;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>
        <h1 className="text-2xl">Articles</h1>
      </div>
      <div className="w-4/6">
        <Search />
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/article"
          className={`text-blue-950 ${activeCategory === null ? "text-red-600" : ""}`}
        >
          Toutes les catégories
        </Link>

        {categories.map((cat) => (
          <Link
            key={cat.name}
            href={`/article?category=${cat.name}`}
            className={`text-blue-950 ${
              activeCategory === cat.name ? "text-red-600" : ""
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="mb-4 cursor-pointer rounded-2xl bg-blue-500 p-4 transition-all delay-150 ease-in-out hover:scale-105"
          >
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
            <div className="flex items-center gap-2">
              <FaCommentAlt />
              {article.comments ? article.comments.length : 0}
            </div>
          </Link>
        ))}
      </div>
      <div className="mb-6">
        <PaginationComponent pageCount={meta.pagination.pageCount} />
      </div>
    </div>
  );
}
