import { useTeachersSheet } from "@/hooks/store";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AddTeacherForm } from "./add-teacher-form";

export function NewTeacherSheet() {
  const isOpen = useTeachersSheet((state) => state.isOpen);
  const type = useTeachersSheet((state) => state.type);
  const onClose = useTeachersSheet((state) => state.onClose);

  const isSheetOpen = isOpen && type === "create";

  return (
    <Sheet open={isSheetOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new teacher</SheetTitle>
        </SheetHeader>

        <AddTeacherForm />
      </SheetContent>
    </Sheet>
  );
}
