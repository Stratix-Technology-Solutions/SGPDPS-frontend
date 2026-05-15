import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { NotFound } from '../shared/components/NotFound'

const RootLayout = () => (
  <>
    <Outlet />
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})
