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
    <div className="mb-4">
      <Image
        src={
          cover.url.startsWith("/")
            ? `http://localhost:1337${cover.url}`
            : cover.url
        }
        alt={cover.alternativeText || ""}
        width={cover.width}
        height={cover.height}
        className="w-full max-w-5xl rounded-2xl"
      />
    </div>
  );
};
