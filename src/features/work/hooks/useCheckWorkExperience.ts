import { useMutation } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { CreateWorkExperience, CheckDuplicateResponse } from '../dtos/workExperience'


export const useCheckDuplicateWorkExperience = () => {
  return useMutation<CheckDuplicateResponse, ApiError, CreateWorkExperience>({
    mutationFn: async (data) => {
      const res = await api.post('/work-experiences/check', data)
      return res.data
    },
  })
}
