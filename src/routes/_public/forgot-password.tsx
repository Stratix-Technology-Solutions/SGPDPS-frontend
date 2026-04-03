import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { EmailSchema } from '../../dtos/auth.dto'
import { useForgotPassword } from '../../hooks/useAuth'
import { BiSend } from 'react-icons/bi'
import { ButtonLoader } from '../../components/ButtonLoader'
import { InputMessageError } from '../../components/InputMessageError'
import { BannerMessageError } from '../../components/BannerMessageError'

export const Route = createFileRoute('/_public/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate: forgot, data, error, isPending } = useForgotPassword()

  const form = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: ({ value }) => {
      forgot(value)
    },
    validators: {
      onChange: EmailSchema,
    },
  })

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <img src="/logo.svg" alt="logo FolioX" className="h-40" />
        <h2 className="text-white text-center text-4xl font-extrabold">Recuperación de contraseña</h2>
        <p className="text-gray-400 text-center leading-relaxed">
          {!data
            ? 'Ingresa tu correo electrónico para continuar'
            : data.message
          }
        </p>
      </div>

      {!!error && (
        <BannerMessageError message={error.response?.data?.message || 'Surgió un error durante la recuperación de la contraseña'} />
      )}

      {!data && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="flex flex-col gap-8 w-full"
        >
          <form.Field
            name="email"
            children={(field) => (
              <div className="flex flex-col gap-2">
                <input
                  id={field.name}
                  name={field.name}
                  type="string"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Ingrese su email"
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

          <button
            type="submit"
            disabled={isPending}
            className="bg-primary-soft hover:bg-primary text-white font-medium p-3 rounded-2xl transition-colors cursor-pointer disabled:bg-neutral-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <ButtonLoader />
            ) : (
              <>
                <span>Enviar </span>
                <BiSend className="w-6 h-6 inline" />
              </>
            )}
          </button>
        </form>
      )}
    </>
  )
}
