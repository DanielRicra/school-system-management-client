import { useState } from "react";
import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { toast } from "sonner";
import { mutate } from "swr";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AddClassroomSchema,
  type AddClassroomData,
} from "@/schemas/add-classroom";
import apiService, { HttpServiceError } from "@/services/api";
import { useClassroomsSheet } from "@/hooks/store/use-classrooms-sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert } from "@/components/ui/alert";
import { useFetchRooms } from "@/hooks/http-requests";
import type { ListResponse, Room } from "@/services/types";
import { SelectRoom } from "./select-room";
import type { RoomSearchQuery } from "@/types";

export function AddClassroomForm() {
  const [roomSearch, setRoomSearch] = useState<RoomSearchQuery>({});

  const form = useForm<AddClassroomData>({
    resolver: valibotResolver(AddClassroomSchema),
    defaultValues: {
      year: new Date().getFullYear().toString(),
      section: "",
    },
  });
  const onClose = useClassroomsSheet((state) => state.onClose);

  const {
    data: rooms,
    isLoading: isLoadingRooms,
    error: errorRooms,
  } = useFetchRooms<ListResponse<Room>>({
    query: {
      ...roomSearch,
    },
  });

  async function onSubmit(values: AddClassroomData) {
    try {
      await apiService.post("/classrooms", JSON.stringify(values));
      mutate(
        (key) => typeof key === "string" && key.startsWith("/classrooms"),
        undefined,
        { revalidate: true }
      );
      toast.success("Classroom added successfully");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
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

        {isLoadingRooms ? (
          <SelectFormSkeleton message="Loading rooms..." />
        ) : rooms ? (
          <FormField
            control={form.control}
            name="roomId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Room</FormLabel>
                <SelectRoom
                  onChange={field.onChange}
                  value={field.value}
                  rooms={rooms.results}
                  onSearch={setRoomSearch}
                  defaultSearch={roomSearch}
                />
                <FormDescription>
                  You can search for a room by capacity and room number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}
        {!rooms && !isLoadingRooms && errorRooms && (
          <AlertFormItem message="Couldn't fetch rooms. Try again later." />
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
