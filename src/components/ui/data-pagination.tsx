import { Link } from "@tanstack/react-router";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";

import { cn, createPaginationLinks } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { buttonVariants } from "./button";

interface DataPaginationProps {
  total: number;
  active: number;
  pathRoute: string;
}

export function DataPagination({
  active,
  total,
  pathRoute,
}: DataPaginationProps) {
  const pagesLinks = useMemo(() => {
    return createPaginationLinks(total, active);
  }, [total, active]);

  const canNext = () => active < total;
  const canPrev = () => active > 1;

  if (pagesLinks.length === 0) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Link
            to={pathRoute}
            search={{ page: active - 1 }}
            disabled={!canPrev()}
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              active <= 1 &&
                "border-none pointer-events-none text-muted-foreground",
              "cursor-pointer gap-1 pl-2.5"
            )}
          >
            <ChevronLeftIcon className="h-4 w-4" />
            <span>Previous</span>
          </Link>
        </PaginationItem>
        {pagesLinks.map((page) => {
          if (page === null) {
            return (
              <PaginationItem key={`ellipsis-${Math.random() * 1000}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }
          return (
            <PaginationItem key={page + Math.random() * 1000}>
              <Link
                to={pathRoute}
                search={{ page }}
                className={buttonVariants({
                  variant: active === page ? "default" : "outline",
                  size: "icon",
                })}
              >
                {page}
              </Link>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <Link
            to={pathRoute}
            search={{ page: active + 1 }}
            disabled={!canNext()}
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              active >= total &&
                "border-none pointer-events-none text-muted-foreground",
              "cursor-pointer gap-1 pr-2.5"
            )}
          >
            <span>Next</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
