import { useQuery } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { WorkExperience } from '../dtos/workExperience'

export const useWorkExperiences = ({ enabled = true }: { enabled?: boolean } = {}) => {
  const token = localStorage.getItem('access_token')

  return useQuery<WorkExperience[]>({
    queryKey: ['work-experiences', token],
    queryFn: async () => {
      const res = await api.get('/work-experiences')
      return res.data.data
    },
    enabled,
  })
}
