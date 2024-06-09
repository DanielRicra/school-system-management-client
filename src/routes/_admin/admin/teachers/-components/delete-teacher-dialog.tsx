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

import { useTeachersSheet } from "@/hooks/store";
import apiService, { type HttpServiceError } from "@/services/api";

export function DeleteTeacherDialog() {
  const teacher = useTeachersSheet((state) => state.data);
  const type = useTeachersSheet((state) => state.type);
  const isOpen = useTeachersSheet((state) => state.isOpen);
  const onClose = useTeachersSheet((state) => state.onClose);

  const isDialogOpen = isOpen && type === "delete";

  const onDelete = () => {
    apiService
      .delete(`/teachers/${teacher.id}`)
      .then(() => {
        toast.success("Teacher deleted successfully");
        mutate(
          (key) => typeof key === "string" && key.startsWith("/teachers"),
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
            Are you sure you want to delete this teacher: {" "}
            {teacher.user?.surname} {teacher.user?.firstName}?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. this action will permanently delete
            this teacher.
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
