import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/rooms/$room-id')({
  component: () => <div>Hello /_admin/admin/rooms/$room-id!</div>
})