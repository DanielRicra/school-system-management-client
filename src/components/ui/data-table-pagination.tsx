import { Link, useNavigate } from "@tanstack/react-router";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface DataPaginationProps {
  total: number;
  active: number;
  pathRoute: string;
  perPage?: number;
}

export function DataTablePagination({
  active,
  total,
  pathRoute,
  perPage = 10,
}: DataPaginationProps) {
  const pagesLinks = useMemo(() => {
    return createPaginationLinks(total, active);
  }, [total, active]);

  const navigate = useNavigate();

  const canNext = () => active < total;
  const canPrev = () => active > 1;

  const changePerPage = (value: number) => {
    navigate({ search: (search) => ({ ...search, per_page: value, page: 1 }) });
  };

  if (pagesLinks.length === 0) return null;

  return (
    <div className="flex items-center space-x-3 self-center">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={perPage.toString()}
          onValueChange={(value) => changePerPage(Number(value))}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={perPage} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((perPage) => (
              <SelectItem key={perPage} value={`${perPage}`}>
                {perPage}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <Link
              to={pathRoute}
              search={(search) => ({ ...search, page: active - 1 })}
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
                  search={(search) => ({ ...search, page })}
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
              search={(search) => ({ ...search, page: active + 1 })}
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
    </div>
  );
}
