import {
  object,
  string,
  uuid,
  optional,
  type Output,
  minLength,
  partial,
} from "valibot";

export const AddTeacherSchema = object({
  userId: string("Please select a user", [
    minLength(1, "Please select a user"),
    uuid("User ID must be a valid UUID"),
  ]),
  department: optional(
    string("Department must be a string", [
      minLength(1, "Department must not be a empty string."),
    ])
  ),
});

export const EditTeacherSchema = partial(AddTeacherSchema);

export type AddTeacherData = Output<typeof AddTeacherSchema>;

export type EditTeacherData = Output<typeof EditTeacherSchema>;
