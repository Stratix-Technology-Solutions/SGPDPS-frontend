import { useQuery } from '@tanstack/react-query'
import type { SoftSkillsResponse } from '../interfaces/soft.interface'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import api from '../../../app/api/axios'

export const useGetSoftSkills = ({ page = 1, per_page = 5, enabled = true }: { page?: number, per_page?: number, enabled?: boolean } = {}) => {
  return useQuery<SoftSkillsResponse, ApiError>({
    queryKey: ['user', 'skills', 'soft'],
    queryFn: async () => {
      const res = await api.get(`/soft-skills?page=${page}&per_page=${per_page}`)
      return res.data
    },
    enabled
  })
}
