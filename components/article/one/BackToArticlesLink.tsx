import Link from "next/link";
import { IoArrowBackCircleOutline } from "react-icons/io5";

export function BackToArticlesLink() {
  return (
    <Link
      href="/article"
      className="mt-10 flex items-center justify-center gap-2 hover:underline"
    >
      <IoArrowBackCircleOutline size={20} color="black" />
      <p className="text-sm">Retourner à la liste des articles</p>
    </Link>
  );
}
