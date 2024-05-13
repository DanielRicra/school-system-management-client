import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        }))
      );

interface MyRouterContext {
  auth?: { id: string; firstName: string };
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <div>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </div>
  ),
});
