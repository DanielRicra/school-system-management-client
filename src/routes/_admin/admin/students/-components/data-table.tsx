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
import { cn } from "@/lib/utils";
import type { Student } from "@/services/types";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { enrollmentStatusIcon } from "../-data/data";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { useStudentsSheet } from "@/hooks/use-students-sheet";

interface StudentsDataTableProps {
  data: Student[];
  activePage: number;
  lastPage: number;
  perPage?: number;
}

const columns = [
  { header: "Student ID", ordering: null },
  { header: "Grade Level", ordering: "grade_level" },
  { header: "Classroom ID", ordering: "classroom_id" },
  { header: "User ID", ordering: null },
  { header: "First Name", ordering: "user.first_name" },
  { header: "Surname", ordering: "user.surname" },
  { header: "User Code", ordering: null },
  { header: "Enrollment Status", ordering: "enrollment_status" },
  { header: "Created At", ordering: "created_at" },
  { header: "Updated At", ordering: "updated_at" },
  { header: "Actions", ordering: null },
];

export function StudentsDataTable({
  data,
  activePage,
  lastPage,
  perPage,
}: StudentsDataTableProps) {
  const onOpen = useStudentsSheet((state) => state.onOpen);

  return (
    <>
      <DataTableToolbar />

      <div className="rounded-md my-3 border w-full lg:max-w-[1000px] md:max-w-[700px]">
        <ScrollArea>
          <Table>
            <TableCaption>A list of all the students.</TableCaption>
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
                data.map((student) => (
                  <TableRow key={student.id} className="*:px-2">
                    <TableCell>
                      <Link
                        to="/admin/students/$student-id"
                        params={{ "student-id": student.id }}
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "p-0 text-secondary-foreground"
                        )}
                        from="/admin/students"
                      >
                        <span className="max-w-[80px] text-nowrap truncate">
                          {student.userId}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell>{student.gradeLevel}</TableCell>
                    <TableCell>{student.classroomId}</TableCell>
                    <TableCell>
                      <Link
                        to="/admin/users/$userId"
                        params={{ userId: student.userId }}
                        className={cn(
                          buttonVariants({ variant: "link" }),
                          "p-0 text-secondary-foreground"
                        )}
                      >
                        <span className="max-w-[80px] text-nowrap truncate">
                          {student.userId}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell>{student.user?.firstName ?? "--"}</TableCell>
                    <TableCell>{student.user?.surname ?? "--"}</TableCell>
                    <TableCell>{student.user?.code ?? "--"}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {enrollmentStatusIcon[student.enrollmentStatus]}
                        {student.enrollmentStatus}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(new Date(student.createdAt), "cccccc, PPp")}
                    </TableCell>
                    <TableCell>
                      {format(new Date(student.updatedAt), "cccccc, PPp")}
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
                              navigator.clipboard.writeText(student.id)
                            }
                          >
                            Copy Student ID
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => onOpen("edit", student)}
                          >
                            Edit Student
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onOpen("delete", student)}
                            className="text-destructive focus:bg-destructive/90"
                          >
                            Delete Student
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
        pathRoute="/admin/students"
        perPage={perPage}
      />
    </>
  );
}
