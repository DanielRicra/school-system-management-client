import { useClassroomsSheet } from "@/hooks/store";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AddClassroomForm } from "./add-classroom-form";

export function NewClassroomSheet() {
  const isOpen = useClassroomsSheet((state) => state.isOpen);
  const type = useClassroomsSheet((state) => state.type);
  const onClose = useClassroomsSheet((state) => state.onClose);

  const isSheetOpen = isOpen && type === "create";

  return (
    <Sheet open={isSheetOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new Classroom</SheetTitle>
        </SheetHeader>

        <AddClassroomForm />
      </SheetContent>
    </Sheet>
  );
}
