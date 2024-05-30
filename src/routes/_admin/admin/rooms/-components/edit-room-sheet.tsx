import { useRoomsSheet } from "@/hooks/use-rooms-sheet";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EditRoomForm } from "./edit-room-form";

export function EditRoomSheet() {
  const isOpen = useRoomsSheet((state) => state.isOpen);
  const type = useRoomsSheet((state) => state.type);
  const onClose = useRoomsSheet((state) => state.onClose);
  const room = useRoomsSheet((state) => state.data);

  const isSheetOpen = isOpen && type === "edit";

  return (
    <Sheet open={isSheetOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className="space-y-4">
          <SheetTitle>Edit a Room</SheetTitle>
          <SheetDescription>Room number: {room.roomNumber}</SheetDescription>
        </SheetHeader>

        <EditRoomForm />
      </SheetContent>
    </Sheet>
  );
}
