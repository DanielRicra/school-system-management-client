import { cn } from "@/lib/utils";

import { CheckIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { BasicUser } from "@/services/types";

interface SelectUserPopoverProps {
  value: string;
  onSelect: (value: string) => void;
  users: BasicUser[];
}

export function SelectUserCombobox({
  onSelect,
  value,
  users,
}: SelectUserPopoverProps) {
  return (
    <Command>
      <CommandInput placeholder="Search User..." className="h-9 w-full" />
      <CommandList>
        <CommandEmpty>No User found.</CommandEmpty>
        <CommandGroup heading="Users">
          {users.map((user) => (
            <CommandItem
              value={user.fullName}
              key={user.id}
              onSelect={() => onSelect(user.id)}
            >
              <span>{user.fullName}</span>
              <CheckIcon
                className={cn(
                  "ml-auto h-4 w-4",
                  user.id === value ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
