import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/classrooms/')({
  component: () => <div>Hello /_admin/admin/classrooms/!</div>
})