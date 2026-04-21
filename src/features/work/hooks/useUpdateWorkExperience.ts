import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type {
  UpdateWorkExperience,
  WorkExperience,
} from '../dtos/workExperience'

export const useUpdateWorkExperience = ({
  onClose,
}: {
  onClose: () => void
}) => {
  const queryClient = useQueryClient()
  const token = localStorage.getItem('access_token')

  return useMutation<
    WorkExperience,
    ApiError,
    { id: string; data: UpdateWorkExperience }
  >({
    mutationFn: async ({ id, data }) => {
      const res = await api.patch(`/work-experiences/${id}`, data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-experiences', token] })
      onClose()
    },
  })
}
