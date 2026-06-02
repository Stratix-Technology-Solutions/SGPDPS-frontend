import { useQuery } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { ReportProjectsResponse } from '../interfaces/report-projects.interface'

export const useGetReportProjects = (visibility: string) => {
  return useQuery<ReportProjectsResponse, ApiError>({
    queryKey: ['reports', 'projects', visibility],
    queryFn: async () => {
      const res = await api.get(`/reports/projects?visibility=${visibility}`)
      return res.data
    },
  })
}
