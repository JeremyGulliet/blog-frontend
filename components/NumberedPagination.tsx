"use client";
import { FC } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface NumberedPaginationProps {
  pageCount: number;
}

export const NumberedPagination: FC<NumberedPaginationProps> = ({ pageCount }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const generatePaginationItems = () => {
    const items = [];
    const DOTS = "...";
    const SIBLINGS = 1; // Nombre de pages à afficher avant/après la page courante

    // Toujours afficher la première page
    items.push(1);

    if (currentPage > 2 + SIBLINGS) {
      items.push(DOTS);
    }

    // Pages autour de la page courante
    for (
      let i = Math.max(2, currentPage - SIBLINGS);
      i <= Math.min(pageCount - 1, currentPage + SIBLINGS);
      i++
    ) {
      items.push(i);
    }

    if (currentPage < pageCount - 1 - SIBLINGS) {
      items.push(DOTS);
    }

    // Toujours afficher la dernière page
    if (pageCount > 1) {
      items.push(pageCount);
    }

    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href={createPageURL(currentPage - 1)}
            className={`gap-1 pl-2.5 ${currentPage <= 1 ? "pointer-events-none hidden" : ""}`}
          >
            <MdOutlineKeyboardDoubleArrowLeft className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>

        {generatePaginationItems().map((item, index) => (
          <PaginationItem key={index}>
            {item === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageURL(item)}
                isActive={currentPage === item}
                className={`${
                  currentPage === item
                    ? "border-none font-semibold underline underline-offset-4"
                    : ""
                }`}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink
            href={createPageURL(currentPage + 1)}
            className={`gap-1 pr-2.5 ${currentPage >= pageCount ? "pointer-events-none hidden" : ""}`}
          >
            <MdOutlineKeyboardDoubleArrowRight className="h-4 w-4" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
