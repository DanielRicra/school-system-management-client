import { Cross2Icon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import type { Column } from "@/hooks/types";
import { getCapacityLabel } from "@/lib/utils";

interface CapacityFilterProps {
  navigateOnChangeFilter: (min?: number, max?: number) => void;
  capacityGteColumn: Column;
  capacityLteColumn: Column;
}

export function CapacityFilter({
  navigateOnChangeFilter,
  capacityGteColumn,
  capacityLteColumn,
}: CapacityFilterProps) {
  const minValue = capacityGteColumn.getFilterValue() as number | undefined;
  const maxValue = capacityLteColumn.getFilterValue() as number | undefined;

  const areValuesValid =
    (maxValue ?? Number.POSITIVE_INFINITY) > (minValue ?? 0);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {getCapacityLabel(minValue, maxValue)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Capacity</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="">
              <Label htmlFor="capacityGte">Min Capacity</Label>
              <Input
                type="number"
                id="capacityGte"
                value={minValue ?? ""}
                onChange={(e) => {
                  capacityGteColumn.setFilterValue(+e.target.value);
                }}
                placeholder="Min capacity"
                min={1}
                max={(maxValue ?? Number.POSITIVE_INFINITY) - 1}
                className="input-number-icon-none"
              />
            </div>
            <div className="items-center gap-4">
              <Label htmlFor="capacityLte">Max Capacity</Label>
              <Input
                type="number"
                id="capacityLte"
                value={maxValue ?? ""}
                onChange={(e) => {
                  capacityLteColumn.setFilterValue(+e.target.value);
                }}
                placeholder="Max capacity"
                min={1 + (minValue ?? 0)}
                className="input-number-icon-none"
              />
            </div>
            {!areValuesValid ? (
              <div className="col-span-2">
                <span className="text-red-500 text-sm">
                  Min capacity cannot be greater than max capacity
                </span>
              </div>
            ) : null}
          </div>
          <Separator className="my-1" />
          <div className="flex justify-between">
            <Button
              variant="ghost"
              onClick={() => {
                capacityGteColumn.setFilterValue(undefined);
                capacityLteColumn.setFilterValue(undefined);
                navigateOnChangeFilter();
              }}
            >
              Clear <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                navigateOnChangeFilter(
                  capacityGteColumn.getFilterValue() as number,
                  capacityLteColumn.getFilterValue() as number
                )
              }
              disabled={!areValuesValid}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
