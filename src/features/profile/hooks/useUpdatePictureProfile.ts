import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ApiError } from "../../../shared/interfaces/api.interface"
import api from "../../../app/api/axios"

export const useUpdatePictureProfile = () => {
  const queryClient = useQueryClient()
  const token = localStorage.getItem('access_token')

  return useMutation<unknown, ApiError, File>({
    mutationFn: async (file) => {
      const formData = new FormData()

      formData.append('file', file)

      const res = await api.patch('/profile/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile', token] })
    },
  })
}
