import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import api from '../api/axios'
import { loginSchema } from '../dtos/auth.dto'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()

  const { mutate: login} = useMutation({
    mutationFn: async ({ email, password }: { email: string, password: string }) => {
      const res = await api.post('/auth/login', { email, password })
      return res.data.data.token
    },
    onSuccess: (token) => {
      localStorage.setItem('access_token', token)
      navigate({
        to: '/',
        replace: true,
      })
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Error al iniciar sesión'
      console.error(message)
    },
  })

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ value }) => {
      login(value)
    },
    validators: {
      onChange: loginSchema,
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
