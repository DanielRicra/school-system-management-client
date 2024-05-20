import { createFileRoute } from "@tanstack/react-router";
import { parse } from "valibot";

import { studentSearchSchema } from "@/schemas/search-schemas";

export const Route = createFileRoute("/_admin/admin/students/")({
  validateSearch: (search) => parse(studentSearchSchema, search),
});
