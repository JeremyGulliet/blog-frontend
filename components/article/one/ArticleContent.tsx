import { BlocksRenderer, BlocksContent } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import Link from "next/link";
import { ImageComponent } from "./ImageComponent";
import { ImagesGallery } from "./ImagesGallery";

  
export interface ImageProps {
  id: number;
  documentId: string;
  name: string;
  url: string;
  alternativeText?: string;
  width: number;
  height: number;
}

export interface ArticleContentProps {
  content: Block[];
}

export interface Block {
  __component: string;
  id: number;
  content?: BlocksContent;
  file?: ImageProps;
  files?: ImageProps[];
}

export const ArticleContent = ({ content }: ArticleContentProps) => {
  return (
    <div className="mx-auto mt-4 flex max-w-7xl flex-col gap-2 px-2 sm:mt-8 sm:gap-4 sm:px-4">
      {content.map((block, index) => {
        switch (block.__component) {
          case "shared.texte":
            return (
              block.content && (
                <BlocksRenderer
                  key={`text-${index}`}
                  content={block.content}
                  blocks={{
                    paragraph: ({ children }) => (
                      <p className="text-justify text-xl">{children}</p>
                    ),
                    heading: ({ children, level }) => {
                      const headingClasses = {
                        1: "text-4xl sm:text-7xl",
                        2: "text-3xl sm:text-6xl",
                        3: "text-2xl sm:text-5xl",
                        4: "text-xl sm:text-4xl",
                        5: "text-lg sm:text-3xl",
                        6: "text-base sm:text-2xl",
                      };

                      return (
                        <div
                          className={`pb-2 text-center sm:pb-4 ${headingClasses[level]}`}
                        >
                          {children}
                        </div>
                      );
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
                            <ol className=" ml-12 list-decimal text-justify text-xl">
                              {children}
                            </ol>
                          );
                        case "unordered":
                          return (
                            <ul className="ml-12 list-disc text-justify text-xl">
                              {children}
                            </ul>
                          );
                        default:
                          return (
                            <ul className="list-disc text-justify text-xl">
                              {children}
                            </ul>
                          );
                      }
                    },
                    link: ({ children, url }) => (
                      <Link
                        href={url}
                        target="_blank"
                        className="text-xl font-bold hover:underline"
                      >
                        {children}
                      </Link>
                    ),
                    image: ({ image }) => (
                      <div className="flex w-full justify-center">
                        <Image
                          src={
                            image.url.startsWith("/")
                              ? `http://localhost:1337${image.url}`
                              : image.url
                          }
                          alt={image.alternativeText || ""}
                          width={image.width}
                          height={image.height}
                          className="max-w-2xl rounded-2xl"
                        />
                      </div>
                    ),
                  }}
                  modifiers={{
                    bold: ({ children }) => <strong>{children}</strong>,
                    italic: ({ children }) => (
                      <span className="italic">{children}</span>
                    ),
                    underline: ({ children }) => (
                      <span className="underline">{children}</span>
                    ),
                  }}
                />
              )
            );
          case "shared.media":
            return (
              block.file && (
                <ImageComponent key={`image-${index}`} image={block.file} />
              )
            );
          case "shared.slider":
            return (
              block.files && (
                <ImagesGallery key={`gallery-${index}`} images={block.files} />
              )
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
