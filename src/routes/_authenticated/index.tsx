import { createFileRoute } from '@tanstack/react-router'
import { useLogout } from '../../hooks/useAuth'

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
})

function RouteComponent() {
  const logout = useLogout()

  return (
    <div className="flex flex-col gap-3">
      <h1>Bienvenido, lograste ingresar al sistema</h1>

      <button
        onClick={logout}
        type="button"
        className="p-2 border-amber-500 rounded hover:cursor-pointer"
      >
        Cerrar Sesión
      </button>
    </div>
  )
}
