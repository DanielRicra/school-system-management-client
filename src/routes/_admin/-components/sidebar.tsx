import { Link } from "@tanstack/react-router";

export function Sidebar() {
  return (
    <nav className="py-6 px-3 h-full w-48 border-r border-secondary/40">
      <ul className="flex flex-col gap-1">
        <Link
          to="/admin"
          className="[&.active]:font-semibold hover:bg-secondary p-2 px-4 rounded-md [&.active]:bg-secondary"
          activeOptions={{ exact: true }}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/students"
          className="[&.active]:font-semibold hover:bg-secondary p-2 px-4 rounded-md [&.active]:bg-secondary"
        >
          Students
        </Link>
      </ul>
    </nav>
  );
}
