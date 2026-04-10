import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { RegisterDto } from '../dtos/register.dto'

export const useResetPassword = () => {
  const navigate = useNavigate()

  return useMutation<unknown, ApiError, { token: string } & RegisterDto>({
    mutationFn: async ({ email, password, token }) => {
      const res = await api.post('/auth/reset-password', { email, password, token })
      return res.data
    },
    onSuccess: () => {
      navigate({ to: '/login' })
    },
  })
}
