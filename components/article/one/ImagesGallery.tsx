import { ImageProps } from "./ArticleContent";
import { ImageComponent } from "./ImageComponent";

export function ImagesGallery({ images }: { images: ImageProps[] }) {
  return (
    <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <ImageComponent key={image.id} image={image} />
      ))}
    </div>
  );
}
