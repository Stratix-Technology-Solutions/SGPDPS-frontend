import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { RegisterAccountDto } from '../dtos/user.dto'

type RegisterData = {
  data: RegisterAccountDto;
  file?: File | null;
  removePicture?: boolean;
}

export const useCreateProfile = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const token = localStorage.getItem('access_token')

  return useMutation<unknown, ApiError, RegisterData>({
    mutationFn: async ({ data, file }) => {
      const res = await api.post('/profile', data)

      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        await api.post('/profile/picture', formData, {
          headers: { 'Content-Type': undefined },
        })
      }

      return res.data
    },
    onSuccess: () => {
      setTimeout(() => {
        navigate({ to: '/dashboard' })
        queryClient.invalidateQueries({ queryKey: ['user', 'profile', token] })
      }, 2000)
    },
  })
}
