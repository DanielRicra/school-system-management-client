import { useEffect, useState } from "react";
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
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MainErrorAlert } from "@/components/main-error-alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";

import { EditStudentSchema, type EditStudentData } from "@/schemas/student";
import type { Classroom, ListResponse, Student } from "@/services/types";
import apiService, { type HttpServiceError } from "@/services/api";
import { useFetchClassrooms, useFetchStudent } from "@/hooks/http-requests";
import { useStudentsSheet } from "@/hooks/use-students-sheet";

import { SelectClassroom } from "./select-classroom";

export function EditStudentForm() {
  const [classroomSearch, setClassroomSearch] = useState({
    year: "",
    section: "",
  });
  const studentId = useStudentsSheet((state) => state.data.id);
  const {
    data: student,
    error,
    isLoading,
  } = useFetchStudent<Student>(studentId);

  const form = useForm<EditStudentData>({
    resolver: valibotResolver(EditStudentSchema),
    defaultValues: {
      classroomId: undefined,
    },
  });
  const onClose = useStudentsSheet((state) => state.onClose);

  const {
    data: classrooms,
    isLoading: isLoadingClassrooms,
    error: errorClassrooms,
  } = useFetchClassrooms<ListResponse<Classroom>>({
    shouldFetch: !!form.watch("gradeLevel"),
    query: {
      grade_level: form.watch("gradeLevel"),
      ordering: "-year",
      ...classroomSearch,
    },
  });

  const onSearchClassroom = (search: string) => {
    const [year, section] = search.split(",");

    setClassroomSearch({
      year,
      section,
    });
  };

  async function onSubmit(values: EditStudentData) {
    try {
      const data = {
        ...(student?.classroomId !== values.classroomId && {
          classroomId: values.classroomId,
        }),
        ...(student?.gradeLevel !== values.gradeLevel && {
          grade_level: values.gradeLevel,
        }),
        ...(student?.enrollmentStatus !== values.enrollmentStatus && {
          enrollment_status: values.enrollmentStatus,
        }),
      };
      await apiService.patch(`/students/${studentId}`, JSON.stringify(data));
      mutate(
        (key) => typeof key === "string" && key.startsWith("/students"),
        undefined,
        { revalidate: true }
      );
      toast.success("Student updated successfully");
      onClose();
    } catch (error: unknown) {
      toast.error((error as HttpServiceError).message);
    }
  }

  useEffect(() => {
    if (student) {
      form.reset({
        gradeLevel: student.gradeLevel,
        enrollmentStatus: student.enrollmentStatus,
        classroomId: student.classroomId ?? undefined,
      });
    }
  }, [student]);

  if (isLoading) return <FormSkeleton />;
  if (error) return <MainErrorAlert errorMessage={error.message} />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="gradeLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade Level</FormLabel>
              <Select
                onValueChange={(val) => {
                  field.onChange(val);
                  form.resetField("classroomId");
                }}
                value={field.value ?? ""}
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
          name="enrollmentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enrollment Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value ?? ""}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an Enrollment Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="graduated">Graduated</SelectItem>
                  <SelectItem value="transferred">Transferred</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {isLoadingClassrooms ? (
          <SelectFormSkeleton message="Loading classrooms..." />
        ) : classrooms ? (
          <FormField
            control={form.control}
            name="classroomId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Classroom</FormLabel>
                <SelectClassroom
                  onChange={field.onChange}
                  value={field.value}
                  classrooms={classrooms.results}
                  onSearch={onSearchClassroom}
                  defaultSearch={`${classroomSearch.year ?? ""}${
                    classroomSearch.section
                      ? `, ${classroomSearch.section}`
                      : ""
                  }`}
                />
                <FormDescription>
                  You can search for a classroom by year and section.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}
        {!classrooms && !isLoadingClassrooms && errorClassrooms && (
          <AlertFormItem message="Couldn't fetch classrooms. Try again later." />
        )}

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

function SelectFormSkeleton({ message }: { message: string }) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground">{message}</p>
      <Skeleton className="h-9 w-full rounded-md bg-secondary" />
    </div>
  );
}

function AlertFormItem({ message }: { message: string }) {
  return (
    <Alert variant="destructive">
      <div>{message}</div>
    </Alert>
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
