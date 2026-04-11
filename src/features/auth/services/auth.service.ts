import api from '../../../app/api/axios'

export const validateToken = async () => {
  const token = localStorage.getItem('access_token')

  if (!token) return false

  try {
    await api.get('/auth/validate')
    return true
  } catch {
    return false
  }
}
