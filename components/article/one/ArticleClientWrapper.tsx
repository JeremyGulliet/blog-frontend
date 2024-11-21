"use client";

import { useState } from "react";
import { Article, ArticleComment } from "@/lib/types/zodTypes";
import { Comments } from "../Comments";
import { ArticleLayout } from "./ArticleLayout";

interface Props {
  initialArticle: Article;
}

export default function ArticleClientWrapper({ initialArticle }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [comments, setComments] = useState<ArticleComment[]>(
    initialArticle.comments || [],
  );

  const handleCommentAdded = (newComment: ArticleComment) => {
    setComments((prev) => [...prev, { ...newComment, isReply: false }]);
    setShowForm(false);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center bg-gray-300 p-2 sm:p-4">
      <div className="w-full max-w-7xl">
        <ArticleLayout article={initialArticle} />
        <Comments
          comments={comments}
          showForm={showForm}
          setShowForm={setShowForm}
          articleSlug={initialArticle.slug || initialArticle.documentId}
          onCommentAdded={handleCommentAdded}
        />
      </div>
    </div>
  );
}
