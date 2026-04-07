import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import api from '../api/axios'
import type { ApiError } from '../interfaces/api.interface'
import type { RegisterAccountDto } from '../dtos/user.dto'

export const useGetProfile = () => {
  return useQuery<RegisterAccountDto, ApiError>({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await api.get('/profile')
      return res.data
    },
  })
}

export const useCreateProfile = () => {
  const navigate = useNavigate()

  return useMutation<unknown, ApiError, RegisterAccountDto>({
    mutationFn: async (data) => {
      const res = await api.post('/profile', data)
      return res.data
    },
    onSuccess: () => {
      setTimeout(() => {
        navigate({ to: '/' })
      }, 2000)
    },
  })
}
