import { useMutation } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'

export const useRetrySendCode = () => {
  return useMutation<unknown, ApiError, { email: string }>({
    mutationFn: async ({ email }) => {
      const res = await api.post('/auth/resend-verification', { email })
      return res.data
    },
  })
}
