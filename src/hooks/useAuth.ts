import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { LoginDto } from '../dtos/auth.dto';
import api from '../api/axios';

export const useLogin = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async ({ email, password }: LoginDto) => {
      const res = await api.post('/auth/login', { email, password })
      return res.data.data.token
    },
    onSuccess: (token) => {
      localStorage.setItem('access_token', token)
      navigate({
        to: '/',
        replace: true,
      })
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Error al iniciar sesión'
      console.error(message)
    },
  })
}

export const useLogout = () => {
  const navigate = useNavigate()

  return () => {
    localStorage.removeItem('access_token')

    navigate({
      to: '/login',
      replace: true,
    })
  }
}
