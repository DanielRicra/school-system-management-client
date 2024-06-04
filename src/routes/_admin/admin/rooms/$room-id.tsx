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
import { useFetchClassrooms, useFetchRoom } from "@/hooks/http-requests";
import type { Room, Classroom, ListResponse } from "@/services/types";
import { Link, createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";

export const Route = createFileRoute("/_admin/admin/rooms/$room-id")({
  component: RoomPage,
});

function RoomPage() {
  const { "room-id": roomId } = Route.useParams();
  const { data: room, isLoading, error } = useFetchRoom<Room>(+roomId);
  const {
    data: classrooms,
    isLoading: isLoadingClassrooms,
    error: errorClassrooms,
  } = useFetchClassrooms<ListResponse<Classroom>>({
    query: { room_id: roomId },
  });

  return (
    <ScrollArea className="py-8 container h-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <TypographyH2>Room&nbsp;{room ? room.roomNumber : null}</TypographyH2>
          {isLoading ? (
            <Skeleton className="h-8 w-[40px] rounded-md bg-secondary" />
          ) : null}
        </div>
        {isLoading ? <StudentSkeleton /> : null}

        {!isLoading && room ? (
          <div className="flex flex-col gap-4 mb-4">
            <div className="space-y-2">
              <EntityItem title="ID">{room.id}</EntityItem>
              <EntityItem title="Room Number">{room.roomNumber}</EntityItem>
              <EntityItem title="Capacity">{room.capacity}</EntityItem>
              <EntityItem title="Created At">
                {format(new Date(room.createdAt), "cccccc, PPp")}
              </EntityItem>
              <EntityItem title="Updated At">
                {format(new Date(room.updatedAt), "cccccc, PPp")}
              </EntityItem>
            </div>
          </div>
        ) : null}

        <TypographyH3>Classrooms</TypographyH3>
        <div className="flex gap-4 flex-wrap">
          {isLoadingClassrooms ? (
            <ClassroomsSkeleton />
          ) : classrooms?.results.length ? (
            classrooms.results.map((classroom) => (
              <Card key={classroom.id} className="min-w-[240px]">
                <CardHeader>
                  <CardTitle>
                    {classroom.gradeLevel}, {classroom.section},&nbsp;
                    {classroom.year}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <EntityItem title="ID">
                    <Link
                      to="/admin/classrooms/$classroom-id"
                      params={{ "classroom-id": classroom.id.toString() }}
                      from="/admin/rooms/$room-id"
                      className="font-normal leading-tight underline hover:text-muted-foreground text-primary"
                    >
                      {classroom.id}
                    </Link>
                  </EntityItem>
                  <EntityItem title="Name">{classroom.section}</EntityItem>
                  <EntityItem title="Year">{classroom.year}</EntityItem>
                </CardContent>
              </Card>
            ))
          ) : (
            <TypographyMuted>This room has no classrooms.</TypographyMuted>
          )}
          {!isLoadingClassrooms && errorClassrooms ? (
            <MainErrorAlert errorMessage={errorClassrooms.message} />
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
      </div>
    </div>
  );
}
function ClassroomsSkeleton() {
  return (
    <div className="flex gap-4 flex-wrap">
      <Skeleton className="w-[240px] h-[200px] rounded-md bg-secondary" />
      <Skeleton className="w-[240px] h-[200px] rounded-md bg-secondary" />
      <Skeleton className="w-[240px] h-[200px] rounded-md bg-secondary" />
    </div>
  );
}
