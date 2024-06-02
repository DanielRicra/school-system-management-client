import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { toast } from "sonner";
import { mutate } from "swr";
import { CaretSortIcon } from "@radix-ui/react-icons";

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

import { AddStudentSchema, type AddStudentData } from "@/schemas/student";
import { useFetchUsersWithoutStudent } from "@/hooks/http-requests/use-fetch-users";
import type {
  Classroom,
  ListResponse,
  UsersWithoutStudent,
} from "@/services/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectUserCombobox } from "./select-user-popover";
import { useFetchClassrooms } from "@/hooks/http-requests";
import { SelectClassroom } from "./select-classroom";
import { useState } from "react";
import apiService, { HttpServiceError } from "@/services/api";
import { useStudentsSheet } from "@/hooks/use-students-sheet";

export function AddStudentForm() {
  const [classroomSearch, setClassroomSearch] = useState({
    year: "",
    section: "",
  });
  const form = useForm<AddStudentData>({
    resolver: valibotResolver(AddStudentSchema),
    defaultValues: {
      classroomId: undefined,
    },
  });
  const onClose = useStudentsSheet((state) => state.onClose);

  const {
    data: users,
    error: errorUsers,
    isLoading: isLoadingUsers,
  } = useFetchUsersWithoutStudent<UsersWithoutStudent[]>();

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

  async function onSubmit(values: AddStudentData) {
    try {
      await apiService.post("/students", JSON.stringify(values));
      mutate(
        (key) => typeof key === "string" && key.startsWith("/students"),
        undefined,
        { revalidate: true }
      );
      toast.success("Student added successfully");
      onClose();
    } catch (error: unknown) {
      if (error instanceof HttpServiceError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong, try again later.");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

        {isLoadingUsers ? (
          <SelectFormSkeleton message="Loading users..." />
        ) : users ? (
          <FormField
            control={form.control}
            name="userId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>User</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {field.value
                          ? users.find((user) => user.id === field.value)
                              ?.fullName
                          : "Select a User"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="min-w-full p-0">
                    <SelectUserCombobox
                      users={users}
                      onSelect={(value: string) => field.onChange(value)}
                      value={field.value}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="px-1">
                  This user will belong to the student.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}
        {!users && !isLoadingUsers && errorUsers && (
          <AlertFormItem message="Couldn't fetch users. Try again later." />
        )}

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
