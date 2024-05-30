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
import { Input } from "@/components/ui/input";

import {
  type EditRoomInput,
  EditRoomSchema,
  type EditRoomOutput,
} from "@/schemas/add-room";
import apiService, { HttpServiceError } from "@/services/api";
import { useRoomsSheet } from "@/hooks/use-rooms-sheet";
import { useFetchRoom } from "@/hooks/http-requests";
import type { Room } from "@/services/types";
import { Skeleton } from "@/components/ui/skeleton";
import { MainErrorAlert } from "@/components/main-error-alert";
import { TypographyMuted } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

export function EditRoomForm() {
  const roomId = useRoomsSheet((state) => state.data.id);
  const { data: room, isLoading, error } = useFetchRoom<Room>(roomId);

  const form = useForm<EditRoomInput>({
    resolver: valibotResolver(EditRoomSchema),
    defaultValues: {
      capacity: room?.capacity?.toString() ?? "",
    },
  });

  const onClose = useRoomsSheet((state) => state.onClose);

  async function onSubmit(values: EditRoomInput) {
    const payload = values as unknown as EditRoomOutput;
    try {
      const data = {
        ...(room?.capacity !== payload.capacity && {
          capacity: payload.capacity,
        }),
      };
      await apiService.put(`/rooms/${roomId}`, JSON.stringify(data));
      mutate(
        (key) => typeof key === "string" && key.startsWith("/rooms"),
        undefined,
        { revalidate: true }
      );
      toast.success("Room updated successfully");
      onClose();
    } catch (error: unknown) {
      console.log(error);

      if (error instanceof HttpServiceError) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong, try again later.");
      }
    }
  }

  useEffect(() => {
    if (room) {
      form.reset({
        capacity: room?.capacity?.toString() ?? "",
      });
    }
  }, [room]);

  if (isLoading) return <FormSkeleton />;
  if (error) return <MainErrorAlert errorMessage={error.message} />;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input placeholder="Capacity" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="w-full" />
        <div className="text-center">
          <TypographyMuted>
            Last updated at:{" "}
            {room?.updatedAt
              ? format(new Date(room.updatedAt), "cccccc, PPp")
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
