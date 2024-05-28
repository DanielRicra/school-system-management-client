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
  // TODO: add validation for the capacities
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
          <div className="flex gap-3">
            <div className="items-center gap-4">
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
                min={1}
                className="input-number-icon-none"
              />
            </div>
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
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
