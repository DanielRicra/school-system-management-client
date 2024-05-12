import { createLazyFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "./-components/dashboard";

export const Route = createLazyFileRoute("/_admin/admin")({
  component: AdminDashboard,
});
