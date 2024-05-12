import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
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
    <>
      <NavBar />
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});

function NavBar() {
  return (
    <header>
      <nav className="py-4 px-6 flex gap-4 w-full border-b border-green-500">
        <Link to="/" className="[&.active]:font-bold hover:text-gray-400">
          Home
        </Link>
        <Link to="/admin" className="[&.active]:font-bold">
          Admin
        </Link>
      </nav>
    </header>
  );
}
