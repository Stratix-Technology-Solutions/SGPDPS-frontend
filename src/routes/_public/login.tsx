import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link } from '@tanstack/react-router'
import { LoginSchema } from '../../dtos/auth.dto'
import { useLogin } from '../../hooks/useAuth'
import { MdMail, MdLock, MdLogin } from 'react-icons/md'
import { InputMessageError } from '../../components/InputMessageError'
import { ButtonLoader } from '../../components/ButtonLoader'
import { BannerMessageError } from '../../components/BannerMessageError'
import { PasswordInput } from '../../components/Input/PasswordInput'

export const Route = createFileRoute('/_public/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate: login, error, isPending } = useLogin()

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
    <>
      <div className="flex flex-col items-center gap-4">
        <img src="/logo.svg" alt="logo FolioX" className="h-40" />
        <h2 className="text-white text-center text-4xl font-extrabold">Inicia sesión en FolioX</h2>
      </div>

      {!!error && (
        <BannerMessageError message={error.response?.data?.message || 'Surgió un error durante el inicio de sesión'} />
      )}

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
              <label htmlFor={field.name} className="text-white font-medium flex items-center gap-2 flex-wrap">
                <MdMail className="w-6 h-6" />
                <span>Email</span>
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
              {!field.state.meta.isValid && (
                <InputMessageError message={field.state.meta.errors.map(e => e?.message).join(', ')} />
              )}
            </div>
          )}
        />

        <form.Field
          name="password"
          children={(field) => <PasswordInput field={field} Icon={MdLock}/>}
        />

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-end mb-2">
            <Link
              to="/forgot-password"
              className="text-white hover:underline"
            >
              Olvide la contraseña
            </Link>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="bg-primary-soft hover:bg-primary text-white font-medium p-3 rounded-2xl transition-colors cursor-pointer disabled:bg-neutral-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <ButtonLoader message="Iniciando Sesión..." />
            ) : (
              <>
                <span>Iniciar Sesion </span>
                <MdLogin className="w-6 h-6 inline" />
              </>
            )}
          </button>

          <p className="text-center">
            <span className="text-neutral-medium">¿Es la primera vez que usas FolioX? </span>
            <Link
              to="/register"
              className="text-primary-soft hover:underline"
            >
              Registrarse
            </Link>
          </p>
        </div>
      </form>
    </>
  )
}
