import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/users/$userId")({
  component: UserPage,
});

function UserPage() {
  const { userId } = Route.useParams();
  return <div>Hello userId: {userId}</div>;
}
