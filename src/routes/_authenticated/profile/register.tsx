import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { ProfileFormField } from '../../../features/profile/components/ProfileFormField'
import { CountryField } from '../../../features/profile/components/CountryField'
import { PhoneField } from '../../../features/profile/components/PhoneField'
import { ProfessionsField } from '../../../features/profile/components/ProfessionsField'
import { RegisterAccountSchema, defaultValues } from '../../../features/profile/dtos/user.dto'
import { useGetProfile } from '../../../features/profile/hooks/useGetProfile'
import { useCreateProfile } from '../../../features/profile/hooks/useCreateProfile'
import { ButtonLoader } from '../../../shared/components/ButtonLoader'
import { BannerMessageError } from '../../../shared/components/BannerMessageError'
import { InputMessageError } from '../../../shared/components/InputMessageError'
import { SuccessModal } from '../../../shared/components/SuccessModal'

export const Route = createFileRoute('/_authenticated/profile/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const { data: currentProfile, isLoading: isLoadingProfile } = useGetProfile()
  const { mutate: create, error, isPending, isSuccess } = useCreateProfile()

  const form = useForm({
    defaultValues,
    validators: {
      onChange: RegisterAccountSchema,
    },
    onSubmit: ({ value }) => {
      const profileData = {
        ...value,
        date_of_birth: value.date_of_birth || undefined,
        gender: (value.gender as 'masculino' | 'femenino' | 'otro') || undefined,
        country: value.country || undefined,
        phone: value.phone || undefined,
      }

      create(profileData)
    },
  })

  const errorRef = useRef<HTMLDivElement>(null)
  const [showCancelModal, setShowCancelModal] = useState(false)

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [error])

  useEffect(() => {
    if (currentProfile) {
      navigate({ to: '/profile/edit' })
    }
  }, [currentProfile, navigate])

  if (isLoadingProfile || currentProfile) {
    return (
      <div className="py-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm text-neutral-medium mt-2">Verificando tu perfil...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-10">
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-bold text-background-dark mb-2">
              ¿Cancelar creación?
            </h3>
            <p className="text-sm text-neutral-medium mb-6">
              ¿Estás seguro de que deseas cancelar la creación de tu perfil? Puedes completarlo más tarde.
            </p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-neutral-200 text-background-dark hover:bg-neutral-300 transition-colors"
              >
                Seguir editando
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCancelModal(false)
                  navigate({ to: '/' })
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Sí, salir
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto">
        {isSuccess && (
          <SuccessModal message="Perfil creado exitosamente." redirect="Redirigiendo al inicio..." />
        )}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-background-dark">Completa tu perfil</h1>
          <p className="text-sm text-neutral-medium mt-1">Esta información será visible en tu portafolio público.</p>
        </div>

        {!!error && (
          <div ref={errorRef} className="mb-4">
            <BannerMessageError message={error.response?.data?.message || "Ocurrió un error al guardar el perfil"} />
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="flex flex-col gap-6"
        >
          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">Información personal</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <form.Field name="first_name" children={(field) => (
                <ProfileFormField label="Nombre" required field={field} type="text" placeholder="Tu nombre" />
              )} />

              <form.Field name="last_name" children={(field) => (
                <ProfileFormField label="Apellidos" required field={field} type="text" placeholder="Tus apellidos" />
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <form.Field name="date_of_birth" children={(field) => (
                <ProfileFormField label="Fecha de nacimiento" field={field} type="date" />
              )} />

              <form.Field name="gender" children={(field) => (
                <div>
                  <label className="block text-sm font-medium text-background-dark mb-1.5">Género</label>
                  <select
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-sm text-background-dark outline-none focus:border-primary transition-colors"
                  >
                    <option value="">Seleccionar</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <form.Field name="country" children={(field) => (
                <CountryField field={field} />
              )} />

              <form.Field name="phone" children={(field) => (
                <PhoneField field={field} />
              )} />
            </div>
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">Profesiones <span className="text-red-500">*</span></h2>
            <p className="text-xs text-neutral-medium mb-4">Agrega hasta 5 profesiones que te describan.</p>

            <form.Field name="professions" children={(field) => (
              <ProfessionsField field={field} />
            )} />
          </section>

          <section className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">Biografía <span className="text-red-500">*</span></h2>
            <p className="text-xs text-neutral-medium mb-4">Cuéntale al mundo quién eres y qué haces.</p>

            <form.Field name="biography" children={(field) => (
              <div>
                <textarea
                  placeholder="Escribe una breve descripción sobre ti..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-light bg-neutral-50 text-sm text-background-dark outline-none focus:border-primary transition-colors resize-none"
                  rows={4}
                />
                {!field.state.meta.isValid && field.state.meta.errors.length > 0 && (
                  <InputMessageError message={field.state.meta.errors[0]?.message ?? ''} />
                )}
              </div>
            )} />
          </section>

          <div className="flex justify-end gap-3 pb-4">
            <button
              type="button"
              disabled={isPending}
              onClick={() => setShowCancelModal(true)}
              className="bg-neutral-200 hover:bg-neutral-300 text-background-dark font-medium px-8 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="bg-primary hover:bg-primary-soft text-white font-medium px-8 py-2.5 rounded-xl transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? <ButtonLoader message="Guardando..." /> : "Guardar perfil"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
