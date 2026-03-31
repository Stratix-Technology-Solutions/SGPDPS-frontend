import { useForm } from '@tanstack/react-form'
import { createFileRoute, redirect } from '@tanstack/react-router'
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
    <div className="min-h-screen bg-[#1F2B3B] flex items-center justify-center">
      <div className="w-4/5 md:w-1/2 min-h-screen bg-[#1E2937] flex flex-col justify-center px-10 md:px-36">

        <div className="flex justify-center mb-8">
          <img src="/Logo_FolioX.svg" alt="FolioX" className="h-35" />
        </div>

        <h2 className="text-white text-center text-4xl font-bold mb-8">Inicia sesión en FolioX</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit(e)
          }}
          className="flex flex-col gap-5"
        >
          <form.Field
            name="email"
            children={(field) => (
              <div className="flex flex-col gap-1">
                <label htmlFor={field.name} className="text-white text-sm font-medium">
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
                  className="bg-[#C8D0D8] text-gray-800 placeholder-gray-500 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
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
              <div className="flex flex-col gap-1">
                <label htmlFor={field.name} className="text-white text-sm font-medium">
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
                  className="bg-[#C8D0D8] text-gray-800 placeholder-gray-500 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
                />
              </div>
            )}
          />

          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-2xl transition-colors cursor-pointer"
          >
            Iniciar Sesion
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-2">
          <a href="#" className="text-white text-sm hover:underline">
            Olvide la contraseña
          </a>
          <p className="text-gray-500 text-center text-xs">
            ¿Es la primera vez que usas FolioX?{' '}
            <a href="/register" className="text-blue-400 hover:underline">
              Registrarse
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}
