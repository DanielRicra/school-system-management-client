import { createLazyFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "@radix-ui/react-icons";

import { ScrollArea } from "@/components/ui/scroll-area";
import { TypographyH2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { MainErrorAlert } from "@/components/main-error-alert";
import { Skeleton } from "@/components/ui/skeleton";

import { useFetchClassrooms } from "@/hooks/http-requests";
import type { Classroom, ListResponse } from "@/services/types";
import { useClassroomsSheet } from "@/hooks/store";
import { ClassroomsDataTable } from "./-components/data-table";
import { ClassroomsSheetProvider } from "./-components/classrooms-sheet-provider";

export const Route = createLazyFileRoute("/_admin/admin/classrooms/")({
  component: AdminClassrooms,
});

function AdminClassrooms() {
  const searchQuery = Route.useSearch();

  const {
    data: classrooms,
    isLoading,
    error,
  } = useFetchClassrooms<ListResponse<Classroom>>({
    query: searchQuery,
  });

  const onOpen = useClassroomsSheet((state) => state.onOpen);

  return (
    <ScrollArea className="h-full w-full">
      <main className="flex flex-col gap-4 py-8 items-start container h-full w-full">
        <div className="mb-3 flex flex-col items-start w-full lg:max-w-[1000px] md:max-w-[700px]">
          <div className="flex w-full justify-between">
            <TypographyH2>
              Classrooms -{" "}
              <span className="font-bold">
                ({classrooms?.info?.count ?? 0})
              </span>
            </TypographyH2>
            <Button
              type="button"
              className="flex gap-1 font-semibold"
              onClick={() => onOpen("create")}
            >
              Add
              <PlusIcon className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground mt-2">Manage the students.</p>
        </div>

        {isLoading ? (
          <div className="space-y-4 bg-red w-full">
            <Skeleton className="h-[34px] w-full bg-secondary" />
            <Skeleton className="h-[325px] w-full bg-secondary" />
          </div>
        ) : null}

        {!isLoading && classrooms ? (
          <ClassroomsDataTable
            data={classrooms.results}
            activePage={searchQuery.page ?? 1}
            lastPage={classrooms.info?.lastPage ?? 1}
            perPage={searchQuery.per_page}
          />
        ) : null}

        {!classrooms && !isLoading && error ? (
          <div className="w-full flex justify-center">
            <MainErrorAlert errorMessage={error.message} />
          </div>
        ) : null}
      </main>

      <ClassroomsSheetProvider />
    </ScrollArea>
  );
}
