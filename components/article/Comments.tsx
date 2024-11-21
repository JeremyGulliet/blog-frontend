import { ArticleComment } from "@/lib/types/zodTypes";
import CommentForm from "@/components/commentForm";

export const Comments = ({
  comments,
  showForm,
  setShowForm,
  articleSlug,
  onCommentAdded,
}: {
  comments: ArticleComment[];
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  articleSlug: string;
  onCommentAdded: (comment: ArticleComment) => void;
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="my-6 w-full rounded-xl bg-white p-3 sm:my-10  sm:p-4">
      <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl">
        Commentaires ({comments.length})
      </h2>

      {comments.length > 0 ? (
        <div className="space-y-4 sm:space-y-6">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-100 bg-slate-200 p-4 shadow-sm sm:rounded-xl sm:p-6"
            >
              <p className="mb-3 text-sm text-gray-700 sm:mb-4 sm:text-base">
                {comment.content}
              </p>

              <div className="border-t border-gray-100 pt-2 sm:pt-3">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium text-gray-900">
                    {comment.author}
                  </span>
                  <time className="text-gray-500">
                    {formatDate(comment.createdAt)}
                  </time>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm italic text-gray-700 sm:text-base">
          Il n&apos;y a pas encore de commentaire.
        </p>
      )}

      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-4 rounded-lg bg-blue-600 px-3 py-2 text-sm text-white transition-colors hover:bg-blue-700 sm:mt-6 sm:rounded-xl sm:px-4 sm:text-base"
      >
        {showForm ? "Annuler" : "Ajouter un commentaire"}
      </button>

      {showForm && (
        <div className="mt-3 w-full rounded-lg border border-gray-100 bg-white p-4 shadow-sm sm:mt-4 sm:p-6">
          <CommentForm
            articleSlug={articleSlug}
            onCommentAdded={onCommentAdded}
          />
        </div>
      )}
    </div>
  );
};
