import { Article } from "@/lib/types/zodTypes";
import { DateDisplay } from "../DateDisplay";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Link from "next/link";

export const ArticleHeader = ({ article }: { article: Article }) => (
  <div className="flex flex-col items-center justify-center">
    <div className="flex items-center">
      <Link
        href="/article"
        className="flex items-center justify-center gap-2 hover:underline"
      >
        <IoArrowBackCircleOutline size={20} color="black" />
        <text className="text-sm">Retourner à la liste des articles</text>
      </Link>
    </div>
    <div className="mb-4 flex flex-col items-center gap-4">
      <h1 className="mt-4 text-7xl font-bold">{article.title}</h1>
      <DateDisplay
        createdAt={article.createdAt ?? ""}
        updatedAt={article.updatedAt ?? ""}
      />
    </div>
  </div>
);
