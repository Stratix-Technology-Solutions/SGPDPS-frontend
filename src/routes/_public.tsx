import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuth } from '../features/auth/hooks/useAuth'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
  beforeLoad: () => {
    const isAuthenticated = useAuth()

    if (isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center">
      <div className="w-full max-w-xl flex flex-col p-8 gap-8">
        <Outlet />
      </div>
    </div>
  )
}
