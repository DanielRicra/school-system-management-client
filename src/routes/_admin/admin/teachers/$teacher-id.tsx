import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/teachers/$teacher-id")({
  component: () => <div>Hello /_admin/admin/teachers/$teacher-id!</div>,
});
