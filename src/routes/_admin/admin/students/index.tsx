import { createFileRoute } from "@tanstack/react-router";
import * as v from "valibot";

const productSearchSchema = v.object({
  page: v.fallback(v.optional(v.number([v.minValue(1)])), 1),
});

export const Route = createFileRoute("/_admin/admin/students/")({
  validateSearch: (search) => v.parse(productSearchSchema, search),
});
