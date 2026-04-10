import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { VerifyEmailDto } from '../dtos/verifyEmail.dto'

export const useVerifyEmail = () => {
  const navigate = useNavigate()

  return useMutation<string, ApiError, VerifyEmailDto>({
    mutationFn: async ({ email, token }) => {
      const res = await api.post('/auth/verify-email', { email, token })
      return res.data.data.token
    },
    onSuccess: (token) => {
      localStorage.setItem('access_token', token)
      navigate({ to: '/' })
    },
  })
}
