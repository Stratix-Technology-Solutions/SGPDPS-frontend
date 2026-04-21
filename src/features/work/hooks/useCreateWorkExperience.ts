import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type {
  CreateWorkExperience,
  WorkExperience,
} from '../dtos/workExperience'

export const useCreateWorkExperience = ({
  onClose,
}: {
  onClose: () => void
}) => {
  const queryClient = useQueryClient()
  const token = localStorage.getItem('access_token')

  return useMutation<WorkExperience, ApiError, CreateWorkExperience>({
    mutationFn: async (data) => {
      const res = await api.post('/work-experiences', data).catch((err) => {
        throw err
      })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-experiences', token] })
      onClose()
    },
  })
}
