import Image from "next/image";

export const ArticleCover = ({
  cover,
}: {
  cover?: {
    url: string;
    alternativeText: string;
    width: number;
    height: number;
  };
}) => {
  if (!cover) return null;

  return (
    <div className="mb-4 px-2 sm:px-4">
      <Image
        src={
          cover.url.startsWith("/")
            ? `http://localhost:1337${cover.url}`
            : cover.url
        }
        alt={cover.alternativeText || ""}
        width={cover.width}
        height={cover.height}
        className="mx-auto w-full max-w-3xl rounded-xl sm:rounded-2xl"
      />
    </div>
  );
};
