import {
  object,
  picklist,
  string,
  uuid,
  optional,
  number,
  coerce,
  type Output,
  minLength,
} from "valibot";

export const AddStudentSchema = object({
  gradeLevel: picklist(
    ["1st", "2nd", "3rd", "4th", "5th"],
    "Please select a grade level."
  ),
  userId: string([
    minLength(1, "Please select a user"),
    uuid("User ID must be a valid UUID"),
  ]),
  enrollmentStatus: picklist(
    ["active", "graduated", "transferred", "inactive"],
    "Please select an enrollment status."
  ),
  classroomId: optional(
    coerce(number("Classroom ID must be a number"), Number)
  ),
});

export type AddStudentData = Output<typeof AddStudentSchema>;
