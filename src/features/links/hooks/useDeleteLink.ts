import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { ApiError } from '../../../shared/interfaces/api.interface'
import api from '../../../app/api/axios'

export const useDeleteLink = ({ onClose }: { onClose: () => void }) => {
    const queryClient = useQueryClient()

    return useMutation<void, ApiError, string>({
        mutationFn: async (id) => {
            await api.delete(`/links/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user', 'links'] })
            onClose()
        },
    })
}