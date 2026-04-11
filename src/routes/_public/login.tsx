import { useForm } from '@tanstack/react-form'
import { createFileRoute, Link } from '@tanstack/react-router'
import { LoginSchema, defaultValues } from '../../features/auth/dtos/login.dto'
import { useLogin } from '../../features/auth/hooks/useLogin'
import { MdLock, MdLogin } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { InputMessageError } from '../../shared/components/InputMessageError'
import { ButtonLoader } from '../../shared/components/ButtonLoader'
import { BannerMessageError } from '../../shared/components/BannerMessageError'
import { PasswordInput } from '../../features/auth/components/PasswordInput'

export const Route = createFileRoute('/_public/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate: login, error, isError, isPending } = useLogin()

  const form = useForm({
    defaultValues,
    validators: { onSubmit: LoginSchema },
    onSubmit: ({ value }) => {
      login(value)
    },
  })

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <img src="/logo.svg" alt="logo FolioX" className="h-40" />
        <h2 className="text-white text-center text-4xl font-extrabold">Inicia sesión en FolioX</h2>
      </div>

      {isError && (
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
          name="username"
          children={(field) => (
            <div className="flex flex-col gap-2">
              <label htmlFor={field.name} className="text-white font-medium flex items-center gap-2 flex-wrap">
                <FaUser className="w-6 h-6" />
                <span>Nombre de usuario</span>
              </label>
              <input
                id={field.name}
                name={field.name}
                type="text"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Ingrese su nombre de usuario o su correo electrónico"
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
