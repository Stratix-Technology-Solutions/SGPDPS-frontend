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
    <div>
      <h2>Inicio de Sesión</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit(e)
        }}
        className="flex flex-col"
      >
        <form.Field
          name="email"
          children={(field) => (
            <div>
              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="mi.correo@example.com"
                required
                aria-required="true"
              />
              {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
                <p className="text-red-500">
                  {field.state.meta.errors[0]?.message}
                </p>
              )}
            </div>
          )}
        />

        <form.Field
          name="password"
          children={(field) => (
            <div>
              <input
                id={field.name}
                name={field.name}
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="********"
                required
                aria-required="true"
              />
            </div>
          )}
        />

        <button type="submit" className="p-1 border rounded border-gray-700 hover:cursor-pointer">
          Ingresar
        </button>
      </form>
    </div>
  )
}
