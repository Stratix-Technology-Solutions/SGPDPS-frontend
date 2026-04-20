import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { RegisterAccountDto } from '../dtos/user.dto'

export const useCreateProfile = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const token = localStorage.getItem('access_token')

  return useMutation<unknown, ApiError, RegisterAccountDto>({
    mutationFn: async (data) => {
      const res = await api.post('/profile', data)
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
