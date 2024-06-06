import { DeleteClassroomDialog } from "./delete-classroom-dialog";
import { EditClassroomSheet } from "./edit-classroom-sheet";
import { NewClassroomSheet } from "./new-classroom-sheet";

export function ClassroomsSheetProvider() {
  return (
    <>
      <NewClassroomSheet />
      <EditClassroomSheet />
      <DeleteClassroomDialog />
    </>
  );
}
