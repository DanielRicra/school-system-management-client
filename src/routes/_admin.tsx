import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "./_admin/-components/sidebar";

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="flex h-dvh justify-start items-start">
      <Sidebar />
      <Outlet />
    </div>
  );
}
