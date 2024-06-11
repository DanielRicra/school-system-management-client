import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_admin/admin/courses/')({
  component: () => <div>Hello /courses/ lazy!</div>
})