import { useQuery } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { ReportSkillsResponse } from '../interfaces/report-skills.interface'

export const useGetReportSkills = () => {
  return useQuery<ReportSkillsResponse, ApiError>({
    queryKey: ['reports', 'skills'],
    queryFn: async () => {
      const res = await api.get('/reports/skills')
      return res.data
    },
  })
}
