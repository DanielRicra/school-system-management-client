import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";

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
import { DataTableToolbar } from "./data-table-toolbar";

import type { TeacherWithUser } from "@/services/types";
import { cn } from "@/lib/utils";
import { useTeachersSheet } from "@/hooks/store";

interface TeachersDataTableProps {
  data: TeacherWithUser[];
  activePage: number;
  lastPage: number;
  perPage?: number;
}

const columns = [
  { header: "Teacher ID", ordering: null },
  { header: "Department", ordering: "department" },
  { header: "User ID", ordering: null },
  { header: "First Name", ordering: "user.first_name" },
  { header: "Surname", ordering: "user.surname" },
  { header: "User Code", ordering: null },
  { header: "Created At", ordering: "created_at" },
  { header: "Updated At", ordering: "updated_at" },
  { header: "Actions", ordering: null },
];

export function TeachersDataTable({
  data,
  activePage,
  lastPage,
  perPage,
}: TeachersDataTableProps) {
  const onOpen = useTeachersSheet((state) => state.onOpen);

  return (
    <>
      <DataTableToolbar />

      <div className="rounded-md my-3 border w-full lg:max-w-[1000px] md:max-w-[700px]">
        <ScrollArea>
          <Table>
            <TableCaption>A list of all the teachers.</TableCaption>
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
                data.map((teacher) => (
                  <TableRow key={teacher.id} className="*:px-2">
                    <TableCell>
                      <Link
                        to="/admin/teachers/$teacher-id"
                        params={{ "teacher-id": teacher.id }}
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "p-0 text-secondary-foreground"
                        )}
                        from="/admin/teachers"
                      >
                        <span className="max-w-[80px] text-nowrap truncate">
                          {teacher.id}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      {teacher.department ? teacher.department : "-"}
                    </TableCell>
                    <TableCell>
                      <Link
                        to="/admin/users/$user-id"
                        params={{ "user-id": teacher.userId }}
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "p-0 text-secondary-foreground"
                        )}
                        from="/admin/teachers"
                      >
                        <span className="max-w-[80px] text-nowrap truncate">
                          {teacher.userId}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell>{teacher.user.firstName}</TableCell>
                    <TableCell>{teacher.user.surname}</TableCell>
                    <TableCell>{teacher.user.code}</TableCell>

                    <TableCell>
                      {format(new Date(teacher.createdAt), "cccccc, PPp")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(teacher.updatedAt), "cccccc, PPp")}
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
                          <DropdownMenuItem
                            onClick={() =>
                              navigator.clipboard.writeText(teacher.id)
                            }
                          >
                            Copy Teacher ID
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onOpen("edit", teacher)}
                          >
                            Edit Teacher
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onOpen("delete", teacher)}
                            className="text-destructive focus:bg-destructive/90"
                          >
                            Delete Teacher
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
        pathRoute="/admin/teachers"
        perPage={perPage}
      />
    </>
  );
}
