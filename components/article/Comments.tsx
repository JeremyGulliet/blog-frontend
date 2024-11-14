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
}) => (
  <div className="mt-6 w-full max-w-3xl">
    <h2 className="text-2xl font-semibold">Commentaires</h2>
    {comments.length > 0 ? (
      comments.map((comment, index) => (
        <div key={index} className="my-2 rounded bg-white p-4 shadow">
          <p>
            <strong>{comment.author}:</strong> {comment.content}
          </p>
        </div>
      ))
    ) : (
      <p className="mt-2 text-gray-700">
        Il n&apos;y a pas encore de commentaire.
      </p>
    )}
    <button
      onClick={() => setShowForm(!showForm)}
      className="mt-4 rounded bg-blue-500 p-2 text-white"
    >
      {showForm
        ? "Annuler l'ajout d'une commentaire"
        : "Ajouter un commentaire"}
    </button>
    {showForm && (
      <div className="mt-4 w-full max-w-3xl rounded bg-white p-4 shadow">
        <CommentForm
          articleSlug={articleSlug}
          onCommentAdded={onCommentAdded}
        />
      </div>
    )}
  </div>
);
