import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

import type { Classroom } from "@/services/types";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

interface SelectClassroomProps {
  classrooms: Classroom[];
  onChange: (value: string) => void;
  value?: number;
  onSearch: (value: string) => void;
  defaultSearch?: string;
}

export function SelectClassroom({
  classrooms,
  onChange,
  value,
  onSearch,
  defaultSearch = "",
}: SelectClassroomProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLButtonElement>(null);

  function handleSearchClassrooms(): void {
    const value = searchInputRef.current?.value ?? "";
    onSearch(value.toUpperCase());
    selectRef.current?.focus();
    onChange("");
  }

  return (
    <div className="flex items-center flex-col w-full gap-2">
      <div className="flex items-center w-full">
        <Input
          name="search"
          placeholder="e.g. '2022, A', '2022' or ', ',B', no quotes"
          className="rounded-r-none pr-6"
          defaultValue={defaultSearch}
          ref={searchInputRef}
        />

        <Button
          size="icon"
          className="rounded-l-none disabled:opacity-75"
          type="button"
          onClick={handleSearchClassrooms}
        >
          <MagnifyingGlassIcon className="h-4 w-4" />
        </Button>
      </div>

      <Select
        onValueChange={onChange}
        value={value?.toString() ?? ""}
        defaultValue={value?.toString() ?? ""}
      >
        <FormControl>
          <SelectTrigger ref={selectRef}>
            <SelectValue placeholder="Select a Classroom" />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="max-h-[250px]">
          {classrooms.length ? (
            classrooms.map((classroom) => (
              <SelectItem key={classroom.id} value={classroom.id.toString()}>
                {`${classroom.year}, ${classroom.gradeLevel} "${classroom.section}"`}
              </SelectItem>
            ))
          ) : (
            <div className="p-1 px-3 text-muted-foreground text-center">
              No classrooms found
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
