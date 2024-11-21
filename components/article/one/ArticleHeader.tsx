import { Article } from "@/lib/types/zodTypes";
import { DateDisplay } from "../../DateDisplay";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";

export const ArticleHeader = ({ article }: { article: Article }) => (
  <div className="flex flex-col items-center justify-center">
    <div className="flex items-center">
      <Link
        href="/article"
        className="flex items-center justify-center gap-2 hover:underline"
      >
        <IoArrowBackCircleOutline size={20} color="black" />
        <p className="text-sm">Retourner à la liste des articles</p>
      </Link>
    </div>
    <div className="mb-4 flex flex-col items-center gap-6">
      <h1 className="mt-4 text-4xl  lg:text-7xl font-bold text-center">{article.title}</h1>
      {article.author && article.author.avatar && (
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <Image
              src={
                article.author.avatar.url.startsWith("/")
                  ? `http://localhost:1337${article.author.avatar.url}`
                  : article.author.avatar.url
              }
              alt={
                article.author.avatar.alternativeText || "Avatar de l'auteur"
              }
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-600">
            Écrit par{" "}
            <span className="font-semibold">{article.author.name}</span>
          </p>
        </div>
      )}
      <DateDisplay
        createdAt={article.createdAt ?? ""}
        updatedAt={article.updatedAt ?? ""}
      />
    </div>
  </div>
);
