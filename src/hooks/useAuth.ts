import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import type { EmailDto, LoginDto, RegisterDto, VerifyEmailDto } from '../dtos/auth.dto'
import api from '../api/axios'
import type { ApiError } from '../interfaces/api.interface'

export const useLogin = () => {
  const navigate = useNavigate()

  return useMutation<string, ApiError, LoginDto>({
    mutationFn: async ({ email, password }) => {
      const res = await api.post('/auth/login', { email, password })
      return res.data.data.token
    },
    onSuccess: (token) => {
      localStorage.setItem('access_token', token)
      navigate({ to: '/' })
    },
  })
}

export const useLogout = () => {
  return useMutation<string, ApiError>({
    mutationFn: async () => {
      const res = await api.post('/logout');
      return res.data.message;
    }
  })
}

export const useAuthenticated = () => {
  return !!localStorage.getItem('access_token')
}

export const useRegister = () => {
  const navigate = useNavigate()

  return useMutation<unknown, ApiError, RegisterDto>({
    mutationFn: async ({ email, password }) => {
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
  })
}

export const useVerifyEmail = () => {
  const navigate = useNavigate()

  return useMutation<string, ApiError, VerifyEmailDto>({
    mutationFn: async ({ email, token }) => {
      const res = await api.post('/auth/verify-email', { email, token })
      return res.data.data.token
    },
    onSuccess: (token) => {
      localStorage.setItem('access_token', token)
      navigate({ to: '/' })
    },
  })
}

export const useForgotPassword = () => {
  return useMutation<{ message: string }, ApiError, EmailDto>({
    mutationFn: async ({ email }) => {
      const res = await api.post('/auth/forgot-password', { email })
      return res.data
    },
  })
}

export const useResetPassword = () => {
  const navigate = useNavigate()

  return useMutation<unknown, ApiError, { token: string } & RegisterDto>({
    mutationFn: async ({ email, password, token }) => {
      const res = await api.post('/auth/reset-password', { email, password, token })
      return res.data
    },
    onSuccess: () => {
      navigate({ to: '/login' })
    },
  })
}

export const useRetrySendCode = () => {
  return useMutation<unknown, ApiError, EmailDto>({
    mutationFn: async ({ email }) => {
      const res = await api.post('/auth/resend-verification', { email })
      return res.data
    },
  })
}
