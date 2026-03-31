import { createFileRoute, redirect } from '@tanstack/react-router'
import { useAuthenticated, useRegister } from '../hooks/useAuth'
import { useForm } from '@tanstack/react-form'
import { RegisterSchema } from '../dtos/auth.dto'

export const Route = createFileRoute('/register')({
  component: RouteComponent,
  beforeLoad: () => {
    const isAuthenticated = useAuthenticated()

    if (isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
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
    <div className="h-screen bg-[#1F2B3B] flex items-center justify-center">
      <div className="w-full max-w-sm flex flex-col px-6">

        <div className="flex flex-col items-center mb-6">
          <img src="/Logo_FolioX.svg" alt="FolioX" className="h-35 mb-3" />
          <span className="text-white text-lg font-bold tracking-widest">FOLIOX</span>
        </div>

        <h2 className="text-white text-center text-3xl font-bold mb-6">Registrarse</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit(e)
          }}
          className="flex flex-col gap-4 w-full"
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
                {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
                  <p className="text-red-400 text-xs">{field.state.meta.errors[0]?.message}</p>
                )}
              </div>
            )}
          />

          <form.Field
            name="confirmPassword"
            children={(field) => (
              <div className="flex flex-col gap-1">
                <label htmlFor={field.name} className="text-white text-sm font-medium">
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
                  className="bg-[#C8D0D8] text-gray-800 placeholder-gray-500 rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 border border-transparent"
                />
                {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
                  <p className="text-red-400 text-xs">{field.state.meta.errors[0]?.message}</p>
                )}
              </div>
            )}
          />

          <div className="flex items-center justify-between text-sm mt-1">
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input type="checkbox" className="accent-blue-500" />
              Recordarme
            </label>
            <a href="#" className="text-white hover:underline">
              Olvide la contraseña
            </a>
          </div>

          <button
            type="submit"
            className="mt-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-2xl transition-colors cursor-pointer"
          >
            Registrarme
          </button>
        </form>

      </div>
    </div>
  )
}
