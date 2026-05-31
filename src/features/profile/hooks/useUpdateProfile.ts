import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { RegisterAccountDto } from '../dtos/user.dto'

type UpdateProfilePayload = {
  data: RegisterAccountDto
  file?: File | null
  removePicture?: boolean
}

export const useUpdateProfile = () => {
  const navigate = useNavigate()

  return useMutation<unknown, ApiError, UpdateProfilePayload>({
    mutationFn: async ({ data, file, removePicture }) => {
      const res = await api.patch('/profile', data)

      if (removePicture && !file) {
        await api.delete('/profile/picture')
      }

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
      }, 2000)
    },
  })
}
