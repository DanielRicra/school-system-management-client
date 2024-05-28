import { ExclamationTriangleIcon, PlusIcon } from "@radix-ui/react-icons";
import { createLazyFileRoute } from "@tanstack/react-router";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH2 } from "@/components/ui/typography";

import type { ListResponse, Room } from "@/services/types";
import { useRoomsSheet } from "@/hooks/use-rooms-sheet";

import { RoomsDataTable } from "./-components/data-table";
import { RoomsSheetProvider } from "./-components/rooms-sheet-provider";
import { useFetchRooms } from "@/hooks/http-requests";

export const Route = createLazyFileRoute("/_admin/admin/rooms/")({
  component: AdminRooms,
});

function AdminRooms() {
  const searchQuery = Route.useSearch();

  const {
    data: rooms,
    isLoading,
    error,
  } = useFetchRooms<ListResponse<Room>>({
    query: searchQuery,
  });

  const onOpen = useRoomsSheet((state) => state.onOpen);

  return (
    <ScrollArea className="h-full w-full">
      <main className="flex flex-col gap-4 py-8 items-start container h-full w-full">
        <div className="mb-3 flex flex-col items-start w-full lg:max-w-[1000px] md:max-w-[700px]">
          <div className="flex w-full justify-between">
            <TypographyH2>
              Rooms -{" "}
              <span className="font-bold">({rooms?.info?.count ?? 0})</span>
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

        {!isLoading && rooms ? (
          <RoomsDataTable
            data={rooms.results}
            activePage={searchQuery.page ?? 1}
            lastPage={rooms.info?.lastPage ?? 1}
            perPage={searchQuery.per_page}
          />
        ) : null}

        {!rooms && !isLoading && error ? (
          <Alert
            variant="destructive"
            className="dark:text-red-500 dark:border-red-500 max-w-[400px]"
          >
            <ExclamationTriangleIcon className="h-4 w-4 dark:text-red-500" />
            <AlertTitle className="font-bold">Error</AlertTitle>
            <AlertDescription>{/*error.message*/}Message</AlertDescription>
          </Alert>
        ) : null}
      </main>

      <RoomsSheetProvider />
    </ScrollArea>
  );
}
