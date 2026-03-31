import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthenticated } from '../hooks/useAuth'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: () => {
    const isAuthenticated = useAuthenticated()

    if (!isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  }
})

function RouteComponent() {
  return <Outlet />
}
