import { DeleteTeacherDialog } from "./delete-teacher-dialog";
import { EditTeacherSheet } from "./edit-teacher-sheet";
import { NewTeacherSheet } from "./new-teacher-sheet";

export function TeachersSheetProvider() {
  return (
    <>
      <NewTeacherSheet />
      <DeleteTeacherDialog />
      <EditTeacherSheet />
    </>
  );
}
