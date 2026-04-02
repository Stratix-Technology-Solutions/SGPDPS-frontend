import { useForm } from '@tanstack/react-form'
import { createFileRoute, redirect, useLocation } from '@tanstack/react-router'
import { VerifyEmailSchema } from '../../dtos/auth.dto'
import { useVerifyEmail } from '../../hooks/useAuth'
import { useEffect, useState } from 'react'
import { BannerMessageError } from '../../components/BannerMessageError'
import { InputMessageError } from '../../components/InputMessageError'
import { ButtonLoader } from '../../components/ButtonLoader'
import { BiSend } from 'react-icons/bi'

export const Route = createFileRoute('/_public/verify-email')({
  component: RouteComponent,
  beforeLoad: ({ location }) => {
    if (!location.state.email) {
      throw redirect({ to: '/login' })
    }
  },
})

function RouteComponent() {
  const location  = useLocation()
  const { mutate: verify, error, isPending } = useVerifyEmail()
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
          <p className="text-gray-400 text-center leading-relaxed">
            El código expira en{' '}
            <span className="text-white font-medium">
              {formatTime(timeLeft)}
            </span>
          </p>
        </div>
      </div>

      {!!error && (
        <BannerMessageError message={error.response?.data?.message || 'Surgió un error durante la verificación del correo'} />
      )}

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
              {!field.state.meta.isValid && (
                <InputMessageError message={field.state.meta.errors.map(e => e?.message).join(', ')} />
              )}
            </div>
          )}
        />

        <div className="flex items-center justify-end flex-wrap gap-3">
          <button
            type="submit"
            disabled={timeLeft <= 0 || isPending}
            className="bg-primary-soft hover:bg-primary text-white font-medium p-3 rounded-2xl transition-colors cursor-pointer disabled:bg-neutral-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <ButtonLoader />
            ) : (
              <>
                <span>Verificar </span>
                <BiSend className="w-6 h-6 inline" />
              </>
            )}
          </button>
        </div>
      </form>
    </>
  )
}
