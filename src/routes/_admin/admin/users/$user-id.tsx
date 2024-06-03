import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/admin/users/$user-id")({
  component: UserPage,
});

function UserPage() {
  const { "user-id": userId } = Route.useParams();
  return <div>Hello userId: {userId}</div>;
}
