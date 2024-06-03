import { Link, createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainErrorAlert } from "@/components/main-error-alert";
import { TypographyH2 } from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import EntityItem from "@/components/entity-item";

import type { StudentWithRelations } from "@/services/types";
import { useFetchStudent } from "@/hooks/http-requests";
import { enrollmentStatusIcon } from "./-data/data";

export const Route = createFileRoute("/_admin/admin/students/$student-id")({
  component: StudentPage,
});

function StudentPage() {
  const { "student-id": studentId } = Route.useParams();
  const {
    data: student,
    isLoading,
    error,
  } = useFetchStudent<StudentWithRelations>(studentId);

  return (
    <div className="py-8 container">
      {isLoading ? <StudentSkeleton /> : null}

      {!isLoading && student ? (
        <div className="flex flex-col gap-4">
          <TypographyH2>
            Student {student.user?.surname.toUpperCase()},{" "}
            {student.user?.firstName}
          </TypographyH2>

          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <EntityItem title="Grade Level">{student.gradeLevel}</EntityItem>
              <EntityItem title="Enrollment Status">
                {enrollmentStatusIcon[student.enrollmentStatus]}
                {student.enrollmentStatus}
              </EntityItem>
              <EntityItem title="Created At">
                {format(new Date(student.createdAt), "cccccc, PPp")}
              </EntityItem>
              <EntityItem title="Updated At">
                {format(new Date(student.updatedAt), "cccccc, PPp")}
              </EntityItem>
            </div>

            <div className="flex gap-4">
              <Card className="min-w-[240px]">
                <CardHeader>
                  <CardTitle>User Data</CardTitle>
                </CardHeader>

                <CardContent>
                  <EntityItem title="ID">
                    <Link
                      to="/admin/users/$user-id"
                      params={{ "user-id": student.userId }}
                      from="/admin/students/$student-id"
                      className="font-normal leading-tight underline hover:text-muted-foreground text-primary"
                    >
                      {student.userId}
                    </Link>
                  </EntityItem>
                  <EntityItem title="Code">{student.user.code}</EntityItem>
                  <EntityItem title="First Name">
                    {student.user.firstName}
                  </EntityItem>
                  <EntityItem title="Surname">
                    {student.user.surname}
                  </EntityItem>
                  <EntityItem title="Gender">{student.user.gender}</EntityItem>
                  <EntityItem title="Role">{student.user.role}</EntityItem>
                  <EntityItem title="Deleted At">
                    {student.user.deletedAt
                      ? format(new Date(student.user.deletedAt), "cccccc, PPp")
                      : "-"}
                  </EntityItem>
                </CardContent>
              </Card>

              {student.classroom ? (
                <Card className="min-w-[240px]">
                  <CardHeader>
                    <CardTitle>Classroom Data</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <EntityItem title="ID">{student.classroom.id}</EntityItem>
                    <EntityItem title="Name">
                      {student.classroom.section}
                    </EntityItem>
                    <EntityItem title="Year">
                      {student.classroom.year}
                    </EntityItem>
                    <EntityItem title="Room ID">
                      <Link
                        to="/admin/rooms/$room-id"
                        params={{
                          "room-id": student.classroom.roomId?.toString() ?? "",
                        }}
                        from="/admin/students/$student-id"
                        className="font-normal leading-tight underline hover:text-muted-foreground min-w-3 text-primary"
                      >
                        {student.classroom.roomId}
                      </Link>
                    </EntityItem>
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {!isLoading && error ? (
        <div className="p-2 w-full flex justify-center">
          <MainErrorAlert errorMessage={error.message} />
        </div>
      ) : null}
    </div>
  );
}

function StudentSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-9 w-[240px] rounded-md bg-secondary" />
      <div className="space-y-2">
        <Skeleton className="h-7 w-[200px] rounded-md bg-secondary" />
        <Skeleton className="h-7 w-[200px] rounded-md bg-secondary" />
      </div>
      <div className="flex gap-4">
        <Skeleton className="w-[240px] h-[200px] rounded-md bg-secondary" />
        <Skeleton className="w-[240px] h-[200px] rounded-md bg-secondary" />
      </div>
    </div>
  );
}
