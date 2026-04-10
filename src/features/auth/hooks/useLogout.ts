import { useMutation } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'

export const useLogout = () => {
  return useMutation<string, ApiError>({
    mutationFn: async () => {
      const res = await api.post('/logout')
      return res.data.message
    }
  })
}
