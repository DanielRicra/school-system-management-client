import { useStudentsSheet } from "@/hooks/use-students-sheet";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { AddStudentForm } from "./add-student-form";

export function NewStudentSheet() {
  const isOpen = useStudentsSheet((state) => state.isOpen);
  const type = useStudentsSheet((state) => state.type);
  const onClose = useStudentsSheet((state) => state.onClose);

  const isSheetOpen = isOpen && type === "create";

  return (
    <Sheet open={isSheetOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new student</SheetTitle>
          <SheetDescription>Add a new student</SheetDescription>
        </SheetHeader>

        <AddStudentForm />
      </SheetContent>
    </Sheet>
  );
}
