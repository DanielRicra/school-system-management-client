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

import { useStudentsSheet } from "@/hooks/use-students-sheet";
import apiService, { type HttpServiceError } from "@/services/api";

export function DeleteStudentDialog() {
  const student = useStudentsSheet((state) => state.data);
  const type = useStudentsSheet((state) => state.type);
  const isOpen = useStudentsSheet((state) => state.isOpen);
  const onClose = useStudentsSheet((state) => state.onClose);

  const isDialogOpen = isOpen && type === "delete";

  const onDelete = () => {
    apiService
      .delete(`/students/${student.id}`)
      .then(() => {
        toast.success("Student deleted successfully");
        mutate(
          (key) => typeof key === "string" && key.startsWith("/students"),
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
            Are you sure you want to delete this student: {" "}
            {student.user?.surname} {student.user?.firstName}?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. this action will permanently delete
            this student.
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
