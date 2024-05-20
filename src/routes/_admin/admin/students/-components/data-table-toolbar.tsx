import { Cross2Icon } from "@radix-ui/react-icons";
import { getRouteApi } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { enrollmentStatuses, gradeLevels } from "../-data/data";
import { DataTableFilter } from "@/components/ui/data-table-filter";
import { useFilterTable } from "@/hooks/table";
import type { ColumnFilterValue } from "@/hooks/types";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export type StudentsColumnsIDs = {
  first_name: string;
  surname: string;
  enrollment_status: string;
  grade_level: string;
};

const routeApi = getRouteApi("/_admin/admin/students/");

export function DataTableToolbar() {
  const navigate = useNavigate({ from: "/admin/students" });
  const tableFilter = useFilterTable<StudentsColumnsIDs>();

  const isFiltered = tableFilter.getState().columnFilters.length > 0;

  const { enrollment_status, grade_level } = routeApi.useSearch();

  const navigateOnChangeFilter = (
    columnName: string,
    columnFilter?: ColumnFilterValue
  ) => {
    navigate({
      to: "/admin/students",
      search: (search) => ({ ...search, page: 1, [columnName]: columnFilter }),
    });
  };

  useEffect(() => {
    if (enrollment_status) {
      tableFilter
        .getColumn("enrollment_status")
        .setFilterValue(enrollment_status);
    }

    if (grade_level) {
      tableFilter.getColumn("grade_level").setFilterValue(grade_level);
    }
  }, [enrollment_status, grade_level]);

  return (
    <div className="flex flex-1 items-center space-x-2">
      <Input
        placeholder="First Name..."
        className="h-8 w-[150px] lg:w-[250px]"
        value={tableFilter.getColumn("first_name").getFilterValue() ?? ""}
        onChange={(e) =>
          tableFilter.getColumn("first_name").setFilterValue(e.target.value)
        }
      />
      <Input
        placeholder="Surname..."
        className="h-8 w-[150px] lg:w-[250px]"
        value={tableFilter.getColumn("surname").getFilterValue() ?? ""}
        onChange={(e) =>
          tableFilter.getColumn("surname").setFilterValue(e.target.value)
        }
      />
      <DataTableFilter
        column={tableFilter.getColumn("enrollment_status")}
        title="Enrollment Status"
        options={enrollmentStatuses}
        navigateOnChangeFilter={navigateOnChangeFilter}
      />
      <DataTableFilter
        column={tableFilter.getColumn("grade_level")}
        title="Grade Level"
        options={gradeLevels}
        navigateOnChangeFilter={navigateOnChangeFilter}
      />
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => {
            tableFilter.resetColumnFilters();
            navigate({
              to: "/admin/students",
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
