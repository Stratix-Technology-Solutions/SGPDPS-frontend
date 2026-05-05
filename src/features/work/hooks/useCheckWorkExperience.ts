import { useMutation } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { CreateWorkExperience } from '../dtos/workExperience'

type CheckDuplicateResponse = {
  is_duplicate: boolean
}

type CheckDuplicatePayload = CreateWorkExperience & {
  exclude_id?: number
}

export const useCheckDuplicateWorkExperience = () => {
  return useMutation<CheckDuplicateResponse, ApiError, CheckDuplicatePayload>({
    mutationFn: async (data) => {
      const res = await api.post('/work-experiences/check-duplicate', data)
      return res.data
    },
  })
}
