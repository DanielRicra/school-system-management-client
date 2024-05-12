import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <div className="w-full min-h-svh py-8 px-6">
      <nav>Links will be here!!</nav>
      <Outlet />
    </div>
  );
}
