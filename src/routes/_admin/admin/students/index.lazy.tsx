import { createLazyFileRoute } from "@tanstack/react-router";

import { TypographyH2 } from "@/components/ui/typography";
import { DataPagination } from "@/components/ui/data-pagination";
import { StudentsTable } from "./-components/data-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const Route = createLazyFileRoute("/_admin/admin/students/")({
  component: AdminStudents,
});

const data = [
  {
    id: "4587-abc-654-xzy-uuid",
    gradeLevel: "5th",
    classroomId: 4,
    userId: "4587-abc-654-xzy-uuid",
    firstName: "Gandalf",
    surname: "The gray",
    userCode: "123A56",
    enrollmentStatus: "active",
    createdAt: "January 1, 2002",
    updatedAt: "January 1, 2002",
  },
];

function AdminStudents() {
  const { page: activePage = 1 } = Route.useSearch();
  const lastPage = 10;

  return (
    <main className="flex flex-col gap-4 py-8 items-start container h-full w-full">
      <div className="mb-3 flex flex-col items-start">
        <TypographyH2>Students</TypographyH2>
        <p className="text-lg text-muted-foreground mt-2">
          Manage the students.
        </p>
        <p className="text-lg leading-tight text-muted-foreground mt-3">
          Total: <span className="font-bold">1500</span>
        </p>
      </div>

      <ScrollArea className="my-3 rounded-md border w-full overflow-x-auto lg:max-w-[1000px] md:max-w-[700px]">
        <StudentsTable data={data} />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {data.length > 0 ? (
        <DataPagination
          active={activePage}
          total={lastPage}
          pathRoute="/admin/students"
        />
      ) : null}
    </main>
  );
}
