import { getRouteApi } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect } from "react";

import { FilterSearchInput } from "@/components/ui/filter-search-input";
import { Button } from "@/components/ui/button";

import { useFilterTable } from "@/hooks/table";
import type { ColumnFilterValue } from "@/hooks/types";

export type TeachersColumnsIDs = {
  first_name: string;
  surname: string;
  department: string;
};

const routeApi = getRouteApi("/_admin/admin/teachers/");

export function DataTableToolbar() {
  const navigate = useNavigate({ from: "/admin/teachers" });
  const tableFilter = useFilterTable<TeachersColumnsIDs>();

  const isFiltered = tableFilter.getState().columnFilters.length > 0;

  const { department, first_name, surname } = routeApi.useSearch();

  const navigateOnChangeFilter =
    (column: keyof TeachersColumnsIDs) => (value?: ColumnFilterValue) => {
      navigate({
        to: "/admin/teachers",
        search: (search) => ({
          ...search,
          page: 1,
          [column]: value,
        }),
      });
    };

  useEffect(() => {
    if (department) {
      tableFilter.getColumn("department").setFilterValue(department);
    }
    if (first_name) {
      tableFilter.getColumn("first_name").setFilterValue(first_name);
    }
    if (surname) {
      tableFilter.getColumn("surname").setFilterValue(surname);
    }
  }, [department, first_name, surname]);

  return (
    <div className="flex flex-1 items-center space-x-2">
      <FilterSearchInput
        navigateOnChangeFilter={navigateOnChangeFilter("first_name")}
        column={tableFilter.getColumn("first_name")}
        placeHolder="First name..."
      />
      <FilterSearchInput
        navigateOnChangeFilter={navigateOnChangeFilter("surname")}
        column={tableFilter.getColumn("surname")}
        placeHolder="Surname..."
      />
      <FilterSearchInput
        navigateOnChangeFilter={navigateOnChangeFilter("department")}
        column={tableFilter.getColumn("department")}
        placeHolder="Department..."
      />

      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => {
            tableFilter.resetColumnFilters();
            navigate({
              to: "/admin/teachers",
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
