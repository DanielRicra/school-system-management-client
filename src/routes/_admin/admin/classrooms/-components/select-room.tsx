import { useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { Room } from "@/services/types";
import { useFilterTable } from "@/hooks/table";
import type { RoomSearchQuery } from "@/types";

import { CapacityFilter } from "../../-components/capacity-filter";

interface SelectRoomProps {
  rooms: Room[];
  onChange: (value: string) => void;
  value?: string;
  onSearch: React.Dispatch<React.SetStateAction<RoomSearchQuery>>;
  defaultSearch?: RoomSearchQuery;
}

export type StudentsColumnsIDs = {
  room_number: string;
  "capacity.gte": number;
  "capacity.lte": number;
};

export function SelectRoom({
  rooms,
  onChange,
  value,
  onSearch,
  defaultSearch = {},
}: SelectRoomProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLButtonElement>(null);

  const tableFilter = useFilterTable<StudentsColumnsIDs>();

  const searchByRoomNumber = () => {
    const value = searchInputRef.current?.value ?? "";
    onSearch((prev) => ({ ...prev, room_number: value }));
  };

  const searchByCapacity = (min?: number, max?: number) => {
    onSearch((prev) => ({ ...prev, "capacity.gte": min, "capacity.lte": max }));
  };

  useEffect(() => {
    const { "capacity.gte": capacityGte, "capacity.lte": capacityLte } =
      defaultSearch;

    if (capacityGte) {
      tableFilter.getColumn("capacity.gte").setFilterValue(capacityGte);
    }

    if (capacityLte) {
      tableFilter.getColumn("capacity.lte").setFilterValue(capacityLte);
    }
  }, [defaultSearch]);

  return (
    <div className="flex items-center flex-col w-full gap-2">
      <div className="flex justify-between w-full gap-1">
        <div className="flex items-center w-full">
          <Input
            name="search"
            placeholder="Room number..."
            className="rounded-r-none pr-6"
            defaultValue={defaultSearch.room_number ?? ""}
            ref={searchInputRef}
          />

          <Button
            size="icon"
            className="rounded-l-none disabled:opacity-75"
            type="button"
            onClick={searchByRoomNumber}
          >
            <MagnifyingGlassIcon className="h-4 w-4" />
          </Button>
        </div>

        <CapacityFilter
          navigateOnChangeFilter={searchByCapacity}
          capacityGteColumn={tableFilter.getColumn("capacity.gte")}
          capacityLteColumn={tableFilter.getColumn("capacity.lte")}
        />
      </div>

      <Select
        onValueChange={onChange}
        value={value}
        defaultValue={value?.toString()}
      >
        <FormControl>
          <SelectTrigger ref={selectRef}>
            <SelectValue placeholder="Select a Room" />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="max-h-[250px]">
          {rooms.length ? (
            rooms.map((room) => (
              <SelectItem key={room.id} value={room.id.toString()}>
                {`No. '${room.roomNumber}', Capacity: ${room.capacity}`}
              </SelectItem>
            ))
          ) : (
            <div className="p-1 px-3 text-muted-foreground text-center">
              No rooms found
            </div>
          )}
          <div className="p-1 px-3 text-muted-foreground text-center">
            Search for more in the input above
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}
