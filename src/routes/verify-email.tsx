import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { VerifyEmailSchema } from '../dtos/auth.dto'
import { useVerifyEmail } from '../hooks/useAuth'

export const Route = createFileRoute('/verify-email')({
  component: RouteComponent,
})

function RouteComponent() {
  const { email } = Route.useSearch()
  const { mutate: verify } = useVerifyEmail()

  const form = useForm({
    defaultValues: {
      email,
      token: '',
    },
    onSubmit: ({ value }) => {
      verify(value)
    },
    validators: {
      onChange: VerifyEmailSchema,
    },
  })

  return (
    <div>
      <h2>Código enviado a: {email}</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="flex flex-col"
      >
        <form.Field
          name="token"
          children={(field) => (
            <div>
              <input
                id={field.name}
                name={field.name}
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="000000"
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

        <button type="submit" className="p-1 border rounded border-gray-700 hover:cursor-pointer">
          Verificar
        </button>
      </form>
    </div>
  )
}
