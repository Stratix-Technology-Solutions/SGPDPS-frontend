import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import api from '../api/axios'
import { useLogout } from '../hooks/useAuth'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isSuccess, isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await api.get('/user')
      return res.data
    },
    retry: false,
  })

  const logout = useLogout()

  return (
    <div className="flex flex-col gap-3">
      {isSuccess && <p>Iniciaste sesión con éxito</p>}
      {isError && <p>No iniciaste sesión</p>}

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
