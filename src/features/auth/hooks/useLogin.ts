import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { LoginDto } from '../dtos/login.dto'

export const useLogin = () => {
  const navigate = useNavigate()

  return useMutation<string, ApiError, LoginDto>({
    mutationFn: async (data) => {
      const res = await api.post('/auth/login', data)
      return res.data.token
    },
    onSuccess: (token) => {
      localStorage.setItem('access_token', token)
      navigate({ to: '/dashboard' })
    },
  })
}
