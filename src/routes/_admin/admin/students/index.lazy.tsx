import { createLazyFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "@radix-ui/react-icons";

import { MainErrorAlert } from "@/components/main-error-alert";
import { TypographyH2 } from "@/components/ui/typography";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import { useFetchStudents } from "@/hooks/http-requests";
import { useStudentsSheet } from "@/hooks/use-students-sheet";
import type { ListResponse, StudentWithUser } from "@/services/types";

import { StudentsDataTable } from "./-components/data-table";
import { StudentsSheetProvider } from "./-components/students-sheet-provider";

export const Route = createLazyFileRoute("/_admin/admin/students/")({
  component: AdminStudents,
});

function AdminStudents() {
  const searchQuery = Route.useSearch();

  const {
    data: students,
    isLoading,
    error,
  } = useFetchStudents<ListResponse<StudentWithUser>>({
    query: searchQuery,
  });

  const onOpen = useStudentsSheet((state) => state.onOpen);

  return (
    <ScrollArea className="h-full w-full">
      <main className="flex flex-col gap-4 py-8 items-start container h-full w-full">
        <div className="mb-3 flex flex-col items-start w-full lg:max-w-[1000px] md:max-w-[700px]">
          <div className="flex w-full justify-between">
            <TypographyH2>
              Students -{" "}
              <span className="font-bold">({students?.info?.count ?? 0})</span>
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

        {!isLoading && students ? (
          <StudentsDataTable
            data={students.results}
            activePage={searchQuery.page ?? 1}
            lastPage={students.info?.lastPage ?? 1}
            perPage={searchQuery.per_page}
          />
        ) : null}

        {!students && !isLoading && error ? (
          <div className="w-full flex justify-center">
            <MainErrorAlert errorMessage={error.message} />
          </div>
        ) : null}
      </main>

      <StudentsSheetProvider />
    </ScrollArea>
  );
}
