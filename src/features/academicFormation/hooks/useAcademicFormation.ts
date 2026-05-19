import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { AcademicFormationDto } from '../dtos/academicFormation.dto'

const QUERY_KEY = ['user', 'academic-formations']

export const useAcademicFormation = () => {
  const queryClient = useQueryClient()

  const create = useMutation<void, ApiError, AcademicFormationDto>({
    mutationFn: async (dto) => {
      await api.post('/academic-formations', dto)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY })
    },
  })

  return {
    create,
  }
}
