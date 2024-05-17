import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from "@radix-ui/react-icons";
import { Link, useSearch } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMemo } from "react";

interface DataTableColumnHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  ordering?: string | null;
}

export function DataTableColumnHeader({
  title,
  ordering,
  className,
}: DataTableColumnHeaderProps) {
  const search = useSearch({
    strict: false,
  });

  const sortDir = useMemo(() => {
    if (!ordering || !("ordering" in search)) return undefined;

    if (search.ordering?.includes(ordering)) {
      return search.ordering.startsWith("-") ? "desc" : "asc";
    }

    return undefined;
  }, [search, ordering]);

  if (!ordering) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {sortDir === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : sortDir === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <CaretSortIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem className="p-0">
            <Link
              search={(prev) => ({
                ...prev,
                ordering: ordering,
              })}
              className="w-full flex items-center px-2 py-[6px]"
            >
              <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0">
            <Link
              search={(prev) => ({
                ...prev,
                ordering: `-${ordering}`,
              })}
              className="w-full flex items-center px-2 py-[6px]"
            >
              <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
