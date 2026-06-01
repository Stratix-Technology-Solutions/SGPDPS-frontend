import { useQuery } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { ReportProjectsResponse } from '../interfaces/report-projects.interface'

export const useGetReportProjects = () => {
  return useQuery<ReportProjectsResponse, ApiError>({
    queryKey: ['reports', 'projects'],
    queryFn: async () => {
      const res = await api.get('/reports/projects')
      return res.data
    },
  })
}
