import { useTeachersSheet } from "@/hooks/store";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EditTeacherForm } from "./edit-teacher-form";

export function EditTeacherSheet() {
  const isOpen = useTeachersSheet((state) => state.isOpen);
  const type = useTeachersSheet((state) => state.type);
  const onClose = useTeachersSheet((state) => state.onClose);

  const isSheetOpen = isOpen && type === "edit";

  return (
    <Sheet open={isSheetOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit teacher</SheetTitle>
        </SheetHeader>

        <EditTeacherForm />
      </SheetContent>
    </Sheet>
  );
}
