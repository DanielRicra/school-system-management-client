import { useRoomsSheet } from "@/hooks/use-rooms-sheet";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AddRoomForm } from "./add-room-form";

export function NewRoomSheet() {
  const isOpen = useRoomsSheet((state) => state.isOpen);
  const type = useRoomsSheet((state) => state.type);
  const onClose = useRoomsSheet((state) => state.onClose);

  const isSheetOpen = isOpen && type === "create";

  return (
    <Sheet open={isSheetOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new Room</SheetTitle>
        </SheetHeader>

        <AddRoomForm />
      </SheetContent>
    </Sheet>
  );
}
