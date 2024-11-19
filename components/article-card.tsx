'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface Article {
  id: string
  slug: string
  title: string
  description: string
  cover: {
    url: string
    alternativeText: string
    width: number
    height: number
  }
  author?: {
    name: string
  }
  category?: {
    name: string
  }
  comments?: Array<any>
}

interface ArticleCardProps {
  article: Article
}

function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/article/${article.slug}`} className="block w-full max-w-sm transition-all duration-300 ease-in-out hover:scale-105">
      <Card className="h-full overflow-hidden">
        <CardHeader className="p-0">
          {article.cover && (
            <div className="relative h-48 w-full">
              <Image
                src={article.cover.url.startsWith("/") ? `http://localhost:1337${article.cover.url}` : article.cover.url}
                alt={article.cover.alternativeText || ""}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <h2 className="mb-2 text-xl font-bold">{article.title}</h2>
          <p className="mb-4 text-sm text-gray-600 line-clamp-3">{article.description}</p>
          {article.category && (
            <Badge variant="secondary" className="mb-2">
              {article.category.name}
            </Badge>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 bg-gray-50">
          {article.author && <p className="text-sm text-gray-600">{article.author.name}</p>}
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MessageSquare size={16} />
            <span>{article.comments ? article.comments.length : 0}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export function ArticleCardComponent({ articles }: { articles: Article[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 p-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  )
}