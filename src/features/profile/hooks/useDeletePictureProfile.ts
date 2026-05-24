import { useMutation } from "@tanstack/react-query"
import api from "../../../app/api/axios"

export const useDeletePictureProfile = () => {
  return useMutation({
    mutationFn: async () => {
      await api.delete('/profile/picture');
    }
  })
}
