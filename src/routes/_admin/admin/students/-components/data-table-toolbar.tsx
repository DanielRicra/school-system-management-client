import { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { enrollmentStatuses, gradeLevels } from "../-data/data";
import { DataTableFilter } from "@/components/ui/data-table-filter";
import { useFilterTable } from "@/hooks/table";
import type { ColumnFiltersState } from "@/hooks/types";
import type { Student } from "@/services/types";

type ColumnsIDs = {
  first_name: string;
  surname: string;
} & Pick<Student, "enrollmentStatus" | "gradeLevel">;

export function DataTableToolbar() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useFilterTable<ColumnsIDs>({
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
  });

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-1 items-center space-x-2">
      <Input
        placeholder="First Name..."
        className="h-8 w-[150px] lg:w-[250px]"
        value={table.getColumn("first_name").getFilterValue() ?? ""}
        onChange={(e) =>
          table.getColumn("first_name").setFilterValue(e.target.value)
        }
      />
      <Input
        placeholder="Surname..."
        className="h-8 w-[150px] lg:w-[250px]"
        value={table.getColumn("surname").getFilterValue() ?? ""}
        onChange={(e) =>
          table.getColumn("surname").setFilterValue(e.target.value)
        }
      />
      <DataTableFilter
        column={table.getColumn("enrollmentStatus")}
        title="Enrollment Status"
        options={enrollmentStatuses}
      />
      <DataTableFilter
        column={table.getColumn("gradeLevel")}
        title="Grade Level"
        options={gradeLevels}
      />
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <Cross2Icon className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
