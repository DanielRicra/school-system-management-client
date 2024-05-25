import { MagnifyingGlassIcon, Cross2Icon } from "@radix-ui/react-icons";

import { Button, buttonVariants } from "./button";
import { Input } from "./input";
import type { Column } from "@/hooks/types";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { TypographySmall } from "./typography";

interface SearchInputProps {
  navigateOnChangeFilter: (value?: string) => void;
  column: Column;
  placeHolder: string;
}

export function FilterSearchInput({
  navigateOnChangeFilter,
  column,
  placeHolder,
}: SearchInputProps) {
  const value = column.getFilterValue() as string | undefined;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    navigateOnChangeFilter(value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <div className="relative">
        <Input
          placeholder={placeHolder}
          className="w-[150px] lg:w-[250px] rounded-r-none pr-6"
          value={value ?? ""}
          onChange={(e) => column.setFilterValue(e.target.value)}
        />
        <div className="absolute right-0 top-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                {/* biome-ignore lint/a11y/useKeyWithClickEvents: not for now */}
                <div
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "rounded-full hover:bg-secondary/85",
                    value?.length ? "flex" : "hidden"
                  )}
                  onClick={() => {
                    column.setFilterValue(undefined);
                    navigateOnChangeFilter(undefined);
                  }}
                >
                  <Cross2Icon className="h-4 w-4" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-secondary text-secondary-foreground">
                <TypographySmall>Clear Filter</TypographySmall>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Button
        size="icon"
        className="rounded-l-none disabled:opacity-75"
        type="submit"
      >
        <MagnifyingGlassIcon className="h-4 w-4" />
      </Button>
    </form>
  );
}
