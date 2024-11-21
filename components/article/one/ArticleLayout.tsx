import { Article } from "@/lib/types/zodTypes";
import { Block } from "./ArticleContent";
import { ArticleHeader } from "./ArticleHeader";
import { ArticleCover } from "./ArticleCover";
import { ArticleContent } from "./ArticleContent";
import { BackToArticlesLink } from "./BackToArticlesLink";

interface Props {
  article: Article;
}

export function ArticleLayout({ article }: Props) {

  return (
    <>
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
      <ArticleContent content={article.blocks as Block[]} />
      <BackToArticlesLink />
    </>
  );
}
