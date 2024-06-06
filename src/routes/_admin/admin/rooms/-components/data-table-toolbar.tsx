import { Cross2Icon } from "@radix-ui/react-icons";
import { getRouteApi } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

import { useFilterTable } from "@/hooks/table";
import type { ColumnFilterValue } from "@/hooks/types";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { FilterSearchInput } from "@/components/ui/filter-search-input";
import { CapacityFilter } from "../../-components/capacity-filter";

export type StudentsColumnsIDs = {
  room_number: string;
  "capacity.gte": number;
  "capacity.lte": number;
};

const routeApi = getRouteApi("/_admin/admin/rooms/");

export function DataTableToolbar() {
  const navigate = useNavigate({ from: "/admin/rooms" });
  const tableFilter = useFilterTable<StudentsColumnsIDs>();

  const {
    "capacity.gte": capacityGte,
    "capacity.lte": capacityLte,
    room_number,
  } = routeApi.useSearch();

  const isFiltered = capacityGte || capacityLte || room_number;

  const navigateOnChangeFilter =
    (column: keyof StudentsColumnsIDs) => (value?: ColumnFilterValue) => {
      navigate({
        to: "/admin/rooms",
        search: (search) => ({
          ...search,
          page: 1,
          [column]: value,
        }),
      });
    };

  const navigateOnChangeCapacityFilter = (min?: number, max?: number) => {
    navigate({
      to: "/admin/rooms",
      search: (search) => ({
        ...search,
        page: 1,
        "capacity.gte": min,
        "capacity.lte": max,
      }),
    });
  };

  useEffect(() => {
    if (room_number) {
      tableFilter.getColumn("room_number").setFilterValue(room_number);
    }

    if (capacityGte) {
      tableFilter.getColumn("capacity.gte").setFilterValue(capacityGte);
    }

    if (capacityLte) {
      tableFilter.getColumn("capacity.lte").setFilterValue(capacityLte);
    }
  }, [room_number, capacityGte, capacityLte]);

  return (
    <div className="flex flex-1 items-center space-x-2">
      <FilterSearchInput
        navigateOnChangeFilter={navigateOnChangeFilter("room_number")}
        column={tableFilter.getColumn("room_number")}
        placeHolder="Room Number..."
      />

      <CapacityFilter
        navigateOnChangeFilter={navigateOnChangeCapacityFilter}
        capacityGteColumn={tableFilter.getColumn("capacity.gte")}
        capacityLteColumn={tableFilter.getColumn("capacity.lte")}
      />

      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => {
            tableFilter.resetColumnFilters();
            navigate({
              to: "/admin/rooms",
              search: () => ({ page: 1 }),
            });
          }}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
