export const DateDisplay = ({
  createdAt,
  updatedAt,
}: {
  createdAt: string;
  updatedAt: string;
}) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const isSameDate = formatDate(createdAt) === formatDate(updatedAt);

  return (
    <div className="flex flex-col text-center">
      <span className="text-sm">Publié le {formatDate(createdAt)}</span>
      {!isSameDate && <span className="text-sm">Mis à jour le {formatDate(updatedAt)}</span>}
    </div>
  );
};
