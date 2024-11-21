import Link from "next/link";
import { X } from "lucide-react";
import {
  getCategoryColor,
  capitalizeFirstLetter,
} from "@/constants/categoryColors";

interface CategoryBadgeProps {
  name: string;
  isActive?: boolean;
}

export function CategoryBadge({ name, isActive = false }: CategoryBadgeProps) {
  const baseClasses =
    "rounded-xl px-3 py-1 text-white transition-all duration-300";

  return (
    <Link
      href={`/article${name === "clear" ? "" : `?category=${name}`}`}
      className={`${baseClasses} ${
        name === "clear"
          ? "flex items-center gap-1 bg-gray-400 hover:bg-gray-500"
          : `${getCategoryColor(name)} ${
              isActive ? "scale-110 font-bold" : "opacity-75 hover:opacity-100"
            }`
      }`}
    >
      {name === "clear" ? (
        <>
          <X size={16} />
          <span>Effacer le filtre</span>
        </>
      ) : (
        capitalizeFirstLetter(name)
      )}
    </Link>
  );
}
