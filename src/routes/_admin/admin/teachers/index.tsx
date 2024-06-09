import { createFileRoute } from "@tanstack/react-router";
import { parse } from "valibot";

import { TeacherSearchSchema } from "@/schemas/search-schemas";

export const Route = createFileRoute("/_admin/admin/teachers/")({
  validateSearch: (search) => parse(TeacherSearchSchema, search),
});
