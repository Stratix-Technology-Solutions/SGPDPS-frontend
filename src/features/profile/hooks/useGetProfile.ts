import { useQuery } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { RegisterAccountDto } from '../dtos/user.dto'

export const useGetProfile = () => {
  return useQuery<RegisterAccountDto | null, ApiError>({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.get('/profile')
      return res.data.data || null
    },
  })
}
