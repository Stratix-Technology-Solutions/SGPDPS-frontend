import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useAuthenticated } from '../hooks/useAuth'
import { Header } from '../components/Header'

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
  return (
    <div className="min-h-screen bg-neutral-light/40">
      <Header />

      <main className="px-4 md:w-10/12 md:px-0 m-auto">
        <Outlet />
      </main>
    </div>
  )
}
