import Image from "next/image";
import { ImageProps } from "./ArticleContent";

export function ImageComponent({ image }: { image: ImageProps }) {
  return (
    <div className="my-2 flex justify-center px-2 sm:my-4 sm:px-4">
      <Image
        src={`http://localhost:1337${image.url}`}
        alt={image.alternativeText || image.name}
        width={image.width}
        height={image.height}
        className="w-full rounded-xl"
      />
    </div>
  );
}