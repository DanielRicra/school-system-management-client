import { DeleteStudentDialog } from "./delete-student-dialog";
import { NewStudentSheet } from "./new-student-sheet";

export function StudentsSheetProvider() {
  return (
    <>
      <NewStudentSheet />
      <DeleteStudentDialog />
    </>
  );
}
