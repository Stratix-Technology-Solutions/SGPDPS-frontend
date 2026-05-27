import { useQuery } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'

export const useGetSoftSkillsSystem = () => {
  return useQuery<{ name: string }[], ApiError>({
    queryKey: ['soft', 'skills', 'system'],
    queryFn: async () => {
      const res = await api.get('/soft-skills/list-all')
      return res.data
    },
  })
}
