/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { HeroSectionProps } from "@/lib/types/zodTypes";
import Image from "next/image";

export function HeroSection({ data }: { readonly data: HeroSectionProps }) {

  const { heading, subHeading, image, link } = data;

  if (!image?.url) {
    console.error("Image URL manquante");
    return (
      <header className="relative flex h-[600px] items-center justify-center bg-gray-100">
        <p>Image non disponible</p>
      </header>
    );
  }

  const imageURL = new URL(image.url, "http://localhost:1337").toString();

  return (
    <header className="relative h-[600px] overflow-hidden">
      <Image
        alt={image.alternativeText ?? "no alternative text"}
        className="absolute inset-0 h-full w-full object-cover"
        height={1080}
        src={imageURL}
        style={{
          aspectRatio: "1920/1080",
          objectFit: "cover",
        }}
        width={1920}
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black bg-opacity-40 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
          {heading}
        </h1>
        <p className="mt-4 text-lg md:text-xl lg:text-2xl">{subHeading}</p>
        {link && (
          <Link
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-base font-medium text-black shadow hover:bg-gray-100"
            href={link.url}
          >
            {link.text}
          </Link>
        )}
      </div>
    </header>
  );
}