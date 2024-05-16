import { createLazyFileRoute } from "@tanstack/react-router";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { TypographyH2 } from "@/components/ui/typography";
import { DataPagination } from "@/components/ui/data-pagination";
import { StudentsTable } from "./-components/data-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useFetchStudents } from "@/hooks/http-requests";
import type { ListResponse, Student } from "@/services/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createLazyFileRoute("/_admin/admin/students/")({
  component: AdminStudents,
});

function AdminStudents() {
  const { page: activePage = 1, ordering } = Route.useSearch();

  const {
    data: students,
    isLoading,
    error,
  } = useFetchStudents<ListResponse<Student>>({
    query: { page: activePage, ordering },
  });

  console.log(isLoading);

  return (
    <ScrollArea className="h-full w-full">
      <main className="flex flex-col gap-4 py-8 items-start container h-full w-full">
        <div className="mb-3 flex flex-col items-start">
          <TypographyH2>
            Students -{" "}
            <span className="font-bold">({students?.info.count ?? 0})</span>
          </TypographyH2>
          <p className="text-muted-foreground mt-2">Manage the students.</p>
        </div>

        {isLoading ? (
          <div className="space-y-3 bg-red w-full">
            <Skeleton className="h-[325px] w-full bg-secondary" />
          </div>
        ) : students ? (
          <div className="rounded-md my-3 border w-full lg:max-w-[1000px] md:max-w-[700px]">
            <ScrollArea>
              <StudentsTable data={students.results} />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        ) : null}

        {error ? (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle className="font-bold">Error</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : null}

        {students && students.results.length > 0 ? (
          <DataPagination
            active={activePage}
            total={students.info.lastPage}
            pathRoute="/admin/students"
          />
        ) : null}
      </main>
    </ScrollArea>
  );
}
