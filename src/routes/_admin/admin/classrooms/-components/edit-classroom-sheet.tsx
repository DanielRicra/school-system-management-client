import { useClassroomsSheet } from "@/hooks/store";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EditClassroomForm } from "./edit-classroom-form";

export function EditClassroomSheet() {
  const isOpen = useClassroomsSheet((state) => state.isOpen);
  const type = useClassroomsSheet((state) => state.type);
  const onClose = useClassroomsSheet((state) => state.onClose);
  const classroom = useClassroomsSheet((state) => state.data);

  const isSheetOpen = isOpen && type === "edit";

  return (
    <Sheet open={isSheetOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className="space-y-4">
          <SheetTitle>Edit a Classroom</SheetTitle>
          <SheetDescription>Classroom number: {classroom.id}</SheetDescription>
        </SheetHeader>

        <EditClassroomForm />
      </SheetContent>
    </Sheet>
  );
}
