import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { validateToken } from '../features/auth/services/auth.service'
import { Header } from '../shared/components/Header'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: async () => {
    const isAuthenticated = await validateToken()

    if (!isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  }
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-neutral-light/40 pt-20">
      <Header />

      <main className="px-4 md:w-10/12 md:px-0 m-auto">
        <Outlet />
      </main>
    </div>
  )
}
