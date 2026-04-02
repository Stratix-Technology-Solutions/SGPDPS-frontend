import { createFileRoute, redirect } from '@tanstack/react-router'
import { ResetPasswordSearchSchema } from '../../dtos/search.dto'
import { useForm } from '@tanstack/react-form'
import { useResetPassword } from '../../hooks/useAuth'
import { RegisterSchema } from '../../dtos/auth.dto'

export const Route = createFileRoute('/_public/reset-password')({
  component: RouteComponent,
  validateSearch: ResetPasswordSearchSchema,
  beforeLoad: ({ search }) => {
    if (!search.token || !search.email) {
      throw redirect({ to: '/login' })
    }
  }
})

function RouteComponent() {
  const { email, token } = Route.useSearch()
  const { mutate: reset } = useResetPassword()

  const form = useForm({
    defaultValues: {
      email,
      password: '',
      confirmPassword: '',
    },
    onSubmit: ({ value }) => {
      reset({ ...value, token })
    },
    validators: {
      onChange: RegisterSchema,
    },
  })

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <img src="/logo.svg" alt="logo FolioX" className="h-40" />
        <h2 className="text-white text-center text-4xl font-extrabold">Ingresar nueva contraseña</h2>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit(e)
        }}
        className="flex flex-col gap-6 w-full"
      >
        <form.Field
          name="email"
          children={(field) => (
            <div className="flex flex-col gap-2">
              <label htmlFor={field.name} className="text-white font-medium">
                Email
              </label>
              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Ingrese su email"
                required
                aria-required="true"
                disabled
                className="bg-neutral-light text-gray-800 placeholder-gray-500 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 border border-transparent disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <div className="flex flex-col gap-2">
              <label htmlFor={field.name} className="text-white font-medium">
                Nueva Contraseña
              </label>
              <input
                id={field.name}
                name={field.name}
                type="password"
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

        <form.Field
          name="confirmPassword"
          children={(field) => (
            <div className="flex flex-col gap-2">
              <label htmlFor={field.name} className="text-white font-medium">
                Confirmar contraseña
              </label>
              <input
                id={field.name}
                name={field.name}
                type="password"
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

        <button
          type="submit"
          className="bg-primary-soft hover:bg-primary text-white font-medium p-3 rounded-2xl transition-colors cursor-pointer mt-4"
        >
          Enviar
        </button>
      </form>
    </>
  )
}
