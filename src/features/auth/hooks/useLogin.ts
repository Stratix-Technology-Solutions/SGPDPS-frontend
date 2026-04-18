import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { LoginDto } from '../dtos/login.dto'

export const useLogin = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation<string, ApiError, LoginDto>({
    mutationFn: async (data) => {
      const res = await api.post('/auth/login', data)
      return res.data.token
    },
    onSuccess: async (token) => {
      localStorage.setItem('access_token', token)
      queryClient.removeQueries({ queryKey: ['user', 'profile'] })

      try {
        await queryClient.fetchQuery({
          queryKey: ['user', 'profile', token],
          queryFn: async () => {
            const res = await api.get('/profile')
            return res.data.data || null
          },
          retry: false,
        })
      } catch {
        // 404 (sin perfil) y otros errores se resuelven en las rutas de perfil.
      }

      navigate({ to: '/dashboard' })
    },
  })
}
