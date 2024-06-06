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

import { useClassroomsSheet } from "@/hooks/store";
import apiService, { type HttpServiceError } from "@/services/api";

export function DeleteClassroomDialog() {
  const classroom = useClassroomsSheet((state) => state.data);
  const type = useClassroomsSheet((state) => state.type);
  const isOpen = useClassroomsSheet((state) => state.isOpen);
  const onClose = useClassroomsSheet((state) => state.onClose);

  const isDialogOpen = isOpen && type === "delete";

  const onDelete = () => {
    apiService
      .delete(`/classrooms/${classroom.id}`)
      .then(() => {
        toast.success("Classroom deleted successfully");
        mutate(
          (key) => typeof key === "string" && key.startsWith("/classrooms"),
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
            Are you sure you want to delete this classroom '{classroom.id}'?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. this action will permanently delete
            this classroom.
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
