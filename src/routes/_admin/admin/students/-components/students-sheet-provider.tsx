import { DeleteStudentDialog } from "./delete-student-dialog";
import { EditStudentSheet } from "./edit-student-sheet";
import { NewStudentSheet } from "./new-student-sheet";

export function StudentsSheetProvider() {
  return (
    <>
      <NewStudentSheet />
      <DeleteStudentDialog />
      <EditStudentSheet />
    </>
  );
}
