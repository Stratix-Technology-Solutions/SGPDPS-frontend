import { useQuery } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'

export const useGetTechnicalSkillsSystem = () => {
  return useQuery<{ name: string }[], ApiError>({
    queryKey: ['skills', 'system'],
    queryFn: async () => {
      const res = await api.get('/skills/list-all')
      return res.data
    },
  })
}
