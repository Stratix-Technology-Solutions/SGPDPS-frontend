import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'

export const useDeleteWorkExperience = ({
  onClose,
}: {
  onClose: () => void
}) => {
  const queryClient = useQueryClient()
  const token = localStorage.getItem('access_token')

  return useMutation<void, ApiError, string>({
    mutationFn: async (id) => {
      await api.delete(`/work-experiences/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['work-experiences', token] })
      onClose()
    },
  })
}
