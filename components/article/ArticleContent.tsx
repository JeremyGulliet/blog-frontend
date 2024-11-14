import { BlocksRenderer, BlocksContent } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import Link from "next/link";

interface ArticleContentProps {
  content: BlocksContent;
}

export const ArticleContent = ({ content }: ArticleContentProps) => {
  if (!Array.isArray(content)) return null;


  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-4">
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => (
            <p className="text-justify text-xl">{children}</p>
          ),
          heading: ({
            children,
            level,
          }: {
            children?: React.ReactNode;
            level: 1 | 2 | 3 | 4 | 5 | 6;
          }) => {
            switch (level) {
              case 1:
                return (
                  <h1 className="pb-4 text-center text-7xl">{children}</h1>
                );
              case 2:
                return (
                  <h2 className="pb-4 text-center text-6xl">{children}</h2>
                );
              case 3:
                return (
                  <h3 className="pb-4 text-center text-5xl">{children}</h3>
                );
              case 4:
                return (
                  <h4 className="pb-4 text-center text-4xl">{children}</h4>
                );
              case 5:
                return (
                  <h5 className="pb-4 text-center text-3xl">{children}</h5>
                );
              case 6:
                return (
                  <h6 className="pb-4 text-center text-2xl">{children}</h6>
                );
              default:
                return (
                  <h1 className="pb-4 text-center text-7xl">{children}</h1>
                );
            }
          },
          list: ({
            children,
            format,
          }: {
            children?: React.ReactNode;
            format: "ordered" | "unordered";
          }) => {
            switch (format) {
              case "ordered":
                return (
                  <ol className="list-decimal text-justify text-xl">
                    {children}
                  </ol>
                );
              case "unordered":
                return (
                  <ul className="list-disc text-justify text-xl">{children}</ul>
                );
              default:
                return (
                  <ul className="list-disc text-justify text-xl">{children}</ul>
                );
            }
          },
          link: ({ children, url }) => (
            <Link href={url} target="_blank" className="text-base hover:underline">
              {children}
            </Link>
          ),
          image: ({ image }) => (
            <Image
              src={
                image.url.startsWith("/")
                  ? `http://localhost:1337${image.url}`
                  : image.url
              }
              alt={image.alternativeText || ""}
              width={image.width}
              height={image.height}
              className="flex w-full max-w-2xl rounded-2xl"
            />
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong>{children}</strong>,
          italic: ({ children }) => <span className="italic">{children}</span>,
          underline: ({ children }) => (
            <span className="underline">{children}</span>
          ),
        }}
      />
    </div>
  );
};


