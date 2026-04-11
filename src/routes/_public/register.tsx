import { createFileRoute, Link } from '@tanstack/react-router'
import { useRegister } from '../../features/auth/hooks/useRegister'
import { useForm } from '@tanstack/react-form'
import { RegisterSchema, defaultValues } from '../../features/auth/dtos/register.dto'
import { InputMessageError } from '../../shared/components/InputMessageError'
import { BannerMessageError } from '../../shared/components/BannerMessageError'
import { ButtonLoader } from '../../shared/components/ButtonLoader'
import { MdLock, MdLogin, MdMail, MdPassword } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { PasswordInput } from '../../features/auth/components/PasswordInput'

export const Route = createFileRoute('/_public/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const { mutate: register, error, isError, isPending } = useRegister()

  const form = useForm({
    defaultValues,
    validators: { onSubmit: RegisterSchema },
    onSubmit: ({ value }) => {
      register(value)
    },
  })

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <img src="/logo.svg" alt="logo FolioX" className="h-40" />
        <h2 className="text-white text-center text-4xl font-extrabold">Registrarse</h2>
      </div>

      {isError && (
        <BannerMessageError message={error.response?.data?.message || 'Surgió un error durante la creación de la cuenta'} />
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
                placeholder="Ingrese su nombre de usuario"
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
          name="email"
          children={(field) => (
            <div className="flex flex-col gap-2">
              <label htmlFor={field.name} className="text-white font-medium flex items-center gap-2 flex-wrap">
                <MdMail className="w-6 h-6" />
                <span>Correo Electrónico</span>
              </label>
              <input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Ingrese su correo electrónico"
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

        <form.Field
          name="confirmPassword"
          children={(field) => <PasswordInput field={field} Icon={MdPassword} label="Confirmar contraseña" />}
        />

        <div className="flex flex-col mt-2 gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="bg-primary-soft hover:bg-primary text-white font-medium p-3 rounded-2xl transition-colors cursor-pointer disabled:bg-neutral-medium disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <ButtonLoader message="Registrando..." />
            ) : (
              <>
                <span>Registrarme </span>
                <MdLogin className="w-6 h-6 inline" />
              </>
            )}
            
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
