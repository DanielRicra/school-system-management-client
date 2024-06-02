import { useStudentsSheet } from "@/hooks/use-students-sheet";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { EditStudentForm } from "./edit-student-form";

export function EditStudentSheet() {
  const isOpen = useStudentsSheet((state) => state.isOpen);
  const type = useStudentsSheet((state) => state.type);
  const onClose = useStudentsSheet((state) => state.onClose);

  const isSheetOpen = isOpen && type === "edit";

  return (
    <Sheet open={isSheetOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit student</SheetTitle>
        </SheetHeader>

        <EditStudentForm />
      </SheetContent>
    </Sheet>
  );
}
