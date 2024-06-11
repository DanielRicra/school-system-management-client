import { CourseSearchSchema } from "@/schemas/search-schemas";
import { createFileRoute } from "@tanstack/react-router";
import { parse } from "valibot";

export const Route = createFileRoute("/_admin/admin/courses/")({
  validateSearch: (search) => parse(CourseSearchSchema, search),
});
