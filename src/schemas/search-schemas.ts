import * as v from "valibot";

export const basicSearchSchema = v.object({
  page: v.fallback(v.optional(v.number([v.minValue(1)])), 1),
  ordering: v.fallback(v.optional(v.string()), ""),
  per_page: v.fallback(v.optional(v.number([v.minValue(10)])), 10),
});

export const studentSearchSchema = v.object({
  page: v.fallback(v.optional(v.number([v.minValue(1)])), 1),
  ordering: v.fallback(v.optional(v.string()), ""),
  per_page: v.fallback(v.optional(v.number([v.minValue(10)])), 10),
  enrollment_status: v.fallback(v.optional(v.array(v.string())), []),
  grade_level: v.fallback(v.optional(v.array(v.string())), []),
  first_name: v.fallback(v.optional(v.string()), ""),
  surname: v.fallback(v.optional(v.string()), ""),
});

export type StudentSearchSchema = v.Output<typeof studentSearchSchema>;

export const roomSearchSchema = v.intersect([
  basicSearchSchema,
  v.object({
    "capacity.gte": v.fallback(
      v.optional(v.number([v.minValue(1)])),
      undefined
    ),
    "capacity.lte": v.fallback(
      v.optional(v.number([v.minValue(1)])),
      undefined
    ),
    room_number: v.fallback(v.optional(v.string()), ""),
  }),
]);
export type RoomSearchSchema = v.Output<typeof roomSearchSchema>;

export const classroomSearchSchema = v.intersect([
  basicSearchSchema,
  v.object({
    room_id: v.fallback(v.optional(v.number([v.minValue(1)])), 1),
    grade_level: v.fallback(v.optional(v.array(v.string())), []),
    section: v.fallback(v.optional(v.string()), ""),
    year: v.fallback(v.optional(v.string()), ""),
  }),
]);
export type ClassroomSearchSchema = v.Output<typeof classroomSearchSchema>;

export const TeacherSearchSchema = v.intersect([
  basicSearchSchema,
  v.object({
    department: v.fallback(v.optional(v.string()), ""),
    first_name: v.fallback(v.optional(v.string()), ""),
    surname: v.fallback(v.optional(v.string()), ""),
  }),
]);
export type TeacherSearchSchemaData = v.Output<typeof TeacherSearchSchema>;

export const CourseSearchSchema = v.intersect([
  basicSearchSchema,
  v.object({
    code: v.fallback(v.optional(v.string()), ""),
    name: v.fallback(v.optional(v.string()), ""),
  }),
]);
export type CourseSearchSchemaData = v.Output<typeof CourseSearchSchema>;