import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ClassroomsIcon,
  RoomsIcon,
  StudentsIcon,
  TeachersIcon,
} from "@/components/ui/icons";
import { Link, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_admin/admin/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <main className="p-6 flex gap-4">
      <Link to="/admin/students" from="/admin" preload="intent">
        <Card className="min-w-[180px]">
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent>
            <StudentsIcon className="w-8 h-8 fill-primary mb-3" />

            <div className="font-bold text-2xl leading-6 tracking-wide">
              15,400
            </div>
          </CardContent>
        </Card>
      </Link>

      <Card className="min-w-[180px]">
        <CardHeader>
          <CardTitle>Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <TeachersIcon className="w-8 h-8 fill-primary mb-3" />

          <div className="font-bold text-2xl leading-6 tracking-wide">400</div>
        </CardContent>
      </Card>

      <Card className="min-w-[180px]">
        <CardHeader>
          <CardTitle>Classrooms</CardTitle>
        </CardHeader>
        <CardContent>
          <ClassroomsIcon className="w-8 h-8 fill-primary mb-3" />

          <div className="font-bold text-2xl leading-6 tracking-wide">500</div>
        </CardContent>
      </Card>

      <Link to="/admin/rooms" from="/admin" preload="intent">
        <Card className="min-w-[180px]">
          <CardHeader>
            <CardTitle>Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <RoomsIcon className="w-8 h-8 fill-primary mb-3" />

            <div className="font-bold text-2xl leading-6 tracking-wide">
              500
            </div>
          </CardContent>
        </Card>
      </Link>
    </main>
  );
}
