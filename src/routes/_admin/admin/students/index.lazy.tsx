import { createLazyFileRoute } from "@tanstack/react-router";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { TypographyH2 } from "@/components/ui/typography";
import { StudentsDataTable } from "./-components/data-table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFetchStudents } from "@/hooks/http-requests";
import type { ListResponse, Student } from "@/services/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createLazyFileRoute("/_admin/admin/students/")({
  component: AdminStudents,
});

function AdminStudents() {
  const searchQuery = Route.useSearch();

  const {
    data: students,
    isLoading,
    error,
  } = useFetchStudents<ListResponse<Student>>({
    query: searchQuery,
  });

  return (
    <ScrollArea className="h-full w-full">
      <main className="flex flex-col gap-4 py-8 items-start container h-full w-full">
        <div className="mb-3 flex flex-col items-start">
          <TypographyH2>
            Students -{" "}
            <span className="font-bold">({students?.info?.count ?? 0})</span>
          </TypographyH2>
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
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle className="font-bold">Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : null}
      </main>
    </ScrollArea>
  );
}
