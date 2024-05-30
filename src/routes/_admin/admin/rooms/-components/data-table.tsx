import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Link } from "@tanstack/react-router";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DataTablePagination } from "@/components/ui/data-table-pagination";

import type { Room } from "@/services/types";
import { DataTableToolbar } from "./data-table-toolbar";
import { useRoomsSheet } from "@/hooks/use-rooms-sheet";
import { cn } from "@/lib/utils";

interface RoomsDataTableProps {
  data: Room[];
  activePage: number;
  lastPage: number;
  perPage?: number;
}

const columns = [
  { header: "Room ID", ordering: "id" },
  { header: "Room number", ordering: "room_number" },
  { header: "Capacity", ordering: "capacity" },
  { header: "Created At", ordering: "created_at" },
  { header: "Updated At", ordering: "updated_at" },
  { header: "Actions", ordering: null },
];

export function RoomsDataTable({
  data,
  activePage,
  lastPage,
  perPage,
}: RoomsDataTableProps) {
  const onOpen = useRoomsSheet((state) => state.onOpen);

  return (
    <>
      <DataTableToolbar />

      <div className="rounded-md my-3 border w-full lg:max-w-[1000px] md:max-w-[700px]">
        <ScrollArea>
          <Table>
            <TableCaption>A list of all the rooms.</TableCaption>
            <TableHeader>
              <TableRow>
                {columns.map(({ ordering, header }) => (
                  <TableHead key={header}>
                    <DataTableColumnHeader ordering={ordering} title={header} />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((room) => (
                  <TableRow key={room.id} className="*:px-2">
                    <TableCell>
                      <Link
                        to="/admin/rooms/$room-id"
                        params={{ "room-id": room.id.toString() }}
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "p-0 text-secondary-foreground min-w-16"
                        )}
                        from="/admin/rooms"
                      >
                        {room.id}
                      </Link>
                    </TableCell>
                    <TableCell>{room.roomNumber}</TableCell>
                    <TableCell>{room.capacity ?? "-"}</TableCell>
                    <TableCell>
                      {format(new Date(room.createdAt), "cccccc, PPp")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(room.updatedAt), "cccccc, PPp")}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onOpen("edit", room)}
                          >
                            Edit Room
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onOpen("delete", room)}
                            className="text-destructive focus:bg-destructive/90"
                          >
                            Delete Room
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center h-24"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <DataTablePagination
        active={activePage}
        total={lastPage}
        pathRoute="/admin/rooms"
        perPage={perPage}
      />
    </>
  );
}
