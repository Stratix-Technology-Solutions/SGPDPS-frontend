import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import api from '../api/axios'
import type { ApiError } from '../interfaces/api.interface'
import type { RegisterAccountDto } from '../dtos/user.dto'

export const useGetProfile = () => {
  return useQuery<RegisterAccountDto | null, ApiError>({
    queryKey: ['profile'],
    queryFn: async () => {
      try {
        const res = await api.get('/profile')
        return res.data
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null // No hay perfil aún, es estado normal
        }
        throw error // Otros errores se propagan
      }
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
