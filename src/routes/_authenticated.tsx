import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuth } from '../features/auth/hooks/useAuth'
import { Header } from '../shared/components/Header'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: () => {
    const isAuthenticated = useAuth()

    if (!isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  }
})

function RouteComponent() {
  return (
    <div className="min-h-screen bg-neutral-light/40">
      <Header />

      <main className="px-4 md:w-10/12 md:px-0 m-auto">
        <Outlet />
      </main>
    </div>
  )
}
