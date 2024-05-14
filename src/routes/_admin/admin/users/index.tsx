import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/users/')({
  component: () => <div>Hello /_admin/admin/users/!</div>
})