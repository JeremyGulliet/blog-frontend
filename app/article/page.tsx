"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  getArticles,
  articleSchema,
  getCategory,
  categoriesListSchema,
} from "../Strapi/strapi.server";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

async function getStrapiData(searchParams: URLSearchParams) {
  try {
    const category = searchParams.get("category");
    const [categories, articles] = await Promise.all([
      getCategory(),
      getArticles({ category }),
    ]);
    return {
      articles,
      categories
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
 
}

export default function ArticlesList() {
  const [strapiDataArticles, setStrapiDataArticles] = useState<
    (typeof articleSchema._type)[]
    >([]);
  const [categoriesData, setCategoriesData] = useState<
    typeof categoriesListSchema._type
  >([]);
  const searchParams = useSearchParams();
  const setSearchParams = (params: URLSearchParams) => {
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
  };
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categoryClicked = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", cat);
    setActiveCategory(cat);
    setSearchParams(params);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getStrapiData(searchParams);
      if (Array.isArray(data)) {
        setStrapiDataArticles([]);
        setCategoriesData([]);
      } else {
        setStrapiDataArticles(data.articles);
        setCategoriesData(data.categories);
      }
    }
    fetchData();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>
        <h1 className="text-2xl">Articles</h1>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            const updatedSearchParams = new URLSearchParams(searchParams.toString());
            updatedSearchParams.delete("category");
            setActiveCategory(null);
            setSearchParams(updatedSearchParams);
          }}
          type="button"
          className={`text-blue-950 ${activeCategory === null ? "text-red-600" : ""}`}
        >
          Toutes les catégories
        </button>
        {categoriesData.map((cat) => {
          return (
            <button
              key={cat.name}
              onClick={() => categoryClicked(cat.name)}
              type="button"
              className={`text-blue-950 ${activeCategory === cat.name ? "text-red-600" : ""}`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {strapiDataArticles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="mb-4 cursor-pointer rounded-2xl bg-blue-500 p-4 transition-all delay-150 ease-in-out hover:scale-105 "
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
          </Link>
        ))}
      </div>
    </div>
  );
}
