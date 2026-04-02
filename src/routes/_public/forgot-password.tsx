import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { EmailSchema } from '../../dtos/auth.dto'
import { useForgotPassword } from '../../hooks/useAuth'

export const Route = createFileRoute('/_public/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate: forgot, data, isPending } = useForgotPassword()

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
                {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
                  <p className="text-red-400 text-sm">{field.state.meta.errors[0]?.message}</p>
                )}
              </div>
            )}
          />

          <button
            type="submit"
            disabled={isPending}
            className="bg-primary-soft hover:bg-primary text-white font-medium p-3 rounded-2xl transition-colors cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </form>
      )}
    </>
  )
}
