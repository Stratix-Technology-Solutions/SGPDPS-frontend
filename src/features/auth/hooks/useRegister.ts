import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { RegisterDto } from '../dtos/register.dto'

export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation<unknown, ApiError, RegisterDto>({
    mutationFn: async ({ email, password }) => {
      const res = await api.post('/auth/register', { email, password })
      return res.data
    },
    onSuccess: (_, variables) => {
      navigate({
        to: '/verify-email',
        state: {
          email: variables.email,
        },
      })
    },
  })
}
