import { Link, createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";

import EntityItem from "@/components/entity-item";
import { MainErrorAlert } from "@/components/main-error-alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  TypographyH2,
  TypographyH3,
  TypographyMuted,
} from "@/components/ui/typography";

import {
  useFetchClassroom,
  useFetchClassroomStudents,
} from "@/hooks/http-requests";
import type { Classroom, StudentWithUser } from "@/services/types";

export const Route = createFileRoute("/_admin/admin/classrooms/$classroom-id")({
  component: ClassroomPage,
});

function ClassroomPage() {
  const { "classroom-id": classroomId } = Route.useParams();
  const {
    data: classroom,
    isLoading,
    error,
  } = useFetchClassroom<Classroom>(+classroomId);

  const {
    data: students,
    isLoading: isLoadingStudents,
    error: errorStudents,
  } = useFetchClassroomStudents<StudentWithUser[]>(classroomId);

  return (
    <ScrollArea className="py-8 container h-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <TypographyH2>
            Classroom&nbsp;{classroom ? classroom.id : null}
          </TypographyH2>
          {isLoading ? (
            <Skeleton className="h-8 w-[40px] rounded-md bg-secondary" />
          ) : null}
        </div>
        {isLoading ? <StudentSkeleton /> : null}

        {!isLoading && classroom ? (
          <div className="flex flex-col gap-4 mb-4">
            <div className="space-y-2">
              <EntityItem title="ID">{classroom.id}</EntityItem>
              <EntityItem title="Grade Level">
                {classroom.gradeLevel}
              </EntityItem>
              <EntityItem title="Section">{classroom.section}</EntityItem>
              <EntityItem title="Year">{classroom.year}</EntityItem>
              <EntityItem title="Room ID">
                {classroom.roomId ? (
                  <Link
                    to="/admin/rooms/$room-id"
                    params={{ "room-id": classroom.roomId?.toString() }}
                    from="/admin/classrooms/$classroom-id"
                    className="font-normal leading-tight underline hover:text-muted-foreground text-primary"
                  >
                    {classroom.roomId}
                  </Link>
                ) : (
                  "--"
                )}
              </EntityItem>
              <EntityItem title="Created At">
                {format(new Date(classroom.createdAt), "cccccc, PPp")}
              </EntityItem>
              <EntityItem title="Updated At">
                {format(new Date(classroom.updatedAt), "cccccc, PPp")}
              </EntityItem>
            </div>
          </div>
        ) : null}

        <TypographyH3>Students - {students?.length ?? 0}</TypographyH3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {isLoadingStudents ? (
            <div className="space-y-4 col-span-1">
              <Skeleton className="w-[240px] h-[200px] rounded-md bg-secondary" />
              <Skeleton className="w-[240px] h-[200px] rounded-md bg-secondary" />
              <Skeleton className="w-[240px] h-[200px] rounded-md bg-secondary" />
            </div>
          ) : students?.length ? (
            students.map((student) => (
              <Card key={student.id} className="w-full">
                <CardHeader>
                  <CardTitle>
                    {student.user.surname.toUpperCase()},&nbsp;
                    {student.user.firstName}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <EntityItem title="ID">
                    <Link
                      to="/admin/students/$student-id"
                      params={{ "student-id": student.id }}
                      from="/admin/classrooms/$classroom-id"
                      className="font-normal leading-tight underline hover:text-muted-foreground text-primary truncate"
                      title={`View student details, ID: ${student.id}`}
                    >
                      {student.id}
                    </Link>
                  </EntityItem>
                  <EntityItem title="Grade Level">
                    {student.gradeLevel}
                  </EntityItem>
                  <EntityItem title="Enrollment Status">
                    {student.enrollmentStatus}
                  </EntityItem>
                </CardContent>
              </Card>
            ))
          ) : (
            <TypographyMuted>This student has no students.</TypographyMuted>
          )}
          {!isLoadingStudents && errorStudents ? (
            <MainErrorAlert errorMessage={errorStudents.message} />
          ) : null}
        </div>
      </div>

      {!isLoading && error ? (
        <div className="p-2 w-full flex justify-center">
          <MainErrorAlert errorMessage={error.message} />
        </div>
      ) : null}
    </ScrollArea>
  );
}

function StudentSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-7 w-[200px] rounded-md bg-secondary" />
        <Skeleton className="h-7 w-[200px] rounded-md bg-secondary" />
        <Skeleton className="h-7 w-[200px] rounded-md bg-secondary" />
      </div>
    </div>
  );
}
