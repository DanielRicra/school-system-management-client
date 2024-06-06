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
import { Input } from "@/components/ui/input";

import { AddRoomSchema, type AddRoomInput } from "@/schemas/add-room";
import apiService, { HttpServiceError } from "@/services/api";
import { useRoomsSheet } from "@/hooks/store";

export function AddRoomForm() {
  const form = useForm<AddRoomInput>({
    resolver: valibotResolver(AddRoomSchema),
    defaultValues: {
      capacity: "",
      roomNumber: "",
    },
  });
  const onClose = useRoomsSheet((state) => state.onClose);

  async function onSubmit(values: AddRoomInput) {
    try {
      await apiService.post("/rooms", JSON.stringify(values));
      mutate(
        (key) => typeof key === "string" && key.startsWith("/rooms"),
        undefined,
        { revalidate: true }
      );
      toast.success("Room added successfully");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-6">
        <FormField
          control={form.control}
          name="roomNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Number</FormLabel>
              <FormControl>
                <Input placeholder="Room number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
