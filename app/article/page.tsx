import React from "react";
import { getArticles, getCategory } from "../Strapi/strapi.server";
import { Search } from "@/components/search";
import { ArticleCardComponent } from "@/components/article/all/article-card";
import { NumberedPagination } from "@/components/NumberedPagination";
import { CategoryBadge } from "@/components/Category-badge";

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
    <div className="container mx-auto flex min-h-full flex-col items-center justify-center gap-3 px-2 py-4 sm:gap-4 sm:px-4 sm:py-8">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {activeCategory && <CategoryBadge name="clear" />}
        {categories.map((cat) => (
          <CategoryBadge
            key={cat.name}
            name={cat.name}
            isActive={activeCategory === cat.name}
          />
        ))}
      </div>
      <div className="w-full sm:w-4/6">
        <Search />
      </div>
      <div className="hidden w-full overflow-x-auto sm:block">
        <NumberedPagination pageCount={meta.pagination.pageCount} />
      </div>

      <ArticleCardComponent articles={articles} />

      <div className="hidden w-full overflow-x-auto sm:block">
        <NumberedPagination pageCount={meta.pagination.pageCount} />
      </div>
    </div>
  );
}
