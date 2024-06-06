import { createFileRoute } from "@tanstack/react-router";
import { parse } from "valibot";

import { classroomSearchSchema } from "@/schemas/search-schemas";

export const Route = createFileRoute("/_admin/admin/classrooms/")({
  validateSearch: (search) => parse(classroomSearchSchema, search),
});
