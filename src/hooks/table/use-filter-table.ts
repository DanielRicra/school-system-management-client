import type { Column, ColumnFilterValue, ColumnFiltersState } from "../types";

interface UseFilterTableProps {
  state: {
    columnFilters: ColumnFiltersState;
  };
  onColumnFiltersChange: React.Dispatch<
    React.SetStateAction<ColumnFiltersState>
  >;
}

export function useFilterTable<TData>({
  state: { columnFilters },
  onColumnFiltersChange,
}: UseFilterTableProps) {
  function getColumn(id: keyof TData): Column {
    const setFilterValue = (filterValue?: ColumnFilterValue) => {
      const existingColumnFilter = columnFilters.find((cf) => cf.id === id);

      if (filterValue) {
        if (!existingColumnFilter) {
          onColumnFiltersChange((prev) => [
            ...prev,
            { id: id as string, value: filterValue },
          ]);
        } else {
          onColumnFiltersChange((prev) =>
            prev.map((cf) =>
              cf.id === id ? { id: id as string, value: filterValue } : cf
            )
          );
        }
      }

      if (!filterValue && existingColumnFilter) {
        onColumnFiltersChange((prev) => prev.filter((cf) => cf.id !== id));
      }
    };

    const getFilterValue = () => {
      return columnFilters.find((cf) => cf.id === id)?.value;
    };

    return {
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
    onColumnFiltersChange([]);
  }

  return { getColumn, getState, resetColumnFilters };
}
