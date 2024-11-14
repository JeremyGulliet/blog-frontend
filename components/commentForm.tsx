import { useState } from "react";
import { createComment } from "@/app/Strapi/strapi.server";
import { ArticleComment } from "@/lib/types/zodTypes";

interface CommentFormProps {
  articleSlug: string;
  onCommentAdded: (newComment: ArticleComment) => void;
}

export default function CommentForm({
  articleSlug,
  onCommentAdded,
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const newComment = await createComment({
        articleSlug,
        content,
        author,
      });
      setContent("");
      setAuthor("");
      if (newComment) {
        onCommentAdded(newComment);
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      setError(
        "Erreur lors de la création du commentaire. Veuillez réessayer.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 w-full max-w-md">
      <div className="mb-4">
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700"
        >
          Nom
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Commentaire
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2"
          rows={4}
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="rounded bg-green-500 p-2 text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Soumission..." : "Soumettre"}
      </button>
    </form>
  );
}
