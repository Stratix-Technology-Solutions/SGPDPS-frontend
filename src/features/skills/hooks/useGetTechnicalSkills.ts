import { useQuery } from '@tanstack/react-query'
import type { TechnicalSkillsResponse } from '../interfaces/technical.interface'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import api from '../../../app/api/axios'

export const useGetTechnicalSkills = ({ page = 1, per_page = 5 }: { page?: number, per_page?: number } = {}) => {
  return useQuery<TechnicalSkillsResponse, ApiError>({
    queryKey: ['user', 'skills', 'technical'],
    queryFn: async () => {
      const res = await api.get(`/skills?page=${page}&per_page=${per_page}`)
      return res.data
    },
  })
}
