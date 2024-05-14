import { Button } from "@/components/ui/button";
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
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

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
};

interface StudentsTableProps {
  data: Student[];
}

export function StudentsTable({ data }: StudentsTableProps) {
  return (
    <Table>
      <TableCaption>A list of all the students.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Grade Level</TableHead>
          <TableHead>Classroom ID</TableHead>
          <TableHead>User ID</TableHead>
          <TableHead>First Name</TableHead>
          <TableHead>Surname</TableHead>
          <TableHead>User Code</TableHead>
          <TableHead>Enrollment Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? (
          data.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.gradeLevel}</TableCell>
              <TableCell>{student.classroomId}</TableCell>
              <TableCell className="max-w-[100px] text-nowrap truncate">
                {student.userId}
              </TableCell>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.surname}</TableCell>
              <TableCell>{student.userCode}</TableCell>
              <TableCell>{student.enrollmentStatus}</TableCell>
              <TableCell>{student.createdAt}</TableCell>
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
            <TableCell colSpan={9} className="text-center h-24">
              No results found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
