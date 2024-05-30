import {
  object,
  string,
  type Output,
  length,
  transform,
  optional,
  type Input,
  number,
  minValue,
  omit,
} from "valibot";

export const AddRoomSchema = object({
  roomNumber: string("Please enter a room number", [
    length(3, "Room number must be 6 characters"),
  ]),
  capacity: optional(
    transform(
      string("Please enter a capacity"),
      (input) => {
        if (input.trim() === "") {
          return undefined;
        }
        return Number.isNaN(Number(input)) ? null : Number(input);
      },
      optional(
        number("Capacity must be a number", [
          minValue(1, "Capacity must be at least 1"),
        ])
      )
    )
  ),
});

export type AddRoomInput = Input<typeof AddRoomSchema>;
export type AddRoomOutput = Output<typeof AddRoomSchema>;

export const EditRoomSchema = omit(AddRoomSchema, ["roomNumber"]);
export type EditRoomInput = Input<typeof EditRoomSchema>;
export type EditRoomOutput = Output<typeof EditRoomSchema>;
