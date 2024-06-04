import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/classrooms/$classroom-id')({
  component: () => <div>Hello /_admin/admin/classrooms/$classroom-id!</div>
})