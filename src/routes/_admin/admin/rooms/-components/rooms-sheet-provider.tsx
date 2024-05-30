import { DeleteRoomDialog } from "./delete-room-dialog";
import { EditRoomSheet } from "./edit-room-sheet";
import { NewRoomSheet } from "./new-room-sheet";

export function RoomsSheetProvider() {
  return (
    <>
      <NewRoomSheet />
      <EditRoomSheet />
      <DeleteRoomDialog />
    </>
  );
}
