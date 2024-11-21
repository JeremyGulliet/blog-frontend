"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { type Article } from "@/lib/types/zodTypes";
import {
  getCategoryColor,
  capitalizeFirstLetter,
} from "@/constants/categoryColors";


type ArticleCardProps = {
  article: Article;
};

type ArticleCardComponentProps = {
  articles: Article[];
};

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/article/${article.slug}`} className="block w-full">
      <Card className="group flex h-full flex-col overflow-hidden shadow-none transition-all duration-300 ease-in-out hover:bg-blue-300">
        <CardHeader className="p-0">
          {article.cover && (
            <div className="relative h-40 w-full sm:h-48">
              <Image
                src={
                  article.cover.url.startsWith("/")
                    ? `http://localhost:1337${article.cover.url}`
                    : article.cover.url
                }
                alt={article.cover.alternativeText || ""}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-1 p-3 sm:p-4">
          <div className="flex h-full flex-col">
            <h2 className="mb-2 text-lg font-bold sm:text-xl">
              {article.title}
            </h2>
            <p className="mb-4 line-clamp-2 text-sm text-gray-600 group-hover:line-clamp-4 sm:line-clamp-3 sm:text-base sm:group-hover:line-clamp-5">
              {article.description}
            </p>
            {article.category && (
              <div className="mt-auto">
                <Badge
                  className={`rounded-xl font-medium ${getCategoryColor(article.category.name)}`}
                >
                  {capitalizeFirstLetter(article.category.name)}
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between bg-gray-50 p-3 transition-all duration-300 ease-in-out group-hover:bg-blue-300 sm:p-4">
          {article.author && article.author.avatar && (
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8">
                <Image
                  src={
                    article.author.avatar.url.startsWith("/")
                      ? `http://localhost:1337${article.author.avatar.url}`
                      : article.author.avatar.url
                  }
                  alt={article.author.avatar.alternativeText || "Avatar"}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              </div>
              <p className="text-sm text-gray-600">{article.author.name}</p>
            </div>
          )}
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MessageSquare size={16} />
            <span>{article.comments ? article.comments.length : 0}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export function ArticleCardComponent({ articles }: ArticleCardComponentProps) {
  if (!Array.isArray(articles)) return null;

  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 p-3 sm:grid-cols-2 sm:gap-6 sm:p-6 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.documentId} article={article} />
      ))}
    </div>
  );
}
