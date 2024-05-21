import { useState } from "react";
import type {
  Column,
  ColumnFilterValue,
  ColumnFiltersState,
} from "@/hooks/types";

export type TypeFilterTable<TData> = {
  getColumn: (id: keyof TData) => Column;
  getState: () => {
    columnFilters: ColumnFiltersState;
  };
  resetColumnFilters: () => void;
};

export function useFilterTable<TData>(): TypeFilterTable<TData> {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  function getColumn(id: keyof TData): Column {
    const setFilterValue = (filterValue?: ColumnFilterValue) => {
      const existingColumnFilter = columnFilters.find((cf) => cf.id === id);

      if (filterValue !== undefined) {
        if (!existingColumnFilter) {
          setColumnFilters((prev) => [
            ...prev,
            { id: id as string, value: filterValue },
          ]);
        } else {
          setColumnFilters((prev) =>
            prev.map((cf) =>
              cf.id === id ? { id: id as string, value: filterValue } : cf
            )
          );
        }
      }

      if (filterValue === undefined && existingColumnFilter) {
        setColumnFilters((prev) => prev.filter((cf) => cf.id !== id));
      }
    };

    const getFilterValue = () => {
      return columnFilters.find((cf) => cf.id === id)?.value;
    };

    return {
      columnName: id as string,
      getFilterValue,
      setFilterValue,
    };
  }

  function getState() {
    return {
      columnFilters,
    };
  }

  function resetColumnFilters() {
    setColumnFilters([]);
  }

  return { getColumn, getState, resetColumnFilters };
}
