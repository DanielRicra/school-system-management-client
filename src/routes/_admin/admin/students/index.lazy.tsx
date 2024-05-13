import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_admin/admin/students/')({
  component: () => <div>Hello Students!</div>
})