import { toast } from "sonner";
import { mutate } from "swr";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRoomsSheet } from "@/hooks/use-rooms-sheet";
import apiService, { type HttpServiceError } from "@/services/api";

export function DeleteRoomDialog() {
  const room = useRoomsSheet((state) => state.data);
  const type = useRoomsSheet((state) => state.type);
  const isOpen = useRoomsSheet((state) => state.isOpen);
  const onClose = useRoomsSheet((state) => state.onClose);

  const isDialogOpen = isOpen && type === "delete";

  const onDelete = () => {
    apiService
      .delete(`/rooms/${room.id}`)
      .then(() => {
        toast.success("Room deleted successfully");
        mutate(
          (key) => typeof key === "string" && key.startsWith("/rooms"),
          undefined,
          { revalidate: true }
        );
        onClose();
      })
      .catch((error: HttpServiceError) => {
        toast.error(error.message);
      });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete this room '{room.roomNumber}'?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. this action will permanently delete
            this room.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
