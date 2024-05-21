import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { Button } from "./button";
import { Input } from "./input";
import type { Column } from "@/hooks/types";

interface SearchInputProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  column: Column;
  placeHolder: string;
}

export function FilterSearchInput({
  handleSubmit,
  column,
  placeHolder,
}: SearchInputProps) {
  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <Input
        placeholder={placeHolder}
        className="w-[150px] lg:w-[250px] rounded-r-none"
        value={column.getFilterValue() ?? ""}
        onChange={(e) => column.setFilterValue(e.target.value)}
      />
      <Button
        size="icon"
        className="rounded-l-none disabled:opacity-75"
        type="submit"
        disabled={!column.getFilterValue()}
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
      </Button>
    </form>
  );
}
