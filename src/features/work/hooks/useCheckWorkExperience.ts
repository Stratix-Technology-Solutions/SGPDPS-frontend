import { useMutation } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { CreateWorkExperience, CheckDuplicateResponse } from '../dtos/workExperience'

type CheckDuplicateWorkPayload = {
  data: CreateWorkExperience
  excludeId?: string
}

export const useCheckDuplicateWorkExperience = () => {
  return useMutation<CheckDuplicateResponse, ApiError, CheckDuplicateWorkPayload>({
    mutationFn: async ({ data, excludeId }) => {
      const route = excludeId
        ? `/work-experiences/check?exclude_id=${excludeId}`
        : '/work-experiences/check'

      const res = await api.post(route, data)
      return res.data
    },
  })
}
