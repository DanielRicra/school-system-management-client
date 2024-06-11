import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/admin/courses/')({
  component: () => <div>Hello /_admin/admin/courses/!</div>
})