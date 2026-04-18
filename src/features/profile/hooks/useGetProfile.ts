import { useQuery } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { RegisterAccountDto } from '../dtos/user.dto'

export const useGetProfile = () => {
  const token = localStorage.getItem('access_token')

  return useQuery<RegisterAccountDto | null, ApiError>({
    queryKey: ['user', 'profile', token],
    enabled: Boolean(token),
    queryFn: async () => {
      const res = await api.get('/profile')
      return res.data.data || null
    },
    retry: (failureCount, error) => {
      if (error.response?.status === 404) {
        return false
      }

      return failureCount < 1
    },
  })
}
