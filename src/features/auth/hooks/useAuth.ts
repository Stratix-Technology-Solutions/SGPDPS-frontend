export const useAuth = () => {
  return !!localStorage.getItem('access_token')
}
