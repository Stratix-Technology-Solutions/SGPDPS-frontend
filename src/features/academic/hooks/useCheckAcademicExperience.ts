import { useMutation } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { AcademicDto } from '../dtos/academic.dto'
import type { CheckDuplicateResponse } from '../dtos/academic.interface'

type CheckDuplicateAcademicPayload = {
  data: AcademicDto
  excludeId?: string
}

export const useCheckDuplicateAcademicExperience = () => {
  return useMutation<CheckDuplicateResponse, ApiError, CheckDuplicateAcademicPayload>({
    mutationFn: async ({ data, excludeId }) => {
      const route = excludeId
        ? `/academic-experiences/check?exclude_id=${excludeId}`
        : '/academic-experiences/check'

      const res = await api.post(route, data)
      return res.data
    },
  })
}
