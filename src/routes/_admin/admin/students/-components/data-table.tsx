import { Badge } from "@/components/ui/badge";
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
import { DotsHorizontalIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { Link } from "@tanstack/react-router";

type Student = {
  id: string;
  gradeLevel: string;
  classroomId: number;
  userId: string;
  firstName: string;
  surname: string;
  userCode: string;
  enrollmentStatus: string;
  createdAt: string;
  updatedAt: string;
};

interface StudentsTableProps {
  data: Student[];
}

const columns = [
  { header: "Grade Level", ordering: "grade_level" },
  { header: "Classroom ID", ordering: "classroom_id" },
  { header: "User ID", ordering: null },
  { header: "First Name", ordering: null },
  { header: "Surname", ordering: null },
  { header: "User Code", ordering: null },
  { header: "Enrollment Status", ordering: "enrollment_status" },
  { header: "Created At", ordering: "created_at" },
  { header: "Updated At", ordering: "updated_at" },
  { header: "Actions", ordering: null },
];

export function StudentsTable({ data }: StudentsTableProps) {
  return (
    <Table>
      <TableCaption>A list of all the students.</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map(({ ordering, header }) => {
            if (!ordering) {
              return (
                <TableHead className="text-nowrap" key={header}>
                  {header}
                </TableHead>
              );
            }
            return (
              <TableHead key={header}>
                <Link
                  search={(prev) => ({
                    ordering:
                      "ordering" in prev && prev.ordering === ordering
                        ? `-${ordering}`
                        : ordering,
                  })}
                  className={buttonVariants({ variant: "ghost" })}
                >
                  {header}
                  <CaretSortIcon className="ml-2 h-4 w-4" />
                </Link>
              </TableHead>
            );
          })}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((student) => (
            <TableRow key={student.id} className="*:px-2">
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
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.surname}</TableCell>
              <TableCell>{student.userCode}</TableCell>
              <TableCell className="text-center">
                <Badge variant="secondary">{student.enrollmentStatus}</Badge>
              </TableCell>
              <TableCell>{student.createdAt}</TableCell>
              <TableCell>{student.updatedAt}</TableCell>
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
                      onClick={() => navigator.clipboard.writeText(student.id)}
                    >
                      Copy Student ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Edit Student</DropdownMenuItem>
                    <DropdownMenuItem>Delete Student</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="text-center h-24">
              No results found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
