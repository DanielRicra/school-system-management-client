import { Link } from "@tanstack/react-router";

export function Sidebar() {
  return (
    <nav className="py-8 px-3 h-full inline-flex min-w-[200px] border-r border-secondary/40">
      <ul className="flex flex-col gap-1 w-full">
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
        <Link
          to="/admin/teachers"
          className="[&.active]:font-semibold hover:bg-secondary p-2 px-4 rounded-md [&.active]:bg-secondary"
        >
          Teachers
        </Link>
        <Link
          to="/admin/rooms"
          className="[&.active]:font-semibold hover:bg-secondary p-2 px-4 rounded-md [&.active]:bg-secondary"
        >
          Rooms
        </Link>
        <Link
          to="/admin/classrooms"
          className="[&.active]:font-semibold hover:bg-secondary p-2 px-4 rounded-md [&.active]:bg-secondary"
        >
          Classrooms
        </Link>
      </ul>
    </nav>
  );
}
