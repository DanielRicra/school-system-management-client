import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/students/$student-id')({
  component: () => <div>Hello /_admin/admin/students/$student-id!</div>
})