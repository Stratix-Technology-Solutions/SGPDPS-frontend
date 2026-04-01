import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { LoginSchema } from '../dtos/auth.dto'
import { useAuthenticated, useLogin } from '../hooks/useAuth'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  beforeLoad: () => {
    const isAuthenticated = useAuthenticated()

    if (isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
})

function RouteComponent() {
  const { mutate: login } = useLogin()

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ value }) => {
      login(value)
    },
    validators: {
      onChange: LoginSchema,
    },
  })

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center">
      <div className="w-full max-w-xl flex flex-col p-8 gap-8">

        <div className="flex flex-col items-center gap-4">
          <img src="/Logo_FolioX.svg" alt="logo FolioX" className="h-40" />
          <h2 className="text-white text-center text-4xl font-extrabold">Inicia sesión en FolioX</h2>
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
                  <p className="text-red-400 text-xs">{field.state.meta.errors[0]?.message}</p>
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
              </div>
            )}
          />

          <div className="flex flex-col gap-3 mt-4">
            <div className="flex items-center justify-end mb-2 flex-wrap gap-3">
              {/*
              <label className="flex items-center gap-2 text-white cursor-pointer">
                <input type="checkbox" className="accent-primary-soft" />
                Recordarme
              </label>
              */}

              <Link
                to="."
                className="text-white hover:underline"
              >
                Olvide la contraseña
              </Link>
            </div>

            <button
              type="submit"
              className="bg-primary-soft hover:bg-primary text-white font-medium py-3 rounded-2xl transition-colors cursor-pointer"
            >
              Iniciar Sesion
            </button>

            <p className="text-center">
              <span className="text-neutral-medium ">¿Es la primera vez que usas FolioX? </span>
              <Link
                to="/register"
                className="text-primary-soft hover:underline"
              >
                Registrarse
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
