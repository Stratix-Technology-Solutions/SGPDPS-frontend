import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { validateToken } from '../features/auth/services/auth.service'

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
  beforeLoad: async () => {
    const isAuthenticated = await validateToken()

    if (isAuthenticated) {
      throw redirect({ to: '/dashboard' })
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
