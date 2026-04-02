import { useForm } from '@tanstack/react-form'
import { createFileRoute, redirect, useLocation } from '@tanstack/react-router'
import { VerifyEmailSchema } from '../../dtos/auth.dto'
import { useVerifyEmail } from '../../hooks/useAuth'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/_public/verify-email')({
  component: RouteComponent,
  beforeLoad: ({ location }) => {
    if (!location.state.email) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  const location  = useLocation()
  const { mutate: verify } = useVerifyEmail()
  const [timeLeft, setTimeLeft] = useState(600)

  const form = useForm({
    defaultValues: {
      email: location.state.email || '',
      token: '',
    },
    onSubmit: ({ value }) => {
      verify(value)
    },
    validators: {
      onChange: VerifyEmailSchema,
    },
  })

  useEffect(() => {
    if (timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60

    return `${mins}:${secs.toString().padStart(2, `0`)}`
  }

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <img src="/logo.svg" alt="logo FolioX" className="h-40" />
        <h2 className="text-white text-center text-4xl font-extrabold">Confirmación de correo</h2>

        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-gray-400 text-center leading-relaxed">
            Hemos enviado un código de verificación a
            <span className="text-white font-medium"> {location.state.email}</span>
          </p>
          <p className="text-gray-400 text-center leading-relaxed">
            Ingresa el código para continuar
          </p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="flex flex-col gap-8 w-full"
      >
        <form.Field
          name="token"
          children={(field) => (
            <div className="flex flex-col gap-2">
              <input
                id={field.name}
                name={field.name}
                type="string"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="••••••••••"
                required
                aria-required="true"
                className="bg-neutral-light text-gray-800 placeholder-gray-500 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
              />
              {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
                <p className="text-red-400 text-sm">{field.state.meta.errors[0]?.message}</p>
              )}
            </div>
          )}
        />

        <div className="flex items-center justify-between flex-wrap gap-3">
          <p className="text-gray-400">
            El código expira en{' '}
            <span className="text-white font-medium">
              {formatTime(timeLeft)}
            </span>
          </p>

          <button
            type="submit"
            disabled={timeLeft <= 0}
            className="bg-primary-soft hover:bg-primary text-white font-medium p-3 rounded-2xl transition-colors cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Verificar
          </button>
        </div>
      </form>
    </>
  )
}
