import {
  object,
  string,
  optional,
  number,
  minLength,
  picklist,
  partial,
  minValue,
  transform,
  type Input,
} from "valibot";

export const AddClassroomSchema = object({
  roomId: optional(
    transform(
      string("Please select a Room ID"),
      (input) => {
        if (input.trim() === "") {
          return undefined;
        }
        return Number.isNaN(Number(input)) ? null : Number(input);
      },
      optional(
        number("Room ID must be a number", [
          minValue(1, "Room ID must be at least 1"),
        ])
      )
    )
  ),
  gradeLevel: picklist(
    ["1st", "2nd", "3rd", "4th", "5th"],
    "Please select a grade level."
  ),
  year: string("Please enter a year.", [minLength(1, "Please enter a year.")]),
  section: string("Please enter a section.", [
    minLength(1, "Please enter a section."),
  ]),
});

export type AddClassroomData = Input<typeof AddClassroomSchema>;

export const EditClassroomSchema = partial(AddClassroomSchema);
export type EditClassroomData = Input<typeof EditClassroomSchema>;
