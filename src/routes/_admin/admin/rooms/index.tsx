import { parse } from "valibot";

import { roomSearchSchema } from "@/schemas/search-schemas";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/rooms/")({
  validateSearch: (search) => parse(roomSearchSchema, search),
});
