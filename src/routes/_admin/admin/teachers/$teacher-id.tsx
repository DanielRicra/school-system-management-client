import { Link, createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MainErrorAlert } from "@/components/main-error-alert";
import {
  TypographyH2,
  TypographyH3,
  TypographyMuted,
} from "@/components/ui/typography";
import { Skeleton } from "@/components/ui/skeleton";
import EntityItem from "@/components/entity-item";

import type { Course, TeacherWithUser } from "@/services/types";
import { useFetchTeacher, useFetchTeacherCourses } from "@/hooks/http-requests";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Route = createFileRoute("/_admin/admin/teachers/$teacher-id")({
  component: TeacherPage,
});

function TeacherPage() {
  const { "teacher-id": teacherId } = Route.useParams();
  const {
    data: teacher,
    isLoading,
    error,
  } = useFetchTeacher<TeacherWithUser>(teacherId);

  const {
    data: courses,
    isLoading: isLoadingCourses,
    error: errorCourses,
  } = useFetchTeacherCourses<Course[]>(teacherId);

  return (
    <ScrollArea className="py-8 container h-full">
      <div className="py-8 container">
        {isLoading ? <TeacherSkeleton /> : null}

        {!isLoading && teacher ? (
          <div className="flex flex-col gap-4 mb-4">
            <TypographyH2>
              Teacher: {teacher.user?.surname.toUpperCase()},{" "}
              {teacher.user?.firstName}
            </TypographyH2>

            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <EntityItem title="Teacher ID">{teacher.id}</EntityItem>
                <EntityItem title="Department">{teacher.department}</EntityItem>
                <EntityItem title="Created At">
                  {format(new Date(teacher.createdAt), "cccccc, PPp")}
                </EntityItem>
                <EntityItem title="Updated At">
                  {format(new Date(teacher.updatedAt), "cccccc, PPp")}
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
                        params={{ "user-id": teacher.userId }}
                        from="/admin/teachers/$teacher-id"
                        className="font-normal leading-tight underline hover:text-muted-foreground text-primary"
                      >
                        {teacher.userId}
                      </Link>
                    </EntityItem>
                    <EntityItem title="Code">{teacher.user.code}</EntityItem>
                    <EntityItem title="First Name">
                      {teacher.user.firstName}
                    </EntityItem>
                    <EntityItem title="Surname">
                      {teacher.user.surname}
                    </EntityItem>
                    <EntityItem title="Gender">
                      {teacher.user.gender}
                    </EntityItem>
                    <EntityItem title="Role">{teacher.user.role}</EntityItem>
                    <EntityItem title="Deleted At">
                      {teacher.user.deletedAt
                        ? format(
                            new Date(teacher.user.deletedAt),
                            "cccccc, PPp"
                          )
                        : "-"}
                    </EntityItem>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : null}

        <TypographyH3>Courses - {courses?.length ?? 0}</TypographyH3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {isLoadingCourses ? (
            <div className="space-y-4 col-span-1">
              <Skeleton className="w-[240px] h-[200px] rounded-md bg-secondary" />
              <Skeleton className="w-[240px] h-[200px] rounded-md bg-secondary" />
              <Skeleton className="w-[240px] h-[200px] rounded-md bg-secondary" />
            </div>
          ) : courses?.length ? (
            courses.map((course) => (
              <Card key={course.id} className="w-full">
                <CardHeader>
                  <CardTitle>Code: {course.code}</CardTitle>
                </CardHeader>

                <CardContent>
                  <EntityItem title="ID">
                    <Link
                      to="/admin/courses/$course-id"
                      params={{ "course-id": course.id.toString() }}
                      from="/admin/classrooms/$classroom-id"
                      className="font-normal leading-tight underline hover:text-muted-foreground text-primary truncate"
                      title={`View course details, ID: ${course.id}`}
                    >
                      {course.id}
                    </Link>
                  </EntityItem>
                  <EntityItem title="Name">{course.name}</EntityItem>
                  <EntityItem title="Classroom ID">
                    {course.classroomId ? (
                      <Link
                        to="/admin/classrooms/$classroom-id"
                        params={{
                          "classroom-id": course.classroomId.toString(),
                        }}
                        from="/admin/classrooms/$classroom-id"
                        className="font-normal leading-tight underline hover:text-muted-foreground text-primary truncate"
                        title={`View course details, ID: ${course.classroomId}`}
                      >
                        {course.classroomId}
                      </Link>
                    ) : (
                      "--"
                    )}
                  </EntityItem>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="my-4">
              <TypographyMuted>This classroom has no courses.</TypographyMuted>
            </div>
          )}
          {!isLoadingCourses && errorCourses ? (
            <MainErrorAlert errorMessage={errorCourses.message} />
          ) : null}
        </div>

        {!isLoading && error ? (
          <div className="p-2 w-full flex justify-center">
            <MainErrorAlert errorMessage={error.message} />
          </div>
        ) : null}
      </div>
    </ScrollArea>
  );
}

function TeacherSkeleton() {
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
