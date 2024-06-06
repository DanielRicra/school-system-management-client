import { Cross2Icon } from "@radix-ui/react-icons";
import { getRouteApi } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

import { useFilterTable } from "@/hooks/table";
import type { ColumnFilterValue } from "@/hooks/types";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { FilterSearchInput } from "@/components/ui/filter-search-input";
import { DataTableFilter } from "@/components/ui/data-table-filter";

export type StudentsColumnsIDs = {
  grade_level: string;
  // section: string;
  year: string;
  // room_id: string;
};

export const gradeLevels = [
  { label: "1st", value: "1st" },
  { label: "2nd", value: "2nd" },
  { label: "3rd", value: "3rd" },
  { label: "4th", value: "4th" },
  { label: "5th", value: "5th" },
];

const routeApi = getRouteApi("/_admin/admin/classrooms/");

export function DataTableToolbar() {
  const navigate = useNavigate({ from: "/admin/classrooms" });
  const tableFilter = useFilterTable<StudentsColumnsIDs>();

  const { grade_level, section, year } = routeApi.useSearch();

  const isFiltered = grade_level || section || year;

  const navigateOnChangeFilter =
    (column: keyof StudentsColumnsIDs) => (value?: ColumnFilterValue) => {
      navigate({
        to: "/admin/classrooms",
        search: (search) => ({
          ...search,
          page: 1,
          [column]: value,
        }),
      });
    };

  useEffect(() => {
    if (grade_level) {
      tableFilter.getColumn("grade_level").setFilterValue(grade_level);
    }
    if (year) {
      tableFilter.getColumn("year").setFilterValue(year);
    }
  }, [grade_level]);

  return (
    <div className="flex flex-1 items-center space-x-2">
      <FilterSearchInput
        navigateOnChangeFilter={navigateOnChangeFilter("year")}
        column={tableFilter.getColumn("year")}
        placeHolder="Year..."
      />

      <DataTableFilter
        column={tableFilter.getColumn("grade_level")}
        title="Grade level"
        options={gradeLevels}
        navigateOnChangeFilter={navigateOnChangeFilter("grade_level")}
      />

      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => {
            tableFilter.resetColumnFilters();
            navigate({
              to: "/admin/classrooms",
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
