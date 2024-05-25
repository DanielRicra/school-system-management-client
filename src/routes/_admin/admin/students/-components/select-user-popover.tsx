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
import type { UsersWithoutStudent } from "@/services/types";

interface SelectUserPopoverProps {
  value: string;
  onSelect: (value: string) => void;
  users: UsersWithoutStudent[];
}

export function SelectUserCombobox({
  onSelect,
  value,
  users,
}: SelectUserPopoverProps) {
  return (
    <Command>
      <CommandInput placeholder="Search User..." className="h-9 w-full" />
      <CommandEmpty>No User found.</CommandEmpty>
      <CommandList>
        <CommandGroup>
          {users.map((user) => (
            <CommandItem
              value={user.id}
              key={user.id}
              onSelect={() => onSelect(user.id)}
            >
              {user.fullName}
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
