import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import api from '../api/axios'

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

  return (
    <div>
      {isSuccess && <p>Iniciaste sesión con éxito</p>}
      {isError && <p>No iniciaste sesión</p>}
    </div>
  )
}
