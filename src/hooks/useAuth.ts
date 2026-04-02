import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { EmailDto, LoginDto, RegisterDto, VerifyEmailDto } from '../dtos/auth.dto';
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
      navigate({ to: '/' })
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
    navigate({ to: '/login' })
  }
}

export const useAuthenticated = () => {
  return !!localStorage.getItem('access_token')
}

export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async ({ email, password }: RegisterDto) => {
      const res = await api.post('/auth/register', { email, password })
      return res.data
    },
    onSuccess: (_, variables) => {
      navigate({
        to: '/verify-email',
        state: {
          email: variables.email,
        },
      })
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Error al iniciar sesión'
      console.error(message)
    }
  })
}

export const useVerifyEmail = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async ({ email, token }: VerifyEmailDto) => {
      const res = await api.post('/auth/verify-email', { email, token })
      return res.data.token
    },
    onSuccess: (token) => {
      localStorage.setItem('access_token', token)
      navigate({ to: '/' })
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Error al iniciar sesión'
      console.error(message)
    }
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async ({ email }: EmailDto) => {
      const res = await api.post('/auth/forgot-password', { email })
      return res.data
    },
    onSuccess: console.log,
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Error al iniciar sesión'
      console.error(message)
    }
  })
}

export const useResetPassword = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async ({ email, password, token }: { token: string } & RegisterDto) => {
      const res = await api.post('/auth/reset-password', { email, password, token })
      return res.data
    },
    onSuccess: (data) => {
      console.log(data)
      navigate({ to: '/login' })
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Error al iniciar sesión'
      console.error(message)
    }
  })
}
