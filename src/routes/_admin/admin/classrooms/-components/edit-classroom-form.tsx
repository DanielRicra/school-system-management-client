import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { toast } from "sonner";
import { mutate } from "swr";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MainErrorAlert } from "@/components/main-error-alert";
import { TypographyMuted } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

import {
  type EditClassroomData,
  EditClassroomSchema,
} from "@/schemas/add-classroom";
import type { Classroom } from "@/services/types";
import apiService, { HttpServiceError } from "@/services/api";
import { useClassroomsSheet } from "@/hooks/store";
import { useFetchClassroom } from "@/hooks/http-requests";

export function EditClassroomForm() {
  const classroomId = useClassroomsSheet((state) => state.data.id);
  const {
    data: classroom,
    isLoading,
    error,
  } = useFetchClassroom<Classroom>(classroomId);

  const form = useForm<EditClassroomData>({
    resolver: valibotResolver(EditClassroomSchema),
  });

  const onClose = useClassroomsSheet((state) => state.onClose);

  async function onSubmit(values: EditClassroomData) {
    try {
      const data = {
        ...(classroom?.gradeLevel !== values.gradeLevel && {
          gradeLevel: values.gradeLevel,
        }),
        ...(classroom?.year !== values.year && {
          year: values.year,
        }),
        ...(classroom?.section !== values.section && {
          section: values.section,
        }),
      };
      await apiService.patch(
        `/classrooms/${classroomId}`,
        JSON.stringify(data)
      );
      mutate(
        (key) => typeof key === "string" && key.startsWith("/classrooms"),
        undefined,
        { revalidate: true }
      );
      toast.success("Classroom updated successfully");
      onClose();
    } catch (error: unknown) {
      if (error instanceof HttpServiceError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong, try again later.");
      }
    }
  }

  useEffect(() => {
    if (classroom) {
      form.reset({
        gradeLevel: classroom.gradeLevel,
        year: classroom.year,
        section: classroom.section,
      });
    }
  }, [classroom]);

  if (isLoading) return <FormSkeleton />;
  if (error) return <MainErrorAlert errorMessage={error.message} />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
        <FormField
          control={form.control}
          name="gradeLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade Level</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value ?? ""}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a grade level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1st">1st</SelectItem>
                  <SelectItem value="2nd">2nd</SelectItem>
                  <SelectItem value="3rd">3rd</SelectItem>
                  <SelectItem value="4th">4th</SelectItem>
                  <SelectItem value="5th">5th</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input placeholder="Year" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="section"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section</FormLabel>
              <FormControl>
                <Input placeholder="Section" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="w-full" />
        <div className="text-center">
          <TypographyMuted>
            Last updated at:{" "}
            {classroom?.updatedAt
              ? format(new Date(classroom.updatedAt), "cccccc, PPp")
              : "-"}
          </TypographyMuted>
        </div>

        <div className="flex justify-end w-full">
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
      <div className="flex justify-end w-full items-center gap-4">
        <Skeleton className="h-9 w-2/5 rounded-md bg-secondary" />
      </div>
    </div>
  );
}
