import { createFileRoute, Link } from '@tanstack/react-router'
import { useRegister } from '../../hooks/useAuth'
import { useForm } from '@tanstack/react-form'
import { RegisterSchema } from '../../dtos/auth.dto'

export const Route = createFileRoute('/_public/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate: register } = useRegister()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: ({ value }) => {
      register(value)
    },
    validators: {
      onChange: RegisterSchema,
    },
  })

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <img src="/logo.svg" alt="logo FolioX" className="h-40" />
        <h2 className="text-white text-center text-4xl font-extrabold">Registrarse</h2>
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
                className="bg-neutral-light text-gray-800 placeholder-gray-500 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
              />
              {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
                <p className="text-red-400 text-sm">{field.state.meta.errors[0]?.message}</p>
              )}
            </div>
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <div className="flex flex-col gap-2">
              <label htmlFor={field.name} className="text-white font-medium">
                Contraseña
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

        <div className="flex flex-col mt-4 gap-3">
          <button
            type="submit"
            className="bg-primary-soft hover:bg-primary text-white font-medium p-3 rounded-2xl transition-colors cursor-pointer"
          >
            Registrarme
          </button>

          <p className="text-center">
            <span className="text-neutral-medium">¿Ya tienes cuenta? </span>
            <Link
              to="/login"
              className="text-primary-soft hover:underline"
            >
              Iniciar Sesión
            </Link>
          </p>
        </div>
      </form>
    </>
  )
}
