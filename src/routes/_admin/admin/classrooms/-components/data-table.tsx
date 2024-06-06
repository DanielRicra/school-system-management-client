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

import type { Classroom } from "@/services/types";
import { DataTableToolbar } from "./data-table-toolbar";
import { useClassroomsSheet } from "@/hooks/store";
import { cn } from "@/lib/utils";

interface ClassroomsDataTableProps {
  data: Classroom[];
  activePage: number;
  lastPage: number;
  perPage?: number;
}

const columns = [
  { header: "Classroom ID", ordering: "id" },
  { header: "Grade Level", ordering: "grade_level" },
  { header: "Year", ordering: "year" },
  { header: "Section", ordering: "section" },
  { header: "Room ID", ordering: "room_id" },
  { header: "Created At", ordering: "created_at" },
  { header: "Updated At", ordering: "updated_at" },
  { header: "Actions", ordering: null },
];

export function ClassroomsDataTable({
  data,
  activePage,
  lastPage,
  perPage,
}: ClassroomsDataTableProps) {
  const onOpen = useClassroomsSheet((state) => state.onOpen);

  return (
    <>
      <DataTableToolbar />

      <div className="rounded-md my-3 border w-full lg:max-w-[1000px] md:max-w-[700px]">
        <ScrollArea>
          <Table>
            <TableCaption>A list of all the classrooms.</TableCaption>
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
                data.map((classroom) => (
                  <TableRow key={classroom.id} className="*:px-2">
                    <TableCell>
                      <Link
                        to="/admin/classrooms/$classroom-id"
                        params={{ "classroom-id": classroom.id.toString() }}
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "p-0 text-secondary-foreground min-w-16"
                        )}
                        from="/admin/classrooms"
                      >
                        {classroom.id}
                      </Link>
                    </TableCell>
                    <TableCell>{classroom.gradeLevel}</TableCell>
                    <TableCell>{classroom.year}</TableCell>
                    <TableCell>{classroom.section}</TableCell>
                    <TableCell>
                      {classroom.roomId ? (
                        <Link
                          to="/admin/rooms/$room-id"
                          params={{ "room-id": classroom.roomId.toString() }}
                          className={cn(
                            buttonVariants({ variant: "link" }),
                            "p-0 text-secondary-foreground min-w-16"
                          )}
                          from="/admin/classrooms"
                        >
                          {classroom.id}
                        </Link>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {format(new Date(classroom.createdAt), "cccccc, PPp")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(classroom.updatedAt), "cccccc, PPp")}
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
                            onClick={() => onOpen("edit", classroom)}
                          >
                            Edit Classroom
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onOpen("delete", classroom)}
                            className="text-destructive focus:bg-destructive/90"
                          >
                            Delete Classroom
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
        pathRoute="/admin/classrooms"
        perPage={perPage}
      />
    </>
  );
}
