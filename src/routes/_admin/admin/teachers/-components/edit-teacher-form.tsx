import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { toast } from "sonner";
import { mutate } from "swr";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MainErrorAlert } from "@/components/main-error-alert";
import { Skeleton } from "@/components/ui/skeleton";

import { EditTeacherSchema, type EditTeacherData } from "@/schemas/teacher";
import type { Teacher } from "@/services/types";
import apiService, { type HttpServiceError } from "@/services/api";
import { useFetchTeacher } from "@/hooks/http-requests";
import { useTeachersSheet } from "@/hooks/store";
import { Input } from "@/components/ui/input";

export function EditTeacherForm() {
  const teacherId = useTeachersSheet((state) => state.data.id);
  const {
    data: teacher,
    error,
    isLoading,
  } = useFetchTeacher<Teacher>(teacherId);

  const form = useForm<EditTeacherData>({
    resolver: valibotResolver(EditTeacherSchema),
  });
  const onClose = useTeachersSheet((state) => state.onClose);

  async function onSubmit(values: EditTeacherData) {
    try {
      const data = {
        ...(teacher?.department !== values.department && {
          department: values.department,
        }),
        ...(teacher?.userId !== values.userId && {
          user_id: values.userId,
        }),
      };
      await apiService.patch(`/teachers/${teacherId}`, JSON.stringify(data));
      mutate(
        (key) => typeof key === "string" && key.startsWith("/teachers"),
        undefined,
        { revalidate: true }
      );
      toast.success("Teacher updated successfully");
      onClose();
    } catch (error: unknown) {
      toast.error((error as HttpServiceError).message);
    }
  }

  useEffect(() => {
    if (teacher) {
      form.reset({
        department: teacher.department ?? undefined,
        userId: teacher.userId,
      });
    }
  }, [teacher]);

  if (isLoading) return <FormSkeleton />;
  if (error) return <MainErrorAlert errorMessage={error.message} />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Department</FormLabel>
              <FormControl>
                <Input placeholder="Department" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between w-full">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              form.reset({});
            }}
            disabled={form.formState.isSubmitting}
          >
            Reset
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-4 mt-6">
      <Skeleton className="h-9 w-full rounded-md bg-secondary" />
      <Skeleton className="h-9 w-full rounded-md bg-secondary" />
      <Skeleton className="h-9 w-full rounded-md bg-secondary" />
      <div className="flex justify-end w-full items-center gap-4">
        <Skeleton className="h-9 w-2/5 rounded-md bg-secondary" />
      </div>
    </div>
  );
}
