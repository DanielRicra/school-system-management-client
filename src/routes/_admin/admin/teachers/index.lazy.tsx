import { createLazyFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "@radix-ui/react-icons";

import { ScrollArea } from "@/components/ui/scroll-area";
import { TypographyH2 } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { MainErrorAlert } from "@/components/main-error-alert";
import { Skeleton } from "@/components/ui/skeleton";

import { useFetchTeachers } from "@/hooks/http-requests";
import type { ListResponse, TeacherWithUser } from "@/services/types";
import { useTeachersSheet } from "@/hooks/store";
import { TeachersDataTable } from "./-components/data-table";
import { TeachersSheetProvider } from "./-components/teachers-sheet-provider";

export const Route = createLazyFileRoute("/_admin/admin/teachers/")({
  component: AdminTeachers,
});

function AdminTeachers() {
  const searchQuery = Route.useSearch();

  const {
    data: teachers,
    isLoading,
    error,
  } = useFetchTeachers<ListResponse<TeacherWithUser>>({
    query: searchQuery,
  });

  const onOpen = useTeachersSheet((state) => state.onOpen);

  return (
    <ScrollArea className="h-full w-full">
      <main className="flex flex-col gap-4 py-8 items-start container h-full w-full">
        <div className="mb-3 flex flex-col items-start w-full lg:max-w-[1000px] md:max-w-[700px]">
          <div className="flex w-full justify-between">
            <TypographyH2>
              Teachers -{" "}
              <span className="font-bold">({teachers?.info?.count ?? 0})</span>
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

        {!isLoading && teachers ? (
          <TeachersDataTable
            data={teachers.results}
            activePage={searchQuery.page ?? 1}
            lastPage={teachers.info?.lastPage ?? 1}
            perPage={searchQuery.per_page}
          />
        ) : null}

        {!teachers && !isLoading && error ? (
          <div className="w-full flex justify-center">
            <MainErrorAlert errorMessage={error.message} />
          </div>
        ) : null}
      </main>

      <TeachersSheetProvider />
    </ScrollArea>
  );
}
