import {
  object,
  string,
  type Output,
  optional,
  number,
  minLength,
  picklist,
  partial,
} from "valibot";

export const AddClassroomSchema = object({
  roomId: optional(number("Please select a Room")),
  gradeLevel: picklist(
    ["1st", "2nd", "3rd", "4th", "5th"],
    "Please select a grade level."
  ),
  year: string("Please enter a year.", [minLength(1, "Please enter a year.")]),
  section: string("Please enter a section.", [
    minLength(1, "Please enter a section."),
  ]),
});

export type AddClassroomData = Output<typeof AddClassroomSchema>;

export const EditClassroomSchema = partial(AddClassroomSchema);
export type EditClassroomData = Output<typeof EditClassroomSchema>;
