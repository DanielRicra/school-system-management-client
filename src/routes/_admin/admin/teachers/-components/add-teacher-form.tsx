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
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectUserCombobox } from "../../-components/select-user-popover";

import { AddTeacherSchema, type AddTeacherData } from "@/schemas/teacher";
import { useFetchUsersWithoutTeacher } from "@/hooks/http-requests";
import type { BasicUser } from "@/services/types";
import apiService, { type HttpServiceError } from "@/services/api";
import { useTeachersSheet } from "@/hooks/store";

export function AddTeacherForm() {
  const form = useForm<AddTeacherData>({
    resolver: valibotResolver(AddTeacherSchema),
  });
  const onClose = useTeachersSheet((state) => state.onClose);

  const {
    data: users,
    error: errorUsers,
    isLoading: isLoadingUsers,
  } = useFetchUsersWithoutTeacher<BasicUser[]>();

  async function onSubmit(values: AddTeacherData) {
    try {
      await apiService.post("/teachers", JSON.stringify(values));
      mutate(
        (key) => typeof key === "string" && key.startsWith("/teachers"),
        undefined,
        { revalidate: true }
      );
      toast.success("Teacher added successfully");
      onClose();
    } catch (error: unknown) {
      toast.error((error as HttpServiceError).message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  This user will belong to the Teacher.
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
