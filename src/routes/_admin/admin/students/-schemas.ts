import * as v from "valibot";

export const studentSearchSchema = v.object({
  page: v.fallback(v.optional(v.number([v.minValue(1)])), 1),
  ordering: v.fallback(v.optional(v.string([])), ""),
  per_page: v.fallback(v.optional(v.number([v.minValue(10)])), 10),
  enrollment_status: v.fallback(v.optional(v.string()), ""),
  grade_level: v.fallback(v.optional(v.string()), ""),
});

export type StudentSearchSchema = v.Output<typeof studentSearchSchema>;