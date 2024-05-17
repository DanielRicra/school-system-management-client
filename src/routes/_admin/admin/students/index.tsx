import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

const studentSearchSchema = v.object({
  page: v.fallback(v.optional(v.number([v.minValue(1)])), 1),
  ordering: v.fallback(v.optional(v.string([])), ""),
  per_page: v.fallback(v.optional(v.number([v.minValue(10)])), 10),
});

export const Route = createFileRoute("/_admin/admin/students/")({
  validateSearch: (search) => v.parse(studentSearchSchema, search),
});
