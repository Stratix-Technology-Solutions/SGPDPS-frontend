import { useMutation } from '@tanstack/react-query'
import api from '../../../app/api/axios'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import type { AcademicDto } from '../dtos/academic.dto'
import type { CheckDuplicateResponse } from '../dtos/academic.interface'

export const useCheckDuplicateAcademicExperience = () => {
    return useMutation<CheckDuplicateResponse, ApiError, AcademicDto>({
        mutationFn: async (data) => {
            const res = await api.post('/academic-experiences/check', data)
            return res.data
        },
    })
}
