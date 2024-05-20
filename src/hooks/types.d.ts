export type ColumnFiltersState = ColumnFilter[];
type ColumnFilterValue = string | number | string[];

export interface ColumnFilter {
  id: string;
  value: ColumnFilterValue;
}

export type Column = {
  columnName: string;
  getFilterValue: () => ColumnFilterValue | undefined;
  setFilterValue: (filterValue?: ColumnFilterValue) => void;
};
