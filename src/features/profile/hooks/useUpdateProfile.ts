import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { RegisterAccountDto } from '../dtos/user.dto'

export const useUpdateProfile = () => {
  const navigate = useNavigate()

  return useMutation<unknown, ApiError, RegisterAccountDto>({
    mutationFn: async (data) => {
      const res = await api.patch('/profile', data)
      return res.data
    },
    onSuccess: () => {
      setTimeout(() => {
        navigate({ to: '/' })
      }, 2000)
    },
  })
}
